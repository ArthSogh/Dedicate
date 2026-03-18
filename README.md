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

## 📄 Licence
Ce projet est sous licence MIT.
