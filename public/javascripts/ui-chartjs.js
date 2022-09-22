
var chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    info: '#41B1F9',
    blue: '#3245D1',
    purple: 'rgb(153, 102, 255)',
    grey: '#EBEFF6'
};

var ctxBar = document.getElementById("bar").getContext("2d");
var myBar = new Chart(ctxBar, {
    type: 'bar',
    data: {
        labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"],
        datasets: [{
            label: 'Students',
            backgroundColor: [chartColors.info, chartColors.blue, chartColors.info, chartColors.blue, chartColors.info, chartColors.blue, chartColors.info],
            data: [
                60,
                100,
                75,
                80,
                85,
                95,
                75,
            ]
        }]
    },
    options: {
        responsive: true,
        barRoundness: 1,
        title: {
            display: true,
            text: "Promedios del 2020"
        },
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false,
                    suggestedMax: 40 + 20,
                    padding: 10,
                },
                gridLines: {
                    drawBorder: false,
                }
            }],
            xAxes: [{
                gridLines: {
                    display: false,
                    drawBorder: false
                }
            }]
        }
    }
});



var ctxBar = document.getElementById("doughnut").getContext("2d");
var myBar = new Chart(ctxBar, {
    type: 'doughnut',
    data: {
        
        datasets: [{
            label: 'Students',
            backgroundColor: [chartColors.grey, chartColors.blue],
            data: [
                40,
                60,
            ]
        }]
    },
    options: {
        responsive: true,
        barRoundness: 1,
        title: {
            display: true,
            text: "Promedio"
        },
        legend: {
            display: false
        },
       
    }
});


// let ctx1 = document.getElementById("canvas1").getContext("2d");
// let ctx2 = document.getElementById("canvas2").getContext("2d");
// let ctx3 = document.getElementById("canvas3").getContext("2d");
// let ctx4 = document.getElementById("canvas4").getContext("2d");
// var lineChart1 = new Chart(ctx1, config1);
// var lineChart2 = new Chart(ctx2, config2);
// var lineChart3 = new Chart(ctx3, config3);
// var lineChart4 = new Chart(ctx4, config4);