const {
    workspace,
    ConfigurationTarget
} = require('vscode')

class Config {
    get config() {
        return workspace.getConfiguration('klavaro')
    }

    get activated() {
        return this.config.activated
    }

    toggleActivation() {
        this.config.update('activated', !this.activated, ConfigurationTarget.Global)
    }

    get showButton() {
        return this.config.showButton
    }

    isEvent(event) {
        return [
            'klavaro.activated',
            'klavaro.showButton'
        ].find(option => event.affectsConfiguration(option)) != undefined
    }
}

module.exports = new Config()