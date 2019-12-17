const {
    window,
    StatusBarAlignment
} = require('vscode')
const config = require('../config')
const command = require('./commands/toggleActivation')

class ActivationButton {
    constructor () {
        this.item = window.createStatusBarItem(StatusBarAlignment.Left)
        this.item.command = command.id
        this.update()
    }

    updateText () {
        const icon = config.activated ? 'eye' : 'eye-closed'
        this.item.text = `$(${icon}) Klavaro`
    }

    updateVisibility () {
        if (config.showButton) {
            this.item.show()
        } else {
            this.item.hide()
        }
    }

    update () {
        this.updateText()
        this.updateVisibility()
    }

    get disposable () {
        return this.item
    }
}

module.exports = new ActivationButton()