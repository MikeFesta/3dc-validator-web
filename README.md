# Khronos 3D Commerce Asset Validator

# Web Implementation (single page app)

## THIS PROJECT HAS BEEN PUBLISHED TO

## https://github.com/KhronosGroup/3DC-Validator

### Future development will continue in that repository.

This repository was used for development of version 1.0.0 and will be kept around to preserve the commit history.

---

## SPDX-License-Identifier: Apache-2.0

This is a sub-project of the 3DC-Validator which shows how to implement a version from a web browser stand alone page.

### Usage - Compile and Test Locally

This project uses Node + webpack to build dist/main.js.

Run npm i to install dependencies (3DC-Validator and Babylon.js).

```
# Install Dependencies
npm i
```

Build the project to generate main.js in the dist/ folder.

```
# Compile the code with Webpack
npm run build
```

A simple web server can be run using python for local testing.

```
# Run a simple server on http://localhost:3000
python3 -m http.server 3000
```

Open http://localhost:3000 in a modern web browser to test it out.

### Deployment

index.html and the dist/ folder are all of the required files and can be statically hosted from any server after they are built.
