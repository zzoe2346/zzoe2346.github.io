initfetch()



function initfetch() {
    var url = 'http://localhost:8080/busstop/20884/buses';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('API 호출에 실패했습니다.');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            const targetBus = data.find(bus => bus.busNumber === "527");
            if (targetBus) {
                const remainingBusStop527 = targetBus.remainingBusStop;
                document.getElementById('test').innerHTML = remainingBusStop527;
                console.log("busNumber 527의 remainingBusStop 값:", remainingBusStop527);

                // 특정 조건이 충족되면 푸시 알림 표시
                if (remainingBusStop527 <= 100) {
                    console.log('여기 까지 온건가')
                    showNotification("버스 도착 예정입니다!");
                }
            } else {
                console.log("해당하는 busNumber를 찾을 수 없습니다.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

