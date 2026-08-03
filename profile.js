import { auth, db } from "./firebase.js";

import {
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
const profileImage = document.getElementById("profileImage");
const removeBtn = document.getElementById("removeBtn");
const imageInput = document.getElementById("imageInput");

const uploadBtn = document.getElementById("uploadBtn");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userPhone = document.getElementById("userPhone");
const userBlood = document.getElementById("userBlood");
const userCity = document.getElementById("userCity");

const logoutBtn = document.getElementById("logoutBtn");
const backBtn = document.getElementById("backBtn");

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    userEmail.textContent = user.email;

    try {

        const q = query(
            collection(db, "donors"),
            where("uid", "==", user.uid)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {

            const data = querySnapshot.docs[0].data();

            userName.textContent = data.name;
            userPhone.textContent = data.phone;
            userBlood.textContent = data.bloodGroup;
            userCity.textContent = data.city;

        } else {

            userName.textContent = "Not Registered";
            userPhone.textContent = "-";
            userBlood.textContent = "-";
            userCity.textContent = "-";

        }

    } catch (error) {

        console.error(error);
        alert(error.message);

    }

});

backBtn.addEventListener("click", () => {

    window.location.href = "dashboard.html";

});

logoutBtn.addEventListener("click", async () => {

    try {

        await signOut(auth);

        alert("Logged Out Successfully");

        window.location.href = "login.html";

    } catch (error) {

        alert(error.message);

    }

});
uploadBtn.addEventListener("click", () => {

    imageInput.click();

});

imageInput.addEventListener("change", () => {

    const file = imageInput.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

        profileImage.src = reader.result;

        localStorage.setItem("profileImage", reader.result);

        alert("✅ Profile Photo Updated");

    };

    reader.readAsDataURL(file);

});

const savedImage = localStorage.getItem("profileImage");

if(savedImage){

    profileImage.src = savedImage;

}
removeBtn.addEventListener("click", () => {

    if(confirm("Remove your profile photo?")){

        const defaultImage =
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

        profileImage.src = defaultImage;

        localStorage.removeItem("profileImage");

        imageInput.value = "";

        alert("✅ Profile photo removed successfully.");

    }

});