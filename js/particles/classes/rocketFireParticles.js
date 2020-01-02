function rocketFireParticle (cx, cy, inRadius, inSpeed) {
    baseParticle.call(this, cx, cy, inRadius, 2 * Math.PI)

    this.moveY = 0
    this.endPos = {
        x: this.x + anime.random(-2, 2),
        y: this.y + anime.random(this.radius * CONSTANTS.minRocketFireLength, this.radius * CONSTANTS.maxRocketFireLength) + anime.random(-2, 2)
    }

    this.resetTime = 0
    this.actualTime = 0
    this.speed = 1

    this.reset = function (cx, cy, inRadius, inSpeed) {
        baseParticle.prototype.reset.call(this, cx, cy, inRadius, 2 * Math.PI)

        this.isDead = false      
        this.actualTime = 0
        this.resetTime = anime.random(10, 20) * this.speed
        this.speed = !isNaN(inSpeed) ? inSpeed : this.speed

        this.endPos = {
            x: this.x + anime.random(-2, 2),
            y: this.y + anime.random(this.radius * CONSTANTS.minRocketFireLength, this.radius * CONSTANTS.maxRocketFireLength) + anime.random(-2, 2)
        }
        this.moveY = ((this.endPos.y - this.y) / 2) * this.speed
    }

    this.draw = function (ctx) {
        var grad= ctx.createLinearGradient(0, 0, 0, 180)
        grad.addColorStop(0, "yellow")
        grad.addColorStop(1, "red")
        
        ctx.strokeStyle = grad
        
        ctx.beginPath()
        ctx.lineWidth = Math.min(this.radius / 4, 5)
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x, this.moveY)
        
        ctx.stroke();
    }
    
    this.update = function (dt) {
        this.moveY += ((dt / 10) * this.speed) 

        this.actualTime++

        if (this.actualTime > this.resetTime || this.moveY > this.endPos.y)
            this.isDead = true
    }
}