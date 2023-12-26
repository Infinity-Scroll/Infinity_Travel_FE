const loginbutton = document.querySelector('.login-button');
loginbutton.addEventListener('click', login);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    login();
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const message = urlParams.get('message');

  if (message) {
    window.alert('회원가입에 성공했습니다. 로그인을 진행해주세요.');
  }
});

async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const requestBody = {
    email: email,
    password: password,
  };
  try {
    const response = await fetch(loginurl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      credentials: 'include',
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      window.location.href = mainpage;
    } else {
      const errorData = await response.json();
      window.alert(JSON.stringify(errorData));
    }
  } catch (error) {
    console.error('에러', error);
  }
}
