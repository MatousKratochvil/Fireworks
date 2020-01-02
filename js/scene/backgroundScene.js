var backgroundScene = new sceneClass()
    
// Cursor point object
backgroundScene.cursorPoint = {}
// Panorama translate point
backgroundScene.panoramaTranslatePoint = {}
// For check if moon animation is over
backgroundScene.showPanorama = false    

backgroundScene.cursorEvent = (cursor) => {
    backgroundScene.cursorPoint = cursor
}

backgroundScene.update = (dt) => {
    var that = backgroundScene

    if (that.showPanorama) {
        if (that.panoramaTranslatePoint.x > 0)
            that.panoramaTranslatePoint.x *= 0.99
        else if (that.panoramaTranslatePoint.x < 0)
            that.panoramaTranslatePoint.x = 0

        if (that.panoramaTranslatePoint.y > 150)
            that.panoramaTranslatePoint.y *= 0.99
        else if (that.panoramaTranslatePoint.y < 150) {
            that.panoramaTranslatePoint.y = 150
    }
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
    imageCommon.drawImageInScreenCenter(ctx, elementManager.logoImage, 1/10)

    ctx.restore()

    if (that.showPanorama)
        imageCommon.drawImageInScreenCenterTranslate(ctx, elementManager.panoramaImage, 1.5, that.panoramaTranslatePoint.x, that.panoramaTranslatePoint.y)
}

backgroundScene.panoramaView = (point) => {
    var that = backgroundScene

    that.panoramaTranslatePoint = point
    that.showPanorama = true
}

sceneManager.addBackgroundScene(backgroundScene)