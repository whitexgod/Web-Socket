// Check if user's name is already stored in localStorage
window.onload = function () {
  const storedName = localStorage.getItem("username");
  const greetingElement = document.getElementById("greeting");

  if (storedName) {
    // Display a greeting if the user has already entered their name
    greetingElement.textContent = `Welcome back, ${storedName}!`;
  }
};

// Handle form submission to save user's name and show loader
document
  .getElementById("joinForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting

    const username = document.getElementById("username").value;

    if (username) {
      // Store the username in localStorage
      localStorage.setItem("username", username);

      // Hide the form and display the loader
      document.getElementById("joinForm").style.display = "none";
      document.getElementById("loader").style.display = "block";

      // Display a greeting message
      document.getElementById("greeting").textContent = `Welcome, ${username}!`;

      // Wait for 3 seconds, then redirect
      setTimeout(() => {
        window.location.href = "/community";
      }, 3000);
    }
  });
