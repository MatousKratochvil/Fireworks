var particlePools = (function () {
    
    // --------------------
    // Variables
    // --------------------

    /**
     * Pool for rocketfireParticle fire particles
     */
    var rocketFirePool = []
    /**
     * Pool for explisonParticle paricles
     */
    var explosionPool = []
    /**
     * Pool for fireworkParticle particles
     */
    var fireworkPool = []

    // --------------------
    // Public functions
    // --------------------

    /**
     * Return rocketFireParticle from pool 
     */
    this.getFireParticle = () => {
        var particle = rocketFirePool.shift()
        if (!particle)
            return new rocketFireParticle()
        return particle
    }

    /**
     * Take a particle and store it to rocketFirePool
     * @param {rocketFireParticle} particle - particle to put to array
     */
    this.putFireParticle = (particle) => {
        rocketFirePool.push(particle)
    }
        
    /**
     * Return explosionParticle from pool 
     */
    this.getExplosionParticle = () => {
        var particle = explosionPool.shift()
        if (!particle)
            return new explosionParticle()
        return particle
    }

    /**
     * Take a particle and store it to explosionPool
     * @param {explosionParticle} particle - particle to put to array
     */
    this.putExplosionParticle = (particle) => {
        explosionPool.push(particle)
    }

    /**
     * Return fireworkParticle from pool 
     */
    this.getFireworkParticle = () => {
        var particle = fireworkPool.shift()
        if (!particle)
            return new fireworkParticle()
        return particle
    }

    /**
     * Take a particle and store it to fireworkPool
     * @param {fireworkParticle} particle - particle to put to array
     */
    this.putFireworkParticle = (particle) => {
        fireworkPool.push(particle)
    }

    return {
        // fire particle
        getFireParticle,
        putFireParticle,
        // explosion particle
        getExplosionParticle,
        putExplosionParticle,
        // firework particle
        getFireworkParticle,
        putFireworkParticle
    }
})()