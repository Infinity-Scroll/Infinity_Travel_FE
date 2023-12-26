getuser();
document.addEventListener('DOMContentLoaded', function () {
  clickToChangeProfile();
});

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
      console.log('내정보: ', mydata);
      loadProfile(mydata);
    } else if (response.status === 401) {
      // 리프레시 토큰 갱신
      alert('로그인 후 이용하실 수 있습니다. 로그인 페이지로 이동합니다.');
      window.location.href = loginpage;
    } else {
      const errorData = await response.json();
      console.log(errorData);
    }
  } catch (error) {
    console.error('유저 불러오기 에러', error);
  }
}

function loadProfile(data) {
  const profileimage = document.querySelector('.profile-image');
  const nickname = document.getElementById('nickname');
  const introduction = document.getElementById('introduction');
  const email = document.getElementById('email');
  const birth = document.getElementById('birthdate');
  const gender = document.getElementById('gender');

  if (data.image_url !== null) {
    profileimage.src = url + data.image_url;
  }
  nickname.value = data.nickname;
  introduction.value = data.introduction;
  email.value = data.email;
  birth.value = data.birth;
  gender.value = convertGender(data.gender);
}

function convertGender(genderCode) {
  switch (genderCode) {
    case 'Male':
      return '남자';
    case 'Female':
      return '여자';
    case 'None':
      return '선택없음';
    default:
      return '알 수 없음';
  }
}

function clickToChangeProfile() {
  const profileImage = document.querySelector('.profile-image');
  const profileInput = document.getElementById('profile-input');
  profileInput.addEventListener('change', () => {
    ImageUpload(profileInput, profileImage);
  });
  profileImage.addEventListener('click', () => {
    profileInput.click();
  });

  const sumbitbutton = document.querySelector('.profile-change');
  sumbitbutton.addEventListener('click', updateProfile);
}

function ImageUpload(input, previewImage) {
  const file = input.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      previewImage.src = e.target.result;
    };

    reader.readAsDataURL(file);
  } else {
    previewImage.src = '../public/img/default_profile.jpg';
  }
}

async function updateProfile() {
  const nickname = document.getElementById('nickname').value;
  const introduction = document.getElementById('introduction').value;
  const birthdate = document.getElementById('birthdate').value;
  const profileInput = document.getElementById('profile-input');

  const formData = new FormData();
  formData.append('nickname', nickname);
  formData.append('introduction', introduction);
  formData.append('birthdate', birthdate);

  if (profileInput.files.length > 0) {
    formData.append('image_url', profileInput.files[0]);
  }

  try {
    const response = await fetch(mydataurl, {
      method: 'PATCH',
      body: formData,
      credentials: 'include',
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      alert('프로필이 업데이트되었습니다.');
      window.location.reload();
    } else {
      const errorData = await response.json();
      console.error(errorData);
    }
  } catch (error) {
    console.error('프로필 업데이트 에러', error);
    alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
  }
}
