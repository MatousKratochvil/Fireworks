/**
 * Initializes the canvas sketch and wires up event handlers.
 */
Sketch.create({
    container: document.querySelector('.whole-screen-fixed'),
    eventTarget: document.querySelector('body'),
    update() {
        sceneManager.update(this.dt)
    },
    mousemove() {
        sceneManager.mouseMove(this.mouse);
    },
    mousedown() {
        sceneManager.mouseDown(this.touches);
    },
    mouseup() {
        sceneManager.mouseUp(this.touches);
    },
    touchstart() {
        sceneManager.touchStart(this.touches);
    },
    touchmove() {
        sceneManager.touchMove(this.touches);
    },
    touchend() {
        sceneManager.touchEnd();
    },
    draw() {
        sceneManager.draw(this)
    }
})
var sketch = document.querySelector('.sketch')
document.querySelector('.sketch').focus()

window.addEventListener('resize', () => {
    sceneManager.resize(Sketch.instances[0])
})