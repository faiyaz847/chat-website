const socket = io();
const chat = document.getElementById("chat");

function sendMessage() {
  const username = document.getElementById("username").value || "Guest";
  let message = document.getElementById("message").value;

  socket.emit("chatMessage", { username, message });
  document.getElementById("message").value = "";
}

socket.on("chatMessage", (data) => {
  let msg = data.message;

  if (msg.includes(":power:")) {
    msg = msg.replace(
      ":power:",
      `<img src="gifs/power.gif" class="emote">`
    );
  }

  chat.innerHTML += `<p><b>${data.username}:</b> ${msg}</p>`;
});
