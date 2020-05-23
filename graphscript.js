function loadStackedChart() {
	var stackedChartElement = document.getElementById('stackedChart');
	var stackedChart = new Chart(stackedChartElement, {
		// The type of chart we want to create
		type: 'line',

		// The data for our dataset
		data: {
			labels: graphdataDay,
			datasets: [
			{
				label: 'Infected',
				backgroundColor: 'rgba(255, 0, 0,0.7)',
				borderColor: 'rgb(255, 0, 0)',
				data: graphdataInfected
			},
			{
				label: 'Recovered',
				backgroundColor: 'rgba(255, 255, 0,0.7)',
				borderColor: 'rgb(255, 255, 0)',
				data: graphdata_stacked_Recovered
			},
			{
				label: 'Susceptible',
				backgroundColor: 'rgba(255, 255, 255,0.7)',
				borderColor: 'rgb(255, 255, 255)',
				data: graphdata_stacked_Susceptible
			},
			]
		},

		// Configuration options go here
		options: {
			responsive: true,
			legend: {
				display: true,
				labels: {
					fontColor: 'rgb(255, 99, 132)'
				}
			},
			title: {
				display: true,
				text: 'Stacked SIR Chart'
			}
		}
	});

	window.stackedChart = stackedChart;
}
function loadRawChart() {
	var rawChartElement = document.getElementById('rawChart');
	var rawChart = new Chart(rawChartElement, {
		// The type of chart we want to create
		type: 'line',

		// The data for our dataset
		data: {
			labels: graphdataDay,
			datasets: [
			{
				label: 'Infected',
				backgroundColor: 'rgba(255, 0, 0,0.7)',
				borderColor: 'rgb(255, 0, 0)',
				data: graphdataInfected
			},
			{
				label: 'Recovered',
				backgroundColor: 'rgba(255, 255, 0,0.7)',
				borderColor: 'rgb(255, 255, 0)',
				data: graphdataRecovered
			},
			{
				label: 'Susceptible',
				Color: 'rgba(255, 255, 255,0.2)',
				backgroundColor: 'rgba(255, 255, 255,0.7)',
				borderColor: 'rgb(255, 255, 255)',
				data: graphdataSusceptible
			}
			]
		},

		// Configuration options go here
		options: {
			responsive: true,
			legend: {
				display: true,
				labels: {
					fontColor: 'rgb(255, 99, 132)'
				}
			},
			title: {
				display: true,
				text: 'Raw Data Chart'
			}
		}
	});

	window.rawChart = rawChart;
}
loadStackedChart();
loadRawChart();