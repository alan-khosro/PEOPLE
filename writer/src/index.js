
const menu = document.getElementById("menu")

var file

const menuCommands = {
	"save": "s", 
	"save-as": "a",
	"open": "o",
}

const commands = {
	"save": save,
	"save-as": saveAs,
	"open": openFile,
}


for (const command in menuCommands) {
	button(command)
}

function button(command) {
	const btn = document.createElement("button")
	btn.innerHTML = command
	menu.appendChild(btn)
	btn.addEventListener("click", commands[command])
}

async function save () {
	const text = editor.getText()

	if (!file) {
		file = await window.showSaveFilePicker()
	}
	
	await write(text)
}

async function saveAs () {
	const text = editor.getText()

	file = await window.showSaveFilePicker()
	
	await write(text)
}

async function write (text) {
	console.log(file)
	const writable = await file.createWritable()
	await writable.write(text)
	await writable.close()
}


const editorEl =  document.getElementById("text-editor")
editorEl.focus()

const editor = {
	getText: () => editorEl.value,
	setText: text => editorEl.value = text,
}


async function openFile () {
	[file] = await window.showOpenFilePicker({
		//id: "recents",
		types: [{
			description: "Text Files",
			accept: {
				"text/plain": [".txt", ".md", ".text", ".js", ".ts", ".py", ".go", ".c", ".cpp", ".html", ".css"]
			}
		}]
	})
	await file.getFile()
	.then(
		f => f.text()
	).then(
		text => editor.setText(text)
	)
}

