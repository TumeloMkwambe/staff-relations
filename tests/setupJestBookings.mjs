const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const fetch = require('node-fetch'); // Use CommonJS require syntax

const html = `<!DOCTYPE html><html><body>
<form id="bookingForm">
  <input type="text" id="name" />
  <input type="email" id="email" />
  <input type="date" id="date" />
  <button type="submit">Book Now</button>
</form>
<table id="bookingsTable">
  <tbody></tbody>
</table>
</body></html>`;

// Use fetch to retrieve the HTML content
fetch('data:text/html;base64,' + Buffer.from(html).toString('base64'))
  .then(response => response.text())
  .then(htmlContent => {
    // Process the HTML content as needed
    console.log(htmlContent);
  })
  .catch(error => {
    console.error('Error:', error);
  });
