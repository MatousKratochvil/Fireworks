/**
 * Scene responsible for rendering the static background elements.
 */
var backgroundScene = new sceneClass()
    
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
        that.panoramaTranslatePoint.x += (that.panoramaTargetPoint.x - that.panoramaTranslatePoint.x) * 0.05
        that.panoramaTranslatePoint.y += (that.panoramaTargetPoint.y - that.panoramaTranslatePoint.y) * 0.05
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

    imageCommon.drawImageInScreenCenter(ctx, elementManager.moonImage, 1)
    if (elementManager.logoImage)
        imageCommon.drawImageInScreenCenter(ctx, elementManager.logoImage, 1/10)

    ctx.restore()

    if (that.showPanorama) {
        var panoramaTranslateX = (that.cursorPoint.x - window.innerWidth / 2) / 120
        var panoramaTranslateY = (that.cursorPoint.y - window.innerHeight / 2) / 200
        var panoramaLayerArray = [
            {image: elementManager.panoramaBackImage, scale: 1.5, moveScale: 0.35, lift: 20},
            {image: elementManager.panoramaImage, scale: 1.5, moveScale: 0.6, lift: 0},
            {image: elementManager.panoramaFrontImage, scale: 1.5, moveScale: 0.95, lift: 40}
        ]

        panoramaLayerArray.forEach(layer => {
            imageCommon.drawImageInScreenBottomCenterTranslate(
                ctx,
                layer.image,
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
