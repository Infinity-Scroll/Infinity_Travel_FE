

async function getuser() {
    try {
        const response = await fetch(`${mydataurl}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (response.ok) {
          const mydata = await response.json();
          const username = document.querySelector('.username')
          username.innerHTML = mydata.nickname
            
          loadProfile(mydata)
        } else if (response.status === 401) {
            // 리프레시 토큰 갱신 
            alert("로그인 후 이용하실 수 있습니다. 로그인 페이지로 이동합니다.");
            window.location.href = loginpage;
        } else {
          const errorData = await response.json();
          console.log(errorData)
        }
      } catch (error) {
        console.error("유저 불러오기 에러", error);
    }
}