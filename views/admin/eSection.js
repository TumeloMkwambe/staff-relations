// employee.js
const user = {
  name: "John Doe",
  email: "john.doe@example.com"
};


// Sample data for roles and permissions
const roles = ['Admin', 'Manager', 'Employee'];

// DOM elements
const employeeTable = document.getElementById('employeeTable');
const newEmployeeForm = document.getElementById('newEmployeeForm');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const roleSelect = document.getElementById('roleSelect');

// Populate role and permissions options
populateOptions(roleSelect, roles);

// Function to populate options
function populateOptions(select, options) {
  select.innerHTML = '';
  options.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option;
    optionElement.textContent = option;
    select.appendChild(optionElement);
  });
}

// Function to create a new employee
async function createEmployee(e) {
  e.preventDefault();

  const name = nameInput.value;
  const email = emailInput.value;
  const role = roleSelect.value;

  const employee = {
    name,
    email,
    role
  };

  saveEmployee(employee); // Replace with your implementation
  clearForm();
}

// Function to clear the form inputs
function clearForm() {
  nameInput.value = '';
  emailInput.value = '';
  roleSelect.value = roles[0];
}

// Function to render the employee list
async function renderEmployees() {

  const tbody = employeeTable.querySelector('tbody');
  tbody.innerHTML = '';
  console.log("pre");
  await fetch("https://staffrelations2024.azurewebsites.net/users").then((response) => {
    return response.json()
  }).then((json) => {
    let employees = json;
    console.log(employees);
    let surname = 'blank';
    employees.forEach(employee => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${employee.name}</td>
        <td>${employee.email}</td>
        <td>${employee.roles[0].name}</td>
        <td>
          <button class="delete" data-id="${employee.id}">Delete</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  });
}

async function deleteEmployee(Id) {
  await fetch(`https://staffrelations2024.azurewebsites.net/admin/employees/delete/${Id}`).then(() => {
    setTimeout(() => {
      renderEmployees();
    }, 8000);
  });
  console.log("Cookies!");
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
      const Id = e.target.dataset.id;
      deleteEmployee(Id);
  }
});


// Add event listener to the form submission
newEmployeeForm.addEventListener('submit', createEmployee);

// Render the initial employee list
renderEmployees();