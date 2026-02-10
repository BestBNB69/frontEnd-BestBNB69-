# 🧪 Tests Frontend Automatisés – Cypress (E2E)

Ce projet contient des **tests End-to-End (E2E)** écrits avec **Cypress** pour tester le frontend Angular de manière automatisée.

Les tests simulent un utilisateur réel :
- navigation dans l’application
- authentification automatique
- création de conversations si nécessaire
- envoi de messages
- vérification du comportement global de l’interface

L’objectif est de garantir que les fonctionnalités principales fonctionnent correctement **du point de vue utilisateur**.

---

## 📌 Technologies utilisées

- **Angular** (frontend)
- **Cypress** (tests E2E)
- **Node.js**
- **TypeScript**

---

## 📋 Prérequis

Avant de lancer les tests, assure-toi d’avoir installé :

- **Node.js ≥ 18**
  👉 https://nodejs.org
- **npm** (fourni avec Node)
- Un petit **npm install** au cas où
- Le **backend** fonctionnel
- Le **frontend Angular** lancé
- Cypress écoute le **frontend Angular** sur le port **4200**
---

## Lancer le projet sur un autre terminal

- npm run cypress:open

- Choississez E2E Testing puis Electron