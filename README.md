# Vue boilerplate with SSR and webpack

Built with Vue 2.0 + vue-router + vuex, with server-side rendering.

The project is based on https://github.com/vuejs/vue-hackernews-2.0 but deleted everything unnecessary, 
configured SCSS and CSS modules + https://www.antdv.com/ added

- Server Side Rendering
  - Vue + vue-router + vuex working together
  - Server-side data pre-fetching
  - Client-side state & DOM hydration
  - Automatically inlines CSS used by rendered components only
  - SCSS and CSS-module
  - Preload / prefetch resource hints
  - Route-level code splitting
- Single-file Vue Components
  - Hot-reload in development
  - CSS extraction for production
  
## Build Setup

**Requires Node.js 7+**

``` bash
# install dependencies
npm install # or yarn

# serve in dev mode, with hot reload at localhost:8080
npm run dev

# build for production
npm run build

# serve in production mode
npm start
```

## License

MIT
