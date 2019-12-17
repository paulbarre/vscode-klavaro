const vscode = require('vscode')
const getDisposables = require('./disposables')
const config = require('./config')
const createConvertor = require('./convertor')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate({ subscriptions }) {

	const disposables = getDisposables(config)
	disposables.forEach(disposable => subscriptions.push(disposable))

	createConvertor()

	const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left)
	if (config.activated) {
		item.text = `$(eye) Klavaro`
	} else {
		item.text = `$(eye-closed) Klavaro`
	}
	item.command = 'toggleActivation'
	if (config.showButton) {
		item.show()
	}
	subscriptions.push(item)

	subscriptions.push(vscode.workspace.onDidChangeConfiguration(event => {
		if (event.affectsConfiguration('klavaro.activated')) {
			if (config.activated) {
				item.text = `$(eye) Klavaro`
			} else {
				item.text = `$(eye-closed) Klavaro`
			}
		}
		if (event.affectsConfiguration('klavaro.showButton')) {
			if (config.showButton) {
				item.show()
			} else {
				item.hide()
			}
		}
	}))
}
exports.activate = activate

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
