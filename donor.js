import { db, auth } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const donorForm = document.getElementById("donorForm");

if (donorForm) {

    donorForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const submitBtn = donorForm.querySelector("button");

    submitBtn.disabled = true;
    submitBtn.innerHTML =
    `<i class="fa-solid fa-spinner fa-spin"></i> Registering...`;

    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const gender = document.getElementById("gender").value;
    const bloodGroup = document.getElementById("bloodGroup").value;
    const phone = document.getElementById("phone").value.trim();
    const city = document.getElementById("city").value.trim();
    const address = document.getElementById("address").value.trim();

    try {

        await addDoc(collection(db, "donors"), {

            uid: auth.currentUser ? auth.currentUser.uid : "",

            email: auth.currentUser ? auth.currentUser.email : "",

            name,
            age: Number(age),
            gender,
            bloodGroup,
            phone,
            city,
            address,

            available: true,

            createdAt: serverTimestamp()

        });

        alert("✅ You have successfully registered as a donor!");

        donorForm.reset();

    }

    catch (error) {

        console.error("Firebase Error:", error);

        alert(error.message);

    }

    submitBtn.disabled = false;

    submitBtn.innerHTML = "Register as Donor";

});
}