#!/bin/bash
#dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
#cd "$dir" || exit
#if [[ ! -e ./data ]]; then
#  mkdir -p ./data/elasticsearch
#  sudo chgrp 1000 ./data
#  sudo chmod -R g+rwx ./data
#fi
docker-compose --profile infraestructure up
