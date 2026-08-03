import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const requestForm = document.getElementById("requestForm");

requestForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const submitBtn = requestForm.querySelector("button");

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;

    const patientName = document.getElementById("patientName").value.trim();
    const bloodGroup = document.getElementById("bloodGroup").value;
    const hospital = document.getElementById("hospital").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const city = document.getElementById("city").value.trim();
    const message = document.getElementById("message").value.trim();

    try {

        await addDoc(collection(db, "requests"), {

            patientName,
            bloodGroup,
            hospital,
            contact,
            city,
            message,

            status: "Pending",

            createdAt: serverTimestamp()

        });

        alert("✅ Emergency request sent successfully!");

        requestForm.reset();

    }

    catch (error) {

         console.error("Firebase Error:", error);

            alert(error.message);

    }

    submitBtn.disabled = false;

    submitBtn.innerHTML = `
        <i class="fa-solid fa-paper-plane"></i>
        Send Request
    `;

});