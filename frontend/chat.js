async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  showTypingIndicator();

  const response = await fetch("http://localhost:5000/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: message })
  });

  const data = await response.json();

  hideTypingIndicator();
  typeMessage(data.answer, "bot");
}

function addMessage(text, type) {
  const box = document.getElementById("chat-box");
  const div = document.createElement("div");
  div.classList.add("message", type);
  div.innerText = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

function typeMessage(text, type) {
  const box = document.getElementById("chat-box");
  const div = document.createElement("div");
  div.classList.add("message", type);
  box.appendChild(div);

  let i = 0;
  const speed = 20;

  function typing() {
    if (i < text.length) {
      div.innerText += text.charAt(i++);
      box.scrollTop = box.scrollHeight;
      setTimeout(typing, speed);
    }
  }
  typing();
}

let typingDiv;
function showTypingIndicator() {
  const box = document.getElementById("chat-box");
  typingDiv = document.createElement("div");
  typingDiv.classList.add("typing-indicator");
  typingDiv.innerHTML = `<span class="dot"></span><span class="dot"></span><span class="dot"></span>`;
  box.appendChild(typingDiv);
  box.scrollTop = box.scrollHeight;
}

function hideTypingIndicator() {
  if (typingDiv) {
    typingDiv.remove();
    typingDiv = null;
  }
}

function closeChat() {
  window.history.back(); // ⬅ Go to previous webpage
}
