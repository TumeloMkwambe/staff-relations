import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, onValue, push } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";

// Your web app's Firebase configuration
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

// References to your employees and feedback data in the database
const employeesRef = ref(database, 'employees');
const feedbackRef = ref(database, 'feedback');

// Function to fetch and display employees who haven't sent feedback
function fetchAndDisplayEmployees() {
    // Get table body element
    const tableBody = document.getElementById('feedbackTable').getElementsByTagName('tbody')[0];

    // Fetch employees and feedback data
    onValue(employeesRef, (employeesSnapshot) => {
        onValue(feedbackRef, (feedbackSnapshot) => {
            // Clear the existing table rows
            tableBody.innerHTML = '';

            // Get feedback sender IDs
            const feedbackSenders = new Set();
            feedbackSnapshot.forEach((feedbackChild) => {
                feedbackSenders.add(feedbackChild.val().senderId);
            });

            // Display employees who haven't sent feedback
            employeesSnapshot.forEach((employeeChild) => {
                const employeeData = employeeChild.val();
                const employeeId = employeeChild.key;

                if (!feedbackSenders.has(employeeId)) {
                    const newRow = tableBody.insertRow();

                    const cell1 = newRow.insertCell(0);
                    const cell2 = newRow.insertCell(1);

                    cell1.textContent = employeeData.name;
                    const requestButton = document.createElement('button');
                    requestButton.textContent = 'Request Feedback';
                    requestButton.onclick = () => requestFeedback(employeeId);
                    cell2.appendChild(requestButton);
                }
            });
        });
    });
}

// Function to request feedback from an employee
function requestFeedback(employeeId) {
    const requestRef = ref(database, 'requests');
    push(requestRef, {
        employeeId: employeeId,
        timestamp: new Date().toISOString()
    });

    alert('Feedback request sent to employee ID: ' + employeeId);
}

// Fetch and display employees on page load
document.addEventListener('DOMContentLoaded', fetchAndDisplayEmployees);
