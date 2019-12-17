const getCommands = require('./commands')
const button = require('./button')
const getEvents = require('./events')

module.exports = (config) => [
    ...getCommands(config),
    ...getEvents(button),
    button.disposable
]