const loginbutton = document.querySelector('.login-button')
loginbutton.addEventListener('click', login)

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        login();
    }
});

async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const requestBody = {
        "email": email,
        "password": password,
    };
    try {
      const response = await fetch(loginurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        credentials: "include",
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData)
        window.location.href = mainpage;
    } else {
        const errorData = await response.json();
        window.alert(JSON.stringify(errorData));
      }
    } catch (error) {
      console.error("에러", error);
    }
  }