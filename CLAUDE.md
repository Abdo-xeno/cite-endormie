# CLAUDE.md — La Cité Endormie (site de présentation)

## Ce que fait l'app

Site web **one-page** de présentation d'un escape game pédagogique islamique intitulé **La Cité Endormie**. Ce n'est pas le jeu lui-même : c'est une **vitrine narrative** destinée à un jury scolaire/associatif, pour présenter le concept d'un projet qui sera réalisé sur un an (vidéo finale de 15 min).

L'expérience se vit **au scroll** : on descend la page comme on traverse une histoire — la cité qui dort, le tyran, le réveil, les 3 énigmes, la réponse spirituelle, la vision, et un écran final qui retourne la question vers le visiteur. Un détail clé : **3 bougies fixées à droite s'allument au fil du scroll** — le site devient lui-même une mini-version de l'escape game (3 sceaux à briser).

Objectif émotionnel : faire **ressentir** (immersion sombre, cinématographique) autant que **comprendre**.

## Stack technique

- **Next.js 14** (App Router, JavaScript — pas TypeScript)
- **Tailwind CSS** (thème custom dans `tailwind.config.js`)
- **Framer Motion** (animations au scroll, reveals, flammes)
- Polices **Google Fonts** chargées via `<link>` dans `app/layout.js` : Cormorant Garamond (display), EB Garamond (corps), Amiri (arabe)

## Lancer le projet

```
npm install
npm run dev      → http://localhost:3000
```

Build de prod : `npm run build && npm start`. Déploiement prévu sur **Vercel**.

## Structure des fichiers

- `app/layout.js` — racine, polices, métadonnées
- `app/globals.css` — Tailwind + styles de base (fond, scrollbar, classe `.arabic`, grain, glows)
- `app/page.js` — assemble toutes les sections dans l'ordre
- `components/` — une section par fichier :
  - `Hero.js` — accueil plein écran, titre, Bismillah, scroll fantôme
  - `Problematic.js` — la question centrale du projet
  - `Concept.js` — la métaphore (cité / tyran / voile→écran), 3 cartes
  - `Sceaux.js` — **les 3 énigmes en cartes "façon Squid Game"** (pièce maîtresse)
  - `Spiritual.js` — 3 versets + le hadith (la réponse)
  - `Teaser.js` — emplacement réservé pour la vidéo teaser
  - `Vision.js` — feuille de route sur l'année (timeline)
  - `Finale.js` — écran final (téléphone éteint + bougie + question)
  - `CandleProgress.js` — les 3 bougies fixes qui s'allument au scroll
  - `Reveal.js` — wrapper d'animation au scroll (réutilisé partout)
  - `Decor.js` — petits composants déco (Ornament, SectionLabel)
  - `TimerRing.js` — anneau de minuterie SVG des cartes-énigmes

## Système de design (À RESPECTER)

Couleurs (définies dans `tailwind.config.js`) :
- `night` (#0f2638 / #0a1a2a) = fond bleu nuit profond
- `gold` (#d4af37) = accent principal, doré
- `sacred` (#385723, light #7ba05b) = vert, réservé aux versets
- `cream` (#faf6ec) = texte clair
- `blood` (#a01818) = rouge dramatique (usage parcimonieux)

Langage visuel : **sombre, cinématographique, sobre**. Beaucoup de noir, des halos lumineux (glows), une esthétique "lumière de bougie". Polices **serif** uniquement (jamais de sans-serif). Ornements `❖`. Texte arabe toujours via la classe `.arabic` (RTL + police Amiri). Tout le contenu est en **français**.

## Contexte du sujet (pour que les modifs restent cohérentes)

L'escape game traite de : **« De qui commence et à qui revient la responsabilité du bon fonctionnement d'une société — aux gouvernants ou aux citoyens ? »**. La métaphore : une cité dont les habitants "dorment" devant leurs écrans pendant qu'un tyran les vole. 3 énigmes = 3 illusions modernes (le langage vidé de sens, le spectateur passif derrière son écran, l'information qui noie la Parole). Réponse finale : la responsabilité est partagée (shoura), appuyée par le hadith *« Kullukum râ'in »* (chacun est berger et responsable).

⚠️ **GARDE-FOU IMPORTANT** : les versets coraniques, le hadith et les citations de Si Abdessalam Yassine présents dans le code sont **vérifiés et sourcés**. Ne jamais les inventer, paraphraser ou modifier sans vérification. Le ton sur tout contenu religieux doit rester respectueux.

## Ce qui reste à améliorer (pistes)

- **Responsive mobile** à affiner (la timeline de `Vision.js` et les cartes de `Sceaux.js` méritent un passage soigné sur petit écran).
- **`CandleProgress.js`** : l'allumage des bougies repose sur des seuils de ratio de scroll codés en dur — fragile. Le passer à un `IntersectionObserver` qui détecte le passage de chaque section "Sceau" serait plus robuste.
- **Contenu codé en dur** dans chaque composant — l'extraire dans un fichier de données (`data/content.js`) faciliterait l'édition.
- **Accessibilité** : ajouter `prefers-reduced-motion`, des états de focus visibles, des textes alternatifs.
- **SEO / partage** : pas d'image Open Graph ni de favicon — à ajouter (`app/icon.png`, `app/opengraph-image.png`).
- **Pas de son** — une nappe sonore discrète (activable) renforcerait l'immersion.
- **Performance** : Framer Motion est utilisé partout ; certaines animations simples pourraient être en CSS pur. Les polices via CDN pourraient passer à `next/font` une fois hors sandbox.
- **Teaser** : `Teaser.js` n'a qu'un placeholder — intégrer la vraie vidéo (balise `<video>` avec un fichier dans `public/`, ou iframe YouTube).
- **Hero** : le "scroll fantôme" est très subtil — on pourrait en faire un vrai téléphone animé qui scrolle dans le vide.

## Idée à fort impact (non implémentée)

Une **énigme jouable** en démo : par exemple, dans la section Sceaux, permettre d'associer réellement les 6 mots à leurs définitions (glisser-déposer), avec une petite validation. Très impressionnant pour un jury.

## Conventions de travail

- Garder le **français** partout dans l'UI.
- Respecter la palette et les polices existantes (voir Système de design).
- Privilégier des composants courts, un fichier = une section.
- Tester avec `npm run build` avant de considérer une modif terminée.
- Ne pas casser le fil narratif au scroll : l'ordre des sections dans `app/page.js` raconte une histoire (accueil → question → métaphore → énigmes → réponse → teaser → vision → final).
