var gameScreen = new sceneClass()

gameScreen.initialize = () => {
    var that = gameScreen
    // end delay
    that.endDelay = 2000
    // players actual score
    that.score = CONSTANTS.rocketScore
    // delay between launching rockets
    that.timer = 39
    // All running rockets class
    that.rockets = []
    // time of no action
    that.noActionTime = 0
    
    elementManager.scoreElement.innerText = that.score
    elementManager.scoreContainerElement.style.opacity = 1
    elementManager.helpElement.style.opacity = 0
}

gameScreen.update = (dt) => {
    var that = gameScreen

    that.noActionTime += dt

    that.timer += 1
    
    if (that.timer % 40 == 0 && that.rockets.length < Math.ceil(window.innerWidth / 100))
        that.rockets.push(new rocketClass(window.lerp(CONSTANTS.minRocketSize, CONSTANTS.maxRocketSize, Math.random()), Math.max(Math.random() * 2, 1)))

    that.rockets.forEach(rocket => {
        if (that.score > 0)
            rocket.update(dt)
    });

    if (that.score <= 0) {
        for (let index = 0; index < that.rockets.length; index++) {
            var point = that.rockets[index].getCenter()
            var radius = that.rockets[index].getRadius()
            if (point.y < window.innerHeight) {
                particleManager.createExplosion(point.x, point.y, radius)
                that.initFirework(point.x,point.y)
            }
            that.rockets.splice(index, 1)[0]
            index--
        }

        that.endDelay -= dt
        if (that.endDelay < 0)
            that.isCompleted = true
    }

    if (that.noActionTime > 10000) {
        elementManager.helpElement.style.opacity = 1   
    }
}

gameScreen.draw = (ctx) => {
    var that = gameScreen

    that.rockets.forEach(rocket => {
        rocket.draw(ctx)
    })
}

gameScreen.cursorEvent = (cursor, isCursorPressed) => {
    var that = gameScreen

    if (isCursorPressed) {
        that.noActionTime = 0
        elementManager.helpElement.style.opacity = 0
    }

    that.rockets.forEach(rocket => {
        if (isCursorPressed && rocket.isMouseIn(cursor.x, cursor.y)) {
            var point = rocket.getCenter()
            var radius = rocket.getRadius()
            rocket.init(Math.max(Math.random() * 2, 1))

            that.score--
            elementManager.scoreElement.innerText = that.score
            
            particleManager.createExplosion(point.x, point.y, radius)

            that.initFirework(point.x,point.y)
        }
    });
}

gameScreen.initFirework = (x, y) => {
    var that = gameScreen
    
    var number = Math.max(Math.floor(Math.random() * 60), 20)
    var move = Math.random() * 90

    var color = window.random(COLORS.particleColorArray)
    for (let index = 0; index < number; index++) {            
        var angle = (((2 * Math.PI) / number) * index) + move
        particleManager.createFirework(x,y, angle, color)
    }
}

sceneManager.addSceneAtIndex(gameScreen, 2)
