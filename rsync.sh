
gsutil -m rsync -r -d -j html,txt,js,css,mjs,json,ts -x '\.git.*|.*\.csv$|.*\.zip$|[/.].*' ./ gs://khosro

