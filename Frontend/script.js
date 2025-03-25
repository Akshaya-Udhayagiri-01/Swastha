document.addEventListener("DOMContentLoaded", () => {
    const backendURL = "https://swastha-jgce.onrender.com";
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    // ✅ Login Form Handler
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            const res = await fetch(`${backendURL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Invalid email or password.");
                return;
            }

            localStorage.setItem("token", data.token);
            alert("Login Successful! Redirecting...");
            window.location.href = "dashboard.html";
        });
    }

    // ✅ Signup Form Handler
    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("signupName").value;
            const email = document.getElementById("signupEmail").value;
            const password = document.getElementById("signupPassword").value;

            const res = await fetch(`${backendURL}/api/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Signup failed.");
                return;
            }

            alert("Signup Successful! Please login.");
            window.location.href = "login.html";
        });
    }
});
