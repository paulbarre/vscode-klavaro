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

	const command = vscode.commands.registerCommand('keyCommand', () => {
		console.log('Command called')
	})
	subscriptions.push(command)

	Object.values(map).forEach(key => {
		console.log('build item for', key)
		const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left)
		statusBarItem.text = key
		statusBarItem.command = 'keyCommand'
		statusBarItem.show()
		subscriptions.push(statusBarItem)
	})

	vscode.window.onDidChangeTextEditorSelection((event) => {
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
}
exports.activate = activate

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
