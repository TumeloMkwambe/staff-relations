// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

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

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('mealForm').addEventListener('submit', addMeal);
    fetchMeals();
});

// Function to add a meal
function addMeal(e) {
    e.preventDefault();

    const mealType = document.getElementById('mealType').value;
    const protein = document.getElementById('protein').value;
    const starch = document.getElementById('starch').value;
    const fruit = document.getElementById('fruit').value;
    const drink = document.getElementById('drink').value;
    const snack = document.getElementById('snack').value;

    const mealData = {
        mealType: mealType,
        protein: protein,
        starch: starch,
        fruit: fruit,
        drink: drink,
        snack: snack,
        confirmation: 'Meal Added!'
    };

    const mealsRef = ref(db, 'meals');
    push(mealsRef, mealData).then(() => {
        fetchMeals();
        document.getElementById('mealForm').reset();
    }).catch((error) => {
        console.error('Error adding meal:', error);
    });
}

// Function to fetch meals from Firebase and display them in the table
function fetchMeals() {
    const mealsRef = ref(db, 'meals');
    onValue(mealsRef, (snapshot) => {
        const meals = snapshot.val();
        const tableBody = document.querySelector('#mealsTable tbody');
        tableBody.innerHTML = ''; // Clear existing table rows
        for (const key in meals) {
            if (meals.hasOwnProperty(key)) {
                const meal = meals[key];
                const row = tableBody.insertRow();
                row.innerHTML = `
                    <td>${meal.mealType}</td>
                    <td>${meal.protein}</td>
                    <td>${meal.starch}</td>
                    <td>${meal.fruit}</td>
                    <td>${meal.drink}</td>
                    <td>${meal.snack}</td>
                    <td>${meal.confirmation}</td>
                    <td>
                        <button class="editBtn" onclick="window.editMeal('${key}')">Edit</button>
                        <button class="deleteBtn" onclick="window.deleteMeal('${key}')">Delete</button>
                    </td>
                `;
            }
        }
    });
}

// Function to edit a meal
window.editMeal = function (key) {
    const mealRef = ref(db, `meals/${key}`);
    onValue(mealRef, (snapshot) => {
        const mealData = snapshot.val();

        const mealType = prompt('Enter Meal Type:', mealData.mealType);
        const protein = prompt('Enter Protein:', mealData.protein);
        const starch = prompt('Enter Starch:', mealData.starch);
        const fruit = prompt('Enter Fruit:', mealData.fruit);
        const drink = prompt('Enter Drink:', mealData.drink);
        const snack = prompt('Enter Snack:', mealData.snack);
        const confirmation = prompt('Enter Confirmation:', mealData.confirmation);

        if (mealType && protein && starch && fruit && drink && snack) {
            update(mealRef, {
                mealType: mealType,
                protein: protein,
                starch: starch,
                fruit: fruit,
                drink: drink,
                snack: snack,
                confirmation: confirmation
            }).then(() => {
                fetchMeals();
            }).catch((error) => {
                console.error('Error updating meal:', error);
                alert('An error occurred, please try again later.');
            });
        } else {
            alert('All fields are required.');
        }
    }, { onlyOnce: true });
}

// Function to delete a meal
window.deleteMeal = function (key) {
    const confirmDelete = confirm('Are you sure you want to delete this meal?');
    if (confirmDelete) {
        const mealRef = ref(db, `meals/${key}`);
        remove(mealRef)
            .then(() => {
                fetchMeals();
            })
            .catch((error) => {
                console.error('Error deleting meal:', error);
                alert('An error occurred while deleting the meal.');
            });
    }
}

// Fetch meals on page load
fetchMeals();
