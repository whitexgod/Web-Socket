// Establish WebSocket connection
const socket = new WebSocket("ws://" + window.location.host);

// Handle incoming messages from WebSocket
socket.onmessage = function (event) {
  const chat = document.getElementById("chat");
  chat.innerHTML += "<p>" + event.data + "</p>";
  chat.scrollTop = chat.scrollHeight; // Auto-scroll to the bottom
};

// Function to send messages
function sendMessage() {
  const messageInput = document.getElementById("message");
  const message = messageInput.value;

  if (!message.trim()) return; // Don't send empty messages

  // Get username from localStorage
  const username = localStorage.getItem("username") || "Anonymous";

  // Combine the username and the message
  const fullMessage = `${username}: ${message}`;

  // Send message via WebSocket
  socket.send(fullMessage);

  // Display user's own message in the chat box
  const chat = document.getElementById("chat");
  chat.innerHTML += '<p class="user-message">' + fullMessage + "</p>";

  // Clear the message input and auto-scroll to the bottom
  messageInput.value = "";
  chat.scrollTop = chat.scrollHeight;
}
