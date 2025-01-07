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

- [http://localhost:3000/user/:id](http://localhost:3000/user/:id)
- [http://localhost:3000/user/:id/activity](http://localhost:3000/user/:id/activity)
- [http://localhost:3000/user/:id/average-sessions](http://localhost:3000/user/:id/average-sessions)
- [http://localhost:3000/user/:id/performance](http://localhost:3000/user/:id/performance)

Les IDs disponibles pour les utilisateurs sont : `12` et `18`.

### **Frontend**

- Tableau de bord interactif pour visualiser les données sportives.
- Développé avec React et Vite pour des performances optimales.

---

## Installation et lancement

```bash
cd backend
yarn install
yarn dev
L'API sera disponible à l'adresse suivante : http://localhost:3000.

cd ../frontend
npm install
npm run dev
Le front-end sera disponible à l'adresse suivante : http://localhost:5173.
