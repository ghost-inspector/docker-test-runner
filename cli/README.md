## Ghost Inspector CLI Docker image

This image is provided as a convenience image for working with the [Ghost Inspector CLI](https://ghostinspector.com/docs/api/cli/).

# Quickstart

```
# execute a test, wait for completion
docker run ghostinspector/cli test execute <testId> \
  --startUrl "https://mysite.com" \
  --myVariable superduper \
  --failOnError
```

For a full list of commands, run `--help`

```
docker run ghostinspector/cli --help
```

# LICENSE

```
The MIT License

Copyright (c) Ghost Inspector, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

# Support

Please open [issues in Github](https://github.com/ghost-inspector/docker-test-runner/issues) or send questions to [Ghost Inspector support](https://ghostinspector.com/support/)
