const commands = require('./commands')
const button = require('./button')
const event = require('./event')

module.exports = [
    ...commands,
    event,
    button.disposable
]