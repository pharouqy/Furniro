# Furniro - Plateforme e-commerce mobilier

Furniro est une application e-commerce moderne pour la vente de mobilier premium. Le projet combine une interface React/Vite orientée expérience utilisateur, un backend Express connecté à MongoDB, une gestion de panier persistante, un backoffice administrateur et une intégration de paiement Chargily Pay pour les cartes CIB / EDAHABIA.

Le dépôt est organisé comme une application web full-stack découpée en deux runtimes:

- `src/`: frontend React servi par Vite.
- `server/`: API Node.js / Express, modèles MongoDB, authentification JWT, commandes et paiement.

## Sommaire

- [Fonctionnalités](#fonctionnalites)
- [Architecture technique](#architecture-technique)
- [Stack utilisée](#stack-utilisee)
- [Prérequis](#prerequis)
- [Installation locale](#installation-locale)
- [Variables d'environnement](#variables-denvironnement)
- [Base de données et seed](#base-de-donnees-et-seed)
- [Lancement en développement](#lancement-en-developpement)
- [Scripts disponibles](#scripts-disponibles)
- [Routes frontend](#routes-frontend)
- [API backend](#api-backend)
- [Flux paiement Chargily](#flux-paiement-chargily)
- [Backoffice administrateur](#backoffice-administrateur)
- [Build production](#build-production)
- [Déploiement](#deploiement)
- [Sécurité et durcissement production](#securite-et-durcissement-production)
- [Dépannage](#depannage)
- [Structure du projet](#structure-du-projet)

## Fonctionnalités

- Vitrine e-commerce responsive avec pages accueil, boutique, fiche produit, panier, checkout, contact et pages de retour paiement.
- Panier persistant via `localStorage`, avec gestion des variantes produit par taille et couleur.
- Système de favoris persistant.
- Design system CSS avec tokens, thèmes clair/sombre, composants réutilisables et animations respectant `prefers-reduced-motion`.
- Backoffice administrateur avec authentification JWT, liste des commandes, filtre par statut, pagination, changement de statut et suppression.
- API REST Express pour produits, commandes, authentification et paiement.
- Paiement Chargily Pay en DZD, avec redirection checkout et webhook signé.
- Seed MongoDB pour initialiser un catalogue produit de démonstration.
- Build frontend optimisé via Vite.

## Architecture technique

### Vue d'ensemble

```mermaid
flowchart LR
  Browser["Navigateur utilisateur"] --> Vite["Frontend React / Vite"]
  Vite --> Api["API Express /api"]
  Api --> Mongo["MongoDB"]
  Api --> Chargily["Chargily Pay"]
  Chargily --> Webhook["Webhook /api/webhooks/chargily"]
  Webhook --> Mongo
  Admin["Backoffice /admin"] --> Api
```

### Frontend

Le frontend est une SPA React structurée autour de `react-router-dom`. Les routes sont déclarées dans `src/router/Routes.jsx` et chargées en lazy loading via `React.lazy` / `Suspense`.

Les appels API sont centralisés dans `src/common/utils/api.js`. La base URL est résolue avec:

```js
import.meta.env.VITE_API_URL || "/api"
```

En développement, le proxy Vite redirige `/api` vers `http://localhost:3001`. En production, `VITE_API_URL` doit pointer vers l'URL publique du backend, par exemple `https://api.example.com/api`.

### Backend

Le backend est une API Express 5 démarrée depuis `server/index.js`. Elle expose les routes suivantes:

- `/api/health`
- `/api/auth`
- `/api/products`
- `/api/orders`
- `/api/payments`
- `/api/webhooks/chargily`

La connexion MongoDB est gérée par `server/db.js` avec une stratégie de retry. Les modèles Mongoose sont dans `server/models`.

### Base de données

Le projet actif utilise MongoDB via Mongoose. Certains fichiers SQLite historiques peuvent exister dans `server/`, mais ils ne font plus partie du chemin d'exécution actuel.

Modèles principaux:

- `Product`: titre, description, prix, remise, image, catégorie.
- `Order`: client, adresse, montant total, statut, articles, identifiant checkout Chargily.
- `User`: administrateur, email unique, mot de passe hashé, rôle.

## Stack utilisée

### Frontend

- React `19`: construction de l'interface utilisateur.
- Vite `8`: serveur de développement, bundling et build production.
- Tailwind CSS `4` avec `@tailwindcss/vite`: utilitaires CSS et intégration build.
- React Router `7`: routage SPA.
- Zustand `5`: stores client persistants pour panier, favoris et authentification admin.
- Lucide React: icônes UI.
- CSS custom properties / design tokens: thèmes, typographie, couleurs, espacements et états interactifs.
- Fontshare: polices `Cabinet Grotesk` et `Satoshi`.

### Backend

- Node.js `>= 18`.
- Express `5`: API HTTP.
- Mongoose `9`: modèles et accès MongoDB.
- MongoDB: persistance produits, commandes et administrateurs.
- dotenv: configuration par variables d'environnement.
- CORS: contrôle des origines frontend autorisées.
- bcrypt: hashage des mots de passe admin.
- jsonwebtoken: génération et vérification des JWT.
- `@chargily/chargily-pay`: création de checkout et vérification de signature webhook.

### Qualité et tooling

- ESLint `10` avec règles JavaScript, React Hooks et React Refresh.
- Build Vite validé avec `npm run build`.
- Le script `npm run lint` existe, mais l'état actuel du projet nécessite un ajustement ESLint pour couvrir proprement `server/**` en environnement Node et résoudre quelques règles React Hooks / variables inutilisées avant une CI stricte.

## Prérequis

- Node.js `18+` minimum.
- npm.
- Une instance MongoDB locale ou distante.
- Un compte Chargily Pay pour tester ou activer le paiement CIB / EDAHABIA.
- Deux terminaux pour lancer frontend et backend en développement.

Versions recommandées en environnement professionnel:

- Node.js LTS récent.
- MongoDB Atlas pour staging / production.
- Un gestionnaire de secrets côté hébergeur pour les variables sensibles.

## Installation locale

Depuis la racine du projet:

```bash
npm install
cd server
npm install
cd ..
```

Cette installation est volontairement séparée parce que le frontend et le backend possèdent chacun leur propre `package.json`.

## Variables d'environnement

Ne versionnez jamais de secret réel. Utilisez des fichiers locaux (`.env`, `.env.local`) en développement et les variables d'environnement natives de votre hébergeur en production.

### Backend: `server/.env`

Le serveur lit ses variables depuis le dossier `server`, car les scripts backend exécutent Node depuis ce répertoire.

```env
PORT=3001
MONGO_URI=mongodb://localhost:27017/furino
JWT_SECRET=replace-with-a-long-random-secret
FRONTEND_URL=http://localhost:5173
CHARGILY_API_KEY=test_sk_xxxxxxxxxxxxxxxxx
CHARGILY_MODE=test
```

Variables:

| Variable | Obligatoire | Description |
| --- | --- | --- |
| `PORT` | Non | Port HTTP de l'API. Par défaut: `3001`. |
| `MONGO_URI` | Oui en production | URI MongoDB. Par défaut local: `mongodb://localhost:27017/furino`. |
| `JWT_SECRET` | Oui en production | Secret de signature JWT. Doit être long, unique et non prédictible. |
| `FRONTEND_URL` | Oui | URL canonique du frontend, utilisée par CORS et par les retours checkout Chargily. Gardez une seule URL tant que le code utilise cette même variable pour `success_url` et `failure_url`. |
| `CHARGILY_API_KEY` | Oui pour paiement carte | Clé secrète Chargily Pay. |
| `CHARGILY_MODE` | Non | `test` ou `live` selon l'environnement Chargily. |

### Frontend: `.env.local`

En local, cette variable est facultative grâce au proxy Vite. Pour être explicite:

```env
VITE_API_URL=/api
```

En production:

```env
VITE_API_URL=https://your-api-domain.com/api
```

Important: les variables exposées au frontend doivent commencer par `VITE_`. Tout ce qui est secret doit rester côté serveur.

## Base de données et seed

### Option 1: MongoDB local

Démarrez MongoDB localement puis utilisez:

```bash
cd server
node seed.js
```

Le script `server/seed.js`:

- se connecte à MongoDB via `MONGO_URI`;
- vérifie le nombre de produits existants;
- insère les produits de démonstration uniquement si la collection est vide.

Il ne purge pas les données existantes.

### Option 2: MongoDB Atlas

1. Créez un cluster MongoDB Atlas.
2. Créez un utilisateur applicatif.
3. Autorisez l'adresse IP de votre environnement backend.
4. Copiez l'URI de connexion dans `MONGO_URI`.
5. Lancez `node seed.js` une seule fois depuis un environnement ayant accès au cluster.

## Lancement en développement

Ouvrez deux terminaux.

Terminal 1 - API backend:

```bash
npm run server
```

Ce script exécute:

```bash
cd server && node --watch index.js
```

Terminal 2 - frontend Vite:

```bash
npm run dev
```

URLs utiles:

- Frontend: `http://localhost:5173`
- API healthcheck: `http://localhost:3001/api/health`
- Backoffice admin: `http://localhost:5173/admin/login`

Le proxy Vite est défini dans `vite.config.js`:

```js
server: {
  proxy: {
    "/api": {
      target: "http://localhost:3001",
      changeOrigin: true,
    },
  },
}
```

## Scripts disponibles

### Racine du projet

| Script | Commande | Usage |
| --- | --- | --- |
| `npm run dev` | `vite --host` | Lance le frontend en développement. |
| `npm run build` | `vite build` | Génère le build production dans `dist/`. |
| `npm run preview` | `vite preview` | Sert localement le build `dist/`. |
| `npm run lint` | `eslint .` | Analyse le projet avec ESLint. |
| `npm run server` | `cd server && node --watch index.js` | Lance l'API backend en mode watch. |

### Backend `server/`

| Script | Commande | Usage |
| --- | --- | --- |
| `npm start` | `node index.js` | Lance l'API en production. |
| `npm run dev` | `node --watch index.js` | Lance l'API en développement. |
| `npm run build` | `npm install` | Script de compatibilité hébergeur; le serveur n'est pas transpilé. |

## Routes frontend

| Route | Page |
| --- | --- |
| `/` | Accueil. |
| `/shop` | Boutique avec tri, pagination et catalogue local généré côté React. |
| `/product/:id` | Fiche produit, variantes, galerie et ajout panier. |
| `/cart` | Panier. |
| `/checkout` | Formulaire client, choix de paiement et création commande. |
| `/checkout/success` | Retour paiement réussi et vérification de statut. |
| `/checkout/failure` | Retour paiement échoué. |
| `/about` | À propos. |
| `/contact` | Contact. |
| `/admin/login` | Connexion / création admin. |
| `/admin` | Dashboard administrateur. |
| `*` | Page 404. |

Note catalogue: la boutique et les fiches produit utilisent actuellement des données locales côté frontend. L'API `/api/products` et le seed MongoDB existent, mais le raccord complet de la boutique au catalogue backend reste une évolution logique du projet.

## API backend

### Santé

| Méthode | Route | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Vérifie que l'API répond. |

Réponse:

```json
{
  "status": "ok",
  "timestamp": "2026-06-21T00:00:00.000Z"
}
```

### Authentification admin

| Méthode | Route | Protection | Description |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Publique | Crée un compte admin et retourne un JWT. |
| `POST` | `/api/auth/login` | Publique | Connecte un admin. |
| `GET` | `/api/auth/me` | Bearer token | Retourne l'utilisateur courant. |

### Produits

| Méthode | Route | Description |
| --- | --- | --- |
| `GET` | `/api/products` | Liste les produits MongoDB. |
| `GET` | `/api/products/:id` | Récupère un produit par identifiant MongoDB. |

### Commandes

| Méthode | Route | Protection | Description |
| --- | --- | --- | --- |
| `POST` | `/api/orders` | Publique | Crée une commande avec statut `pending`. |
| `GET` | `/api/orders/:id` | Publique | Récupère une commande précise. |
| `GET` | `/api/orders?page=1&limit=20&status=pending` | Admin | Liste les commandes avec pagination et filtre optionnel. |
| `PATCH` | `/api/orders/:id/status` | Admin | Met à jour le statut d'une commande. |
| `DELETE` | `/api/orders/:id` | Admin | Supprime une commande. |

Statuts valides:

```txt
pending, paid, processing, shipped, delivered, cancelled
```

### Paiement

| Méthode | Route | Description |
| --- | --- | --- |
| `POST` | `/api/payments/create-checkout` | Crée un checkout Chargily pour une commande. |
| `GET` | `/api/payments/check-status/:orderId` | Retourne le statut d'une commande. |
| `POST` | `/api/webhooks/chargily` | Reçoit les événements Chargily signés. |

## Flux paiement Chargily

```mermaid
sequenceDiagram
  participant U as Client
  participant F as Frontend
  participant A as API Express
  participant M as MongoDB
  participant C as Chargily

  U->>F: Valide le checkout
  F->>A: POST /api/orders
  A->>M: Crée Order status=pending
  A-->>F: orderId
  alt Paiement carte
    F->>A: POST /api/payments/create-checkout
    A->>C: createCheckout(amount, success_url, failure_url, webhook)
    C-->>A: checkout_url
    A->>M: Sauve chargily_checkout_id
    A-->>F: checkoutUrl
    F->>C: Redirection utilisateur
    C-->>A: POST /api/webhooks/chargily
    A->>A: Vérifie signature
    A->>M: status=paid
    C-->>F: Retour success/failure
    F->>A: GET /api/payments/check-status/:orderId
  else Cash / virement
    F->>A: Commande déjà créée
    F->>F: Vide le panier et confirme
  end
```

Points clés:

- Le montant est calculé côté serveur à partir des lignes de commande.
- La devise envoyée à Chargily est `dzd`.
- Le montant minimum accepté est `1 DZD`.
- Le webhook vérifie la signature via `verifySignature`.
- Seul l'événement `checkout.paid` met automatiquement la commande en `paid`.

Attention production: dans l'état actuel, `server/routes/payments.js` construit l'URL webhook avec `http://localhost:${PORT}`. Pour un paiement live, remplacez cette origine par l'URL publique HTTPS du backend, idéalement via une variable dédiée comme `API_PUBLIC_URL`, puis utilisez:

```txt
https://your-api-domain.com/api/webhooks/chargily
```

## Backoffice administrateur

Accès local:

```txt
http://localhost:5173/admin/login
```

Parcours:

1. Ouvrir `/admin/login`.
2. Cliquer sur `Register` pour créer le premier compte admin.
3. Être redirigé vers `/admin`.
4. Gérer les commandes: filtrer, paginer, changer le statut, supprimer.

Le token JWT est stocké côté client via Zustand persist dans `localStorage` sous la clé `furniro-auth`.

En production, la route `/api/auth/register` ne doit pas rester ouverte sans contrôle. Créez l'administrateur initial pendant le setup, puis protégez ou désactivez l'inscription publique.

## Build production

Générer le frontend:

```bash
npm run build
```

Le build est produit dans:

```txt
dist/
```

Prévisualiser localement:

```bash
npm run preview
```

Le backend ne nécessite pas de compilation. Il s'exécute directement avec Node:

```bash
cd server
npm start
```

## Déploiement

Le projet doit être déployé comme deux services:

1. Frontend statique React/Vite.
2. Backend Node/Express public.

MongoDB doit être accessible par le backend. Chargily doit pouvoir appeler le webhook backend depuis Internet.

### Ordre recommandé

1. Créer la base MongoDB de production.
2. Déployer l'API backend.
3. Vérifier `/api/health`.
4. Lancer le seed si nécessaire.
5. Déployer le frontend avec `VITE_API_URL` pointant vers l'API.
6. Tester une commande cash/virement.
7. Tester Chargily en mode `test`.
8. Passer Chargily en `live` uniquement après validation du webhook HTTPS.

### Déploiement backend

Sur un hébergeur Node comme Render, Railway, Fly.io, un VPS ou tout service supportant Node.js:

- Root directory: `server`
- Install command: `npm install`
- Start command: `npm start`
- Healthcheck: `/api/health`

Variables backend production:

```env
PORT=3001
MONGO_URI=mongodb+srv://user:password@cluster.example.mongodb.net/furino
JWT_SECRET=replace-with-a-production-grade-secret
FRONTEND_URL=https://your-frontend-domain.com
CHARGILY_API_KEY=live_sk_xxxxxxxxxxxxxxxxx
CHARGILY_MODE=live
```

Si l'hébergeur injecte automatiquement `PORT`, ne forcez pas une valeur fixe.

Après déploiement:

```bash
curl https://your-api-domain.com/api/health
```

Réponse attendue:

```json
{
  "status": "ok",
  "timestamp": "..."
}
```

### Déploiement frontend sur Vercel

Le fichier `vercel.json` contient une règle de rewrite SPA:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Configuration Vercel:

- Framework preset: Vite.
- Install command: `npm install`.
- Build command: `npm run build`.
- Output directory: `dist`.
- Environment variable:

```env
VITE_API_URL=https://your-api-domain.com/api
```

Cette configuration garantit que les routes React comme `/shop`, `/cart` ou `/admin` restent accessibles au refresh navigateur.

### Déploiement frontend sur autre hébergeur statique

Tout hébergeur statique compatible SPA fonctionne:

1. Construire le projet avec `npm run build`.
2. Publier le contenu de `dist/`.
3. Configurer une fallback route vers `index.html`.
4. Définir `VITE_API_URL` au moment du build.

Exemples de fallback:

- Netlify: `_redirects` avec `/* /index.html 200`.
- Nginx: `try_files $uri $uri/ /index.html;`.
- Apache: rewrite vers `index.html`.

### Seed en production

Si la base production est vide:

```bash
cd server
node seed.js
```

Exécutez cette commande depuis un environnement qui possède les variables production et l'accès réseau à MongoDB.

## Sécurité et durcissement production

Checklist minimale avant mise en ligne réelle:

- Remplacer `JWT_SECRET` par une valeur forte, longue et unique.
- Ne jamais commiter `.env`, clés Chargily ou URI MongoDB contenant des identifiants.
- Restreindre `FRONTEND_URL` aux domaines réellement autorisés.
- Durcir la configuration CORS: en production, une origine inconnue devrait être refusée plutôt qu'autorisée.
- Fermer ou protéger `/api/auth/register` après création du premier administrateur.
- Utiliser HTTPS pour le frontend, l'API et le webhook Chargily.
- Adapter l'URL webhook Chargily pour utiliser le domaine public backend.
- Mettre Chargily en `test` pendant les validations, puis `live` uniquement après un test webhook concluant.
- Activer les sauvegardes MongoDB.
- Prévoir une rotation des secrets si une clé a été exposée.
- Ajouter une stratégie de logs et monitoring backend.
- Ajouter une validation serveur plus stricte pour les payloads critiques: commandes, emails, téléphone, montants, quantités.

## Dépannage

### Le frontend ne joint pas l'API

Vérifiez:

- backend lancé sur `http://localhost:3001`;
- `npm run server` actif;
- proxy Vite présent dans `vite.config.js`;
- `VITE_API_URL` correct en production.

### Erreur CORS

Vérifiez `FRONTEND_URL` côté backend. Exemple:

```env
FRONTEND_URL=https://your-frontend-domain.com
```

Si vous devez autoriser plusieurs origines en production, séparez idéalement l'URL canonique du frontend et la liste CORS dans le code, par exemple avec une future variable `ALLOWED_ORIGINS`. Avec l'implémentation actuelle, mettre plusieurs URLs dans `FRONTEND_URL` peut casser les retours Chargily.

### MongoDB ne se connecte pas

Vérifiez:

- URI `MONGO_URI`;
- utilisateur et mot de passe MongoDB;
- whitelist réseau Atlas;
- disponibilité du service MongoDB local;
- logs backend, qui affichent jusqu'à 5 tentatives de connexion.

### Le paiement Chargily ne met pas la commande en `paid`

Vérifiez:

- `CHARGILY_API_KEY`;
- `CHARGILY_MODE`;
- URL webhook publique HTTPS;
- signature reçue dans l'en-tête `signature`;
- présence de `chargily_checkout_id` sur la commande;
- événement Chargily de type `checkout.paid`.

### Refresh navigateur sur `/admin` ou `/shop` renvoie 404

Le serveur statique n'est pas configuré en mode SPA fallback. Sur Vercel, `vercel.json` règle déjà le problème. Sur un autre hébergeur, ajoutez une redirection de toutes les routes vers `index.html`.

### `npm run lint` remonte `process is not defined`

Le lint scanne aussi le dossier `server`, alors que la configuration actuelle déclare surtout les globals navigateur. Ajoutez une section ESLint dédiée à `server/**/*.js` avec les globals Node, puis corrigez les quelques variables inutilisées et règles React Hooks restantes.

## Structure du projet

```txt
.
├── public/
│   ├── *.jpg, *.webp, *.svg        # Images et assets publics
│   └── favicon.svg
├── server/
│   ├── index.js                    # Point d'entrée Express
│   ├── config.js                   # Configuration par variables d'environnement
│   ├── db.js                       # Connexion MongoDB avec retry
│   ├── seed.js                     # Seed initial des produits
│   ├── models/
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   └── payments.js
│   └── middleware/
│       ├── auth.js
│       └── errorHandler.js
├── src/
│   ├── main.jsx                    # Bootstrap React
│   ├── App.jsx                     # Shell applicatif
│   ├── router/
│   │   └── Routes.jsx              # Déclaration des routes SPA
│   ├── pages/                      # Pages principales
│   ├── components/                 # Composants historiques partagés
│   ├── common/
│   │   ├── components/             # Atomes, molécules, layouts
│   │   ├── hooks/                  # Hooks utilitaires
│   │   ├── stores/                 # Stores transverses
│   │   └── utils/                  # API, thème, helpers
│   ├── features/
│   │   ├── cart/store/cartStore.js
│   │   └── products/store/likeStore.js
│   ├── store/
│   │   └── authStore.js
│   └── styles/
│       ├── tokens.css
│       ├── base.css
│       └── components.css
├── vite.config.js                  # Vite, React, Tailwind, alias @ et proxy API
├── vercel.json                     # Rewrite SPA pour Vercel
├── eslint.config.js                # Configuration ESLint
├── package.json                    # Scripts et dépendances frontend
└── README.md
```

## Notes de maintenance

- Le design system repose sur `src/styles/tokens.css`; privilégiez les tokens avant d'ajouter des couleurs ou espacements ponctuels.
- Les stores persistants utilisent `localStorage`: `furniro-cart-storage`, `furniro-likes-storage`, `furniro-auth` et `furniro-theme`.
- Le raccord du catalogue frontend à `/api/products` est la prochaine amélioration structurante pour supprimer les données locales dupliquées.
- Le paiement live demande une URL webhook publique stable et HTTPS.
- Les fichiers de données locaux ou historiques ne doivent pas être considérés comme source de vérité; MongoDB est la base active du backend.
