# 🎁 Dedicate

**Dedicate** est une plateforme SaaS moderne permettant de créer, personnaliser et offrir des micro-sites web uniques pour vos proches. Que ce soit pour un anniversaire, une déclaration d'amour ou une occasion spéciale, Dedicate transforme un simple message en une expérience numérique immersive et mémorable.

---

## 🚀 Fonctionnalités Clés

- **Authentification Sécurisée** : Gestion des comptes utilisateurs via Supabase Auth (Email/MDP).
- **Création Intuitive (Wizard)** : Un tunnel de création étape par étape pour configurer le cadeau (destinataire, message, thème, photos).
- **Gestion de Contenu Multimédia** : Upload sécurisé d'images via Supabase Storage.
- **Paiement Intégré** : Tunnel de paiement sécurisé avec Stripe Checkout.
- **Pages Cadeaux Protégées** : Accès sécurisé par mot de passe pour les destinataires.
- **Dashboard Utilisateur** : Suivi des cadeaux créés, statut des paiements et gestion des liens de partage.
- **Design "Wow"** : Interface ultra-moderne utilisant Framer Motion pour des animations fluides et Tailwind CSS pour un rendu premium.

---

## 🛠️ Stack Technique

- **Framework** : [Next.js 14+](https://nextjs.org/) (App Router, Server Components)
- **Langage** : [TypeScript](https://www.typescriptlang.org/)
- **Style** : [Tailwind CSS 4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- **Animations** : [Framer Motion](https://www.framer.com/motion/)
- **Backend & Auth** : [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage)
- **Paiements** : [Stripe](https://stripe.com/)
- **Gestion d'État** : [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)

---

## 📦 Installation et Setup

### 1. Cloner le repository
```bash
git clone https://github.com/ArthSogh/Dedicate.git
cd dedicate
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer les variables d'environnement
Créez un fichier `.env.local` à la racine (utilisez `.env.local.example` comme modèle) et remplissez vos clés :
```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon
STRIPE_SECRET_KEY=votre_cle_stripe
STRIPE_WEBHOOK_SECRET=votre_secret_webhook
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Lancer le serveur de développement
```bash
npm run dev
```

---

## 🏠 Structure du Projet

```text
src/
├── app/            # Routes Next.js (Home, Auth, Dashboard, Order, Gift)
├── components/     # Composants React (Landing, Views, UI shadcn)
├── lib/            # Configurations (Supabase client/server, Stripe, Utils)
└── middleware.ts   # Protection des routes et gestion des sessions
supabase/           # Schémas SQL et scripts de configuration Storage
```

---

## 👨‍💻 Développeur

**Arthur Soghoyan**

Projet réalisé dans le cadre d'un apprentissage approfondi de la stack **T3** (Next.js, TypeScript, Tailwind) et de l'écosystème **BaaS** (Supabase/Stripe). L'objectif était de construire un produit complet, de l'architecture backend au design frontend haut de gamme.

---

## 🎯 Défis Techniques & Apprentissages

Ce projet a été conçu pour démontrer ma capacité à mener de bout en bout le développement d'un produit complexe (Full-stack SaaS) avec des exigences techniques de niveau production :

1. **Intégration Paiement & Webhooks Stripe** : Sécurisation du tunnel de vente et gestion de l'asynchronisme des paiements via les événements webhook Stripe pour valider la création du site-cadeau et initier l'envoi d'emails transactionnels.
2. **Architecture App Router (Next.js 14+)** : Déploiement optimal de Server Components pour réduire le JS côté client, interagir directement avec Supabase avec des temps de réponse ultra-rapides, tout en conservant une interactivité riche (Client Components) pour le *Wizard* de création.
3. **Sécurité Automatisée (Supabase RLS & Storage)** : Mise en place de règles de sécurité "Row Level Security" strictes sur PostgreSQL. Les utilisateurs ne peuvent modifier que leurs propres configurations, et les photos téléchargées sont validées rigoureusement avant l'upload.
4. **UX/UI Sophistiquée (Framer Motion)** : Refonte complète de la présentation frontend. Ce projet met en valeur la capacité à traduire des maquettes (v0) en composants fonctionnels avec des animations web fluides de haute qualité.
5. **Gestion d'État Complexe (Zustand)** : Résolution de la dégradation de performance lors d'un tunnel de commande (wizard) à 10 étapes en utilisant Zustand plutôt que du prop-drilling.

---

## 📄 Licence
Ce projet est sous licence MIT.
