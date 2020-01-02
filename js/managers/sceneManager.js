/**
 * Scene manager for handle game loop
 * and process Scene
 */
var sceneManager = (function () {

    // --------------------
    // Variables
    // --------------------

    /**
     * Array of Scenes to be used
     */
    var sceneArray = []
    /**
     * Index of actuas Scene in game loop
     */
    var actualSceneIndex = -1
    /**
     * Objecto of actual cursor
     */
    var actualCursor = {}
    /**
     * Background Scene to be used as background for all scenes
     */
    var backgroundScene = {}
    /**
     * Cursor is down and after upload is set to false
     */
    var isCursorPressed = false
    /**
     * Cursor is down
     */
    var isCursorDown = false

    
    // --------------------
    // Private Functions
    // --------------------

    /**
     * Trim actual index to fit in Scene array
     */
    trimIndex = () => {
        if (sceneArray.length > 0)
            actualSceneIndex = Math.min(Math.max(actualSceneIndex, 0), sceneArray.length - 1)
        else
            actualSceneIndex = -1
    }

    // --------------------
    // Public Fucntions
    // --------------------

    /**
     * Add scene to scene array
     * @param {sceneClass} scene - scene to be added
     */
    addScene = (scene) => {
        sceneArray.push(scene)
        trimIndex()
    }

    /**
     * Add scene as background scene
     * @param {sceneClass} scene - scene to be added
     */
    addBackgroundScene = (scene) => {
        backgroundScene = scene
    }

    /**
     * Add scene to scene array at index
     * @param {sceneClass} scene - scene to be added
     * @param {number} index - index where to put scene to array
     */
    addSceneAtIndex = (scene, index) => {
        sceneArray.splice(index, 0, scene)
        trimIndex()
    }

    /**
     * Add scene to scene array to the top
     * @param {sceneClass} scene - scene to be added
     */
    addSceneOnTop = (scene) => {
        sceneArray.splice(0, 0, scene)
        trimIndex()
    }

    /**
     * Add scene to scene array to the bottom
     * @param {sceneClass} scene - scene to be added
     */
    addSceneOnBottom = (scene) => {
        if (sceneArray.length > 0)
            sceneArray.splice(sceneArray.length - 1, 0, scene)
        else
            sceneArray.splice(0, 0, scene)
        trimIndex()
    }

    /**
     * Clear whole scene array
     */
    clearScenes = () => {
        sceneArray = []
        actualSceneIndex = -1
    }

    /**
     * Replay Scene at index immediately
     * @param {number} index - index of Scene to replay
     * @param {bool} performInitialization - reinitialize Scene
     */
    replaySceneAtIndex = (index, performInitialization) => {
        sceneArray[index].isCompleted = false

        if (performInitialization) {
            sceneArray[index].isInitialized = false
            sceneArray[index].isInitializedOnContext = false
        }

        actualSceneIndex = index
        trimIndex()
    }

    /**
     * Represents actual scene
     */
    actualscene = () => {
        trimIndex()
        return sceneArray[actualSceneIndex]
    }

    /**
     * Function for drawing actual scene
     * @param {cavasContext} ctx = canvas context
     */
    draw = (ctx) => {
        if (!sceneArray[actualSceneIndex].isInitializedOnContext) {
            sceneArray[actualSceneIndex].initializeOnContext(ctx)
            sceneArray[actualSceneIndex].isInitializedOnContext = true
        }

        if (!sceneArray[actualSceneIndex].useOwnBackground && backgroundScene.draw)
            backgroundScene.draw(ctx)

        if (sceneArray[actualSceneIndex].isInitialized && !sceneArray[actualSceneIndex].isCompleted)
            sceneArray[actualSceneIndex].draw(ctx)

        // draw particles
        particleManager.draw(ctx)
    }

    /**
     * Function for updateing actual scene
     * @param {elapsedTime} dt - time in milisecond from last update call
     */
    update = (dt) => {

        // initialize
        if (!sceneArray[actualSceneIndex].isInitialized) {
            sceneArray[actualSceneIndex].initialize()
            sceneArray[actualSceneIndex].isInitialized = true
        }

        // update background and process cursor event on background
        if (!sceneArray[actualSceneIndex].useOwnBackground 
            && backgroundScene.cursorEvent 
            && backgroundScene.update) {
                backgroundScene.cursorEvent(actualCursor)
                backgroundScene.update(dt)
        }
        
        // update actual scene and proces cursor event on actual scene
        sceneArray[actualSceneIndex].cursorEvent(actualCursor, isCursorPressed, isCursorDown)
        sceneArray[actualSceneIndex].update(dt)

        // update particles
        particleManager.update(dt)

        // check is scene is completed
        if (sceneArray[actualSceneIndex].isCompleted) {
            actualSceneIndex++
            trimIndex()
        }

        // disable cursor pressed for next update loop
        isCursorPressed = false
    }

    // --------------------
    // Events Functions
    // --------------------
    resize = (ctx) => {
        sceneArray[actualSceneIndex].resize(ctx)
    }

    // --------------------
    // Cursor Fucntions
    // --------------------

    /**
     * Event when cursor move 
     * @param {Object} mouse - cursor object array
     */
    mouseMove = (mouse) => {
        actualCursor = mouse
    }

    /**
     * Event when cursor is up
     */
    mouseUp = () => {
        isCursorDown = false
    }

    /**
     * Event when cursor is down
     */
    mouseDown = (cursors) => {
        isCursorPressed = true
        isCursorDown = true
    }

        /**
     * Event when cursor move 
     * @param {Array} cursors - cursor object array
     */
    touchMove = (cursors) => {
        actualCursor = cursors[cursors.length - 1]
    }

    /**
     * Event when cursor is up
     */
    touchEnd = () => {
        isCursorDown = false
        actualCursor = {}
    }

    /**
     * Event when cursor is down
     */
    touchStart = (cursors) => {
        isCursorPressed = true
        isCursorDown = true
        actualCursor = cursors[cursors.length - 1]
    }

    // --------------------
    // Public Getters Fucntions
    // --------------------

    /**
     * Return actual scene in game loop
     */
    getSceneName = () => {
        return sceneArray[actualSceneIndex].name
    }

    /**
     * Return background scene to call actions
     */
    getBackgroundScene = () => {
        return backgroundScene
    }

    /**
     * Return existing background scene as bool
     */
    hasBackground = () => {
        if (backgroundScene)
            return true
        return false
    }

    // return Object
    return {
        // Scene array modification function
        addScene,
        addBackgroundScene,
        addSceneAtIndex,
        addSceneOnTop,
        addSceneOnBottom,
        clearScenes,
        replaySceneAtIndex,
        
        // Getters
        getBackgroundScene,
        getSceneName,
        hasBackground,

        // Game Loop
        draw,
        update,

        // Events
        resize,

        // Cursor Events
        mouseUp,
        mouseDown,
        mouseMove,
        touchStart,
        touchEnd,
        touchMove
    }
})()