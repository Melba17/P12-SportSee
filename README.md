# P12 - SportSee

## Description du projet

Ce projet vise à proposer un tableau de bord analytique permettant de visualiser les données sportives d’un utilisateur, telles que ses performances, son activité quotidienne, ses sessions moyennes, et plus encore.

Il inclut :

- **backend/** : Fork du dépôt original [SportSee Backend](https://github.com/OpenClassrooms-Student-Center/SportSee), qui contient les endpoints nécessaires pour l'application.
- **frontend/** : Développé avec React (Vite) pour afficher les données du back-end sous forme de graphiques et statistiques.

---

## Prérequis

- [Node.js](https://nodejs.org/) version 12.18 ou supérieure.
- [Yarn](https://yarnpkg.com/) pour le backend.
- [npm](https://www.npmjs.com/) pour le frontend.

---

## Fonctionnalités principales

### **Backend**

Fournit des données sportives à travers 4 endpoints principaux :

- `GET /user/:id`
- `GET /user/:id/activity`
- `GET /user/:id/average-sessions`
- `GET /user/:id/performance`

Les IDs disponibles pour les utilisateurs sont : `12` et `18`.

Le backend est désormais déployé sur Render à l'adresse suivante :  
👉 [https://backend-l3p5.onrender.com](https://backend-l3p5.onrender.com)

⚠️ **Remarque** : Lors du premier appel, Render peut mettre jusqu’à **50 secondes** à démarrer (hébergement gratuit avec mise en veille automatique).

---

### **Frontend**

- Tableau de bord interactif pour visualiser les données sportives.
- Développé avec React et Vite pour des performances optimales.
- Appelle automatiquement l'API distante via l’URL Render ci-dessus.

---

## Installation et lancement en local (optionnel)

### Lancer le backend en local (optionnel)

```bash
cd backend
yarn install
yarn dev

Cela lancera le backend sur http://localhost:3000
➡️ Dans ce cas, il faudra modifier manuellement l'URL de l'API dans le frontend si vous ne souhaitez pas utiliser le backend déployé.

Lancer le frontend

cd frontend
npm install
npm run dev

Le frontend sera disponible à l'adresse suivante :
http://localhost:5173

Remarques
Le projet peut être utilisé directement en mode production grâce au backend Render.

Pour utiliser des données mockées ou locales, adaptez les appels dans le fichier de service (apiService.js).
