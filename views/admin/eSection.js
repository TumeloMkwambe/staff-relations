// eSection.js
// Sample data for roles
const roles = ['Admin', 'Manager', 'Employee'];

// Sample data for employees
let employees = [
  { id: 1, name: 'Nicki Minaj', email: 'pink@example.com', role: 'Admin' },
  { id: 2, name: 'Lana Del Rey', email: 'black@example.com', role: 'Manager' },
  { id: 3, name: 'Donald Trump', email: 'red@example.com', role: 'Employee' }
];

// DOM elements
const employeeTable = document.getElementById('employeeTable');
const newEmployeeForm = document.getElementById('newEmployeeForm');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const roleSelect = document.getElementById('roleSelect');

// Populate role options
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
function createEmployee(e) {
  e.preventDefault();

  const name = nameInput.value;
  const email = emailInput.value;
  const role = roleSelect.value;

  const employee = {
    id: Date.now(),
    name,
    email,
    role
  };

  employees.push(employee);
  clearForm();
  renderEmployees();
}

// Function to delete an employee
function deleteEmployee(id) {
  employees = employees.filter(employee => employee.id !== id);
  renderEmployees();
}

// Function to clear the form inputs
function clearForm() {
  nameInput.value = '';
  emailInput.value = '';
  roleSelect.value = roles[0];
}

// Function to render the employee list
function renderEmployees() {
  const tbody = employeeTable.querySelector('tbody');
  tbody.innerHTML = '';

  employees.forEach(employee => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${employee.name}</td>
      <td>${employee.email}</td>
      <td>${employee.role}</td>
      <td>
        <button class="delete" onclick="deleteEmployee(${employee.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Add event listener to the form submission
newEmployeeForm.addEventListener('submit', createEmployee);

// Render the initial employee list
renderEmployees();