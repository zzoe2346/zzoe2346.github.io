
// CSV 데이터를 가져와서 처리하는 함수
function fetchCSV(url) {
    return fetch(url)
        .then(response => response.text())
        .then(text => text.split('\n').map(row => row.split(',')));
}

// 검색어에 맞는 자동완성을 생성하는 함수
function generateSuggestions(busStops, keyword) {
    const filteredStops = busStops.filter(stop => stop[1].toLowerCase().includes(keyword.toLowerCase()));
    return filteredStops.map(stop => `<li class="list-group-item" data-value="${stop[0]}">${stop[1]}</li>`).join('');//여기에 클래스 추가함!!! 24.03.17
}

// 페이지 로드 시 실행되는 코드
//const csvData =  fetchCSV('bus_stops.csv');

document.addEventListener('DOMContentLoaded', async () => {
    const csvData = await fetchCSV('bus_stops.csv');
    const searchInput = document.getElementById('searchInput');
    const suggestionsList = document.getElementById('suggestions');

    searchInput.addEventListener('input', event => {
        const userInput = event.target.value.trim();
        if (userInput === '') {
            suggestionsList.innerHTML = '';
            return;
        }

        const suggestionsHTML = generateSuggestions(csvData, userInput);
        suggestionsList.innerHTML = suggestionsHTML;
    });

    // 자동완성 항목을 클릭했을 때 검색 창에 값 채워넣기
    suggestionsList.addEventListener('click', event => {
        if (event.target.tagName === 'LI') {
            searchInput.value = event.target.textContent;
            suggestionsList.innerHTML = '';
    
        }
    });
});


