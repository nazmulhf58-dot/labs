// ---------------------------------------------------
// Lab 03: JavaScript Foundations and Simple Interaction
// Student Workshop Registration System
// ---------------------------------------------------

// Variable storing the number of available seats
let availableSeats = 12;

// Interaction 1: Check registration status
// Changes the text of the paragraph with id="registrationStatus"
function checkRegistration() {
  let message = document.getElementById("registrationStatus");
  message.textContent = "Registration is currently open.";
}

// Interaction 2: Check seat availability
// Uses a variable and an if...else condition
function checkSeats() {
  let message = document.getElementById("seatMessage");

  if (availableSeats > 0) {
    message.textContent = "Seats are available. Remaining seats: " + availableSeats;
  } else {
    message.textContent = "Sorry, no seats are available.";
  }
}

// Interaction 3: Show a personalised greeting
// Reads the value typed in the Full Name input field
function showGreeting() {
  let name = document.getElementById("studentName").value;
  let output = document.getElementById("greetingMessage");

  if (name === "") {
    output.textContent = "Please enter your name first.";
  } else {
    output.textContent = "Welcome, " + name + "!";
  }
}

// Independent improvement: Show a simple venue reminder
function showVenueReminder() {
  let message = document.getElementById("venueMessage");
  message.textContent = "Reminder: The workshop will be held at CSE Lab 3, Southeast University.";
}
