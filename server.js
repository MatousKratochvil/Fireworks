/**
 * Simple Express server used to serve the built files.
 */
const express = require('express')
const app = express()

app.use(express.static('prod'))
app.listen(3000, () => console.log('Example app listening on port 3000!'))