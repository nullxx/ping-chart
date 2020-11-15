const ping = require('ping');

const host = '1.1.1.1';
const maxPerView = 27;

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'time of response',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
    }
});

const doPing = (host = '1.1.1.1') => {
    return new Promise((res, rej) => {
        const startTime = new Date();

        ping.sys.probe(host, (isAlive, err) => {
            if (err) return rej({ err });
            const endTime = new Date();
            var timeDiff = endTime - startTime; 

            timeDiff /= 1000;

            res({ isAlive, seconds: timeDiff, startTime: startTime.toLocaleTimeString() });
        })

    })

}

setInterval(async () => {
    const response = await doPing(host);
    if (!response.err) {
        if (response.isAlive) {
            myChart.data.datasets[0].data.push(response.seconds)
            myChart.data.labels.push(response.startTime);
            if(myChart.data.datasets[0].data.length >= maxPerView) {
                myChart.data.datasets[0].data.splice(0, 1);
                myChart.data.labels.splice(0, 1);
            }
            myChart.update()
        }
    }
}, 1000);