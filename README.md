# 💱 Convertisseur de devises

Un convertisseur de devises en HTML/CSS/JavaScript pur (sans framework), avec des **taux de change toujours à jour automatiquement**, sur le thème visuel d'un coffre-fort de banque.

![Aperçu](./assets/image/partage.png)

## ✨ Fonctionnalités

- Conversion instantanée entre Euro (EUR), Dollar américain (USD), Livre sterling (GBP), Yen japonais (JPY), Yuan chinois (CNY) et Franc français (FRF, à titre historique).
- **Taux de change en direct**, récupérés automatiquement depuis [Frankfurter API](https://frankfurter.dev/) (Banque centrale européenne) — aucune clé API, aucun compte requis.
- Mise en cache locale (1 heure) pour limiter les appels réseau et garder l'app rapide.
- Affichage de la date/heure de dernière mise à jour des taux.
- Fonctionne même hors ligne après un premier chargement (utilise le dernier taux connu en cache).
- Identité visuelle "coffre-fort" : emblème en SVG (porte de coffre + roue de combinaison qui tourne au survol), palette lavande / prune / bleu pétrole / rouge foncé / écru.
- Responsive (mobile / tablette / bureau).

## 📁 Structure du projet

```
.
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    └── image/
        ├── coffre-fort.png   (favicon)
        ├── partage.png        (image affichée lors du partage du lien)
        └── bourse.png          (ancienne illustration, conservée mais plus utilisée)
```

## 🎨 Identité visuelle

- **Palette** : lavande `#9683ec` (accents, interactions), prune `#811453` (profondeur), bleu pétrole `#254665` (fond), rouge foncé `#850606` (détail), écru `#eeceac` (surfaces claires, carte centrale).
- **Typographies** : [Fraunces](https://fonts.google.com/specimen/Fraunces) pour le titre (esprit gravure / billet de banque ancien) et [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) pour le reste (lisibilité des chiffres). Chargées via Google Fonts.
- **Signature** : l'emblème en haut de page est un SVG inline dessiné à la main (porte de coffre-fort, roue de combinaison, cadenas). La roue tourne doucement au survol de la souris.
- Le sac d'argent (`bourse.png`) n'est plus affiché mais reste dans le dossier `assets/image/` si vous souhaitez le réutiliser ailleurs.

## 🚀 Utilisation

Aucune installation nécessaire : ouvrez simplement `index.html` dans un navigateur, ou déployez le dossier sur n'importe quel hébergement statique (GitHub Pages, Netlify, Vercel...).

## 🔄 Pourquoi les taux sont toujours à jour

Le script `script.js` interroge l'API publique et gratuite [Frankfurter](https://frankfurter.dev/) (basée sur les taux de référence quotidiens de la Banque centrale européenne) à chaque visite. Les taux sont ensuite gardés en cache dans le navigateur pendant 1 heure pour éviter de surcharger l'API inutilement.

> ℹ️ Le Franc français (FRF) n'existe plus depuis 2002 et n'est donc fourni par aucune API de taux en temps réel. Son taux est calculé à partir de la parité officielle et définitive fixée lors du passage à l'euro : **1 EUR = 6,55957 FRF**. Les autres devises (USD, GBP, JPY, CNY) sont, elles, bien mises à jour en temps réel.

Si l'API est temporairement indisponible (panne, pas de connexion internet), le site réutilise automatiquement le dernier taux connu en cache, pour rester fonctionnel.

## 🖼️ Aperçu lors du partage du lien (Open Graph)

Le fichier `index.html` contient des balises `<meta property="og:...">` et `<meta name="twitter:...">` qui permettent d'afficher l'image `partage.png` ainsi qu'un titre/description quand le lien du site est partagé sur WhatsApp, Facebook, Discord, Twitter/X, LinkedIn, etc.

**⚠️ Étape à faire après déploiement :** ces balises ont besoin d'une URL **absolue** (et non relative) vers l'image, car les réseaux sociaux ne savent pas résoudre un chemin relatif. Dans `index.html`, remplacez `PSEUDO` et `DEPOT` par votre pseudo GitHub et le nom de votre dépôt, par exemple :

```html
<meta property="og:image" content="https://leven-anju-yuki.github.io/Convertisseur-euro/assets/image/partage.png" />
```

Vous pouvez vérifier le résultat avec des outils comme [opengraph.xyz](https://www.opengraph.xyz/) ou la [Sharing Debugger de Facebook](https://developers.facebook.com/tools/debug/).

## 🛠️ Technologies

- HTML5, CSS3 (media queries pour le responsive), JavaScript (vanilla, ES5)
- [Frankfurter API](https://frankfurter.dev/) pour les taux de change
- [Google Fonts](https://fonts.google.com/) pour les typographies (Fraunces, Space Grotesk)

## 📄 Licence

Libre d'utilisation et de modification.
