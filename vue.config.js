module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },
  transpileDependencies: ["quasar"],
  pwa: {
    name: "OneSpot",
    short_name: "OneSpot",
    themeColor: "#ffffff",
    msTileColor: "#ffffff",
    backgroundColor: "#ffffff",
    manifestOptions: {
      icons: [
        {
          src: "img/icons/maskable_icon.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "img/icons/icon-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
      ],
    },
  },
};
