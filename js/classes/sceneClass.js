/**
 * Scene class for scene manager
 * contains update and draw functions
 * when needs to be finished set isComplete to true
 */
function sceneClass () {

    /**
     * Name of this Scene 
     */
    var name = ""
    /**
     * Detect if mouse is clicked
     */
    var isClicked = false
    /**
     * Set to true when scene ends
     */
    this.isCompleted = false
    /**
     * Is set to true by SceneManager when initialized
     */
    this.isInitialized = false
    /**
     * Is set to true by SceneManager when initialized
     */
    this.isInitializedOnContext = false
    /**
     * Set if backgroundScene is defined in SceneManager
     */
    this.useOwnBackground = false

    /**
     * Function to initialize Scene
     */
    this.initialize = () => {

    }

    /**
     * Function to initialize Scene when drawing context is needed
     */
    this.initializeOnContext = (ctx) => {

    }

    /**
     * Function to handle update part of GameLoop
     * @param {Number} dt - time between frames
     */
    this.update = (dt) => {

    }

    /**
     * Function to handle draw part of GameLoop
     * @param {context} ctx - drawing context
     */
    this.draw = (ctx) => {

    }

    /**
     * Function to handle resize with draw context
     * @param {context} ctx - drawing context
     */
    this.resize = (ctx) => {

    }

    /**
     * Function to handle cursor events
     * @param {cursorObject} cursor - cursor object
     * @param {bool} isCursorPressed - detect if cursor is pressed
     */
    this.cursorEvent = (cursor, isCursorPressed, isCursorDown) => {

    }
}