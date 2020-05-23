'use strict'

let canvas;
const width = 800;
const height = 800;
let population = 100;
let timeToRecover = 3000;
let dotSize = 16;

let dots = [];
let dayCounter = 0;
let dayInterval;
let infectionProbablity = 1;

let currentSusceptibleCount = 0;
let currentInfectedCount = 0;
let currentRecoveredCount = 0;

let graphdataDay = [];
let graphdataSusceptible = [];
let graphdataInfected = [];
let graphdataRecovered = [];
let graphdata_stacked_Susceptible = [];
let graphdata_stacked_Recovered = [];

function setup() {
	canvas = createCanvas(width, height);
	canvas.parent('sketch-holder');
	resetSketch();
	addEventToPage();
}

function draw() {
	background(51);
	checkComplete();
	moveDots();
	updateText();
}

function addEventToPage() {
	function dotsizesliderEvent() {
		dotSize = select('#dotsizeslider').value();
		select('#dotSize').html(`${dotSize}`);
	}
	
	function infectiondurationsliderEvent() {
		timeToRecover = select('#infectiondurationslider').value() * 1000;
		select('#timeToRecover').html(`${timeToRecover / 1000}`);
	}
	
	function populationsizesliderEvent() {
		population = select('#populationsizeslider').value();
		select('#populationSize').html(`${population}`);
	}

	select('#reset').mousePressed(resetSketch);
	select('#dotsizeslider').input(dotsizesliderEvent);
	select('#infectiondurationslider').input(infectiondurationsliderEvent);
	select('#populationsizeslider').input(populationsizesliderEvent);
}

function resetSketch() {
	dots = [];
	graphdataDay.length = 0;
	graphdataSusceptible.length = 0;
	graphdataInfected.length = 0;
	graphdataRecovered.length = 0;
	graphdata_stacked_Susceptible.length = 0;
	graphdata_stacked_Recovered.length = 0;
	dayCounter = 0;
	clearInterval(dayInterval);
	dayInterval = setInterval(timeItDaily, 1000);

	createPopulation()
	loop();

}

function timeItDaily() {
	dayCounter++;
	select('#timer').html(`Day: ${dayCounter}`);
	
	prepareGraph();
}

function prepareGraph(){
	graphdataDay.push(dayCounter);

	graphdata_stacked_Susceptible.push(currentSusceptibleCount + currentInfectedCount + currentRecoveredCount);
	graphdata_stacked_Recovered.push(currentRecoveredCount + currentInfectedCount);

	graphdataSusceptible.push(currentSusceptibleCount);
	graphdataInfected.push(currentInfectedCount);
	graphdataRecovered.push(currentRecoveredCount);

	window.stackedChart.update();
	window.rawChart.update();
}

function returnSusceptibleCount(dots) {
	return dots.reduce((counter, { SIR }) => SIR == 1 ? counter + 1 : counter, 0);
}

function returnInfectedCount(dots) {
	return dots.reduce((counter, { SIR }) => SIR == 2 ? counter + 1 : counter, 0);
}

function returnRecoveredCount(dots) {
	return dots.reduce((counter, { SIR }) => SIR == 3 ? counter + 1 : counter, 0);
}

function updateText() {
	currentSusceptibleCount = returnSusceptibleCount(dots);
	currentInfectedCount = returnInfectedCount(dots);
	currentRecoveredCount = returnRecoveredCount(dots);

	select('#susceptible').html(`${currentSusceptibleCount}`);
	select('#infected').html(`${currentInfectedCount}`);
	select('#recovered').html(`${currentRecoveredCount}`);

	select('#population').html(`${dots.length}`);

	select('#dotSize').html(`${dotSize}`);
	select('#timeToRecover').html(`${timeToRecover / 1000}`);
}

function checkComplete() {
	if (returnInfectedCount(dots) === 0) {
		noLoop();
		clearInterval(dayInterval);
	}
}

function moveDots() {
	for (const dot of dots) {
		dot.move();
		dot.recover(timeToRecover);
		fill(dot.colour);
		dot.render();
		if (dot.infected) {
			for (const dot2 of dots) {
				checkCollision(dot, dot2);
			}
		}
	}
}

function checkCollision(dot, dot2) {
	if (dist(dot.pos.x, dot.pos.y, dot2.pos.x, dot2.pos.y) < dot.size
		&& isOneInfected(dot, dot2)) {
		dot2.infect();
	}
}

function isOneInfected(dot, dot2) {
	return (dot.infected || dot2.infected) && !areBothInfected(dot, dot2)
}

function areBothInfected(dot, dot2) {
	return dot.infected && dot2.infected;
}

function createPopulation() {
	for (let i = 1; i < population; i++) {
		dots.push(new Dot(new Coordinate(width, height), dotSize, SIR.susceptible));
	}
	createCarrier();
}

function createCarrier() {
	const carrier = new Dot(new Coordinate(width, height), dotSize, SIR.infected);
	dots.push(carrier);
}