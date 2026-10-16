let users = [];
const tingSound = new Audio('ting.mp3');

function addUser() {
    const name = document.getElementById('username').value.trim();
    if(name && !users.includes(name)) {
        users.push(name);
        updateUserList();
        displayMessage('System', `${name} joined the chat`);
        playTing();
        document.getElementById('username').value = '';
    }
}

function updateUserList() {
    const select = document.getElementById('currentUser');
    select.innerHTML = '';
    users.forEach(u => {
        const opt = document.createElement('option');
        opt.value = u;
        opt.textContent = u;
        select.appendChild(opt);
    });
}

document.getElementById('sendBtn').addEventListener('click', sendMessage);

function sendMessage() {
    const msgInput = document.getElementById('msg');
    const msg = msgInput.value.trim();
    const user = document.getElementById('currentUser').value;
    if(msg && user) {
        displayMessage(user, msg);
        msgInput.value = '';
        playTing();
    }
}

function displayMessage(user, msg) {
    const chat = document.getElementById('chat');
    const div = document.createElement('div');
    div.className = 'message ' + (user === users[0] ? 'right' : 'left');
    div.textContent = `${user}: ${msg}`;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function playTing() {
    tingSound.currentTime = 0;
    tingSound.play().catch(e => console.log(e));
}
