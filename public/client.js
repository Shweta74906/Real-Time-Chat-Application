const socket = io();
const loginScreen = document.getElementById("login-screen");
const chatScreen = document.getElementById("chat-screen");
const usernameInput = document.getElementById("username");
const joinBtn = document.getElementById("join-btn");
const chatWindow = document.getElementById("chat-window");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("send-btn");
const notifSound = document.getElementById("notif-sound");

let myId = null;

joinBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  if (username) {
    socket.emit("set-username", username);
    loginScreen.style.display = "none";
    chatScreen.style.display = "flex";
  }
});

sendBtn.addEventListener("click", () => {
  const msg = messageInput.value.trim();
  if (msg) {
    socket.emit("chat-message", msg);
    messageInput.value = "";
  }
});

socket.on("connect", () => {
  myId = socket.id;
});

socket.on("chat-message", (data) => {
  const div = document.createElement("div");
  div.classList.add("message");
  div.classList.add(data.id === myId ? "right" : "left");
  div.innerHTML = `<b>${data.user}:</b> ${data.message}`;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  if (data.id !== myId) notifSound.play();
});

socket.on("user-joined", (username) => {
  const div = document.createElement("div");
  div.classList.add("message", "left");
  div.style.background = "#d9fdd3";
  div.innerHTML = `${username} joined the chat`;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  notifSound.play();
});

socket.on("user-left", (username) => {
  const div = document.createElement("div");
  div.classList.add("message", "left");
  div.style.background = "#ffe6e6";
  div.innerHTML = `${username} left the chat`;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
});
