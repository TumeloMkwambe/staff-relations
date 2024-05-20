import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

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
const database = getDatabase(app);
const feedbackRef = ref(database, 'feedback');

// Function to showAlert
function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const body = document.querySelector("body");
    body.insertBefore(div, body.firstChild);
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}


// Function to add employee feedback to Firebase database
function addFeedbackToDatabase() {
    const yourName = document.querySelector("#yourName").value;
    const employeeName = document.querySelector("#employeeName").value;
    const employeeStars = document.querySelector('input[name="rate"]:checked');

    //Exit the function if star rating is not provided
    if (!employeeStars) {
        showAlert("Please select a star rating", "danger");
        return; 
    }

   

    // Push feedback object to Firebase database
    push(feedbackRef, {
        yourName: yourName,
        employeeName: employeeName,
        employeeStars: employeeStars.value

        });
    // Show success alert
    showAlert("Feedback Added!", "success");

    // Clear input fields
    document.querySelector("#yourName").value = "";
    document.querySelector("#employeeName").value = "";
    const starInputs = document.querySelectorAll('input[name="rate"]');
    starInputs.forEach(input => {
        input.checked = false;
    });
}


// Event listener for form submission
document.querySelector("#feedbackForm").addEventListener("submit", () => {
    addFeedbackToDatabase();
});
