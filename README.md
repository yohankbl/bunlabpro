# BunLab Smash Club — React + Vite (PRO, patch Vercel)

Projet prêt Vercel avec HashRouter, vite.config.js, @vitejs/plugin-react et Node >=20.

## Déployer (GitHub → Vercel)
1) **Dézippez** et uploadez le **contenu** dans votre repo GitHub :
   - index.html, package.json, vite.config.js, vercel.json, README.md, src/, public/
2) Sur **Vercel** : Add New → Project → choisissez le repo → Deploy.
   - Build Command : `npm run build`
   - Output Directory : `dist`
   - Node.js : 20
3) Ouvrez l’URL → les pages sont en `/#/menu`, `/#/reservations`, etc.

## Dev local
```
npm install
npm run dev
```
