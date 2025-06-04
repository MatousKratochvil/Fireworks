/**
 * Expanding circle particle used to simulate an explosion.
 */
function explosionParticle (cx, cy, inRadius) {
    baseParticle.call(this, cx, cy, inRadius, 0)

    this.endRadius = 0

    this.reset = function (cx, cy, inRadius) {
        baseParticle.prototype.reset.call(this, cx, cy, 0)
        this.endRadius = inRadius * CONSTANTS.explosionRadius
    }

    this.update = (dt) => {
        this.radius += (dt / 2)
        if (this.radius > this.endRadius)
            this.isDead = true
    }

    this.draw = (ctx) => {
        ctx.save()
        
        ctx.globalAlpha = 1 - (this.radius / this.endRadius)
        ctx.strokeStyle= "#fff"
        ctx.lineWidth = 5
        ctx.beginPath()
        ctx.arc(this.x ,this.y, this.radius, 0, 2*Math.PI)
        ctx.stroke()
        ctx.globalAlpha = 1

        ctx.restore()
    }
}