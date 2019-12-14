const vscode = require('vscode')

const map = {
	C: 'Ĉ',
	c: 'ĉ',
	G: 'Ĝ',
	g: 'ĝ',
	H: 'Ĥ',
	h: 'ĥ',
	J: 'Ĵ',
	j: 'ĵ',
	S: 'Ŝ',
	s: 'ŝ',
	U: 'Ŭ',
	u: 'ŭ'
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate({ subscriptions }) {

	vscode.window.onDidChangeTextEditorSelection((event) => {
		const config = vscode.workspace.getConfiguration('klavaro')
		if (!config.activated) return

		const position = event.selections[0].active
		if (position.character < 2) return
		const editor = event.textEditor
		const range = new vscode.Range(position.line, position.character - 2, position.line, position.character)
		const string = editor.document.getText(range)
		const triggers = Object.keys(map)
		if (['x', 'X'].includes(string[1]) && triggers.includes(string[0])) {
			editor.edit(editBuilder => {
				editBuilder.replace(range, map[string[0]])
			})
		}
	})

	const command = vscode.commands.registerCommand('toggleActivation', async () => {
		const config = vscode.workspace.getConfiguration('klavaro')
		const target = vscode.ConfigurationTarget.Global
		await config.update('activated', !config.activated, target)
	})
	subscriptions.push(command)

	const config = vscode.workspace.getConfiguration('klavaro')

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
		const config = vscode.workspace.getConfiguration('klavaro')
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
