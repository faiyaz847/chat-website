const socket = io();
const chat = document.getElementById("chat");

// ALL GIF EMOTES HERE
const emotes = {
  ":power:": "gifs/power.gif",
  ":fire:": "gifs/fire.gif",
":fight:": "gifs/fight.gif",
};

function sendMessage() {
  const username = document.getElementById("username").value || "Guest";
  let message = document.getElementById("message").value;

  socket.emit("chatMessage", { username, message });
  document.getElementById("message").value = "";
}

socket.on("chatMessage", (data) => {
  let msg = data.message;

  // Replace text with GIF emotes
  for (const code in emotes) {
    if (msg.includes(code)) {
      msg = msg.replaceAll(
        code,
        `<img src="${emotes[code]}" class="emote">`
      );
    }
  }

  chat.innerHTML += `<p><b>${data.username}:</b> ${msg}</p>`;
  chat.scrollTop = chat.scrollHeight;
});

