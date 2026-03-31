/**
 * Start menu scene with the play button animation.
 */
var menuScene = new sceneClass()

// Hold button image animation
menuScene.buttonAnimation

menuScene.initialize = () => {
    var that = menuScene

    if (sceneManager.hasBackground())
        sceneManager.getBackgroundScene().panoramaView({x:0, y: window.innerHeight/2})

    elementManager.startButton.innerHTML = "Start"
    elementManager.startButton.style.display = 'block'
    elementManager.startButton.onclick = null
    elementManager.startButton.ontouchend = null

    that.buttonAnimation = anime.timeline({
        targets: elementManager.startButton,
    }).add({
        opacity: 1,
        duration: 500,
        complete: () => {
            const handler = function (event) {
                if (event)
                    event.preventDefault()

                that.isCompleted = true
                elementManager.startButton.style.display = 'none'
                elementManager.startButton.onclick = null
                elementManager.startButton.ontouchend = null
            }

            elementManager.startButton.onclick = handler
            elementManager.startButton.ontouchend = handler
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
