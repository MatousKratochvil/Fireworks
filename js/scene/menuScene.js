var menuScene = new sceneClass()

// Hold button image animation
menuScene.buttonAnimation

menuScene.initialize = () => {
    var that = menuScene

    if (sceneManager.hasBackground())
        sceneManager.getBackgroundScene().panoramaView({x:0, y: window.innerHeight/2})

    that.buttonAnimation = anime.timeline({
        targets: elementManager.startButton,
    }).add({
        opacity: 1,
        duration: 500,
        complete: () => {
            // event to check in Mobile/Desktop
            ['touchend', 'click'].forEach(evt => {
                elementManager.startButton.addEventListener(evt, function() {
                    that.isCompleted = true
                    elementManager.startButton.style.display = 'none'
                    
                    var clone = elementManager.startButton.cloneNode(true)
                    elementManager.startButton.removeEventListener(evt, this)
                })
            })
        }
    })
}

menuScene.update = (dt, cursor) => {
    var that = menuScene

    if (!that.buttonAnimation.completed)
        that.buttonAnimation.play()
}

menuScene.draw = (ctx) => {
    var that = menuScene
}

sceneManager.addSceneAtIndex(menuScene, 1)