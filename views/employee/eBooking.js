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

// Form submission event listener
document.getElementById('bookingForm').addEventListener('submit', submitHandler);

function submitHandler(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('date').value; // Assuming there's a date input in your form

    checkBookingLimit(email, date, (canBook) => {
        if (canBook) {
            // Store booking data in Firebase
            const bookingsRef = ref(db, 'bookings');
            push(bookingsRef, {
                name: name,
                email: email,
                date: date
            }).then(() => {
                // Booking successful, refresh bookings table
                fetchBookings();
                document.getElementById('bookingForm').reset();
            }).catch((error) => {
                // Handle errors
                console.error('Error booking carwash:', error);
                alert('An error occurred, please try again later.');
            });
        } else {
            alert('You can only book the car wash twice a week.');
        }
    });
}

function checkBookingLimit(email, date, callback) {
    const bookingsRef = ref(db, 'bookings');
    const currentWeekStart = getWeekStartDate(date);
    const currentWeekEnd = getWeekEndDate(date);
    const q = query(bookingsRef, orderByChild('email'), equalTo(email));
    
    onValue(q, (snapshot) => {
        const bookings = snapshot.val();
        let count = 0;

        for (const key in bookings) {
            if (bookings.hasOwnProperty(key)) {
                const bookingDate = bookings[key].date;
                if (bookingDate >= currentWeekStart && bookingDate <= currentWeekEnd) {
                    count++;
                }
            }
        }

        callback(count < 2);
    }, {
        onlyOnce: true
    });
}

function getWeekStartDate(dateStr) {
    const date = new Date(dateStr);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(date.setDate(diff)).toISOString().split('T')[0];
}

function getWeekEndDate(dateStr) {
    const date = new Date(dateStr);
    const day = date.getDay();
    const diff = date.getDate() + (7 - day); // Adjust when day is Sunday
    return new Date(date.setDate(diff)).toISOString().split('T')[0];
}

// Function to fetch bookings from Firebase and display them in the table
function fetchBookings() {
    const bookingsRef = ref(db, 'bookings');
    onValue(bookingsRef, (snapshot) => {
        const bookings = snapshot.val();
        const tableBody = document.querySelector('#bookingsTable tbody');
        tableBody.innerHTML = ''; // Clear existing table rows
        for (const key in bookings) {
            if (bookings.hasOwnProperty(key)) {
                const booking = bookings[key];
                const row = tableBody.insertRow();
                row.innerHTML = `
                    <td>${booking.name}</td>
                    <td>${booking.email}</td>
                    <td>${booking.date}</td>
                    <td>
                        <button onclick="window.editBooking('${key}')">Edit</button>
                        <button onclick="window.deleteBooking('${key}')">Delete</button>
                    </td>
                `;
            }
        }
    });
}

// Function to edit a booking
window.editBooking = function (key) {
    const confirmEdit = confirm("Are you sure you want to edit this form?");
    if (confirmEdit) {
        const bookingRef = ref(db, `bookings/${key}`);

        // Fetch the current booking data
        onValue(bookingRef, (snapshot) => {
            const bookingData = snapshot.val();

            // Pre-fill the form with the existing booking data
            document.getElementById('name').value = bookingData.name;
            document.getElementById('email').value = bookingData.email;
            document.getElementById('date').value = bookingData.date;
            // Add other form fields as necessary

            // Update the form submission to handle editing
            const form = document.getElementById('bookingForm');
            form.removeEventListener('submit', submitHandler);
            form.addEventListener('submit', function updateHandler(e) {
                e.preventDefault();

                // Get the updated form values
                const updatedName = document.getElementById('name').value;
                const updatedEmail = document.getElementById('email').value;
                const updatedDate = document.getElementById('date').value;
                // Get other updated form values

                // Delete the old booking and create a new one
                const bookingsRef = ref(db, 'bookings');
                checkBookingLimit(updatedEmail, updatedDate, (canBook) => {
                    if (canBook) {
                        remove(bookingRef).then(() => {
                            push(bookingsRef, {
                                name: updatedName,
                                email: updatedEmail,
                                date: updatedDate
                                // Add other updated booking details here
                            }).then(() => {
                                // Booking updated successfully, refresh bookings table
                                fetchBookings();
                                form.reset();

                                // Restore the original form submission event handler
                                form.removeEventListener('submit', updateHandler);
                                form.addEventListener('submit', submitHandler);
                            }).catch((error) => {
                                // Handle errors
                                console.error('Error updating booking:', error);
                                alert('An error occurred, please try again later.');
                            });
                        }).catch((error) => {
                            console.error('Error deleting old booking:', error);
                            alert('An error occurred while deleting the old booking.');
                        });
                    } else {
                        alert('You can only book the car wash twice a week.');
                    }
                });
            });
        }, { onlyOnce: true });
    }
}

// Function to delete a booking
window.deleteBooking = function (key) {
    const confirmDelete = confirm('Are you sure you want to delete this booking?');
    if (confirmDelete) {
        const bookingRef = ref(db, `bookings/${key}`);
        remove(bookingRef)
            .then(() => {
                // Booking deleted successfully, refresh bookings table
                fetchBookings();
            })
            .catch((error) => {
                // Handle errors
                console.error('Error deleting booking:', error);
                alert('An error occurred while deleting booking.');
            });
    }
}

// Fetch bookings on page load
fetchBookings();
