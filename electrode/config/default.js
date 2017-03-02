"use strict";

module.exports = {
  "plugins": {
    "inert": {
      "enable": true
    },
    "electrodeStaticPaths": {
      "enable": true,
      "options": {
        "pathPrefix": "dist"
      }
    },
    "webapp": {
      "module": "electrode-react-webapp/lib/express",
      "options": {
        "pageTitle": "generated",
        "paths": {
          "*": {
            "content": {
              "module": "./{{env.APP_SRC_DIR}}/server/views/index"
            }
          }
        }
      }
    }
  },
  "connections": {
    "default": {
      "host": process.env.HOST,
      "address": process.env.HOST_IP || "0.0.0.0",
      "port": process.env.PORT || 3000,
      "routes": {
        "cors": true
      },
      "state": {
        "ignoreErrors": true
      }
    }
  }
};
