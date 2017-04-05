# Development

Automatically runs SASS watcher in parallel with Webpack Dev Server, no Server Side Rendering.

```bash
$ npm start
```

# Production + Server Side Rendering

The redeploy sequence is as follows:

1. Build everything
    - SASS
    - Client
    - Server
2. Run the pre-built server with middleware in static (express) mode

```bash
$ npm run build
$ npm run server
```

# Known issues

- [ ] Dynamic imports won't work until `react-scripts@0.10.0`
- [ ] Can't have skins because CSS is extracted in one file
- [ ] No server side rendering
- [ ] [react-snapshot](https://github.com/geelen/react-snapshot) will not help because it is
    not Redux-aware for now