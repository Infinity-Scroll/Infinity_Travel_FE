function showPostDetail(post_id) {
    window.location.href = `companion_detail.html?post_id=${post_id}`;
  }
  fetch(url+'/companion/list/')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(posts => {
      const postsContainer = document.getElementById('companion_posts');

      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('rounded');
        postElement.classList.add('bg-gray-100');
        postElement.classList.add('p-4');
        postElement.classList.add('shadow');
        postElement.innerHTML = `
                <div class="mb-2 flex h-40 w-full items-center justify-center bg-gray-300">
                    <img src="${post.thumbnail_image_url}" alt="Thumbnail" class="object-cover h-40 w-full">
                </div>
                <h3 class="mb-1 font-bold" onclick="showPostDetail(${post.id})" style="cursor: pointer;">${post.title}</h3>
                <p class="text-sm">${post.content}
                </p>
            `;
        postsContainer.appendChild(postElement);
      });
    })
    .catch(error => console.error(error));