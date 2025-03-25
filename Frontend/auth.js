document.addEventListener("DOMContentLoaded", () => {
    const backendURL = "https://swastha-jgce.onrender.com";
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    // ✅ Check If User is Already Logged In
    const token = localStorage.getItem("token");
    if (token) {
        fetch(`${backendURL}/api/auth/validate-token`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => {
            if (res.ok) {
                window.location.href = "dashboard.html";
            } else {
                localStorage.removeItem("token");
            }
        })
        .catch(() => localStorage.removeItem("token"));
    }

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
            if (res.ok) {
                localStorage.setItem("token", data.token);
                alert("Login Successful! Redirecting...");
                window.location.href = "dashboard.html";
            } else {
                alert("Invalid credentials. Please try again.");
            }
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
            if (res.ok) {
                localStorage.setItem("token", data.token);
                alert("Signup Successful! Redirecting...");
                window.location.href = "dashboard.html";
            } else {
                alert(data.message || "Signup failed.");
            }
        });
    }
});
