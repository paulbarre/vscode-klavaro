const { commands } = require('vscode')
const toggleActivation = require('./toggleActivation')

module.exports = [
    toggleActivation
].map(({
    id,
    method
}) => commands.registerCommand(id, method))