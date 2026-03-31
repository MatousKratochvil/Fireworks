/**
 * Scene responsible for rendering the static background elements.
 */
var backgroundScene = new sceneClass()
var panoramaInterpolationSpeed = 0.05
var panoramaCursorXDivisor = 120
var panoramaCursorYDivisor = 200
var panoramaLayerArray = [
    {imageName: 'panoramaBackImage', scale: 1.5, moveScale: 0.35, lift: 20},
    {imageName: 'panoramaImage', scale: 1.5, moveScale: 0.6, lift: 0},
    {imageName: 'panoramaFrontImage', scale: 1.5, moveScale: 0.95, lift: 40}
]
    
// Cursor point object
backgroundScene.cursorPoint = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
}
// Panorama translate point
backgroundScene.panoramaTranslatePoint = {x: 0, y: 0}
backgroundScene.panoramaTargetPoint = {x: 0, y: 0}
// For check if moon animation is over
backgroundScene.showPanorama = false    

backgroundScene.cursorEvent = (cursor) => {
    if (cursor && Number.isFinite(cursor.x) && Number.isFinite(cursor.y)) {
        backgroundScene.cursorPoint = cursor
    }
}

backgroundScene.update = (dt) => {
    var that = backgroundScene

    if (that.showPanorama) {
        that.panoramaTranslatePoint.x += (that.panoramaTargetPoint.x - that.panoramaTranslatePoint.x) * panoramaInterpolationSpeed
        that.panoramaTranslatePoint.y += (that.panoramaTargetPoint.y - that.panoramaTranslatePoint.y) * panoramaInterpolationSpeed
    }
}

backgroundScene.draw = (ctx) => {
    var that = backgroundScene

    ctx.fillStyle = COLORS.bgColor
    ctx.fillRect(0,0,window.innerWidth, window.innerHeight)

    ctx.save()

    var translatePoint = {}
    translatePoint.x = (that.cursorPoint.x - window.innerWidth / 2) / 500
    translatePoint.y = (that.cursorPoint.y - window.innerHeight  / 2) / 500

    ctx.translate(translatePoint.x, translatePoint.y)

    if (!that.showPanorama)
        imageCommon.drawImageInScreenCenter(ctx, elementManager.moonImage, 1)
    if (elementManager.logoImage)
        imageCommon.drawImageInScreenCenter(ctx, elementManager.logoImage, 1/10)

    ctx.restore()

    if (that.showPanorama) {
        var panoramaTranslateX = (that.cursorPoint.x - window.innerWidth / 2) / panoramaCursorXDivisor
        var panoramaTranslateY = (that.cursorPoint.y - window.innerHeight / 2) / panoramaCursorYDivisor

        panoramaLayerArray.forEach(layer => {
            imageCommon.drawImageInScreenBottomCenterTranslate(
                ctx,
                elementManager[layer.imageName],
                layer.scale,
                (that.panoramaTranslatePoint.x * layer.moveScale) + (panoramaTranslateX * layer.moveScale),
                (that.panoramaTranslatePoint.y * layer.moveScale) + (panoramaTranslateY * layer.moveScale) + layer.lift
            )
        })
    }
}

backgroundScene.panoramaView = (point) => {
    var that = backgroundScene

    that.panoramaTranslatePoint = {
        x: point.x,
        y: point.y
    }
    that.panoramaTargetPoint = {x: 0, y: 0}
    that.showPanorama = true
}

sceneManager.addBackgroundScene(backgroundScene)
