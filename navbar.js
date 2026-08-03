import { auth } from "./firebase.js";
import {
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

// Load Navbar
async function loadNavbar() {

    const navbar = document.getElementById("navbar");

    if (!navbar) return;

    const response = await fetch("navbar.html");

    navbar.innerHTML = await response.text();

    // Highlight Current Page
    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".nav-links a").forEach((link) => {

        if (link.getAttribute("href") === currentPage) {

            link.classList.add("active");

        }

    });

    // Logout
    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", async () => {

            await signOut(auth);

            alert("Logged Out Successfully");

            window.location.href = "login.html";

        });

    }

}

// Check Login
onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html";

    }

});

// Load Navbar
loadNavbar();