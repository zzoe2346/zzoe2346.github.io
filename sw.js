importScripts("https://cdn.flarelane.com/ServiceWorker.js");

//폼 제출시 동작하는 리스너
self.addEventListener('message', (event) => {
    console.log('message');
    if (event.data && event.data.type === 'personal') {
        const data = event.data.data;
        // 여기서 data.busStopNumber, data.busNumber, data.targetNumber 등을 사용할 수 있습니다.
        console.log('Received data in service worker:', data);
        setInterval( ()=>alarm(), 5000);
        //apiCall(data.busStopNumber, data.busNumber, data.targetNumber);
    }
});


function apiCall(busStopNumber, busNumber, targetNumber) {
    console.log("apiCall 실행");

    //var url = `http://localhost:8080/busstop/${busStopNumber}/buses`;
    var url =`http://localhost:8080/bus`;

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
                //document.getElementById('test').innerHTML = remainingBusStop527;
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