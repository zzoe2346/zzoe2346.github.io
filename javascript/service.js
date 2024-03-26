async function submitForm(event) {
    // 폼 제출을 막기
    event.preventDefault();

    //시작 알리기
    window.alert('시작합니다')
    



    // 폼의 값을 가져오기
    var busStopNumber = document.getElementById("searchInput").value.trim();
    var busStopName = busStopNumber;
    console.log(busStopNumber);
    busStopNumber= await getLeftValue(busStopNumber);
    console.log(busStopNumber);
    //busStopNumber = findLeftValue(csvData,busStopNumber);

    var busNumber = document.getElementById("busNumber").value;
    var targetNumber = document.getElementById("targetNumber").value;

    // var springURL = `http://localhost:8080//bus-arrival-info?nodeId=${busStopNumber}&targetNumber=${targetNumber}&targetBus=${busNumber}`;

    // var springURL = `http://101.101.216.221:8080/bus-arrival-info?nodeId=${busStopNumber}&targetNumber=${targetNumber}&targetBus=${busNumber}`;
    // var deviceId = FlareLane.getDeviceId(id => console.log(id));
    


    const userId = generateRandomID();


    var springURL = `https://101.101.216.221:8080/bus-arrival-info?nodeId=${busStopNumber}&targetNumber=${targetNumber}&targetBus=${busNumber}&userId=${userId}&deviceId=${deviceId}`;

    
    

    
    
    fetch(springURL);


  

    // 변수 확인 로그
    console.log("버스 정류장 번호: " + busStopNumber);
    console.log("버스 번호: " + busNumber);
    console.log("몇 정류장 전에 알려드릴까요?: " + targetNumber);
    // 페이지 이동
    // var url = "result.html" +
    //     "?busStopName=" + encodeURIComponent(busStopName) +
    //     "&busNumber=" + encodeURIComponent(busNumber) +
    //     "&targetNumber=" + encodeURIComponent(targetNumber);
    var url = "result.html" +
        "?busStopName=" + busStopName +
        "&busNumber=" + busNumber +
        "&targetNumber=" + targetNumber+
        "&userId=" + userId;
        

        setTimeout(function() {
            // 이 부분은 0.8초 후에 실행됩니다.
            window.location.href = url;
        }, 800);
    

    


    
    

}

async function getLeftValue(rightValue) {
    // CSV 파일을 가져와서 배열로 변환
    // csvData =  fetchCSV(url);
    const csvData = await fetchCSV('bus_stops.csv');

    if (!Array.isArray(csvData)) {
        console.error('CSV 데이터를 가져오는 데 문제가 있습니다.');
        return null;
    }
    // 오른쪽 값을 기준으로 왼쪽 값을 찾기
    for (const row of csvData) {
        
        if (row[1].trim() === rightValue) {
            return row[0]; // 왼쪽 값 반환
        }
    }


    // 일치하는 값이 없을 경우 null 반환
    return null;
}

function generateRandomID() {
    // 가능한 문자들
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let randomID = '';
    
    // 6자리 랜덤 ID 생성
    for (let i = 0; i < 8; i++) {
        randomID += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return randomID;
}





