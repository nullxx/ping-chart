const ping = require('ping');

const host = process.env.DEFAULT_PING_HOST;
const maxPerView = parseInt(process.env.MAX_ELEMENTS_PER_VIEW, 10);
const timeIntervalMS = parseInt(process.env.TIME_INTERVAL, 10);

var ctx = document.getElementById('chart').getContext('2d');

var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'time of response (ms)',
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
                    beginAtZero: true,
                    callback: function (value, index, values) {
                        return `${value} ms`
                    }
                },
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

            res({ isAlive, time: { seconds: timeDiff, ms: timeDiff * 1000 }, startTime: startTime.toLocaleTimeString() });
        })
    })
}

setInterval(async () => {
    const response = await doPing(host);
    if (!response.err) {
        if (response.isAlive) {
            chart.data.datasets[0].data.push(response.time.ms)
            chart.data.labels.push(response.startTime);
            if (chart.data.datasets[0].data.length >= maxPerView) {
                chart.data.datasets[0].data.splice(0, 1);
                chart.data.labels.splice(0, 1);
            }
            chart.update();
        }
    }
}, timeIntervalMS);