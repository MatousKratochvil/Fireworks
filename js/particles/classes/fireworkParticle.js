/**
 * Streaking particle emitted during fireworks.
 */
function fireworkParticle (cx, cy, inAngle, inColor) {
    baseMoveParticle.call(this, cx, cy, Math.min(Math.max(Math.round(window.innerWidth / 200),3),30), inAngle, Math.random() * 10)

    this.color = inColor ? inColor : window.random(COLORS.particleColorArray)
    this.deadTime = 200

    this.lastPoint = {
        x: this.x,
        y: this.y
    }

    this.reset = function (cx, cy, inAngle, inColor) {
        baseMoveParticle.prototype.reset.call(this, cx, cy, Math.min(Math.max(Math.round(window.innerWidth / 200),3),30), inAngle, this.speed)

        this.speed = Math.random() * 10
        this.deadTime = 200
        
        this.color = inColor ? inColor : window.random(COLORS.particleColorArray)
        this.lastPoint = {
            x: this.x,
            y: this.y
        }
    }

    this.update = (dt) => {
        baseMoveParticle.prototype.update.call(this, dt / 10)
        this.lastPoint = {
            x: this.x,
            y: this.y
        }

        var dx = this.startPoint.x - this.x
        var dy = this.startPoint.y - this.y

        if (Math.sqrt((dx * dx) + (dy * dy)) > this.radius) {
            this.speed *= 0.90
        }

        this.deadTime--

        if (this.deadTime <= 0)
            this.isDead = true
    }

    this.draw = (ctx) => {
        ctx.save()
        
        var rad = Math.random()

        ctx.strokeStyle = this.color
        ctx.fillStyle = this.color
        ctx.lineWidth = Math.max(this.speed, 5)
        ctx.globalAlpha = this.deadTime/200 * rad
        ctx.beginPath()
        ctx.moveTo(this.lastPoint.x, this.lastPoint.y)
        ctx.lineTo(this.x,this.y)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(this.x ,this.y, this.radius + rad, 0, 2*Math.PI)
        ctx.fill()

        ctx.restore()
    }

}