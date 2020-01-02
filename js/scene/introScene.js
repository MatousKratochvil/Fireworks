var introScene = new sceneClass()

// For scaleing image in time
introScene.actualScale = 10
// Hold logo image animation
introScene.mainLogoAnimation
// For check if logo animation is done
introScene.isLogoDrawn = false
// Hold moon image animation
introScene.moonAnimation

introScene.logoAnimation

introScene.logoRect = {x: 0, y: 0, width: 720, height: 220}
introScene.moonRect = {x: 200, y: 200, width: 150 *5, height: 150 * 5}

introScene.initialize = () => {
    var that = introScene

    // base class setting
    that.useOwnBackground = true

    elementManager.helpElement.style.opacity = 0 

    var logoDOMRect = elementManager.logoElement.getBoundingClientRect()
    that.logoRect = {
        x: logoDOMRect.x,
        y: logoDOMRect.y,
        width: logoDOMRect.width,
        height: logoDOMRect.height
    }
    that.logoAnimation = anime({
        targets: that.logoRect,
        width: (720 / 10),
        height: (220 / 10),
        easing: 'easeOutQuad',
        duration: 3000,
        autoplay: false
    })

    that.moonRect = {
        x: 0,
        y: 0,
        width: elementManager.moonImage.width * 10,
        height: elementManager.moonImage.height * 10
    }
    
    common.centerlizeRect(that.moonRect, common.centerTranslation)

    that.moonAnimation = anime({
        targets: that.moonRect,
        width: elementManager.moonImage.width,
        height: elementManager.moonImage.height,
        offset: 0,        
        easing: 'easeOutQuad',
        duration: 3000,
        autoplay: false,
        complete: () => {
            introScene.isCompleted = true
        }
    })

    that.mainLogoAnimation = anime.timeline({
        targets: elementManager.logoPath,
        opacity: 1,
        duration: 0
    }).add({
        strokeDashoffset: [anime.setDashoffset, 2140],
        easing: 'easeInQuad',
        duration: 5000,
    }).add({
        'fill-opacity': 1,
        'stroke-width': 0,
        easing: 'easeInOutQuad',
        duration: 1000
    }).add({
        targets: 'svg',
        easing: 'easeInOutSine',
        duration: 1000,
        complete: () => {
            that.isLogoDrawn = true
            that.moonAnimation.play()
            that.logoAnimation.play()
        }
    })
}

introScene.update = (dt, cursor) => {
    if (!introScene.isLogoDrawn)
        return
    
    elementManager.logoElement.style.opacity = 0

    common.centerlizeRect(introScene.logoRect, common.centerTranslation)
    common.centerlizeRect(introScene.moonRect, common.centerTranslation)
}

introScene.draw = (ctx) => {
    ctx.fillStyle = COLORS.bgColor
    ctx.fillRect(0,0,window.innerWidth, window.innerHeight)   
    
    imageCommon.drawImageInRect(ctx, elementManager.moonImage, introScene.moonRect)    
    if (introScene.isLogoDrawn) {
        imageCommon.drawImageInRect(ctx, elementManager.logoImage, introScene.logoRect)
    }
}

//sceneManager.addSceneOnTop(introScene)