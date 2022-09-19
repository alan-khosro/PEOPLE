## notes

-   /index.html uploads (markdown) viewer which shows file
-   viewer accepts query parameters:
    -   file: the relative path of the markdown file or you can give file name predefines in viewer.js variable urlMapper (like file=resume)
    -   stylesheet: is the markdown stylesheet file name (without css extension). default is "markdown.css"
-   git lfs (large file system) is used for files in output and input directories. After clone you need `git lfs pull` to have their copies in your computer


## build and release
Just rsync to google cloud storage bucket. Run `source rsync.sh` to do it. It needs gsutil to be installed and configured to heydari@gmail.com project


## decisions
- why not building to html files and serving (like jekyl)?
    - fast enough: it is very fast for browsers to compile markdown (under 500 milliseconds).
    - flexibility: the content (md files) might change very fast. no need to build every time.
    - simplicity: no need for build process
- why not options?
    - it is for "just write and publish". no options make it more useful and less buggy

## to-do
- [ ] add a proper home-page instead of linking to resume
- [ ] move both memo text editor and code editor to gcs
- [ ] add time series use case to portfolio

