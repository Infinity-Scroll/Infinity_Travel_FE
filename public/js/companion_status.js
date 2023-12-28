const status_select = document.getElementById('status');
const total_recruits_select = document.getElementById('total_recruits');
const current_recruits_select = document.getElementById('current_recruits');

const recruits_member = {
    총2명: ['1명'],
    총3명: ['1명', '2명'],
    총4명: ['1명', '2명', '3명'],
    총5명: ['1명', '2명', '3명', '4명'],
    총6명: ['1명', '2명', '3명', '4명', '5명'],
    총7명: ['1명', '2명', '3명', '4명', '5명', '6명'],
    총8명: ['1명', '2명', '3명', '4명', '5명', '6명', '7명'],
    총9명: ['1명', '2명', '3명', '4명', '5명', '6명', '7명', '8명'],
    총10명이상: ['1명', '2명', '3명', '4명', '5명', '6명', '7명', '8명', '9명', '10명이상'],
};
// 모집 여부 변경 시 현재 모집 중인 인원 업데이트
status_select.addEventListener('change', function () {
    const selected_status = this.value;
    const selected_total_recruits = total_recruits_select.value;
    current_recruits_select.disabled = false;
    current_recruits_select.innerHTML = '<option value="">현재 모집 중인 인원 선택</option>';

    if (selected_total_recruits && selected_status == '모집중') {
        const member_list = recruits_member[selected_total_recruits];
        member_list.forEach(member => {
            const option = document.createElement('option');
            option.value = member;
            option.textContent = member;
            current_recruits_select.appendChild(option);
        });
    } else {
        current_recruits_select.disabled = true;
    }
});
current_recruits_select.addEventListener('change', function () {
    const selected_current_recruits = this.value;
});
// 총 모집 인원 변경 시 현재 모집 중인 인원 업데이트
total_recruits_select.addEventListener('change', function () {
    const selected_total_recruits = this.value;
    const selected_status = status_select.value;
    current_recruits_select.disabled = false;
    current_recruits_select.innerHTML = '<option value="">현재 모집 중인 인원 선택</option>';

    if (selected_total_recruits && selected_status == '모집중') {
        const member_list = recruits_member[selected_total_recruits];
        member_list.forEach(member => {
            const option = document.createElement('option');
            option.value = member;
            option.textContent = member;
            current_recruits_select.appendChild(option);
        });
    } else {
        current_recruits_select.disabled = true;
    }
});
current_recruits_select.addEventListener('change', function () {
    const selected_current_recruits = this.value;
});