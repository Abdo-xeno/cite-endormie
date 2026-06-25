# 🌙 La Cité Endormie — Site de présentation

Site web de présentation de l'escape game pédagogique **La Cité Endormie**.
Construit avec **Next.js 14**, **Tailwind CSS** et **Framer Motion**.

---

## 🚀 Lancer le site en local

Il te faut **Node.js** installé (version 18 ou plus récente).
Vérifie avec : `node --version`. Sinon, télécharge-le sur [nodejs.org](https://nodejs.org).

Ensuite, dans le dossier du projet, ouvre un terminal et tape **3 commandes** :

```bash
# 1. Installer les dépendances (à faire une seule fois)
npm install

# 2. Lancer le site en mode développement
npm run dev
```

Puis ouvre ton navigateur sur **http://localhost:3000** 🎉

> Le site se recharge automatiquement quand tu modifies un fichier.

---

## 🌍 Mettre le site en ligne — GRATUITEMENT

### Option 1 — Vercel (RECOMMANDÉ, le plus simple)

Vercel est l'hébergeur créé par les auteurs de Next.js. Gratuit, et le déploiement prend **2 minutes**.

1. Crée un compte gratuit sur [vercel.com](https://vercel.com) (connecte-toi avec GitHub).
2. Mets ton projet sur **GitHub** (voir plus bas).
3. Sur Vercel : clique **"Add New Project"** → choisis ton dépôt → **"Deploy"**.
4. C'est tout ! Vercel te donne une adresse du type `cite-endormie.vercel.app`.

À chaque fois que tu modifies le code sur GitHub, le site se met à jour tout seul. ✨

### Option 2 — Netlify ou Cloudflare Pages

Même principe, aussi gratuits : [netlify.com](https://netlify.com) ou [pages.cloudflare.com](https://pages.cloudflare.com).

---

## 📦 Mettre le projet sur GitHub (pour déployer)

```bash
# Dans le dossier du projet
git init
git add .
git commit -m "Première version du site La Cité Endormie"
```

Puis crée un dépôt vide sur [github.com](https://github.com) (bouton **"New repository"**),
et suis les instructions affichées ("push an existing repository").

---

## ✏️ Comment modifier le contenu

Tout le contenu est dans le dossier **`components/`**. Chaque fichier = une section :

| Fichier | Ce qu'il contient |
|---------|-------------------|
| `Hero.js` | Le titre d'accueil plein écran |
| `Problematic.js` | La question centrale du projet |
| `Concept.js` | La métaphore (cité, tyran, voile) |
| `Sceaux.js` | **Les 3 énigmes** (style "carte de jeu") |
| `Spiritual.js` | Les versets, le hadith, la réponse |
| `Teaser.js` | L'emplacement de la vidéo teaser |
| `Vision.js` | La feuille de route sur l'année |
| `Finale.js` | L'écran final (téléphone éteint) |

Le texte est en clair dans chaque fichier — tu peux le modifier directement.

### Pour changer les couleurs

Tout est dans **`tailwind.config.js`** (section `colors`) :
- `night` = bleu nuit (fond)
- `gold` = doré (accents)
- `sacred` = vert (versets)

---

## 🎬 Ajouter la vidéo teaser (quand elle sera prête)

Ouvre `components/Teaser.js` et remplace le bloc "Emplacement vidéo" par :

```jsx
<video controls className="w-full h-full rounded-2xl">
  <source src="/teaser.mp4" type="video/mp4" />
</video>
```

Puis place ton fichier `teaser.mp4` dans le dossier **`public/`**.

Ou, pour une vidéo YouTube :

```jsx
<iframe
  className="w-full aspect-video rounded-2xl"
  src="https://www.youtube.com/embed/TON_ID_VIDEO"
  allowFullScreen
/>
```

---

## 🛠️ Stack technique

- **Next.js 14** (App Router) — framework React, parfait pour Vercel
- **Tailwind CSS** — pour le style et le thème
- **Framer Motion** — pour les animations au scroll
- **Polices** : Cormorant Garamond, EB Garamond, Amiri (Google Fonts)

---

*Qu'Allah ﷻ facilite et bénisse ce projet. 🌿*
