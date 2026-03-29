/**
 * Utility methods for drawing images with various helpers.
 */
var imageCommon = (function() {

    var isDrawableImage = image => image && image.complete && image.naturalWidth > 0 && image.naturalHeight > 0

    var drawImageInRect = (ctx, image, rect) => {
        if (!isDrawableImage(image)) {
            return
        }
        ctx.drawImage(image,
            rect.x, rect.y, rect.width, rect.height)
    }

    var drawImageInScreenCenter = (ctx, image, scale) => {
        if (!isDrawableImage(image)) {
            return
        }
        ctx.drawImage(image,
            (window.innerWidth - (image.width * scale)) / 2, (window.innerHeight - (image.height * scale)) / 2, 
            image.width * scale, image.height * scale)
    }
    
    var drawImageInScreenCenterTranslate = (ctx, image, scale, dx, dy) => {
        if (!isDrawableImage(image)) {
            return
        }
        ctx.drawImage(image,
            dx + (window.innerWidth - (image.width * scale)) / 2, dy +(window.innerHeight - (image.height * scale)) / 2, 
            image.width * scale, image.height * scale)
    }

    return {
        isDrawableImage,
        drawImageInRect,
        drawImageInScreenCenter,
        drawImageInScreenCenterTranslate
    }
})()
