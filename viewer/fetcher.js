import { render } from './viewer.js'

const stylesheetEl = document.getElementById('stylesheet')

// defone alias for common pages (?file=resume --> ?file=resume/resume.md)
const urlMapper = {
    index: 'index.md',
    resume: 'resume/resume.md',
    'boston-crimes': 'use-cases/boston-crimes/output/analysis.md',
    'web-visitors': 'use-cases/web-visitors-analysis/output/report.md',
    'order-prediction': 'articles/order-prediction-design-document.md',
}

const shallNotPass = [
    'use-cases/boston-crimes/output/analysis.md',
    'use-cases/web-visitors-analysis/output/report.md',
]

// parse params
const params = new URLSearchParams(window.location.search)

// Get path of the markdown file path or its predefine name in urlMapper
const stylesheet = `viewer/${params.get('stylesheet') || 'markdown'}.css`
stylesheetEl.href = stylesheet

var url = urlMapper[params.get('file') || 'index'] || params.get('file')
document.title = url.split('/').pop()

// check password
if (shallNotPass.includes(url)) {
    const userInput = prompt('This content needs password')
    if (userInput != url.split('/').pop()) {
        alert(
            'wrong password. Ask Ali to provide you password to see the content!'
        )
        location.href = './index.html'
    }
}

const md = await fetch(url).then((r) => r.text())
render(md, url)
