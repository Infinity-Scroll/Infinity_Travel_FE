const url_params = new URLSearchParams(window.location.search);
const post_id = url_params.get('post_id');

function find_value_by_key(value, obj) {
    return Object.keys(obj).find(key => obj[key].includes(value));
}

// 페이지 로드 시 현재 정보를 폼에 표시
window.addEventListener('load', () => {
    fetch(url+`/companion/list/${post_id}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    .then(response => response.json())
    .then(post => {
        if (post.thumbnail_image_url) {
            const thumbnail_image_container = document.getElementById('thumbnail_image_sample');
            const thumbnail_image_element = document.createElement('div');
            thumbnail_image_element.innerHTML = `
            <img src="${post.thumbnail_image_url}" alt="Thumbnail" class="w-1/12 rounded-lg">
            `
            thumbnail_image_container.appendChild(thumbnail_image_element);
        }
        if (post.sub_image_url_a) {
            const sub_image_a_container = document.getElementById('sub_image_a_sample');
            const sub_image_a_element = document.createElement('div');
            sub_image_a_element.innerHTML = `
            <img src="${post.sub_image_url_a}" alt="Thumbnail" class="w-1/12 rounded-lg">
            `
            sub_image_a_container.appendChild(sub_image_a_element);
        }
        if (post.sub_image_url_b) {
            const sub_image_b_container = document.getElementById('sub_image_b_sample');
            const sub_image_b_element = document.createElement('div');
            sub_image_b_element.innerHTML = `
            <img src="${post.sub_image_url_b}" alt="Thumbnail" class="w-1/12 rounded-lg">
            `
            sub_image_b_container.appendChild(sub_image_b_element);
        }
        if (post.sub_image_url_c) {
            const sub_image_c_container = document.getElementById('sub_image_c_sample');
            const sub_image_c_element = document.createElement('div');
            sub_image_c_element.innerHTML = `
            <img src="${post.sub_image_url_c}" alt="Thumbnail" class="w-1/12 rounded-lg">
            `
            sub_image_c_container.appendChild(sub_image_c_element);
        }
        document.getElementById('start_date').value = post.start_date;
        document.getElementById('end_date').value = post.end_date;
        document.getElementById('title').value = post.title;
        document.getElementById('content').value = post.content;
        document.getElementById('status').value = post.status;
        document.getElementById('total_recruits').value = post.total_recruits;
        if (post.status == '모집중') {
            current_recruits_select.disabled = false;
            const member_list = recruits_member[post.total_recruits];
            member_list.forEach(member => {
                const option = document.createElement('option');
                option.value = member;
                option.textContent = member;
                current_recruits_select.appendChild(option);
                document.getElementById('current_recruits').value = post.current_recruits;
            });
        } else {
            current_recruits_select.disabled = true;
        }
        find_country_by_area = find_value_by_key(post.area, cities)
        find_continent_by_area = find_value_by_key(post.area, countries)

        if (find_country_by_area) {
            find_continent_by_country = find_value_by_key(find_country_by_area, countries)
            document.getElementById('continent').value = find_continent_by_country;
            country_select.disabled = false;
            country_select.innerHTML = '<option value="">국가 선택</option>';
            const country_list = countries[find_continent_by_country];
            country_list.forEach(country => {
                const option = document.createElement('option');
                option.value = country;
                option.textContent = country;
                country_select.appendChild(option);
            });
            document.getElementById('country').value = find_country_by_area;
            city_select.disabled = false;
            city_select.innerHTML = '<option value="">국가 선택</option>';
            const city_list = cities[find_country_by_area];
            city_list.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                city_select.appendChild(option);
            });
            document.getElementById('city').value = post.area;
        } else if (!find_country_by_area && find_continent_by_area) {
            document.getElementById('continent').value = find_continent_by_area;
            country_select.disabled = false;
            country_select.innerHTML = '<option value="">국가 선택</option>';
            const country_list = countries[find_continent_by_area];
            country_list.forEach(country => {
                const option = document.createElement('option');
                option.value = country;
                option.textContent = country;
                country_select.appendChild(option);
            });
            document.getElementById('country').value = post.area;
            city_select.disabled = false;
            city_select.innerHTML = '<option value="">국가 선택</option>';
            const city_list = cities[post.area];
            city_list.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                city_select.appendChild(option);
            });
        } else if (!find_country_by_area && !find_continent_by_area) {
            document.getElementById('continent').value = post.area;
            country_select.disabled = false;
            country_select.innerHTML = '<option value="">국가 선택</option>';
            const country_list = countries[post.area];
            country_list.forEach(country => {
                const option = document.createElement('option');
                option.value = country;
                option.textContent = country;
                country_select.appendChild(option);
            });
        }
    });
});

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

function update_data() {
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
    
    if (selected_thumbnail_image) {
        data.thumbnail_image_url = selected_thumbnail_image
    } else {
        data.thumbnail_image_url = null}
    if (selected_sub_image_a) {
        data.sub_image_url_a = selected_sub_image_a
    } else {
        data.sub_image_url_a = null}
    if (selected_sub_image_b) {
        data.sub_image_url_b = selected_sub_image_b
    } else {
        data.sub_image_url_b = null}
    if (selected_sub_image_c) {
        data.sub_image_url_c = selected_sub_image_c
    } else {
        data.sub_image_url_c = null}

    fetch(url+`/companion/list/${post_id}/`, {
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
            window.location.href = `./companion_detail.html?post_id=${post_id}`;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}