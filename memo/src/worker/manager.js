import Editor from '../worker/editor.js'
import Filer from '../worker/filer.js'
import * as Folder from '../worker/folder-viewer.js'

export { saveFile, openFile, viewFile, viewer, toggleMenu, openDirectory }

const editor = new Editor({ el: 'editor' })

const filer = new Filer()

const menuEl = document.getElementById('menu')

const stylesheet =
        '<link rel="stylesheet" type="text/css" href="./home/index.css"/>',
    mermaid =
        '<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script> <script>window.mermaid.init(undefined, document.querySelectorAll(".language-mermaid"))</script>',
    viewer = (html) =>
        `${stylesheet} <div class="viewer">${html}</div> ${mermaid}`

function toggleMenu() {
    menuEl.classList.toggle('hidden')
}

async function openDirectory() {
    const folder = await Folder.Struct()
    const html = await Folder.toHtml(folder)
    console.log(html)
    document.getElementById('output').innerHTML = html
}

function viewFile() {
    // get text from editor, parse it to html, add other viewer stuff, open it in new tab
    menuEl.classList.add('hidden')

    const text = editor.getText()
    const html = marked.parse(text)
    const pageContent = viewer(html)

    const tab = window.open('about:blank', 'viewer', 'width=200')
    tab.document.write(pageContent)
    tab.document.close()
}

function saveFile() {
    menuEl.classList.add('hidden')

    const text = editor.prettyText(filer.getFileName())
    filer.saveFile(text)
}

async function openFile() {
    const [fileText, fileName] = await filer.openFile()
    const extension = fileName.split('.').pop()

    editor.setText(fileText, extension)

    changeTitle(fileName)

    menuEl.classList.add('hidden')
}

function changeTitle(fileName) {
    // change title and url query params without reload
    document.title = fileName

    const url = new URL(window.location)
    url.searchParams.set('file', fileName)
    window.history.pushState(null, '', url.toString())
}
