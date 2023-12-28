document.addEventListener("DOMContentLoaded", function() {
    loadnavbar()
});

async function loadnavbar() {
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
            loaduser(mydata)
        } else {
            const errorData = await response.json();
            console.log(errorData);
        }
    } catch (error) {
        console.error("유저 불러오기 에러", error);
    }
};


function loaduser(data) {
    const mypagebutton = document.querySelector('.mypagebutton')
    const loginbutton = document.querySelector('.loginbutton')
    const logoutbutton = document.querySelector('.logoutbutton')
    const signupbutton = document.querySelector('.signupbutton')
    const navprofileimg = document.querySelector('.nav-profile-image')

    if (data.image_url !== null) {
        navprofileimg.src = url + data.image_url
        }

    logoutbutton.addEventListener('click', logout)
    mypagebutton.classList.remove('hidden');
    logoutbutton.classList.remove('hidden');
    loginbutton.classList.add('hidden');
    signupbutton.classList.add('hidden');
};


function logout() {
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    alert("로그아웃되었습니다.");
    window.location.reload
}
