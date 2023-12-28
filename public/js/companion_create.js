function send_data() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const start_date = document.getElementById('start_date').value;
    const end_date = document.getElementById('end_date').value;
    const total_recruits = document.getElementById('total_recruits').value;
    const current_recruits = document.getElementById('current_recruits').value;
    const status = document.getElementById('status').value;
    const thumbnail_image = document.getElementById('thumbnail_image_url');
    const selected_thumbnail_image = thumbnail_image.files[0];
    const sub_image_a = document.getElementById('sub_image_url_a');
    const selected_sub_image_a = sub_image_a.files[0];
    const sub_image_b = document.getElementById('sub_image_url_b');
    const selected_sub_image_b = sub_image_b.files[0];
    const sub_image_c = document.getElementById('sub_image_url_c');
    const selected_sub_image_c = sub_image_c.files[0];
    let area;
    if (document.getElementById('city').value) {
        area = document.getElementById('city').value;
    } else if (document.getElementById('country').value) {
        area = document.getElementById('country').value;
    } else if (document.getElementById('continent').value) {
        area = document.getElementById('continent').value;
    }
    
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
    
    const data = {
        title: title,
        content: content,
        area: area,
        start_date: start_date,
        end_date: end_date,
        total_recruits: total_recruits,
        current_recruits: current_recruits,
        status: status,
    };
    
    data.thumbnail_image_url = selected_thumbnail_image
    data.sub_image_url_a = selected_sub_image_a
    data.sub_image_url_b = selected_sub_image_b
    data.sub_image_url_c = selected_sub_image_c

    fetch(url+"/companion/list/", {
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
            window.location.href = `./companion.html`;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}