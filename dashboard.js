import { auth } from "./firebase.js";

import {
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

// Check Login

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html";

    }

});

// Logout

document.addEventListener("click", async (e) => {

    if (e.target.id === "logoutBtn") {

        try {

            await signOut(auth);

            alert("Logged Out Successfully ❤️");

            window.location.href = "login.html";

        }

        catch (error) {

            alert(error.message);

        }

    }

});