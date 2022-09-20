### 📝Memo: text/code editor

<button id="openFile"> Open File <br> ctrl + o</button>
<button id="toggleMenu">Toggle Menu <br> esc</button>
<button id="saveFile"> Save File <br> ctrl + s</button>
<button id="viewFile"> Markdown View <br> ctrl + m</button>

<!--

-   [ ] <button id="openDirectory"> Open Folder </button> <mark>ctrl + d</mark>
-   [ ] ctrl + shift + s: save file as
-   [ ] ctrl + n: new file
-   [ ] ctrl + q: quit

<div id="recent-files"></div>

<div id="open-folders"></div>

<div id="output"></div>

## Deployed

So far, it is all browser web app: static pages. The service is deployed into two platforms:

-   google storage bucket and exposed to everyone (public):
-   gcp cloud run https://vv-aft-memo-xbauye2qba-uc.a.run.app

Use `git tag memo_v` (start with memo_v a git tag) to trigger auto deployment. The notify test team to test the new deployed service.

## Features

-   [x] Progressive Web App with tabbed window
-   [x] Based on Ace editor with syntax highlighting
-   [x] Code formatting using prettier on save
-   [x] works with local files
-   [ ] works with local folders
-   [ ] works with google drive
-   [ ] works with gcp storage
-   [ ] works with remote repo
-   [ ] ssh terminal: https://github.com/xtermjs/xterm.js

## Conventions and Guidelines

We like "golang" approach to software design. It is not easy to implemnet the same approach in JS. So we follow class based OO here but incorporating some of golang design pricipals.

-   Separation of struct, interface methods, and constants:
    -   Use `constructor` only to define `struct` (fields) and no method, function, or constant
    -   Use `const` in module level for config, constant, and default values. Avoid `static` fields and methods in class.
    -   Avoid getters and setters. Use functions.
-   Minimize exposure surface
    -   Use JS modules: import and export.
    -   Mark all private methods with # and do not expose any method that are not intended for API calls
-   Use url-based dependencies:
    -   no need to clutter the codebase with node_modules
-   Be expressive
    -   Readability is very important
    -   Good, clear namings and clean modularity is better than excessive comments. Too many comments is a sign of "not readabile".
    -   Do not be too smart or too clever
-   Follow Zen of Python
-   Naming conventions:
    -   Use CamelCase inside js files. Use kabab-case for html elements and file names.
    -   No pet, funny, cute names for variable, class, object, field, constant.
    -   You can use creative (cute, funny, pet) names for projects, teams, and maybe packages. Please do.
-   Subject.Verb(Object)
    -   Subject Noun: Calsses are UpperCase occupations: Editor, Filer, Binder, Commander
    -   Verb: Methods are verbs: getText, edit, setText
    -   Object Noun: Fields, variables, constants are nouns: text, someThing, color

## Structure

```mermaid
flowchart LR
    index.html - -> index.css & index & manifest & favicon

    index - -> keybinding & service-worker
    editor - -> prettier([prettier]) & ace([ace]) & ext2lang([ext2lang])
    filer - -> indexDB([indexDB])
    keybinding - -> manager - -> editor & filer & document{{document}}

    subgraph external
    	indexDB
    	prettier
    	ace
    	ext2lang
    end

    subgraph dom
    	document
    end

    subgraph home
    	index
    	index.html
    	index.css
    end

    subgraph worker
    	manager
    	filer
    	editor
    end

    subgraph listener
    	keybinding
    end

    subgraph pwa
    	manifest
    	favicon
    	service-worker
    end

```

## Decisions

-   Why Ace Editor?
    -   monaco seemed too heavy, built on electron, designed for vscode usage (coupled)
    -   codemirror seemed very difficult to use, complicated
    -   others seemed too simple
    -   Ace seemed beautiful, easy to use
-   Why using prettier for formatting?
    -   built in code formatter by Ace behaved weird sometimes and lost cursor position
    -   prettier works fine but covers subset of languages

## Todo

Version 0.1

-   [x] opens file, saves file ==> build it
    -   [x] make single view app to work with aws-gcp migration document (markdown, js, html)
    -   [x] it has open file, close file, save file
    -   [x] can share a link to this editor with file
-   [x] change editor language (mode) based on file extension
-   [x] prettify files
    -   [x] supported: javascript, markdown, typescript, css, html, json, yaml
    -   [ ] future support: python
-   [x] refactor and test
-   [x] open
-   [x] save

Version 0.4

-   [ ] open recent files
-   [ ] add readonly option
-   [ ] work with folder (open folder/project)
-   [ ] auto save

Backlog

-   [ ] deploy and work with gcs
-   [ ] deploy as extension
-   [ ] deploy as workplace app
-   [ ] save files in browser cache (up to 10 files)
-   [ ] convert recent-files into dropdown select
-   [ ] separate session management
-   [ ] save as
-   [ ] new
-   [ ] quit
-   [ ] dark theme
-   [ ] make prettier plugin loads dynamically
```

-->
