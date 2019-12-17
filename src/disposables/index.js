const getCommands = require('./commands')

module.exports = (config) => [
    ...getCommands(config)
]