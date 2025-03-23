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
        if (res.ok) {
          adviceText.innerText = data.advice;
          backupResources.classList.add("hidden");  // Hide backup links
        } else {
          throw new Error("AI not responding");
        }
      } catch (error) {
        adviceText.innerText = "AI is not available at the moment. Please check the self-care resources below! 💡";
        backupResources.classList.remove("hidden");  // Show backup links
      }
    });

    // 🔹 Logout Function
    window.logout = function () {
        localStorage.removeItem("token");
        window.location.href = "login.html";
    };
});
