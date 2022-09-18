// parse and apply query params to get markdown file and stylesheet file

const mainEl = document.getElementById("main")
const stylesheetEl = document.getElementById('stylesheet')

import {marked} from "https://cdnjs.cloudflare.com/ajax/libs/marked/4.1.0/lib/marked.esm.min.js"
import mermaid from "https://cdnjs.cloudflare.com/ajax/libs/mermaid/9.1.7/mermaid.esm.min.mjs"
import renderMathInElement from "https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/contrib/auto-render.mjs";


export const urlMapper = {
    index: "resume/resume.md",
    resume: "resume/resume.md",
    example: "example.md",
    "boston-crimes": "use-cases/boston-crimes/output/analysis.md",
}

const params = new URLSearchParams(window.location.search)

// add stylesheet
stylesheetEl.href = `viewer/${params.get("stylesheet") || "markdown"}.css`

// convert markdown file into html. Get path of the file or file predefine name
const url = urlMapper[params.get("file") || "index"] || params.get("file")
document.title = url.split('/').pop()

fetch(url).then(
        f => f.ok? f.text() : alert("file not found!")
    ).then(
        md => {
            mainEl.innerHTML = marked.parse(md)
            mermaid.init()
            renderMathInElement(mainEl, {delimiters: latexOptions});
        }
    )


//// options

marked.use({
    baseUrl: url,
    gfm: true,
    breaks: false,
    highlight: null,
    langPrefix: "", // "language-"
    smartList: true,
    smartyPants: true,
    xhtml: false,
})

const latexOptions = [
  {left: "$$", right: "$$", display: true},
  {left: "$ ", right: " $", display: false},
  {left: "\\(", right: "\\)", display: false},
  {left: "\\begin{equation}", right: "\\end{equation}", display: true},
  {left: "\\begin{align}", right: "\\end{align}", display: true},
  {left: "\\begin{alignat}", right: "\\end{alignat}", display: true},
  {left: "\\begin{gather}", right: "\\end{gather}", display: true},
  {left: "\\begin{CD}", right: "\\end{CD}", display: true},
  {left: "\\[", right: "\\]", display: true}
]

