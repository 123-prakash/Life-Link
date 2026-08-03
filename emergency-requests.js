import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    orderBy,
    query
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const requestsContainer = document.getElementById("requestsContainer");

async function loadRequests() {

    requestsContainer.innerHTML = "<p class='no-data'>Loading requests...</p>";

    try {

        const q = query(
            collection(db, "requests"),
            orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {

            requestsContainer.innerHTML =
                "<p class='no-data'>No Emergency Requests Found.</p>";

            return;
        }

        requestsContainer.innerHTML = "";

        snapshot.forEach((doc) => {

            const data = doc.data();

            requestsContainer.innerHTML += `

            <div class="request-card">

                <span class="badge">${data.bloodGroup}</span>

                <h3>${data.patientName}</h3>

                <p><strong>🏥 Hospital:</strong> ${data.hospital}</p>

                <p><strong>📍 City:</strong> ${data.city}</p>

                <p><strong>📞 Contact:</strong> ${data.contact}</p>

                <p><strong>📝 Message:</strong> ${data.message || "No additional details"}</p>

              <div class="btn-group">

    <a
        href="https://wa.me/91${data.contact}?text=Hi,%20I%20saw%20your%20LifeLink%20emergency%20blood%20request.%20I%20am%20available%20to%20donate."
        target="_blank"
        class="whatsapp-btn">

        <i class="fa-brands fa-whatsapp"></i>
        Contact on WhatsApp

    </a>

</div>

                </div>

            </div>

            `;

        });

    }

    catch (error) {

        console.error(error);

        requestsContainer.innerHTML =
            "<p class='no-data'>Failed to load requests.</p>";

    }

}

loadRequests();
