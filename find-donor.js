import { db } from "./firebase.js";

import {
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";


const searchForm = document.getElementById("searchForm");

const resultContainer = document.getElementById("resultContainer");


if(searchForm){


    searchForm.addEventListener("submit", async (e)=>{


        e.preventDefault();


        const bloodGroup = document.getElementById("bloodGroup").value;

        const city = document.getElementById("city").value;



        resultContainer.innerHTML = "Searching... 🔍";



        try{


            const donorRef = collection(db,"donors");


            const q = query(

                donorRef,

                where("bloodGroup","==",bloodGroup),

                where("city","==",city)

            );



            const querySnapshot = await getDocs(q);



            resultContainer.innerHTML = "";



            if(querySnapshot.empty){


                resultContainer.innerHTML =

                "<p>No donor found ❌</p>";


                return;

            }



            querySnapshot.forEach((doc)=>{


                const donor = doc.data();



                resultContainer.innerHTML += `

                <div class="donor-result">

                    <h3>${donor.name}</h3>

                    <p>
                    🩸 Blood Group: ${donor.bloodGroup}
                    </p>

                    <p>
                    📞 Phone: ${donor.phone}
                    </p>

                    <p>
                    📍 City: ${donor.city}
                    </p>

                    <p>
                    👤 Gender: ${donor.gender}
                    </p>

                </div>

                `;


            });



        }


        catch(error){


            resultContainer.innerHTML =
            error.message;


        }


    });


}