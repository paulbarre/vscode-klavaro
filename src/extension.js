const vscode = require('vscode')
const disposables = require('./disposables')
const createConvertor = require('./convertor')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate({ subscriptions }) {

	disposables.forEach(disposable => subscriptions.push(disposable))

	createConvertor()
}
exports.activate = activate

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
