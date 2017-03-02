const serveStaticFiles = () => {
  return process.env.STATIC_FILES_OFF !== "true";
};

module.exports = {
  "plugins": {
    "inert": {
      "enable": true
    },
    "electrodeStaticPaths": {
      "enable": true
    }
  }
};
