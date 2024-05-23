document.addEventListener('DOMContentLoaded', function() {
    var sidebar = document.querySelector('.sidebar');
    var toggleBtn = document.querySelector('.toggle-btn');
    var content = document.querySelector('.content');
  
    toggleBtn.addEventListener('click', function() {
      sidebar.classList.toggle('minimized');
    });
  
    // Get the links from the sidebar
    const links = document.querySelectorAll('.sidebar nav ul li a');
  
    links.forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault(); // Prevent the default link behavior
  
        // Load the content based on the clicked link
        const contentContainer = document.getElementById('contentContainer');
        if (link.textContent.trim() === 'Homepage') {
          fetch('homepage.ejs')
            .then(response => response.text())
            .then(html => {
              contentContainer.innerHTML = html;
              // Initialize the timesheet functionality after loading the content
              initializeHomepage();
            })
            .catch(error => console.error('Error loading content:', error));
        } else if (link.textContent.trim() === 'Employees') {
          fetch('eSection.ejs')
            .then(response => response.text())
            .then(html => {
              contentContainer.innerHTML = html;
              initializeEmployees();
            })
            .catch(error => console.error('Error loading content:', error));
        } else if (link.textContent.trim() === 'Bookings') {
          fetch('viewBookings.ejs')
            .then(response => response.text())
            .then(html => {
              contentContainer.innerHTML = html;
              // Initialize the meal booking functionality after loading the content
              initializeBookings();
            })
            .catch(error => console.error('Error loading content:', error));
        } else if (link.textContent.trim() === 'Timesheets') {
          fetch('timesheets.ejs')
            .then(response => response.text())
            .then(html => {
              contentContainer.innerHTML = html;
              initializeTimesheets();
            })
            .catch(error => console.error('Error loading content:', error));
          } else if (link.textContent.trim() === 'Meals') {
            fetch('aCreateMeal.ejs')
              .then(response => response.text())
              .then(html => {
                contentContainer.innerHTML = html;
                initializeMeals();
              })
              .catch(error => console.error('Error loading content:', error));
          }
      });
    });
  });
  
  function initializeHomepage() {
    // Import the timesheet.js module
    import('./homepage.js')
      .then(module => {
      })
      .catch(error => console.error('Error initializing homepage:', error));
  }

  function initializeEmployees() {
    // Import the eBookMeal.js module
    import('./eSection.js')
      .then(module => {
        // Call any necessary functions from the eBookMeal.js module
        // module.someFunction();
      })
      .catch(error => console.error('Error initializing meal booking:', error));
  }
  
  // Function to initialize the timesheet functionality
  function initializeTimesheets() {
    // Import the timesheet.js module
    import('./timesheets.js')
      .then(module => {
        // Call any necessary functions from the timesheet.js module
        // module.someFunction();
      })
      .catch(error => console.error('Error initializing timesheet:', error));
  }
  
  // Function to initialize the meal booking functionality
  function initializeBookings() {
    // Import the eBookMeal.js module
    import('./viewBookings.js')
      .then(module => {
        // Call any necessary functions from the eBookMeal.js module
        // module.someFunction();
      })
      .catch(error => console.error('Error initializing meal booking:', error));
  }

  function initializeMeals() {
    // Import the eBookMeal.js module
    import('./createmeal.js')
      .then(module => {
        // Call any necessary functions from the eBookMeal.js module
        // module.someFunction();
      })
      .catch(error => console.error('Error initializing meal booking:', error));
  }