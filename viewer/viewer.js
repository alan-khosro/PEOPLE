// parse query params to get markdown file and stylesheet locations, render markdown to html, render its latex formulas, render its mermaid graphs

const mainEl = document.getElementById('main')

const markedUrl =
    'https://cdnjs.cloudflare.com/ajax/libs/marked/4.1.0/lib/marked.esm.min.js'
const mermaidUrl =
    'https://cdnjs.cloudflare.com/ajax/libs/mermaid/9.1.7/mermaid.esm.min.mjs'
const katexUrl =
    'https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/contrib/auto-render.mjs'
const katexCssUrl =
    'https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css'
const katex2Url = 'https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.mjs'

// Start downloading markdown file, css, and libraries
//const mdPromise = import('url-fetcher.js') //fetch(url).then((r) => r.text())
const markedPromise = import(markedUrl)
const mermaidPromise = import(mermaidUrl)
const katexCssPromise = import(katexCssUrl, { assert: { type: 'css' } })
const katex2Promise = import(katex2Url)
const katexPromise = import(katexUrl)

// Options
const markedOptions = {
    //baseUrl: url,
    gfm: true,
    breaks: false,
    highlight: null,
    langPrefix: '', // "language-"
    smartList: true,
    smartyPants: true,
    xhtml: false,
}

const latexOptions = [
    { left: '$$', right: '$$', display: true },
    { left: '$ ', right: ' $', display: false },
    { left: '\\(', right: '\\)', display: false },
    { left: '\\begin{equation}', right: '\\end{equation}', display: true },
    { left: '\\begin{align}', right: '\\end{align}', display: true },
    { left: '\\begin{alignat}', right: '\\end{alignat}', display: true },
    { left: '\\begin{gather}', right: '\\end{gather}', display: true },
    { left: '\\begin{CD}', right: '\\end{CD}', display: true },
    { left: '\\[', right: '\\]', display: true },
]

// render the page
export async function render(md, url = './') {
    markedOptions['baseUrl'] = url
    await renderMarkdown(md)
    renderFormulas()
    renderMermaid()
}

async function renderMarkdown(md) {
    const marked = await markedPromise
    marked.use(markedOptions)
    mainEl.innerHTML = marked.parse(md)
}

async function renderFormulas() {
    const katexCss = await katexCssPromise
    document.adoptedStyleSheets = [katexCss.default]
    const renderMathInElement = (await katexPromise).default
    const katex = (await katex2Promise).default
    renderMathInElement(mainEl, { delimiters: latexOptions })
}

async function renderMermaid() {
    const mermaid = (await mermaidPromise).default
    mermaid.init()
}
