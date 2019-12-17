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
}
exports.activate = activate

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
