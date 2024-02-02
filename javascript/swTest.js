// service-worker.js

self.addEventListener('install', (event) => {
    // 서비스워커 설치 시 초기화 작업
    self.skipWaiting();
    console.log('stat')
});

self.addEventListener('activate', (event) => {
    // 서비스워커 활성화 시 초기화 작업
});
self.addEventListener('message', (event) => {
    console.log('message');
    if (event.data && event.data.type === 'start') {
        const data = event.data.data;
        // 여기서 data.busStopNumber, data.busNumber, data.targetNumber 등을 사용할 수 있습니다.
        console.log('Received data in service worker:', data);
    }
});
console.log('slnfsdfnsd');
function fetchData() {
    // 여기에서 API 호출 및 작업을 수행합니다.
    fetch('https://api.example.com/data')
        .then(response => response.json())
        .then(data => {
            // 백그라운드에서 데이터를 이용한 작업을 수행 가능
            console.log('Data received:', data);

            // 예: 메인 스레드에 데이터 업데이트를 전송
            self.clients.matchAll().then(clients => {
                clients.forEach(client => {
                    client.postMessage({ type: 'update', data });
                });
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

