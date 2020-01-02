/**
 * Element manager for store all elemets to be used in javaScript
 */
var elementManager = (function () {
    
    // --------------------
    // Variables
    // --------------------

    /**
     * Holds logo image
     */
    var logoImage = document.getElementById('logoImage')
    /**
     * Holds moon image
     */
    var moonImage = document.getElementById('moonImage')
    /**
     * Holds rocket sprite image
     */
    var rocketSpriteImage = document.getElementById('rocketSpriteImage')
    /**
     * Holds panorama image
     */
    var panoramaImage = document.getElementById('panoramaImage')
    
    // --------------------

    /**
     * Holds start button element
     */
    var startButton = document.getElementById('startButton')
    /**
     * Holds score element container
     */
    var scoreContainerElement = document.getElementById('scoreContainerElement')
    /**
     * Holds score number element
     */
    var scoreElement = document.getElementById('scoreElement')
    /**
     * Holds logo element
     */
    var logoElement = document.getElementById('logoElement')
    /**
     * Hold logo path element
     */
    var logoPath = document.getElementById('logoPath')
    /**
     * Hold container for logo
     */
    var logoContainerElement = document.getElementById('logoContainer')
    /**
     * Hold help element with tips how to play
     */
    var helpElement = document.getElementById('helpElement')
    
    // --------------------
    // Getters
    // --------------------

    /**
     * Return canvas element for sketch class
     */
    var getCanvasSketch = () => {
        return document.querySelector('.sketch')
    }
        
    return {
        // Images
        logoImage,
        moonImage,
        rocketSpriteImage,
        panoramaImage,

        // Elements
        startButton,
        helpElement,
        logoElement,
        logoPath,
        logoContainerElement,
        scoreElement,
        scoreContainerElement,

        // Getters
        getCanvasSketch
    }
})()