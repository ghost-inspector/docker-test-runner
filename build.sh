#!/bin/bash
set -e

DIR="$( cd "$(dirname "$0")" ; pwd -P )"
PUSH=""

for img in node standalone; do
  echo ""
  echo "Building ghostinspector/test-runner-$img..."
  # docker cannot see outside of it's current context, copy dependencies temporarily
  cp -R $DIR/includes/ $DIR/test-runner-$img/includes
  cd $DIR/test-runner-$img && docker build -t ghostinspector/test-runner-$img .
  rm -R $DIR/test-runner-$img/includes
  PUSH=$'  $ docker push ghostinspector/test-runner-'$img'\n'$PUSH
  echo "Done."
done

echo ""
echo "You can now push your images to Docker Hub."
printf "$PUSH"
