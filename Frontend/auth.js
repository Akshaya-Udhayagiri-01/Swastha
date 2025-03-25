document.addEventListener("DOMContentLoaded", () => {
    const backendURL = "https://swastha-jgce.onrender.com";  // ✅ Deployed Backend URL
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");

    // ✅ Function to Handle API Calls (Reused for Both Login & Signup)
    async function handleAuth(endpoint, body) {
        try {
            const res = await fetch(`${backendURL}/api/auth/${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Something went wrong!");
            return data;
        } catch (error) {
            alert(`❌ Error: ${error.message}`);
            return null;
        }
    }

    // ✅ Signup Form Handler
    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("signupName").value;
            const email = document.getElementById("signupEmail").value;
            const password = document.getElementById("signupPassword").value;

            const data = await handleAuth("signup", { name, email, password });
            if (data) {
                localStorage.setItem("token", data.token);
                alert("🎉 Signup Successful! Redirecting...");
                window.location.href = "dashboard.html";
            }
        });
    }

    // ✅ Login Form Handler
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            const data = await handleAuth("login", { email, password });
            if (data) {
                localStorage.setItem("token", data.token);
                alert("✅ Login Successful! Redirecting...");
                window.location.href = "dashboard.html";
            }
        });
    }
});
