// import { name } from "ejs";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, onValue, remove, set, push } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Firebase configuration
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

// Get reference to meals node
const mealsRef = ref(db, 'meals');
const bookingsRef = ref(db, 'mealsBooking');

// DOM elements
const mealsList = document.getElementById('mealsList');
const bookedMealsTable = document.getElementById('bookedMealsTable');
const dateBooked = document.getElementById('dateBooked');
const cancelMealBtn = document.getElementById('cancelMealBtn');

// Listen for changes in meals data
onValue(mealsRef, (snapshot) => {
    const meals = snapshot.val();
    if (meals) {
        // Clear existing meals
        mealsList.innerHTML = '';

        // Display each meal as an option
        Object.keys(meals).forEach((key) => {
            const meal = meals[key];
            const option = document.createElement('div');
            option.classList.add('meal-option');
            option.innerHTML = `
                <p><strong>${meal.mealType}</strong></p>
                <p>Protein: ${meal.protein}</p>
                <p>Starch: ${meal.starch}</p>
                <p>Fruit: ${meal.fruit}</p>
                <p>Drink: ${meal.drink}</p>
                <p>Snack: ${meal.snack}</p>
                <label for="bookingDate_${key}">Booking Date:</label>
                <input type="date" id="bookingDate_${key}" required />
                <button onclick="bookMeal('${key}')">Book Meal</button>
            `;
            mealsList.appendChild(option);
        });
    }
});

// Function to book a meal
window.bookMeal = function (mealKey) {
    const employeeName = prompt('Please enter your name:');
    if (employeeName) {
        const bookingDateElement = document.getElementById(`bookingDate_${mealKey}`);
        if (bookingDateElement && bookingDateElement.value) {
            const bookingDate = bookingDateElement.value;
            const mealRef = ref(db, `meals/${mealKey}`);
            
            // Retrieve meal details to get the meal type
            onValue(mealRef, (snapshot) => {
                const mealData = snapshot.val();
                if (mealData) {
                    const mealType = mealData.mealType;
                    const newBookingRef = push(bookingsRef);

                    set(newBookingRef, {
                        employee: employeeName,
                        date: bookingDate,
                        mealKey: mealKey,
                        mealType: mealType // Include meal type in booking
                    }).then(() => {
                        dateBooked.textContent = `Meal booked on ${bookingDate} by ${employeeName}.`;
                        cancelMealBtn.style.display = 'block';
                        cancelMealBtn.setAttribute('data-booking-ref', newBookingRef.key);
                        fetchMealBookings(); // Refresh bookings table
                    }).catch((error) => {
                        console.error('Error booking meal:', error);
                        alert('An error occurred while booking the meal. Please try again later.');
                    });
                }
            });
        } else {
            alert('Please select a booking date.');
        }
    }
};


// Function to cancel meal
cancelMealBtn.addEventListener('click', () => {
    const confirmCancel = confirm('Are you sure you want to cancel your meal?');
    if (confirmCancel) {
        const bookingRefKey = cancelMealBtn.getAttribute('data-booking-ref');
        const bookingRef = ref(db, `mealsBooking/${bookingRefKey}`);
        
        remove(bookingRef).then(() => {
            dateBooked.textContent = 'No meal booked yet.';
            cancelMealBtn.style.display = 'none';
            fetchMealBookings(); // Refresh bookings table
        }).catch((error) => {
            console.error('Error cancelling meal:', error);
            alert('An error occurred while cancelling the meal. Please try again later.');
        });
    }
});

// Function to fetch existing bookings
function fetchMealBookings(employeeName) {
    onValue(bookingsRef, (snapshot) => {
        const bookings = snapshot.val();
        if (bookings) {
            // Clear existing bookings display
            const tbody = bookedMealsTable.querySelector('tbody');
            tbody.innerHTML = '';

            // Display each booking
            Object.keys(bookings).forEach((key) => {
                const booking = bookings[key];
                if(booking.employee == employeeName){
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${booking.employee}</td>
                        <td>${booking.date}</td>
                        <td>${booking.mealType}</td>
                        <td><button onclick="deleteBooking('${key}')">Delete</button></td>
                `;
                tbody.appendChild(row);
                }
            });
        }
    });
}

// Function to delete a booking
window.deleteBooking = function (bookingKey) {
    const bookingRef = ref(db, `mealsBooking/${bookingKey}`);
    remove(bookingRef).then(() => {
        fetchMealBookings(); // Refresh bookings table
    }).catch((error) => {
        console.error('Error deleting booking:', error);
        alert('An error occurred while deleting the booking. Please try again later.');
    });
};

// Fetch existing bookings on page load
async function displayBookedMeals(){
    await fetch("http://localhost:3000/userinformation").then((response) => {
        return response.json()
    }).then((json) => {
        let name = json.name;
        fetchMealBookings(name);
    });
}
displayBookedMeals();