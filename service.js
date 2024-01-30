function submitForm(event) {
    // 폼 제출을 막기
    event.preventDefault();

    window.alert('시작합니다')
    // 폼의 값을 가져오기
    var busStopNumber = document.getElementById("busStopNumber").value;
    var busNumber = document.getElementById("busNumber").value;
    var targetNumber = document.getElementById("targetNumber").value;

    // 변수 확인 (이 부분을 원하는 대로 수정할 수 있습니다.)
    console.log("버스 정류장 번호: " + busStopNumber);
    console.log("버스 번호: " + busNumber);
    console.log("몇 정류장 전에 알려드릴까요?: " + targetNumber);

    // 여기서 데이터를 사용하거나 서버로 전송하는 등의 작업을 수행할 수 있습니다.
    // 예: ajax 요청, 페이지 이동 등
    apiCall(busStopNumber, busNumber, targetNumber);
}

function alarm() {
    const url = 'https://api.flarelane.com/v1/projects/e6060748-0244-4a5b-8029-2c9d6a2f0876/notifications';
    const token = '8R6iUE3lSyz4aW_O0cjFm';

    const data = {
        targetType: 'device',
        targetIds: ['88fb7f8b-b66c-4aa6-ba34-a544e4171a4c'],
        title: '안녕하세요',
        body: '빨리 출발하세요'
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));

}


function apiCall(busStopNumber, busNumber, targetNumber) {
    console.log("apiCall 실행");

    var url = `http://localhost:8080/busstop/${busStopNumber}/buses`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('API 호출에 실패했습니다.');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            //const targetBus = data.find(bus => bus.busNumber === "527");
            const targetBus = data.find(bus => bus.busNumber === busNumber);
            if (targetBus) {
                const remainingBusStop527 = targetBus.remainingBusStop;
                document.getElementById('test').innerHTML = remainingBusStop527;
                console.log("busNumber 527의 remainingBusStop 값:", remainingBusStop527);

                // 특정 조건이 충족되면 푸시 알림 표시
                if (remainingBusStop527 <= targetNumber) {
                    console.log('여기 까지 온건가');
                    alarm();
                    window.alert("end!");
                    return;
                }


            } else {
                console.log("해당하는 busNumber를 찾을 수 없습니다.");
            }
            // Schedule the next fetch after a delay
            setTimeout(() => apiCall(busStopNumber, busNumber, targetNumber), 5000);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}