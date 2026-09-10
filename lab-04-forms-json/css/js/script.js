function submitRegistration() {
  let name = document.getElementById("studentName").value;
  let studentId = document.getElementById("studentId").value;
  let email = document.getElementById("studentEmail").value;
  let workshop = document.getElementById("workshop").value;
  let message = document.getElementById("formMessage");

  if (name === "") {
    message.textContent = "Please enter your full name.";
    return;
  }

  if (studentId === "") {
    message.textContent = "Please enter your student ID.";
    return;
  }

  if (email === "") {
    message.textContent = "Please enter your email address.";
    return;
  }

  if (workshop === "") {
    message.textContent = "Please select a workshop.";
    return;
  }

  let registration = {
    name: name,
    studentId: studentId,
    email: email,
    workshop: workshop
  };

  let jsonData = JSON.stringify(registration);
  localStorage.setItem("registration", jsonData);

  document.getElementById("jsonOutput").textContent = jsonData;
  message.textContent = "Registration saved successfully.";
}

function showSavedRegistration() {
  let savedData = localStorage.getItem("registration");
  let output = document.getElementById("savedMessage");

  if (savedData === null) {
    output.textContent = "No saved registration was found.";
    return;
  }

  let registration = JSON.parse(savedData);
  output.textContent =
    registration.name + " (ID: " + registration.studentId + ") registered for " + registration.workshop + ".";
}

function clearRegistration() {
  localStorage.removeItem("registration");
  document.getElementById("jsonOutput").textContent = "No registration saved yet.";
  document.getElementById("savedMessage").textContent = "Saved registration cleared.";
}
