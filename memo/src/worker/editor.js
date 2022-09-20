/*
Ace editor, customized
*/

const prettierCDN = 'https://cdn.jsdelivr.net/npm/prettier@2.7.1/esm/'

import prettier from 'https://cdn.jsdelivr.net/npm/prettier@2.7.1/esm/standalone.mjs'

const ext2lang = await fetch(
    'https://raw.githubusercontent.com/jonschlinkert/lang-map/master/lib/lang.json'
).then((r) => r.json())

// config, constants, default values
const // basic
    defaultFilePath = 'untitled.md',
    // prettier configs
    tabWidth = 4,
    useTabs = false,
    semi = false,
    singleQuote = true,
    htmlWhitespaceSensitivity = 'ignore'

const lang2parser = {
    javascript: 'typescript',
    typescript: 'typescript',
    markdown: 'markdown',
    html: 'html',
    css: 'css',
    yaml: 'yaml',
    //    python: 'python',
}

const lang2plugin = {
    javascript: 'parser-typescript.mjs',
    typescript: 'parser-typescript.mjs',
    markdown: 'parser-markdown.mjs',
    html: 'parser-html.mjs',
    css: 'parser-postcss.mjs',
    yaml: 'parser-yaml',
}

export default class Editor {
    constructor({ el }) {
        ace.require('ace/ext/language_tools')

        // struct
        this.el = el
        this.acer = ace.edit(el)
        this.acer.focus()
        this.filePath = defaultFilePath
        this.lang = undefined

        this.acer.setOptions({
            // editor
            readOnly: false,
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true,

            // session
            useWorker: true,
            tabSize: 4,
            wrap: true, // or number

            mode: 'ace/mode/markdown',

            // renderer
            showPrintMargin: false,
            showLineNumbers: true,
            showGutter: true,
            theme: 'ace/theme/cobalt',
            minLines: 1,
        })
    }

    async setText(text, extension) {
        this.lang = ext2lang[extension] ? ext2lang[extension][0] : ''
        this.parser = lang2parser[this.lang] // || this.lang.toLowerCase()
        if (this.parser) {
            this.prettierPlugin =
                this.lang &&
                (await import(prettierCDN + lang2plugin[this.lang])).default
        }
        const mode = this.lang && 'ace/mode/' + this.lang
        this.acer.setOptions({
            mode,
            value: text,
        })
        this.acer.focus()
        // #debt: disableWarnings()
    }

    prettyText() {
        const text = this.acer.session.getValue()
        if (!this.parser) {
            // we do not know the language to prettify
            return text
        }

        const prettierVersion = prettier.formatWithCursor(text, {
            parser: this.parser,
            plugins: [this.prettierPlugin],
            cursorOffset: this.acer.session.doc.positionToIndex(
                this.acer.session.selection.getCursor()
            ),

            tabWidth,
            useTabs,
            semi,
            singleQuote,
            htmlWhitespaceSensitivity,
        })

        const { formatted, cursorOffset } = prettierVersion

        this.acer.session.setValue(formatted)
        this.acer.moveCursorToPosition(
            this.acer.session.doc.indexToPosition(cursorOffset)
        )

        return formatted
    }

    getText() {
        const text = this.acer.getValue()
        return text
    }
}

/*



export function darkTheme(checked) {
  const theme = checked ? "ace/theme/terminal" : "ace/theme/chrome";
  acer.setOption("theme", theme);
}

export function setOption(attr, value) {
  acer.setOption(attr, value);
}

ace.require("ace/ext/language_tools");
const beautify = ace.require("ace/ext/beautify");
const modelist = ace.require("ace/ext/modelist");

beautify.beautify(acer.session);
acer.focus();

acer.setOptions({
  // editor
  readOnly: false,
  enableBasicAutocompletion: true,
  enableSnippets: true,
  enableLiveAutocompletion: true,

  // session
  useWorker: true,
  tabSize: 4,
  wrap: true, // or number

  mode: "ace/mode/markdown",

  // renderer
  showPrintMargin: false,
  showLineNumbers: true,
  showGutter: true,
  theme: "ace/theme/chrome",
  minLines: 1,
});

// disable some warnings like semicolon
function disableWarnings() {
  const worker = acer.session.$worker;
  //if (acer.session.getMode().id == "ace/mode/javascript"){
  if (worker) {
	worker.send("changeOptions", [
	  {
		asi: true,
		//'-W095': false,
	  },
	]);
  }
}
*/
