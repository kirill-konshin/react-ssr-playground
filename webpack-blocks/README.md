Webpack Blocks Boilerplate
==========================

Webpack Blocks Boilerplate with React, Redux, Router and Server Rendering.

Includes:

- Server Rendering
- Libraries
    - React
    - Redux
    - Router
    - Helmet
    - SASS/LESS
- Plugins
    - Common chunk for libraries
    - Automatic HTML generator
    - App Cache manifest
    - Statistics
- ES Features
    - statics
    - async/await
    - dynamic imports (`import().then(...)`)

## Scripts

```bash
npm start           # runs a Webpack Dev server without rendering
npm run build       # builds the package
npm run server      # runs an Express server with rendering, build must exist already
npm run server-dev  # runs a Webpack Dev server with rendering, build must exist already 
```

## TODO

- [ ] Tests
    - [ ] JEST + Enzyme
    - [ ] AVA
    - [ ] Karma + Webpack + Mocha + Sinon + Chai + Enzyme
    
## Useful reading

The server rendering is done the following way:

- we use Babel to include routes and stores (we cannot use the compiled bundle because it has
    all browser specifics like `window` object, `head` and `script` tags)
- set up the Express of Webpack Dev server
- use middleware that tries to resolve if the file exists in given file system (dev server uses
    Memory FS)
- if file cannot be found in FS, then React Router comes into play
- resulting HTML along with pre-computed Redux State are emitted