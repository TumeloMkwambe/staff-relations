// Firebase configuration
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

function checkMealBooking(name) {
    console.log("Checking meal bookings for:", name);
    const bookingsRef = ref(db, 'mealsBooking');
    onValue(bookingsRef, (snapshot) => {
        const bookings = snapshot.val();
        let message;
        if (bookings) {
            const userBookings = Object.values(bookings).filter(booking => booking.employee === name);
            if (userBookings.length > 0) {
                // User has meal bookings
                message = `You have meal bookings for the following dates: `;
                userBookings.forEach(booking => {
                    message += `${booking.date} (${booking.mealType}), `;
                });
                message = message.slice(0, -2); // Remove the last comma and space
            } else {
                // User does not have any meal bookings
                message = `Please book your meals.`;
            }
        } else {
            // No bookings found
            message = `No bookings found. Please book your meals.`;
        }
        displayNotification(message);
    });
}

// Function to check if the user has booked a car wash
function checkCarWashBooking(name) {
    console.log("Checking car wash bookings for:", name);
    const bookingsRef = ref(db, 'bookings');
    onValue(bookingsRef, (snapshot) => {
        const bookings = snapshot.val();
        let message;
        if (bookings) {
            const userBookings = Object.values(bookings).filter(booking => booking.name === name);
            if (userBookings.length > 0) {
                // User has a car wash booking
                message = `You have a car wash booking for this week.`;
            } else {
                // User does not have a car wash booking
                message = `Please book your car wash for the week.`;
            }
        } else {
            // No bookings found
            message = `No bookings found. Book a carwash.`;
        }
        displayNotification(message);
    });
}

// Function to display notifications
function displayNotification(message) {
    const notificationsSection = document.getElementById('notificationsSection');
    const notificationDiv = document.createElement('div');
    notificationDiv.className = 'notification';
    notificationDiv.textContent = message;
    notificationsSection.appendChild(notificationDiv);
    notificationsSection.style.display = 'block'; // Show the notifications section
}

// Function to handle form submission
document.getElementById('employeeForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const employeeName = document.getElementById('employeeName').value;
    document.getElementById('notificationsSection').innerHTML = ''; // Clear previous notifications
    checkMealBooking(employeeName);
    checkCarWashBooking(employeeName);
});