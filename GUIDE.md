# Guide de Démarrage - ChichaAroundMe

## 🚀 Installation rapide

### 1. Installer les dépendances

```bash
npm install
```

### 2. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📖 Structure du projet

```
ChichaAroundMe/
├── components/          # Composants React réutilisables
│   ├── layout/         # Layout, Header, Footer
│   ├── chicha/         # Composants collection de chichas
│   ├── search/         # Composants de recherche
│   ├── map/            # Composant carte
│   ├── reviews/        # Composants d'avis
│   └── ui/             # Composants UI de base
├── pages/              # Pages Next.js
│   ├── api/            # API Routes
│   │   ├── osm/        # API OpenStreetMap
│   │   ├── chichas/    # API collection chichas
│   │   ├── reviews/    # API avis
│   │   └── search/     # API recherche
│   ├── bar/            # Pages détails bars
│   ├── index.js        # Page d'accueil
│   ├── recherche.js    # Page recherche
│   ├── carte.js        # Page carte
│   └── collection.js   # Page ma collection
├── lib/                # Bibliothèques et utilitaires
│   ├── db/             # Base de données (localStorage pour MVP)
│   └── osm/            # Intégration OpenStreetMap
├── utils/              # Fonctions helper
├── styles/             # Styles globaux
└── public/             # Assets statiques
```

## 🎯 Fonctionnalités principales

### ✅ Disponibles dans le MVP

- **Page d'accueil** - Présentation de l'application
- **Ma Collection** - Gérer sa collection personnelle de chichas
  - Ajouter/modifier/supprimer des chichas
  - Choix d'icônes personnalisés
  - Stockage local (localStorage)
  
- **Recherche** - Trouver des bars à chicha
  - Recherche par adresse/ville
  - Utiliser ma position GPS
  - Filtres avancés (distance, prix, note, équipements)
  - Intégration OpenStreetMap/Overpass API
  
- **Carte** - Visualisation sur carte interactive
  - Carte OpenStreetMap (Leaflet)
  - Marqueurs pour chaque bar
  - Ma position en temps réel
  
- **Détails Bar** - Page détail d'un établissement
  - Informations complètes
  - Carte de localisation
  - Section avis (structure prête)

### 🔜 À venir (Phase 2+)

- Système d'avis et notes complet
- Authentification utilisateur
- Upload de photos
- Listes personnalisées (favoris, à visiter, à fuir)
- Partage social
- Notifications
- Base de données PostgreSQL

## 🌐 APIs utilisées

### OpenStreetMap (Gratuit, sans clé API)

**Overpass API** - Recherche de bars
- Endpoint: `https://overpass-api.de/api/interpreter`
- Pas de limite stricte, utilisation raisonnable recommandée

**Nominatim** - Géocodage
- Endpoint: `https://nominatim.openstreetmap.org`
- Limite: 1 requête/seconde
- User-Agent requis: "ChichaAroundMe/1.0"

### Leaflet - Affichage de cartes
- Bibliothèque open-source
- Tuiles OpenStreetMap gratuites

## 🛠️ Commandes disponibles

```bash
# Développement
npm run dev

# Build production
npm run build

# Lancer en production
npm start

# Lint
npm run lint
```

## 📱 Responsive Design

L'application est entièrement responsive:
- Mobile: 1 colonne
- Tablet: 2 colonnes
- Desktop: 3-4 colonnes

Breakpoints Tailwind:
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

## 🎨 Personnalisation

### Couleurs (tailwind.config.js)

- **Primary**: Orange (#f97316) - Couleur principale
- **Secondary**: Bleu (#0ea5e9) - Couleur secondaire

### Icônes

Utilise Lucide React pour toutes les icônes.
Liste complète: [lucide.dev](https://lucide.dev)

## 📊 Stockage des données

### Phase MVP (actuelle)
- **localStorage** - Collection de chichas utilisateur
- Pas de backend persistant nécessaire

### Phase Production (future)
- **PostgreSQL** - Base de données relationnelle
- Schema SQL fourni dans `lib/db/schema.js`

## 🔍 Comment rechercher des bars

### 1. Via l'API OpenStreetMap

```javascript
// Exemple de recherche dans un rayon de 3km
POST /api/osm/query
{
  "latitude": 48.8566,
  "longitude": 2.3522,
  "radius": 3000
}
```

### 2. Tags OpenStreetMap recherchés

- `amenity=bar` + `hookah=yes`
- `amenity=cafe` + `hookah=yes`
- `name` contenant "chicha", "shisha", ou "hookah"

### 3. Données extraites

- Nom, adresse, coordonnées
- Téléphone, site web
- Horaires d'ouverture
- Équipements (Wi-Fi, parking, terrasse)

## 🚧 Limitations actuelles

1. **Données OpenStreetMap**
   - Dépend des contributions communautaires
   - Peut être incomplet dans certaines régions
   - Pas d'avis ni notes intégrés

2. **Pas d'authentification**
   - Collection liée au navigateur (localStorage)
   - Données perdues si cache effacé

3. **Géolocalisation**
   - Nécessite l'autorisation de l'utilisateur
   - Position par défaut: Paris si refusée

## 💡 Conseils d'utilisation

### Recherche optimale
1. Utilisez "Ma position" pour chercher près de vous
2. Ajustez le rayon de recherche selon la densité
3. Zones urbaines: 1-5km recommandé
4. Zones rurales: 10-20km

### Collection de chichas
- Donnez des noms descriptifs
- Utilisez les notes pour mémoriser vos préférences
- Choisissez des icônes distinctives

## 🐛 Dépannage

### La carte ne s'affiche pas
- Vérifiez votre connexion Internet
- Leaflet nécessite une connexion pour charger les tuiles
- Vérifiez la console pour les erreurs

### Géolocalisation ne fonctionne pas
- Vérifiez les permissions du navigateur
- Certains navigateurs nécessitent HTTPS
- Fallback sur Paris par défaut

### Aucun bar trouvé
- Essayez d'augmenter le rayon de recherche
- Vérifiez que la zone est couverte par OpenStreetMap
- Certaines régions ont peu de données

## 📚 Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Leaflet](https://leafletjs.com)
- [OpenStreetMap Overpass API](https://wiki.openstreetmap.org/wiki/Overpass_API)
- [Lucide Icons](https://lucide.dev)

## 📄 License

MIT

## 🤝 Contribution

Les contributions sont les bienvenues ! Voir le PRD pour la roadmap complète.

---

**Bon développement ! 🚀**
