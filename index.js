
const mainEl = document.getElementById("main")

import {marked} from "https://cdnjs.cloudflare.com/ajax/libs/marked/4.1.0/lib/marked.esm.min.js"

export const urlMapper = {
    resume: "resume/resume.md",
    example: "example.md"
}


const params = new URLSearchParams(window.location.search)
const url = urlMapper[params.get("file")] || "resume/resume.md"

const md = await fetch(url).then(f => f.ok? f.text() : alert("file not found!"))
const html = marked.parse(md)
console.log(html)

mainEl.innerHTML = html

//css = await fetch("https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown.min.css").then(r => r.text())

document.getElementById("stylesheet").href = "markdown.css"


