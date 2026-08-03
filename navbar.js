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

    // Mobile Menu
    const menuToggle = document.getElementById("menuToggle");

    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks && logoutBtn) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            logoutBtn.classList.toggle("active");

            const icon = menuToggle.querySelector("i");

            if (navLinks.classList.contains("active")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

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
