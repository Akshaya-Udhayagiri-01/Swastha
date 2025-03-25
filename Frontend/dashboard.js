document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please log in first!");
        window.location.href = "login.html";
        return;
    }

    // 🔹 Dynamic Page Navigation
    window.showSection = function (sectionId) {
        document.querySelectorAll(".page").forEach((section) => {
            section.classList.remove("active");
        });
        document.getElementById(sectionId).classList.add("active");
    };

    // 🔹 AI Advice Function
    document.getElementById("getAdviceBtn").addEventListener("click", async () => {
        const mood = document.getElementById("moodSelect").value;
        const adviceText = document.getElementById("adviceText");
        const backupResources = document.getElementById("backupResources");

        // Show loading message
        adviceText.innerText = "Fetching advice... Please wait. ⏳";
        backupResources.classList.add("hidden");  

        try {
            const res = await fetch("http://localhost:5000/api/ai/advice", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ mood }),
            });

            const data = await res.json();

            if (!res.ok || !data.advice) {
                throw new Error("AI not responding");
            }

            adviceText.innerText = `✨ ${data.advice}`;
            backupResources.classList.add("hidden");  // Hide backup links
        } catch (error) {
            adviceText.innerText = "⚠️ AI is unavailable. Check these self-care resources below! 💡";
            backupResources.classList.remove("hidden");  // Show backup links
        }
    });

    // 🔹 Logout Function (With Confirmation)
    window.logout = function () {
        if (confirm("Are you sure you want to logout?")) {
            localStorage.removeItem("token");
            window.location.href = "login.html";
        }
    };
});
