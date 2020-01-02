/**
 * Particle manager to handle
 * particles to be used
 */
var particleManager = (function () {
    
    // --------------------
    // Variables
    // --------------------

    /**
     * explisonParticle paricles active array
     */
    var explosionActive = []
    /**
     * ireworkParticle particles active array
     */
    var fireworksActive = []

    // --------------------
    // Public functions
    // --------------------

    this.createExplosion = (x,y, radius) => {
        var particle = particlePools.getExplosionParticle()
        particle.reset(x, y, radius)
        explosionActive.push(particle)
    }

    this.createFirework = (x,y, angle, color) => {
        var particle = particlePools.getFireworkParticle()
        particle.reset(x, y, angle, color)
        fireworksActive.push(particle)
    }

    this.update = (dt) => {
        var maxLength = Math.max(
            explosionActive.length,
            fireworksActive.length
            )
        
        var explosionLastIndex = 0,
            fireworksLastIndex = 0

        for (let index = 0; index < maxLength; index++) {
            // Check and update particle
            if (explosionLastIndex < explosionActive.length) {
                explosionActive[explosionLastIndex].update(dt)
                if (explosionActive[explosionLastIndex].isDead) {
                    particlePools.putExplosionParticle(explosionActive.splice(explosionLastIndex, 1)[0])
                    explosionLastIndex--
                }
            }
            // Check and update particle
            if (fireworksLastIndex < fireworksActive.length) {
                fireworksActive[fireworksLastIndex].update(dt)
                if (fireworksActive[fireworksLastIndex].isDead) {
                    particlePools.putFireworkParticle(fireworksActive.splice(fireworksLastIndex, 1)[0])
                    fireworksLastIndex--
                }
            }
                
            // increment indexes
            explosionLastIndex++
            fireworksLastIndex++
        }
    }

    this.draw = (ctx) => {
        var maxLength = Math.max(
            explosionActive.length,
            fireworksActive.length
            )

        for (let index = 0; index < maxLength; index++) {
            // Check and draw particle
            if (index < explosionActive.length)
                explosionActive[index].draw(ctx)
            // Check and draw particle
            if (index < fireworksActive.length)
                fireworksActive[index].draw(ctx)
        }
    }

    return {
        // Game loop functions
        draw,
        update,
        // explosion particle
        createExplosion,
        // firework particle
        createFirework
    }
})()