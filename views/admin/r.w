<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="timesheet.css" />
    <title>Admin Create Meals</title>
  </head>
  <style>
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    
    body {
      font-family: Arial, sans-serif;
      background-color: #f0f0f0;
      padding: 20px;
    }

   
    .table {
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
    }

   
    .header {
      text-align: center;
      margin-bottom: 20px;
    }

    .header h1 {
      color: #fff;
    }

    
    button {
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 10px 20px;
      cursor: pointer;
      margin-bottom: 20px;
    }

    button:hover {
      background-color: #45a049;
    }

   
    table {
      width: 100%;
      border-collapse: collapse;
    }

    th,
    td {
      padding: 10px;
      text-align: left;
    }

    th {
      background-color: #4caf50;
      color: white;
    }

    
    select {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 100%;
      max-width: 150px;
    }

   
    #mealConfirmation {
      font-weight: bold;
    }

    
    #addTaskModel {
      display: none;
    }
  </style>
  <body>
    <main class="table">
      <section class="header">
        <h1><b>Create Meals</b></h1>
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
                  <option value="" selected disabled>Select</option>
                  <!-- First option remains enabled -->
                  <option value="vegan">Vegan</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="halal">Halal</option>
                  <option value="kosher">Kosher</option>
                  <option value="gluten-free">Gluten-Free</option>
                </select>
              </td>
              <td>
                <select>
                  <option value="" selected disabled>Select</option>
                  <!-- First option remains enabled -->
                  <option value="chicken">Chicken</option>
                  <option value="beef">Beef</option>
                  <option value="fish">Fish</option>
                  <option value="tofu">Tofu</option>
                </select>
              </td>
              <td>
                <select>
                  <option value="" selected disabled>Select</option>
                  <!-- First option remains enabled -->
                  <option value="rice">Rice</option>
                  <option value="pasta">Pasta</option>
                  <option value="potatoes">Potatoes</option>
                  <option value="quinoa">Quinoa</option>
                </select>
              </td>
              <td>
                <select>
                  <option value="" selected disabled>Select</option>
                  <!-- First option remains enabled -->
                  <option value="apple">Apple</option>
                  <option value="banana">Banana</option>
                  <option value="orange">Orange</option>
                  <option value="grapes">Grapes</option>
                </select>
              </td>
              <td>
                <select>
                  <option value="" selected disabled>Select</option>
                  <!-- First option remains enabled -->
                  <option value="water">Water</option>
                  <option value="juice">Juice</option>
                  <option value="soda">Soda</option>
                  <option value="tea">Tea</option>
                </select>
              </td>
              <td>
                <select>
                  <option value="" selected disabled>Select</option>
                  <!-- First option remains enabled -->
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
      </section>

      <section class="header">
  <h1><b>Newly Created Meals</b></h1>
</section>
<section class="body">
  <table id="newMealsTable">
    <thead>
      <tr>
        <th>Meal Type</th>
        <th>Protein</th>
        <th>Starch</th>
        <th>Fruit</th>
        <th>Drink</th>
        <th>Snack</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody id="newMealsBody">
      <!-- Newly created meals will be added here -->
    </tbody>
  </table>
</section>
    </main>
    <script src="createmeal.js" type="module"></script>
  </body>
</html>