import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";


const loginForm = document.getElementById("loginForm");


if(loginForm){

    loginForm.addEventListener("submit", async (e)=>{

        e.preventDefault();


        const email = document.getElementById("email").value;

        const password = document.getElementById("password").value;


        try{

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


            alert("Login Successful ❤️");


            window.location.href = "dashboard.html";


        }

        catch(error){

            alert(error.message);

        }


    });

}
// Password Show / Hide

const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");


if(togglePassword){

    togglePassword.addEventListener("click", ()=>{


        if(password.type === "password"){

            password.type = "text";

            togglePassword.innerHTML =
            '<i class="fa-solid fa-eye-slash"></i>';

        }
        else{

            password.type = "password";

            togglePassword.innerHTML =
            '<i class="fa-solid fa-eye"></i>';

        }


    });

}