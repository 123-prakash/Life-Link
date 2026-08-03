import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim();

        const password = document.getElementById("password").value;

        const confirmPassword = document.getElementById("confirmPassword").value;


        if (password !== confirmPassword) {

            alert("Passwords do not match!");

            return;

        }

        try {

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {

                uid: user.uid,

                name: name,

                email: email,

                role: "user",

                photo:
                    "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(name) +
                    "&background=d31027&color=ffffff",

                createdAt: serverTimestamp()

            });

            alert("Registration Successful ❤️");

            window.location.href = "login.html";

        }

        catch (error) {

            console.error(error);

            alert(error.message);

        }

    });

}


// Password Show / Hide

const togglePassword = document.getElementById("togglePassword");

const password = document.getElementById("password");

if (togglePassword) {

    togglePassword.addEventListener("click", () => {

        if (password.type === "password") {

            password.type = "text";

            togglePassword.innerHTML =
                '<i class="fa-solid fa-eye-slash"></i>';

        }

        else {

            password.type = "password";

            togglePassword.innerHTML =
                '<i class="fa-solid fa-eye"></i>';

        }

    });

}


// Confirm Password Show / Hide

const toggleConfirmPassword =
    document.getElementById("toggleConfirmPassword");

const confirmPassword =
    document.getElementById("confirmPassword");

if (toggleConfirmPassword) {

    toggleConfirmPassword.addEventListener("click", () => {

        if (confirmPassword.type === "password") {

            confirmPassword.type = "text";

            toggleConfirmPassword.innerHTML =
                '<i class="fa-solid fa-eye-slash"></i>';

        }

        else {

            confirmPassword.type = "password";

            toggleConfirmPassword.innerHTML =
                '<i class="fa-solid fa-eye"></i>';

        }

    });

}