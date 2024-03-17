
function submitForm(event) {
    // 폼 제출을 막기
    event.preventDefault();

    //시작 알리기
    window.alert('시작합니다')

    // 폼의 값을 가져오기
    var tempbusStopNumber = document.getElementById("searchInput").value;
    var busStopNumber = findLeftValue(csvData,tempbusStopNumber);

    var busNumber = document.getElementById("busNumber").value;
    var targetNumber = document.getElementById("targetNumber").value;

    var springURL = `http://localhost:8080/systemStart?nodeId=${busStopNumber}&targetNumber=${targetNumber}&targetBus=${busNumber}`;
    
    fetch(springURL);

    // 변수 확인 로그
    console.log("버스 정류장 번호: " + busStopNumber);
    console.log("버스 번호: " + busNumber);
    console.log("몇 정류장 전에 알려드릴까요?: " + targetNumber);

    // 여기서 데이터를 사용하거나 서버로 전송하는 등의 작업을 수행할 수 있습니다.
    // 예: ajax 요청, 페이지 이동 등

    //봉인
    // 서비스워커 컨트롤러 확인 후 메시지 전송, 서비스워커에 데이터 전달
    // if (navigator.serviceWorker.controller) {
    //     navigator.serviceWorker.controller.postMessage({
    //         type: 'personal',
    //         data: {
    //             busStopNumber: busStopNumber,
    //             busNumber: busNumber,
    //             targetNumber: targetNumber
    //         }
    //     });
    // } else {
    //     console.error('Service Worker controller is null.');
    // }
}




