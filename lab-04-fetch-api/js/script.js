const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const studentId = document.getElementById("studentId").value;
  const email = document.getElementById("email").value;

  if (name === "" || studentId === "" || email === "") {
    document.getElementById("formMessage").textContent =
      "Please fill in all fields.";
    return;
  }

  const student = {
    name: name,
    studentId: studentId,
    email: email
  };

  localStorage.setItem("student", JSON.stringify(student));

  document.getElementById("formMessage").textContent =
    "Registration saved successfully.";

  registerForm.reset();
});


// Request workshop details from the local JSON file
async function loadWorkshop() {
  document.getElementById("loadMessage").textContent = "Loading...";

  try {
    const response = await fetch("data/workshop.json");

    if (response.status === 200) {
      const workshop = await response.json();

      document.getElementById("workshopTitle").textContent = workshop.title;
      document.getElementById("workshopDate").textContent = workshop.date;
      document.getElementById("workshopVenue").textContent = workshop.venue;
      document.getElementById("workshopSeats").textContent = workshop.seats;
      document.getElementById("workshopInstructor").textContent = workshop.instructor;
      document.getElementById("workshopDuration").textContent = workshop.duration;

      document.getElementById("loadMessage").textContent =
        "Workshop data loaded successfully.";
    } else {
      document.getElementById("loadMessage").textContent =
        "Could not load workshop data.";
    }
  } catch (error) {
    document.getElementById("loadMessage").textContent =
      "Request failed. Open this page through Live Server, not by double-clicking index.html.";
  }
}

// Request one sample user from the public practice API
async function loadSampleUser() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users/1"
  );

  if (response.status === 200) {
    const user = await response.json();
    document.getElementById("apiUser").textContent =
      user.name + " - " + user.email;
  } else {
    document.getElementById("apiUser").textContent =
      "Could not load API data.";
  }
}
