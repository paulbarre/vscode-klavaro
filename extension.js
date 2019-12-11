const vscode = require('vscode')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "klavaro" is now active!')

	let disposable = vscode.commands.registerCommand('extension.helloWorld', function () {
		vscode.window.showInformationMessage('Hello World!')
	})

	context.subscriptions.push(disposable)
}
exports.activate = activate

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
