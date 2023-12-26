load_roomlist();
getuser();

document.querySelector('.roomlist').addEventListener('click', function (event) {
  const chatUserElement = event.target.closest('.chat-user');

  if (chatUserElement) {
    document.querySelectorAll('.chat-user').forEach((item) => {
      item.classList.remove('select');
      item.classList.add('unselect');
    });

    chatUserElement.classList.remove('unselect');
    chatUserElement.classList.add('select');
    event.stopPropagation();
  }
});

document.querySelectorAll('.chat-user').forEach((item) => {
  item.addEventListener('click', function (event) {
    event.stopPropagation();

    document.querySelectorAll('.chat-user').forEach((item) => {
      item.classList.remove('select');
      item.classList.add('unselect');
    });

    this.classList.remove('unselect');
    this.classList.add('select');
  });
});

document.querySelector('.roomlist').addEventListener('click', function (event) {
  const chatUserElement = event.target.closest('.chat-user');
  if (chatUserElement) {
    const room_name = chatUserElement.querySelector('.roomname').textContent;
    if (room_name) {
      connectWebSocket(room_name);
    }
  }
});

function connectWebSocket(room_name) {
  const webSocketUrl = `${chatws}${room_name}/`;
  const webSocket = new WebSocket(webSocketUrl);

  webSocket.addEventListener('open', function (event) {
    console.log('웹소켓이 열렸습니다.');
    loadChatHistory(room_name);
    scrollChatToBottom();
    document.getElementById('chat-input').addEventListener('keyup', function (e) {
      if (e.key === 'Enter') {
        sendMessage(webSocket, room_name);
      }
    });
  });
  webSocket.onmessage = function (message) {
    const receivedMessage = JSON.parse(message.data);
    loadMessage(receivedMessage);
    scrollChatToBottom();
  };

  function sendMessage(webSocket) {
    const messageInputDom = document.getElementById('chat-input');
    const message = messageInputDom.value;

    if (!message.trim()) {
      return;
    }
    webSocket.send(
      JSON.stringify({
        message: message,
      })
    );
    console.log('메세지를 보냈습니다.', message);
    messageInputDom.value = '';
  }
}

function loadMessage(data) {
  console.log('받은메세지: ', data);
  const username = document.querySelector('.username').innerHTML;
  const chatmessage = document.querySelector('.chat-message');
  message = data.message;
  const formattedTime = formatDateTime(message.created_at);

  let profileImg;
  if (message.userprofile != null) {
    profileImg = `${url}${message.userprofile}`;
  } else {
    profileImg = '../public/img/default_profile.jpg';
  }

  if (data.username == username) {
    messageHTML = `
        <div class="flex justify-end">
        <div class="ml-20 pr-3 pt-6">${formattedTime}</div>
        <div class="mymessage">
            ${message.message}
        </div>
        <img src=${profileImg}
            class="object-cover h-12 w-12 rounded-xl" alt="" />
    </div>
        `;
  } else {
    messageHTML = `
        <div class="flex justify-start">
                    <img src=${profileImg}
                        class="object-cover h-12 w-12 rounded-xl" alt="" />
                    <div
                        class="otherusermessage">
                        ${message.message}
                    </div>
                    <div class="mr-20 pl-3 pt-6">${formattedTime}</div>
                </div>
    `;
  }
  chatmessage.innerHTML += messageHTML;
}

async function load_roomlist() {
  try {
    const response = await fetch(roomlisturl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (response.ok) {
      const roomlist = await response.json();
      console.log(roomlist);

      roomlist.forEach((room) => {
        add_roomlist(room);
      });
    } else {
      const errorData = await response.json();
      alert(errorData.message);
    }
  } catch (error) {
    console.error('채팅목록에러', error);
  }
}

let chatpage = 1;
async function loadChatHistory(room_name) {
  chatpage = 1;
  try {
    const response = await fetch(`${chathistoryurl}${room_name}/?page=${chatpage}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (response.ok) {
      const roomlist = await response.json();
      console.log(roomlist);

      loadMessageHistory(roomlist);
    } else {
      const errorData = await response.json();
      alert(errorData.message);
    }
  } catch (error) {
    console.error('채팅기록 불러오기 에러', error);
  }
}

function loadMessageHistory(roomlist) {
  chatclear();
  messages = roomlist.results;
  const chatmessage = document.querySelector('.chat-message');
  console.log(messages);
  let messageHTML;
  messages.reverse().forEach((message) => {
    const formattedTime = formatDateTime(message.created_at);
    const profileImg = message.profile_img || '../public/img/default_profile.jpg';
    if (message.is_sender === true) {
      messageHTML = `
        <div class="flex justify-end">
        <div class="ml-20 pr-3 pt-6">${formattedTime}</div>
        <div class="mymessage">
            ${message.message}
        </div>
        <img src=${profileImg}
            class="object-cover h-12 w-12 rounded-xl" alt="" />
    </div>
        `;
    } else {
      messageHTML = `
            <div class="flex justify-start">
                        <img src=${profileImg}
                            class="object-cover h-12 w-12 rounded-xl" alt="" />
                        <div
                            class="otherusermessage">
                            ${message.message}
                        </div>
                        <div class="mr-20 pl-3 pt-6">${formattedTime}</div>
                    </div>
        `;
    }
    chatmessage.innerHTML += messageHTML;
  });
}

function chatclear() {
  const messagelist = document.querySelector('.chat-message');
  messagelist.innerHTML = '';
}

function add_roomlist(room) {
  let profileimg = room.other_user[0].profile_img || '../public/img/default_profile.jpg';
  let content = `
    <div class="unselect chat-user">
    <div class="hidden roomname">${room.room_name}</div>
    <div class="w-1/4">
        <img src=${profileimg}
            class="object-cover h-12 w-12 rounded-full" alt="" />
    </div>
    <div class="w-full">
        <div class="text-lg font-semibold">${room.other_user[0].nickname}</div>
        <span class="text-gray-500">${room.lastest_text}</span>
    </div>
    <button class="listdetail"><img src="../public/img/roomdelete.png" alt="" class="w-8 h-10"></button>
</div>
`;
  document.querySelector('.roomlist').innerHTML += content;
  adddeletebutton();
}

function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}

async function getuser() {
  try {
    const response = await fetch(`${mydataurl}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (response.ok) {
      const mydata = await response.json();
      const username = document.querySelector('.username');
      username.innerHTML = mydata.nickname;

      loadProfile(mydata);
    } else {
      const errorData = await response.json();
      alert(errorData.message);
    }
  } catch (error) {
    console.error('유저 불러오기 에러', error);
  }
}

function loadProfile(data) {
  const profile_img = document.querySelector('.profile_img');
  const nickname = document.querySelector('.nickname');
  const introduction = document.querySelector('.introduction');

  let profileImg;
  if (data.image_url != null) {
    profileImg = `${url}${data.image_url}`;
  } else {
    profileImg = '../public/img/default_profile.jpg';
  }

  profile_img.src = profileImg;
  nickname.innerHTML = data.nickname;
  introduction.innerHTML = data.introduction;
}

function scrollChatToBottom() {
  const chatMessageContainer = document.querySelector('.message');
  chatMessageContainer.scrollTop = chatMessageContainer.scrollHeight;
}

function adddeletebutton() {
  document.querySelectorAll('.listdetail').forEach((button) => {
    button.addEventListener('click', function (event) {
      event.stopPropagation();
      const confirmation = confirm('정말로 채팅방을 나가시겠습니까?');

      if (confirmation) {
        const roomName = this.closest('.chat-user').querySelector('.roomname').textContent;
        leaveRoom(roomName);
      }
    });
  });
}

//방나가기
function leaveRoom(roomName) {
  const deleteUrl = `${roomdeleteurl}${roomName}/`;

  fetch(deleteUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then((response) => {
      if (response.ok) {
        window.alert(`채팅방에서 나갔습니다.`);
        // 예를 들어, 방 목록 갱신 등의 작업을 수행할 수 있습니다.
      } else {
        window.alert(`방 나가기 실패: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error('방 나가기 요청 오류:', error);
    });
}
