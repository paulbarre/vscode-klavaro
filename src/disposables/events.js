const { workspace } = require('vscode')
const config = require('../config')

module.exports = (button) => [
    workspace.onDidChangeConfiguration(event => {
        if (config.isEvent(event)) button.update()
    })
]