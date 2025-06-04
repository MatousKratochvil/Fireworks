/**
 * Helper functions used by multiple modules.
 */
common.randomNumber = (min, max) => {
    return Math.min(Math.max(Math.random() * max, min), max)
}

common.clearCanvas = (element) => {
    var context = element.getContext('2d')
    context.clearRect(0,0, element.width, element.height)
}

common.isMobile = () => {
    if (screen.width <= 1025)
        return true
    return false
}

common.scaleDownElement = (element, endRect, amount) => {
    element.x = window.lerp(element.x, endRect.x, amount)
    element.y = window.lerp(element.y, endRect.y, amount)
    element.width = window.lerp(element.width, endRect.width, amount)
    element.height = window.lerp(element.height, endRect.height, amount)
}

common.centerlizeRect = (rect, translationObject) => {
    rect.x = (window.innerWidth - rect.width) / 2 + translationObject.x
    rect.y = (window.innerHeight - rect.height) / 2 + translationObject.y
} 