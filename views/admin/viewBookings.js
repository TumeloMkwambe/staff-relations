import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCvnZkbqON0vsIackr90txDbg-oYj_ikJ0",
    authDomain: "staff-relations-databases.firebaseapp.com",
    databaseURL: "https://staff-relations-databases-default-rtdb.firebaseio.com",
    projectId: "staff-relations-databases",
    storageBucket: "staff-relations-databases.appspot.com",
    messagingSenderId: "356187917991",
    appId: "1:356187917991:web:e2cd5bd697464c873a9582",
    measurementId: "G-42THPFZ5QD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
// Fetch and display car wash bookings

function fetchCarWashBookings() {
    const carWashRef = ref(db, 'bookings');
    onValue(carWashRef, (snapshot) => {
        const bookings = snapshot.val();
        const tableBody = document.querySelector('#carWashTable tbody');
        tableBody.innerHTML = ''; // Clear existing table rows
        for (const key in bookings) {
            if (bookings.hasOwnProperty(key)) {
                const booking = bookings[key];
                const row = tableBody.insertRow();
                row.innerHTML = `
                    <td>${booking.name}</td>
                    <td>${booking.email}</td>
                    <td>${booking.date}</td>
                `;
            }
        }
    });
}

// Fetch and display meal bookings
function fetchMealBookings() {
    const mealsRef = ref(db, 'mealsBooking');
    onValue(mealsRef, (snapshot) => {
        const bookings = snapshot.val();
        const tableBody = document.querySelector('#mealTable tbody');
        tableBody.innerHTML = ''; // Clear existing table rows
        for (const key in bookings) {
            if (bookings.hasOwnProperty(key)) {
                const booking = bookings[key];
                const row = tableBody.insertRow();
                row.innerHTML = `
                    <td>${booking.employee}</td>
                    <td>${booking.date}</td>
                    <td>${booking.mealType}</td>
                `;
            }
        }
    });
}

// Fetch bookings on page load
fetchCarWashBookings();
fetchMealBookings();