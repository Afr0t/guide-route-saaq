import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "./",
  build: {
    target: "es2018",
    cssCodeSplit: true,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        // Sépare React du code applicatif → meilleur cache long terme :
        // une mise à jour du contenu n'invalide pas le chunk vendor.
        manualChunks: {
          react: ["react", "react-dom"]
        }
      }
    }
  },
  plugins: [
    // Injecte la CSP en <meta> à la PRODUCTION seulement (repli pour les hôtes
    // sans en-têtes custom, ex. GitHub Pages). En dev, on l'omet pour ne pas
    // bloquer le HMR de Vite.
    {
      name: "csp-meta-prod",
      apply: "build",
      transformIndexHtml(html) {
        const csp =
          "default-src 'self'; base-uri 'self'; object-src 'none'; " +
          "img-src 'self' data:; style-src 'self' 'unsafe-inline'; " +
          "script-src 'self'; font-src 'self'; connect-src 'self'; " +
          "manifest-src 'self'; worker-src 'self'; form-action 'self'";
        return html.replace(
          "</title>",
          `</title>\n    <meta http-equiv="Content-Security-Policy" content="${csp}" />`
        );
      }
    },
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      manifest: {
        name: "Guide de la route – Examen SAAQ",
        short_name: "Guide route",
        description:
          "Condensé du Guide de la route SAAQ + quiz interactif pour réussir l'examen théorique du permis classe 5.",
        theme_color: "#0d1b2a",
        background_color: "#0d1b2a",
        display: "standalone",
        start_url: "./",
        scope: "./",
        icons: [
          { src: "icon-192.svg", sizes: "192x192", type: "image/svg+xml", purpose: "any" },
          { src: "icon-512.svg", sizes: "512x512", type: "image/svg+xml", purpose: "any" },
          { src: "icon-maskable.svg", sizes: "512x512", type: "image/svg+xml", purpose: "maskable" }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2}"]
      }
    })
  ]
});
