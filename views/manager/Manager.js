function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    if (sidebar.style.transform === 'translateX(0)') {
      sidebar.style.transform = 'translateX(-100%)';
    } else {
      sidebar.style.transform = 'translateX(0)';
    }
}

function showDashboard() {
    var center = document.getElementById('center');
    center.innerHTML = '<h1>Welcome to Admin Dashboard</h1>';
}

function showTasks() {
    var center = document.getElementById('center');
    center.innerHTML = '<h2>Tasks</h2><p>List of tasks will be displayed here.</p>';
}

function showEmployees() {
    var center = document.getElementById('center');
    center.innerHTML = `
        <h2>Employee Overview</h2>
        <table id="employeeTable">
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <!-- Table rows will be dynamically added here -->
            </tbody>
        </table>
        <form id="addEmployeeForm">
            <input type="text" id="employeeId" placeholder="Employee ID" required>
            <input type="text" id="employeeName" placeholder="Name" required>
            <input type="text" id="employeeDepartment" placeholder="Department" required>
            <button type="submit">Add Employee</button>
        </form>
    `;
    displayEmployees(); // Call a function to populate the table with existing employees
}

function showMessages() {
    var center = document.getElementById('center');
    center.innerHTML = '<h2>Messages</h2><p>List of messages will be displayed here.</p>';
}

function showMeetings() {
    var center = document.getElementById('center');
    center.innerHTML = '<h2>Meetings</h2><p>List of meetings will be displayed here.</p>';
}

function showTimesheet() {
    var center = document.getElementById('center');
    center.innerHTML = `
    <main class="table">
    <section class="header">
      <h1><b>Employee Timesheet</b></h1>
    </section>
    <section class="body">
      <table>
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Task</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="text" id="employeeId" /></td>
            <td><input type="text" id="task" /></td>
            <td><input type="date" id="date" /></td>
            <td><input type="time" id="startTime" /></td>
            <td><input type="time" id="endTime" /></td>
            <td>
              <input type="radio" id="status2" name="progress" />
              <label for="status2">In Progress</label>

              <input type="radio" id="status3" name="progress" />
              <label for="status3">Completed</label>
            </td>
            <td>
              <button id="addTask" class="btn btn-success btn-sm">
                Add Task
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
    `;
  
    // Initialize timesheet functionality
    initializeTimesheet();
  }

function showMeals() {
    var center = document.getElementById('center');
    center.innerHTML = `
    <section class="header">
      <h1> <b>Create Meals</b></h1>
    </section>
    <button data-target="#addTaskModel" id="addBtn">Add Meal</button>
        <section class="body">
            <table id="mealsTable">
                <thead>
                    <tr>
                        <th>Meal Type</th>
                        <th>Protein</th>
                        <th>Starch</th>
                        <th>Fruit</th>
                        <th>Drink</th>
                        <th>Snack</th>
                        <th>Confirm Meal Booking</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <select>
                                <option value="" selected disabled>Select</option> <!-- First option remains enabled -->
                                <option value="vegan">Vegan</option>
                                <option value="vegetarian">Vegetarian</option>
                                <option value="halal">Halal</option>
                                <option value="kosher">Kosher</option>
                                <option value="gluten-free">Gluten-Free</option>
                            </select>
                        </td>
                        <td>
                            <select>
                                <option value="" selected disabled>Select</option> <!-- First option remains enabled -->
                                <option value="chicken">Chicken</option>
                                <option value="beef">Beef</option>
                                <option value="fish">Fish</option>
                                <option value="tofu">Tofu</option>
                            </select>
                        </td>
                        <td>
                            <select>
                                <option value="" selected disabled>Select</option> <!-- First option remains enabled -->
                                <option value="rice">Rice</option>
                                <option value="pasta">Pasta</option>
                                <option value="potatoes">Potatoes</option>
                                <option value="quinoa">Quinoa</option>
                            </select>
                        </td>
                        <td>
                            <select>
                                <option value="" selected disabled>Select</option> <!-- First option remains enabled -->
                                <option value="apple">Apple</option>
                                <option value="banana">Banana</option>
                                <option value="orange">Orange</option>
                                <option value="grapes">Grapes</option>
                            </select>
                        </td>
                        <td>
                            <select>
                                <option value="" selected disabled>Select</option> <!-- First option remains enabled -->
                                <option value="water">Water</option>
                                <option value="juice">Juice</option>
                                <option value="soda">Soda</option>
                                <option value="tea">Tea</option>
                            </select>
                        </td>
                        <td>
                            <select>
                                <option value="" selected disabled>Select</option> <!-- First option remains enabled -->
                                <option value="nuts">Nuts</option>
                                <option value="yogurt">Yogurt</option>
                                <option value="granola">Granola</option>
                                <option value="corn chips">Corn Chips</option>
                            </select>
                        </td>
                        <td id="mealConfirmation">In Progress...</td>
                    </tr>
                </tbody>
            </table>
    `;
  
    // Initialize meals functionality
    initializeMeals();
  }
  