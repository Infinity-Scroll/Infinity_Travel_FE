const signupbutton = document.querySelector('.signup-button');
signupbutton.addEventListener('click', checkpassword);

function checkpassword() {
  const password1 = document.getElementById('password').value;
  const password2 = document.getElementById('password-confirm').value;
  if (password1 != password2) {
    window.alert('비밀번호를 확인해주세요.');
    return;
  } else if (password1.length < 8 || password2.length < 8) {
    window.alert('비밀번호 길이가 너무 짧습니다. 최소 8자 이상으로 해주세요.');
    return;
  }
  signup();
}

async function signup() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const nickname = document.getElementById('nickname').value;
  const birthdate = document.getElementById('birthdate').value;
  const gender = getSelectedGender();
  const requestBody = {
    email: email,
    password: password,
    birth: birthdate,
    gender: gender,
  };
  if (nickname) {
    requestBody.nickname = nickname;
  }

  showLoading();

  try {
    const response = await fetch(signupurl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      credentials: 'include',
    });

    hideLoading();

    if (response.ok) {
      const responseData = await response.json();
      window.alert(JSON.stringify(responseData.message));
      window.location.href = mainpage;
    } else {
      const errorData = await response.json();
      console.log(errorData);
      window.alert(JSON.stringify(errorData));
    }
  } catch (error) {
    hideLoading();
    console.error('에러', error);
  }
}

function getSelectedGender() {
  const genderRadios = document.getElementsByName('gender');

  let selectedGender;
  for (const radio of genderRadios) {
    if (radio.checked) {
      selectedGender = radio.value;
      break;
    }
  }

  if (selectedGender) {
    return selectedGender;
  } else {
    return null;
  }
}

function showLoading() {
  const loadingOverlay = document.getElementById('loading-overlay');
  loadingOverlay.style.display = 'flex';
}

function hideLoading() {
  const loadingOverlay = document.getElementById('loading-overlay');
  loadingOverlay.style.display = 'none';
}
