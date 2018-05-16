process.env.DEBUG = "nuxt:*";
// process.env.NODE_ENV = "prod";

// const Electron = require("electron");
const { Nuxt, Builder } = require("nuxt");
const axios = require("axios").default;

const app = require("http");

// const isProd = process.env.NODE_ENV === "production";
const port = process.env.PORT || 3000;

// We instantiate nuxt.js with the options
const config = require("./nuxt.config.js");
const nuxt = new Nuxt(config);

// Render every route with Nuxt.js
const server = app.createServer(nuxt.render);

// Build only in dev mode with hot-reloading

if (config.dev) {
  new Builder(nuxt)
    .build()
    .then(listen)
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
} else {
  listen();
}

async function listen() {
  // Listen the server
  await server.listen(port, "0.0.0.0");
  console.log(`Server listening on http://localhost:${port}`);

  setTimeout(() => {
    nw.Window.open(
      `http://localhost:${port}`,
      { height: 400, width: 600 },
      win => {}
    );
  }, 2000);
}
