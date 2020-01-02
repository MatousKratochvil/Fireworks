function baseMoveParticle(cx, cy, inRadius, inAngle, inSpeed) {
    baseParticle.call(this, cx, cy, inRadius, inAngle)

    this.speed = !isNaN(inSpeed) ? inSpeed : 0.1
    this.startPoint = {
        x: this.x,
        y: this.y
    }
    this.movePoint = {
        x: Math.cos(this.angle),
        y: Math.sin(this.angle)
    }
}

baseMoveParticle.prototype.update = function (dt) {
    this.x += this.movePoint.x * this.speed * dt
    this.y += this.movePoint.y * this.speed * dt
}

baseMoveParticle.prototype.reset = function (cx, cy, inRadius, inAngle, inSpeed) {
    baseParticle.prototype.reset.call(this, cx, cy, inRadius, inAngle)

    this.speed = !isNaN(inSpeed) ? inSpeed : 0.1
    this.startPoint = {
        x: this.x,
        y: this.y
    }
    this.movePoint = {
        x: Math.cos(this.angle),
        y: Math.sin(this.angle)
    }
}