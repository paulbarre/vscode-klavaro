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
}

module.exports = new Config()