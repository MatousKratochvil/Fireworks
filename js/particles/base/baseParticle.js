/**
 * Basic particle containing position, radius and angle properties.
 */
function baseParticle(cx, cy, inRadius, inAngle) {
    this.x = !isNaN(cx) ? cx : 0
    this.y = !isNaN(cy) ? cy : 0
    this.radius = !isNaN(inRadius) ? inRadius : 0
    this.angle = !isNaN(inAngle) ? inAngle : 0
    this.isDead = false
}

baseParticle.prototype.reset = function (cx, cy, inRadius, inAngle) {
    this.x = !isNaN(cx) ? cx : this.x
    this.y = !isNaN(cy) ? cy : this.y
    this.radius = !isNaN(inRadius) ? inRadius : this.radius
    this.angle = !isNaN(inAngle) ? inAngle : this.angle
    this.isDead = false
}