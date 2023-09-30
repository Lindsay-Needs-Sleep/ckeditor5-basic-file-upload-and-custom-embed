#!/bin/bash
# usage: ./start.sh <mode>
# mode: default - build the demo (need a server to host index.html)
#       s - autofix some styles and style check
#      st - style check and test
#       i - interactive

CONTAINER="ck5-plugin-file-upload"
EXEC="docker compose exec -it ${CONTAINER}"

# Get the rest of the arguments after the run mode
COMMAND_OPTION=${@:2}

case $1 in
    i) COMMAND=(bash);;
    s) COMMAND=(bash -c "
        npm install &&
        npm run style-fix
        ");;
    st) COMMAND=(bash -c "
        npm install &&
        echo 'For style errors, run \"./go.sh s\" to autofix' &&
        npm run style-check
        ");;
    *) COMMAND=(bash -c "
        cd demo &&
        npm install &&
        npm run build
        ");;
esac

# Ensure the developement containers are running (python and front are just sleeping)
(cd ./docker && docker compose up $CONTAINER --no-recreate --detach)

echo $EXEC "${COMMAND[@]}"
(cd ./docker && $EXEC "${COMMAND[@]}")
