import * as db from 'https://unpkg.com/idb-keyval@6.2.0/dist/index.js'

const dbPrefix = 'open-folders/'

export async function Struct() {
    const struct = await window.showDirectoryPicker()
    db.set(dbPrefix + struct.name, struct)
    return struct
}

export async function toHtml(entry) {
    if (entry.kind == 'file') {
        return ` <a href=""> ${entry.name} </a> `
    } else {
        var details = ''
        for await (const ent of entry.values()) {
            details += await toHtml(ent)
        }
        return `<details> <summary> ${entry.name} </summary> ${details} </details>`
    }
}

export async function recents(struct) {
    const keys = (await db.keys()).filter((key) => key.startsWith(dbPrefix))
    const links = keys
        .map((key) => `<a href="/directory/${key}"> ${key} </a><br>`)
        .join(' ')
    return links
}

export async function open(key) {
    const struct = await db.get(key)
    return struct
}
