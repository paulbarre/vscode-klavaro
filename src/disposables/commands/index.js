const { commands } = require('vscode')
const toggleActivation = require('./toggleActivation')

module.exports = config => [
    toggleActivation
].map(({
    id,
    getMethod
}) => commands.registerCommand(id, getMethod(config)))