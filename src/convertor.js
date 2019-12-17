const {
    window,
    Range
} = require('vscode')
const config = require('./config')

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

module.exports = () => {
    window.onDidChangeTextEditorSelection((event) => {
		if (!config.activated) return

		const position = event.selections[0].active
		if (position.character < 2) return
		const editor = event.textEditor
		const range = new Range(position.line, position.character - 2, position.line, position.character)
		const string = editor.document.getText(range)
		const triggers = Object.keys(map)
		if (['x', 'X'].includes(string[1]) && triggers.includes(string[0])) {
			editor.edit(editBuilder => {
				editBuilder.replace(range, map[string[0]])
			})
		}
	})
}