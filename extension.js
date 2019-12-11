const vscode = require('vscode')

const keys = ['ĉ', 'ĝ']

/**
 * @param {vscode.ExtensionContext} context
 */
function activate({ subscriptions }) {

	const command = vscode.commands.registerCommand('keyCommand', () => {
		console.log('Command called')
	})
	subscriptions.push(command)

	keys.forEach(key => {
		console.log('build item for', key)
		const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left)
		statusBarItem.text = key
		statusBarItem.command = 'keyCommand'
		statusBarItem.show()
		subscriptions.push(statusBarItem)
	})
}
exports.activate = activate

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
