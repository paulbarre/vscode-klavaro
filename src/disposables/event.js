const { workspace } = require('vscode')
const config = require('../config')
const button = require('./button')

module.exports = workspace.onDidChangeConfiguration(event => {
    if (config.isEvent(event)) button.update()
})