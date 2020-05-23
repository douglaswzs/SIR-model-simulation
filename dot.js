'use strict'
const SIR = {
	susceptible: 1,
	infected: 2,
	recovered: 3
};
class Dot {
	constructor(canvas, size, SIR) {

		this.pos = startLocation(canvas.x, canvas.y)
		this.speed = randCoordinate()
		this.direction = randCoordinate()
		this.colour = SIR === 2 ? color(255, 0, 0) : color(255, 255, 255)
		this.canvas = canvas
		this.size = size
		this.infected = SIR === 2
		this.SIR = SIR
		this.infectedTime = Date.now()

	}

	move() {
		this.checkBoundaries()
		this.pos = new Coordinate(this.pos.x + this.speed.x * this.direction.x, this.pos.y + this.speed.y * this.direction.y)
		// if (random() > 0.2) {
			
		// }
		// else {
		// 	this.pos.x += random(-5, 5)
		// 	this.pos.y += random(-5, 5)
		// }
	}

	checkBoundaries() {
		if (hitBoundary(this, 'x')) {
			this.direction.x *= -1
		}
		if (hitBoundary(this, 'y')) {
			this.direction.y *= -1
		}
	}

	render() {
		ellipse(this.pos.x, this.pos.y, this.size)
	}

	infect() {
		if (this.SIR === 1) {
			this.infected = true
			this.SIR = 2
			this.colour = color(255, 0, 0)
			this.infectedTime = Date.now()
		}
	}

	recover(timeToRecover) {

		if (this.infected) {
			let elaspedTime = (Date.now() - this.infectedTime)
			if (elaspedTime > timeToRecover) {
				this.recoverTime = elaspedTime
				this.infected = false
				this.SIR = 3
				this.colour = color(255, 255, 0)
			}
		}

	}

}

function hitBoundary(dot, axis) {
	return dot.pos[axis] > dot.canvas[axis] - dot.size || dot.pos[axis] < dot.size
}

function startLocation(x, y) {
	return new Coordinate(randRange(x, 5), randRange(y, 5))
}

function randRange(max, min) {
	return Math.ceil(Math.random() * (max - min) + min)
}

function rand(constraint) {
	return Math.ceil(Math.random() * constraint)
}

function randCoordinate() {
	return new Coordinate(rand(2), rand(2))
}

