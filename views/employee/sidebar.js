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
      } else if (link.textContent.trim() === 'Timesheets') {
        fetch('eTimesheet.ejs')
          .then(response => response.text())
          .then(html => {
            contentContainer.innerHTML = html;
            initializeTimesheet();
          })
          .catch(error => console.error('Error loading content:', error));
      } else if (link.textContent.trim() === 'Meal Booking') {
        fetch('eBookMeal.ejs')
          .then(response => response.text())
          .then(html => {
            contentContainer.innerHTML = html;
            // Initialize the meal booking functionality after loading the content
            initializeMealBooking();
          })
          .catch(error => console.error('Error loading content:', error));
      } else if (link.textContent.trim() === 'Car Wash') {
        fetch('eBooking.ejs')
          .then(response => response.text())
          .then(html => {
            contentContainer.innerHTML = html;
            initializeCarwashBooking();
          })
          .catch(error => console.error('Error loading content:', error));
        } else if (link.textContent.trim() === 'Feedback') {
          fetch('eFeedback.ejs')
            .then(response => response.text())
            .then(html => {
              contentContainer.innerHTML = html;
              initializeFeedback();
            })
            .catch(error => console.error('Error loading content:', error));
        }  else if (link.textContent.trim() === 'Notifications') {
          fetch('Notifications.ejs')
            .then(response => response.text())
            .then(html => {
              contentContainer.innerHTML = html;
              initializeNotificatons();
            })
            .catch(error => console.error('Error loading content:', error));
        } else if (link.textContent.trim() === 'Messages') {
          fetch('messages.ejs')
            .then(response => response.text())
            .then(html => {
              contentContainer.innerHTML = html;
              initializeMessages();
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

// Function to initialize the timesheet functionality
function initializeTimesheet() {
  // Import the timesheet.js module
  import('./timesheet.js')
    .then(module => {
      // Call any necessary functions from the timesheet.js module
      // module.someFunction();
    })
    .catch(error => console.error('Error initializing timesheet:', error));
}

// Function to initialize the meal booking functionality
function initializeMealBooking() {
  // Import the eBookMeal.js module
  import('./eBookMeal.js')
    .then(module => {
      // Call any necessary functions from the eBookMeal.js module
      // module.someFunction();
    })
    .catch(error => console.error('Error initializing meal booking:', error));
}

function initializeCarwashBooking() {
  import('./eBooking.js')
    .then(module => {
    })
    .catch(error => console.error('Error initializing carwash booking:', error));
}

function initializeFeedback() {
  import('./eFeedback.js')
    .then(module => {
    })
    .catch(error => console.error('Error initializing feedback:', error));
}

function initializeNotificatons() {
  import('./notifications.js')
    .then(module => {
    })
    .catch(error => console.error('Error initializing feedback:', error));
}