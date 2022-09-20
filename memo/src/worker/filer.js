// imports
import * as db from 'https://unpkg.com/idb-keyval@6.2.0/dist/index.js'

// constants, config, and default values
const autoSaveInterval = 1000,
    maxFiles = 20,
    recentPrefix = 'recent-files/'

export default class Filer {
    constructor() {
        // struct
        this.file = undefined
        this.fileIndex = -1
        this.autoSaveId = ''
        this.archives = []
        this.openFilesIndexes = []
    }

    getFileName() {
        return this.file?.name
    }

    async saveFile(text) {
        if (!this.file) {
            this.file = await window.showSaveFilePicker()
            this.#archive(file)
        }

        await this.#write(text)
    }

    async #write(text) {
        const writable = await this.file.createWritable()
        await writable.write(text)
        await writable.close()
    }

    async openFile() {
        ;[this.file] = await window.showOpenFilePicker()

        this.#archive()

        const text = await this.#getText()

        db.set(recentPrefix + this.file.name, this.file)

        return [text, this.file.name]
    }

    async #archive() {
        // find file in archives
        const fileIndex = await this.#findFileIndex(this.archives, this.file)
        if (fileIndex == -1) {
            // if a new file, add to archives
            this.archives.unshift(this.file)
            this.archives.slice(0, maxFiles)
            this.fileIndex = 0
        } else {
            // if old file: select
            this.fileIndex = fileIndex
            this.archives[fileIndex] = this.file
        }

        // cache it
        db.set('archives', this.archives)
        db.set('fileIndex', this.fileIndex)
    }

    async #findFileIndex(archives, file) {
        for (const [index, archive] of archives.entries()) {
            if (await file.isSameEntry(archive)) {
                return index
            }
        }
        return -1
    }

    async #getText() {
        const f = await this.file.getFile()
        return await f.text()
    }
}
