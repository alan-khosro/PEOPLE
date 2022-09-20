import keyBinding from '../listener/keybinding.js'

window.addEventListener('keydown', keyBinding)

import * as manager from '../worker/manager.js'
import { recents } from '../worker/folder-viewer.js'

const menuEl = document.getElementById('menu')

// load readme, then add click event to each button
const readme = await fetch('../readme.md').then((r) => r.text())

menuEl.innerHTML = manager.viewer(marked.parse(readme))

menuEl.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', () => {
        manager[btn.id]()
    })
})

const recentFolders = await recents()

document.getElementById('open-folders').innerHTML = recentFolders

/*
events.forEach(event => {
    const btn = document.createElement("button")
    btn.innerHTML = event
    btn.addEventListener("click", () => {
        manager[event]()
        menuEl.remove()
    })
    menuEl.appendChild(btn)
})
*/

// load service worker
/*window.addEventListener('load', () => {
    console.log("load is done")
    if ('serviceWorker' in navigator) {
        console.log("register service worker")
        navigator.serviceWorker.register('../service-worker.js')
    }
})
*/
