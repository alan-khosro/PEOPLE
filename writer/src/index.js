const menu = document.getElementById('menu')
const editorEl = document.getElementById('text-editor')

const editor = {
    getText: () => editorEl.value,
    setText: (text) => (editorEl.value = text),
}

const commands = [
    {
        title: 'Save',
        action: save,
        hotkey: 'ctrl+o',
    },
    {
        title: 'Save As',
        action: saveAs,
        hotkey: 'ctrl+a',
    },
    {
        title: 'Open',
        action: openFile,
        hotkey: 'ctrl+o',
    },
    // {
    //     title: 'Markdown',
    //     action: markdown,
    //     hotkey: 'ctrl+m',
    // },
]

var file

editorEl.focus()
commands.forEach(button)

function button({ title, action }) {
    const btn = document.createElement('button')
    btn.innerHTML = title
    btn.addEventListener('click', action)
    menu.appendChild(btn)
}

async function save() {
    const text = editor.getText()

    if (!file) {
        file = await window.showSaveFilePicker()
    }

    await write(text)
}

async function saveAs() {
    const text = editor.getText()

    file = await window.showSaveFilePicker()

    await write(text)
}

async function write(text) {
    const writable = await file.createWritable()
    await writable.write(text)
    await writable.close()
}

async function openFile() {
    ;[file] = await window.showOpenFilePicker({
        //id: "recents",
        types: [
            {
                description: 'Text Files',
                accept: {
                    'text/plain': [
                        '.txt',
                        '.md',
                        '.mdown',
                        '.text',
                        '.js',
                        '.ts',
                        '.py',
                        '.go',
                        '.c',
                        '.cpp',
                        '.html',
                        '.css',
                    ],
                },
            },
        ],
    })
    await file
        .getFile()
        .then((f) => f.text())
        .then((text) => editor.setText(text))
}
