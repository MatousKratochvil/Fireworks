/**
 * Class for rocket
 * @param {scale} scale - scale of the image
 */
function rocketClass (scale, inSpeed) {

    // Variables
    var spriteRect = {}

    var startPoint = {}
    var movePoint = {}
    var endPoint = {}
    var actualPoint = {x: 0, y: 0}
    var angle = 0
    this.speed = !isNaN(inSpeed) ? inSpeed : 1

    var particles = []

    this.init = (inSpeed) => {

        var pos = Math.min(Math.floor(Math.random() * 4), 4)

        // Hard Coded
        spriteRect = {
            x: pos * 46,
            y: 0,
            width: 46,
            height: 96
        }       
        
        this.speed = !isNaN(inSpeed) ? inSpeed : 1

        startPoint = {x: Math.floor(Math.random() * window.innerWidth), y: window.innerHeight + (spriteRect.width * scale) * 1.5}
        
        actualPoint.x = startPoint.x
        actualPoint.y = startPoint.y
        
        endPoint = {x: Math.floor(Math.random() * window.innerWidth), y: -(spriteRect.width * scale * 1.5)}

        var dx = endPoint.x - startPoint.x
        var dy = endPoint.y - startPoint.y

        angle = Math.atan2(dy, dx)

        movePoint = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }        

        
        while(particles.length > 0){
            particlePools.putFireParticle(particles.shift())
        }

        for (var index = 0; index < (20 * scale); index++) {
            particles.push(particlePools.getFireParticle())
        }
    }

    this.update = (dt) => {
        actualPoint.x += movePoint.x * (dt / 10) * this.speed
        actualPoint.y += movePoint.y * (dt / 10) * this.speed

        if ((actualPoint.y + (scale * spriteRect.height * CONSTANTS.maxRocketFireLength)) < 0)
            this.init()

        particles.forEach(particle => { 
            particle.update(dt)
            if (particle.isDead)
                particle.reset(anime.random(-((spriteRect.width * scale) / 4), (spriteRect.width * scale) / 4), (spriteRect.height * scale) / 2, spriteRect.width * scale, this.speed)
        })
    }

    this.draw = (ctx) => {

        ctx.save()
        
        ctx.translate(actualPoint.x, actualPoint.y)
        
        ctx.translate((spriteRect.width * scale) * 0.5, (spriteRect.height * scale) * 0.5)
        ctx.rotate(angle + (90 * Math.PI / 180))
        if (Math.abs(angle) >  (Math.PI / 2))
        ctx.scale(-1,1)
        
        particles.forEach(particle => { 
            particle.draw(ctx)
        })

        if (imageCommon.isDrawableImage(elementManager.rocketSpriteImage)) {
            ctx.drawImage(elementManager.rocketSpriteImage, 
                spriteRect.x, spriteRect.y, spriteRect.width, spriteRect.height,
                -((spriteRect.width * scale) / 2), -((spriteRect.height * scale) / 2), spriteRect.width * scale, spriteRect.height * scale)
        }
    
        ctx.restore()

    }

    this.isMouseIn = (x,y) => {

        if(!common.isMobile()) {
            var dx = x - (actualPoint.x + (spriteRect.width * scale) * 0.5)
            var dy = y - (actualPoint.y + (spriteRect.height * scale) * 0.5) 

            var h1 = Math.sqrt(dx*dx + dy*dy)
            var currA = Math.atan2(dy,dx)

            var newA = currA - angle
            newA += (90 * Math.PI / 180)

            var x2 = Math.cos(newA) * h1
            var y2 = Math.sin(newA) * h1        
                
            if (x2 > -0.5 * (spriteRect.width * scale) && x2 < 0.5 * (spriteRect.width * scale) && y2 > -0.5 * (spriteRect.height * scale) && y2 < 0.5 * (spriteRect.height * scale)){
                return true
            } else {
                return false
            }
        } else {
            var circle = {
                x: x,
                y: y,
                r: 25
            }

            var distX = Math.abs(circle.x - (actualPoint.x + (spriteRect.width * scale) * 0.5));
            var distY = Math.abs(circle.y - (actualPoint.y + (spriteRect.height * scale) * 0.5));
        
            if (distX > ((spriteRect.width * scale) * 0.5 + circle.r)) { return false; }
            if (distY > ((spriteRect.height * scale) * 0.5 + circle.r)) { return false; }
        
            if (distX <= ((spriteRect.width * scale) * 0.5)) { return true; } 
            if (distY <= ((spriteRect.height * scale) * 0.5)) { return true; }
        
            var dx=distX-(spriteRect.width * scale) * 0.5;
            var dy=distY-(spriteRect.height * scale) * 0.5;
            return (dx*dx+dy*dy<=(circle.r*circle.r));
        }
    }

    this.getCenter = () => {
        return {
            x: actualPoint.x + ((spriteRect.width * scale) / 2),
            y: actualPoint.y + ((spriteRect.height * scale) / 2),
        }
    }

    this.getRadius = () => {
        return spriteRect.height * scale
    }

    this.init()
}
