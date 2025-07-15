import { VitePWAOptions } from "vite-plugin-pwa";

export const pwaConfig: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  devOptions: {
    enabled: true,
  },
  workbox: {
    globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "google-fonts-cache",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "gstatic-fonts-cache",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
  includeAssets: ["**/*"],
  manifest: {
    name: "PWA Test",
    short_name: "PWA Test",
    description: "PWA Test",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
    icons: [
      {
        src: "images/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "images/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "images/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "images/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "images/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        src: "images/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "images/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "images/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
};
