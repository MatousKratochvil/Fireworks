/**
 * Utility methods for drawing images with various helpers.
 */
var imageCommon = (function() {

    var isDrawableImage = image => image && image.complete && image.naturalWidth > 0 && image.naturalHeight > 0
    var getImageWidth = image => image.naturalWidth || image.width
    var getImageHeight = image => image.naturalHeight || image.height

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
        var imageWidth = getImageWidth(image)
        var imageHeight = getImageHeight(image)
        ctx.drawImage(image,
            (window.innerWidth - (imageWidth * scale)) / 2, (window.innerHeight - (imageHeight * scale)) / 2, 
            imageWidth * scale, imageHeight * scale)
    }
    
    var drawImageInScreenCenterTranslate = (ctx, image, scale, dx, dy) => {
        if (!isDrawableImage(image)) {
            return
        }
        var imageWidth = getImageWidth(image)
        var imageHeight = getImageHeight(image)
        ctx.drawImage(image,
            dx + (window.innerWidth - (imageWidth * scale)) / 2, dy +(window.innerHeight - (imageHeight * scale)) / 2, 
            imageWidth * scale, imageHeight * scale)
    }

    var drawImageInScreenBottomCenterTranslate = (ctx, image, scale, dx, dy) => {
        if (!isDrawableImage(image)) {
            return
        }
        var imageWidth = getImageWidth(image)
        var imageHeight = getImageHeight(image)
        ctx.drawImage(image,
            dx + (window.innerWidth - (imageWidth * scale)) / 2, window.innerHeight - (imageHeight * scale) + dy,
            imageWidth * scale, imageHeight * scale)
    }

    return {
        isDrawableImage,
        drawImageInRect,
        drawImageInScreenCenter,
        drawImageInScreenCenterTranslate,
        drawImageInScreenBottomCenterTranslate
    }
})()
