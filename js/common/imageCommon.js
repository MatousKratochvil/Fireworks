/**
 * Utility methods for drawing images with various helpers.
 */
var imageCommon = (function() {

    isDrawableImage = image => image && image.complete && image.naturalWidth > 0 && image.naturalHeight > 0

    drawImageInRect = (ctx, image, rect) => {
        if (!isDrawableImage(image)) {
            return
        }
        ctx.drawImage(image,
            rect.x, rect.y, rect.width, rect.height)
    }

    drawImageInScreenCenter = (ctx, image, scale) => {
        if (!isDrawableImage(image)) {
            return
        }
        ctx.drawImage(image,
            (window.innerWidth - (image.width * scale)) / 2, (window.innerHeight - (image.height * scale)) / 2, 
            image.width * scale, image.height * scale)
    }
    
    drawImageInScreenCenterTranslate = (ctx, image, scale, dx, dy) => {
        if (!isDrawableImage(image)) {
            return
        }
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
