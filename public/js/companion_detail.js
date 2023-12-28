const url_params = new URLSearchParams(window.location.search);
const post_id = url_params.get('post_id');

function getAccessToken() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('access_token=')) {
            return cookie.substring(13);
        }
    }
    return null;
}

const accesstoken = getAccessToken();

const update_button = document.getElementById('update_button');
update_button.setAttribute('href', `./companion_update.html?post_id=${post_id}`);

fetch(url+`/companion/list/${post_id}/`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
    credentials: "include",
})
    .then(response => response.json())
    .then(post => {
        const post_detail_container = document.getElementById('post_detail');
        const post_element = document.createElement('div');
        if (post.sub_image_url_a && post.sub_image_url_b && post.sub_image_url_c) {
            post_element.innerHTML = `
                <h2 class="text-3xl font-semibold mb-4">${post.title}</h2>
                <p class="text-gray-600 mb-6">여행기간 : ${post.start_date} ~ ${post.end_date}</p>
                <p class="text-gray-600 mb-6">모집현황 : ${post.status}</p>
                <p class="text-gray-600 mb-6">총 모집 인원 : ${post.total_recruits}</p>
                <p class="text-gray-600 mb-6">현재 모집 중인 인원 : ${post.current_recruits}</p>
                <p class="text-gray-600 mb-6">조회수 : ${post.views}</p>
                <p class="text-gray-600 mb-6">작성자 : ${post.user_nickname} #${post.age_tag}</p>
                <div class="mb-6">
                    <img src="${post.thumbnail_image_url}" alt="Thumbnail" class="w-full rounded-lg">
                </div>
                <div class="mb-6 flex">
                    <img src="${post.sub_image_url_a}" alt="Sub Image" class="w-1/3 rounded-lg">
                    <img src="${post.sub_image_url_b}" alt="Sub Image" class="w-1/3 rounded-lg">
                    <img src="${post.sub_image_url_c}" alt="Sub Image" class="w-1/3 rounded-lg">
                </div>
                <p class="text-gray-700 leading-relaxed mb-6">${post.content}</p>
            `;
        } else if (post.sub_image_url_a && post.sub_image_url_b && !post.sub_image_url_c) {
            post_element.innerHTML = `
                <h2 class="text-3xl font-semibold mb-4">${post.title}</h2>
                <p class="text-gray-600 mb-6">여행기간 : ${post.start_date} ~ ${post.end_date}</p>
                <p class="text-gray-600 mb-6">모집현황 : ${post.status}</p>
                <p class="text-gray-600 mb-6">총 모집 인원 : ${post.total_recruits}</p>
                <p class="text-gray-600 mb-6">현재 모집 중인 인원 : ${post.current_recruits}</p>
                <p class="text-gray-600 mb-6">조회수 : ${post.views}</p>
                <p class="text-gray-600 mb-6">작성자 : ${post.user_nickname} #${post.age_tag}</p>
                <div class="mb-6">
                    <img src="${post.thumbnail_image_url}" alt="Thumbnail" class="w-full rounded-lg">
                </div>
                <div class="mb-6 flex">
                    <img src="${post.sub_image_url_a}" alt="Sub Image" class="w-1/3 rounded-lg">
                    <img src="${post.sub_image_url_b}" alt="Sub Image" class="w-1/3 rounded-lg">
                </div>
                <p class="text-gray-700 leading-relaxed mb-6">${post.content}</p>
            `;
        } else if (post.sub_image_url_a && !post.sub_image_url_b && post.sub_image_url_c) {
            post_element.innerHTML = `
                <h2 class="text-3xl font-semibold mb-4">${post.title}</h2>
                <p class="text-gray-600 mb-6">여행기간 : ${post.start_date} ~ ${post.end_date}</p>
                <p class="text-gray-600 mb-6">모집현황 : ${post.status}</p>
                <p class="text-gray-600 mb-6">총 모집 인원 : ${post.total_recruits}</p>
                <p class="text-gray-600 mb-6">현재 모집 중인 인원 : ${post.current_recruits}</p>
                <p class="text-gray-600 mb-6">조회수 : ${post.views}</p>
                <p class="text-gray-600 mb-6">작성자 : ${post.user_nickname} #${post.age_tag}</p>
                <div class="mb-6">
                    <img src="${post.thumbnail_image_url}" alt="Thumbnail" class="w-full rounded-lg">
                </div>
                <div class="mb-6 flex">
                    <img src="${post.sub_image_url_a}" alt="Sub Image" class="w-1/3 rounded-lg">
                    <img src="${post.sub_image_url_c}" alt="Sub Image" class="w-1/3 rounded-lg">
                </div>
                <p class="text-gray-700 leading-relaxed mb-6">${post.content}</p>
            `;
        } else if (!post.sub_image_url_a && post.sub_image_url_b && post.sub_image_url_c) {
            post_element.innerHTML = `
                <h2 class="text-3xl font-semibold mb-4">${post.title}</h2>
                <p class="text-gray-600 mb-6">여행기간 : ${post.start_date} ~ ${post.end_date}</p>
                <p class="text-gray-600 mb-6">모집현황 : ${post.status}</p>
                <p class="text-gray-600 mb-6">총 모집 인원 : ${post.total_recruits}</p>
                <p class="text-gray-600 mb-6">현재 모집 중인 인원 : ${post.current_recruits}</p>
                <p class="text-gray-600 mb-6">조회수 : ${post.views}</p>
                <p class="text-gray-600 mb-6">작성자 : ${post.user_nickname} #${post.age_tag}</p>
                <div class="mb-6">
                    <img src="${post.thumbnail_image_url}" alt="Thumbnail" class="w-full rounded-lg">
                </div>
                <div class="mb-6 flex">
                    <img src="${post.sub_image_url_b}" alt="Sub Image" class="w-1/3 rounded-lg">
                    <img src="${post.sub_image_url_c}" alt="Sub Image" class="w-1/3 rounded-lg">
                </div>
                <p class="text-gray-700 leading-relaxed mb-6">${post.content}</p>
            `;
        } else if (post.sub_image_url_a && !post.sub_image_url_b && !post.sub_image_url_c) {
            post_element.innerHTML = `
                <h2 class="text-3xl font-semibold mb-4">${post.title}</h2>
                <p class="text-gray-600 mb-6">여행기간 : ${post.start_date} ~ ${post.end_date}</p>
                <p class="text-gray-600 mb-6">모집현황 : ${post.status}</p>
                <p class="text-gray-600 mb-6">총 모집 인원 : ${post.total_recruits}</p>
                <p class="text-gray-600 mb-6">현재 모집 중인 인원 : ${post.current_recruits}</p>
                <p class="text-gray-600 mb-6">조회수 : ${post.views}</p>
                <p class="text-gray-600 mb-6">작성자 : ${post.user_nickname} #${post.age_tag}</p>
                <div class="mb-6">
                    <img src="${post.thumbnail_image_url}" alt="Thumbnail" class="w-full rounded-lg">
                </div>
                <div class="mb-6 flex">
                    <img src="${post.sub_image_url_a}" alt="Sub Image" class="w-1/3 rounded-lg">
                </div>
                <p class="text-gray-700 leading-relaxed mb-6">${post.content}</p>
            `;
        } else if (!post.sub_image_url_a && post.sub_image_url_b && !post.sub_image_url_c) {
            post_element.innerHTML = `
                <h2 class="text-3xl font-semibold mb-4">${post.title}</h2>
                <p class="text-gray-600 mb-6">여행기간 : ${post.start_date} ~ ${post.end_date}</p>
                <p class="text-gray-600 mb-6">모집현황 : ${post.status}</p>
                <p class="text-gray-600 mb-6">총 모집 인원 : ${post.total_recruits}</p>
                <p class="text-gray-600 mb-6">현재 모집 중인 인원 : ${post.current_recruits}</p>
                <p class="text-gray-600 mb-6">조회수 : ${post.views}</p>
                <p class="text-gray-600 mb-6">작성자 : ${post.user_nickname} #${post.age_tag}</p>
                <div class="mb-6">
                    <img src="${post.thumbnail_image_url}" alt="Thumbnail" class="w-full rounded-lg">
                </div>
                <div class="mb-6 flex">
                    <img src="${post.sub_image_url_b}" alt="Sub Image" class="w-1/3 rounded-lg">
                </div>
                <p class="text-gray-700 leading-relaxed mb-6">${post.content}</p>
            `;
        } else if (!post.sub_image_url_a && !post.sub_image_url_b && post.sub_image_url_c) {
            post_element.innerHTML = `
                <h2 class="text-3xl font-semibold mb-4">${post.title}</h2>
                <p class="text-gray-600 mb-6">여행기간 : ${post.start_date} ~ ${post.end_date}</p>
                <p class="text-gray-600 mb-6">모집현황 : ${post.status}</p>
                <p class="text-gray-600 mb-6">총 모집 인원 : ${post.total_recruits}</p>
                <p class="text-gray-600 mb-6">현재 모집 중인 인원 : ${post.current_recruits}</p>
                <p class="text-gray-600 mb-6">조회수 : ${post.views}</p>
                <p class="text-gray-600 mb-6">작성자 : ${post.user_nickname} #${post.age_tag}</p>
                <div class="mb-6">
                    <img src="${post.thumbnail_image_url}" alt="Thumbnail" class="w-full rounded-lg">
                </div>
                <div class="mb-6 flex">
                    <img src="${post.sub_image_url_c}" alt="Sub Image" class="w-1/3 rounded-lg">
                </div>
                <p class="text-gray-700 leading-relaxed mb-6">${post.content}</p>
            `;
        } else if (!post.sub_image_url_a && !post.sub_image_url_b && !post.sub_image_url_c) {
            post_element.innerHTML = `
                <h2 class="text-3xl font-semibold mb-4">${post.title}</h2>
                <p class="text-gray-600 mb-6">여행기간 : ${post.start_date} ~ ${post.end_date}</p>
                <p class="text-gray-600 mb-6">모집현황 : ${post.status}</p>
                <p class="text-gray-600 mb-6">총 모집 인원 : ${post.total_recruits}</p>
                <p class="text-gray-600 mb-6">현재 모집 중인 인원 : ${post.current_recruits}</p>
                <p class="text-gray-600 mb-6">조회수 : ${post.views}</p>
                <p class="text-gray-600 mb-6">작성자 : ${post.user_nickname} #${post.age_tag}</p>
                <div class="mb-6">
                    <img src="${post.thumbnail_image_url}" alt="Thumbnail" class="w-full rounded-lg">
                </div>
                <p class="text-gray-700 leading-relaxed mb-6">${post.content}</p>
            `;
        }
            post_detail_container.appendChild(post_element);
;
        post.companion_comments.forEach(comment => {
            if (!comment.parent_comment) {
                const comment_container = document.getElementById('comment_list')
                const comment_element = document.createElement('li');
                comment_element.innerHTML = `
                        <p class="text-gray-600 mb-6">작성자 : ${comment.user_nickname}</p>
                        <p class="text-gray-600 mb-6" onclick="reply_form(${comment.id})" style="cursor: pointer;">내용 : ${comment.comment_text}</p>
                        <div id="comment_update_container${comment.id}"></div>
                        <button onclick="comment_update_form(${comment.id}, ${comment.comment_text})" class="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-700 focus:outline-none focus:bg-blue-700">수정하기</button>
                        <button onclick="comment_delete(${comment.id})" class="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-700 focus:outline-none focus:bg-blue-700">삭제하기</button>
                        <ul id="reply_list${comment.id}" class="border border-gray-200 rounded-lg p-4 pl-4"></ul>
                `
                comment_container.appendChild(comment_element);
            } else if (comment.parent_comment) {
                const reply_container = document.getElementById(`reply_list${comment.parent_comment}`)
                const reply_element = document.createElement('li');
                reply_element.innerHTML = `
                        <p class="text-gray-600 mb-6">작성자 : ${comment.user_nickname}</p>
                        <p class="text-gray-600 mb-6">내용 : ${comment.comment_text}</p>
                        <div id="comment_update_container${comment.id}"></div>
                        <button onclick="comment_update_form(${comment.id}, ${comment.comment_text})" class="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-700 focus:outline-none focus:bg-blue-700">수정하기</button>
                        <button onclick="comment_delete(${comment.id})" class="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-700 focus:outline-none focus:bg-blue-700">삭제하기</button>
                `
                reply_container.appendChild(reply_element);
            }
        })
    })
    .catch(error => console.error('Error:', error));

function reply_form(comment_id) {
    const reply_container = document.getElementById(`reply_list${comment_id}`)
    const reply_element = document.createElement('div');
    reply_element.innerHTML = `
    <textarea id="reply_content" class="form-textarea block w-full rounded-lg p-2 mb-2" rows="3" placeholder="대댓글을 입력하세요..."></textarea>
    <button onclick="reply_create(${comment_id})" type="submit" class="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-700 focus:outline-none focus:bg-blue-700">대댓글 등록</button>
    `
    reply_container.appendChild(reply_element);
}

function reply_create(comment_id) {
    const reply_content = document.getElementById('reply_content').value;

    const data = {
        content: reply_content,
        companion_post: post_id,
        parent_comment: comment_id,
    };

    fetch(url+"/companion/comment/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accesstoken}`
        },
        credentials: "include",
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function comment_delete(comment_id) {
    fetch(url+`/companion/comment/${comment_id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accesstoken}`
        },
        credentials: "include",
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Post deleted successfully');
            // Handle success or redirection after deletion
        })
        .catch(error => console.error('Error:', error));
}

function comment_update_form(comment_id, comment_texted) {
    const comment_update_container = document.getElementById(`comment_update_container${comment_id}`)
    const comment_update_element = document.createElement('div');
    comment_update_element.innerHTML = `
    <textarea id="comment_updated${comment_id}" class="form-textarea block w-full rounded-lg p-2 mb-2" rows="3" placeholder="${comment_texted}"></textarea>
    <button onclick="comment_update(${comment_id})" type="submit" class="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-700 focus:outline-none focus:bg-blue-700">댓글 수정하기</button>
    `
    comment_update_container.appendChild(comment_update_element);
}

function comment_update(comment_id) {
    const comment_content = document.getElementById(`comment_updated${comment_id}`).value;

    const data = {
        comment_text: comment_content,
    };

    fetch(url+`/companion/comment/${comment_id}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accesstoken}`
        },
        credentials: "include",
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function deletePost() {
    fetch(url+`/companion/list/${post_id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accesstoken}`
        },
        credentials: "include",
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Post deleted successfully');
            // Handle success or redirection after deletion
        })
        .catch(error => console.error('Error:', error));
}


function sendComment() {
    const comment_content = document.getElementById('comment_content').value;

    const data = {
        comment_text: comment_content,
        companion_post: post_id,
    };

    fetch(url+"/companion/comment/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accesstoken}`
        },
        credentials: "include",
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}