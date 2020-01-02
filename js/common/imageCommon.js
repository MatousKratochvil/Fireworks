var imageCommon = (function() {

    drawImageInRect = (ctx, image, rect) => {
        ctx.drawImage(image,
            rect.x, rect.y, rect.width, rect.height)
    }

    drawImageInScreenCenter = (ctx, image, scale) => {
        ctx.drawImage(image,
            (window.innerWidth - (image.width * scale)) / 2, (window.innerHeight - (image.height * scale)) / 2, 
            image.width * scale, image.height * scale)
    }
    
    drawImageInScreenCenterTranslate = (ctx, image, scale, dx, dy) => {
        ctx.drawImage(image,
            dx + (window.innerWidth - (image.width * scale)) / 2, dy +(window.innerHeight - (image.height * scale)) / 2, 
            image.width * scale, image.height * scale)
    }

    return {
        drawImageInRect,
        drawImageInScreenCenter,
        drawImageInScreenCenterTranslate
    }
})()