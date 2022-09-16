// parse and apply query params to get markdown file and stylesheet file

const mainEl = document.getElementById("main")
const stylesheetEl = document.getElementById('stylesheet')

import {marked} from "https://cdnjs.cloudflare.com/ajax/libs/marked/4.1.0/lib/marked.esm.min.js"

export const urlMapper = {
    index: "resume/resume.md",
    resume: "resume/resume.md",
    example: "example.md",
}

const params = new URLSearchParams(window.location.search)

// add stylesheet
stylesheetEl.href = `viewer/${params.get("stylesheet") || "markdown"}.css`

// convert markdown file into html
const url = urlMapper[params.get("file") || "index"]
fetch(url).then(
        f => f.ok? f.text() : alert("file not found!")
    ).then(
        md => mainEl.innerHTML = marked.parse(md)
    )

