// Lab 03: JavaScript
// Student Workshop Registration System 
let availableSeats = 12;

// Interaction 1: Check reg..status
function checkRegistration() {
  let message = document.getElementById("registrationStatus");
  message.textContent = "Registration is currently open.";
}

// Interaction 2: Check seat avail...
function checkSeats() {
  let message = document.getElementById("seatMessage");

  if (availableSeats > 0) {
    message.textContent = "Seats are available. Remaining seats: " + availableSeats;
  } else {
    message.textContent = "Sorry, no seats are available.";
  }
}

// Interaction 3: Show a personal..get..
function showGreeting() {
  let name = document.getElementById("studentName").value;
  let output = document.getElementById("greetingMessage");

  if (name === "") {
    output.textContent = "Please enter your name first.";
  } else {
    output.textContent = "Welcome, " + name + "!";
  }
}
function showVenueReminder() {
  let message = document.getElementById("venueMessage");
  message.textContent = "Reminder: The workshop will be held at CSE Lab 3, Southeast University.";
}
