# 🛒 Shop.ma – Artisanat Marocain

> Application e-commerce Front-End développée avec **React (Vite)**  
> Projet Fil Rouge – Checkpoint **S14 (Version 1.0)**

---

## 📌 Description

**Shop.ma** est une application web de vente en ligne dédiée à la promotion des produits d’artisanat marocain  
(tajines, tapis, babouches, décoration, etc.).

Ce projet a été réalisé dans le cadre du **module Front-End (React)** et respecte toutes les exigences du **Checkpoint S14**.

---

## 🚀 Fonctionnalités

- ✅ Navigation avec **React Router**
- ✅ Catalogue de produits (mock data)
- ✅ Recherche par nom
- ✅ Filtrage par catégorie
- ✅ Tri par prix et par nom
- ✅ Page détails produit
- ✅ Panier d’achat fonctionnel :
  - Ajouter / supprimer produit
  - Modifier la quantité
  - Calcul automatique du total
- ✅ Persistance du panier avec **localStorage**
- ✅ Formulaire de contact avec validation
- ✅ Design **Responsive** (Mobile / Tablet / Desktop)
- ✅ CSS standard (sans Bootstrap / Tailwind)

---

## 🧰 Technologies utilisées

- ⚛️ React 18
- ⚡ Vite
- 🧭 React Router DOM
- 🎨 CSS (Flexbox + Grid + Media Queries)
- 💾 LocalStorage
- 🖼️ Lucide React (icônes)

---

## 📁 Structure du projet

src/
│── components/
│ ├── layout/
│ │ ├── Header.jsx
│ │ ├── Footer.jsx
│ ├── products/
│ │ ├── ProductCard.jsx
│
│── pages/
│ ├── Home.jsx
│ ├── Products.jsx
│ ├── ProductDetails.jsx
│ ├── Cart.jsx
│ ├── Contact.jsx
│
│── data/
│ └── products.js
│
│── utils/
│ └── formatPrice.js
│
│── App.jsx
│── App.css
│── main.



---

## ⚙️ Installation & Exécution

### 1️⃣ Cloner le projet
```bash
git clone https://github.com/username/shop-ma-zakaria-benfatah.git


3️⃣ Installer les dépendances
npm install
npm install react-router-dom

4️⃣ Lancer le projet
npm run dev


📱 Responsive Design

L’application est totalement responsive et s’adapte à :

📱 Mobile

📲 Tablette

💻 Desktop

Implémentation via :

CSS Grid

Flexbox

Media Queries

Meta viewport

🎯 Objectifs pédagogiques atteints

Compréhension du state global

Passage des données via props

Utilisation correcte des hooks (useState, useEffect)

Organisation claire du projet React

Bonne pratique de routing

Séparation logique UI / logique métier

👨‍💻 Auteur

Zakaria Benfatah
Étudiant – 2ème Année Développement Digital
ISTA
