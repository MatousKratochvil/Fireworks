var endScene = new sceneClass()

endScene.rocket = {}
endScene.data = {}
endScene.particles = []

endScene.initialize = () => {
    var that = endScene

    that.rocket = new rocketClass(1.5,)
    that.lastText = false
    that.time = 5000

    elementManager.scoreContainerElement.style.opacity = 0
    elementManager.startButton.style.display = 'none'
    elementManager.helpElement.style.opacity = 0
    
    elementManager.startButton.innerHTML = "Restart";

    ['touchend', 'click'].forEach(evt => {
        elementManager.startButton.addEventListener(evt, function() {
            sceneManager.replaySceneAtIndex(2, true)
            elementManager.startButton.style.display = 'none'

            endScene.isInitialized = false
            endScene.isInitializedOnContext = false

            var clone = elementManager.startButton.cloneNode(true)
            elementManager.startButton.removeEventListener(evt, this)
        })
    })
}

endScene.initializeOnContext = (ctx) => {
    var canvas = elementManager.getCanvasSketch()
    common.clearCanvas(canvas)
    
    canvas.style.letterSpacing = Math.max((window.innerWidth / 20), 60) / 10+'px';
    ctx.font = "bold "+(window.innerWidth/4)+"px PF-font";
    ctx.fillStyle = "#fff"
    ctx.textAlign = "center";
    ctx.fillText("PF 2018", window.innerWidth/2, window.innerHeight/2);

    var data  = ctx.getImageData(0, 0, window.innerWidth, window.innerHeight).data;
    common.clearCanvas(elementManager.getCanvasSketch())
    ctx.globalCompositeOperation = 'source-over'

    endScene.particles = []
    for(var x = 0; x < window.innerWidth; x += Math.round((window.innerWidth/320)*5)){
        for(var y = 0; y < window.innerHeight; y += Math.round((window.innerHeight/568)*5)){
            if(data[ ((x + y * window.innerWidth)*4) - 1] == 255 
                && data[ ((x + y * window.innerWidth)*4) - 2] == 255
                && data[ ((x + y * window.innerWidth)*4) - 3] == 255){
                    endScene.particles.push(new textParticle(x,y - (window.innerWidth/40)));
            }
        }
    }
}

endScene.resize = (ctx) => {
    endScene.initializeOnContext(ctx)
}

endScene.update = (dt) => {
    var that = endScene
    
    if (!that.lastText) {

        that.rocket.update(dt)
        
        var rocketPosition = that.rocket.getCenter()
        if (rocketPosition.y < (window.innerHeight / 2)) {            
            var point = that.rocket.getCenter()
            var radius = that.rocket.getRadius()
            that.rocket.init()
            that.lastText = true

            that.particles.forEach(particle => {
                particle.setStartPos(point.x, point.y)
            })
            particleManager.createExplosion(point.x ,point.y, radius)
        }

        return
    }

    that.time -= dt

    that.particles.forEach(particle => {
        particle.update(dt)
    });

    if (that.time < 0) {
        that.time = 0
        elementManager.startButton.style.display = 'block'
        elementManager.startButton.style.opacity = 1
    }
}

endScene.draw = (ctx) => {
    var that = endScene

    if (!that.lastText) {
        that.rocket.draw(ctx)

        return
    }

    that.particles.forEach(particle => {
        particle.draw(ctx)
    });
}

endScene.cursorEvent = (cursor, isCursorPressed, isCursorDown) => {
    var that = endScene


    if (!that.lastText) {
        if (isCursorPressed && that.rocket.isMouseIn(cursor.x, cursor.y)) {
            var point = that.rocket.getCenter()
            var radius = that.rocket.getRadius()
            that.rocket.init()
            that.lastText = true

            that.particles.forEach(particle => {
                particle.setStartPos(point.x, point.y)
            })
            particleManager.createExplosion(point.x ,point.y, radius)
        }

        return
    }

    that.particles.forEach(particle => {
        if (!cursor && !isCursorDown) {
            particle.mouseMove(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
            return
        }
        particle.mouseMove(cursor.x, cursor.y)
    });
}

sceneManager.addSceneAtIndex(endScene, 3)