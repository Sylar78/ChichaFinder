# Product Requirements Document (PRD)
## ChichaAroundMe - Application de Recherche de Bars à Chicha

**Date de création:** Janvier 2026  
**Version:** 1.0  
**Auteur:** Équipe ChichaAroundMe

---

## 1. Vue d'ensemble du produit

### 1.1 Objectif
ChichaAroundMe est une plateforme web/mobile complète permettant aux utilisateurs de découvrir, rechercher et évaluer des bars à chicha (lounges) dans leur région. L'application facilite la recherche d'établissements en fonction de critères multiples (distance, prix, notes, équipements) et permet de gérer une collection personnelle de chichas.

### 1.2 Public cible
- Amateurs de chichas recherchant de nouveaux établissements
- Utilisateurs souhaitant partager leurs expériences
- Propriétaires d'établissements cherchant à améliorer leur visibilité
- Communauté d'utilisateurs partageant leurs avis et photos

---

## 2. Fonctionnalités principales

### 2.1 Gestion de collection personnelle
**Priorité:** Haute  
**Description:** Permet aux utilisateurs de créer et gérer leur collection de chichas favorites.

**User Stories:**
- En tant qu'utilisateur, je veux ajouter une chicha avec un nom et une icône à ma collection
- En tant qu'utilisateur, je veux voir toutes mes chichas sur un seul écran
- En tant qu'utilisateur, je veux modifier ou supprimer des chichas de ma collection

**Critères d'acceptation:**
- Un formulaire permet d'ajouter une nouvelle chicha (nom + icône)
- La liste affiche toutes les chichas de l'utilisateur
- Les chichas sont stockées localement (localStorage) ou en base de données

### 2.2 Recherche de bars à chicha
**Priorité:** Haute  
**Description:** Moteur de recherche avancé avec filtres multiples.

**User Stories:**
- En tant qu'utilisateur, je veux rechercher des bars par distance depuis ma position
- En tant qu'utilisateur, je veux filtrer par prix, notes, et équipements
- En tant qu'utilisateur, je veux voir les résultats en liste avec photos et infos essentielles

**Filtres disponibles:**
- Distance (rayon en km)
- Prix (€, €€, €€€)
- Notes (étoiles sur 5)
- Équipements (Wi-Fi, parking, terrasse, etc.)
- Disponibilité en temps réel

**Critères d'acceptation:**
- La recherche interroge l'API OpenStreetMap via le backend
- Les résultats s'affichent sous forme de liste
- Les filtres sont persistants pendant la session
- Le clic sur "Rechercher" met à jour la liste instantanément

### 2.3 Carte interactive
**Priorité:** Haute  
**Description:** Visualisation géographique des bars à chicha.

**User Stories:**
- En tant qu'utilisateur, je veux voir les bars sur une carte
- En tant qu'utilisateur, je veux cliquer sur un marqueur pour voir les détails
- En tant qu'utilisateur, je veux obtenir un itinéraire vers un bar

**Solution technique:**
- Utilisation d'OpenStreetMap (pas besoin d'API key)
- Bibliothèque Leaflet pour l'affichage
- Clustering automatique pour les zones denses
- Marqueurs cliquables avec popup d'informations

**Critères d'acceptation:**
- La carte affiche tous les bars dans la zone visible
- Les marqueurs sont regroupés automatiquement (clustering)
- Un clic sur marqueur ouvre une popup avec infos de base
- Un bouton permet de générer un itinéraire

### 2.4 Avis et notes
**Priorité:** Moyenne  
**Description:** Système de notation et de commentaires communautaires.

**User Stories:**
- En tant qu'utilisateur, je veux noter un bar sur 5 étoiles
- En tant qu'utilisateur, je veux lire les avis d'autres utilisateurs
- En tant qu'utilisateur, je veux ajouter des photos avec mon avis
- En tant que propriétaire, je veux répondre aux avis

**Critères de notation:**
- Note globale (sur 5)
- Critères détaillés: propreté, ambiance, prix, accueil
- Avis textuels
- Photos uploadées par les utilisateurs

**Critères d'acceptation:**
- Formulaire de notation avec 5 étoiles et commentaire
- Affichage de la note moyenne et du nombre d'avis
- Upload de photos (max 5 par avis)
- Modération des avis (signalement)

### 2.5 Gestion de listes
**Priorité:** Moyenne  
**Description:** Création de listes personnalisées pour organiser les bars.

**User Stories:**
- En tant qu'utilisateur, je veux créer des listes ("À visiter", "Mes favoris", "À fuir")
- En tant qu'utilisateur, je veux ajouter/retirer des bars de mes listes
- En tant qu'utilisateur, je veux partager mes listes avec mes amis

**Types de listes prédéfinies:**
- Favoris
- À visiter
- À fuir
- Listes personnalisées

**Critères d'acceptation:**
- Interface pour créer/modifier/supprimer des listes
- Ajout rapide depuis la fiche d'un bar
- Partage via lien ou réseaux sociaux

### 2.6 Questions/Réponses communautaires
**Priorité:** Basse  
**Description:** Forum de questions sur les établissements.

**User Stories:**
- En tant qu'utilisateur, je veux poser une question sur un bar
- En tant qu'utilisateur, je veux répondre aux questions d'autres utilisateurs
- En tant qu'utilisateur, je veux voir les questions/réponses les plus utiles

### 2.7 Fonctionnalités sociales
**Priorité:** Basse  
**Description:** Connexion et interactions entre utilisateurs.

**User Stories:**
- En tant qu'utilisateur, je veux me connecter via email ou réseaux sociaux
- En tant qu'utilisateur, je veux suivre des amis
- En tant qu'utilisateur, je veux voir les recommandations de mes amis

### 2.8 Notifications et recommandations
**Priorité:** Basse  
**Description:** Suggestions personnalisées et alertes.

**User Stories:**
- En tant qu'utilisateur, je veux recevoir des recommandations basées sur mes recherches
- En tant qu'utilisateur, je veux être alerté des promotions

---

## 3. Architecture technique

### 3.1 Stack technologique

**Frontend:**
- Next.js 13.4.12+ (avec App Router)
- React 18.2.0
- Tailwind CSS 3.2.0+
- Lucide React pour les icônes
- Leaflet pour les cartes OpenStreetMap

**Backend:**
- Next.js API Routes
- Node.js (dernière version)

**Base de données:**
- Option 1: SQLite (développement)
- Option 2: PostgreSQL (production)
- Option 3: MongoDB (alternative)

**APIs externes:**
- OpenStreetMap + Overpass API
- Nominatim (géocodage)

**Package Manager:**
- npm (pas yarn)

### 3.2 Structure de fichiers

```
ChichaAroundMe/
├── components/              # Composants React réutilisables
│   ├── layout/
│   │   ├── Header.js       # En-tête de navigation
│   │   ├── Footer.js       # Pied de page
│   │   └── Layout.js       # Layout global
│   ├── chicha/
│   │   ├── ChichaCard.js   # Carte d'affichage d'une chicha
│   │   ├── ChichaList.js   # Liste de chichas
│   │   └── ChichaForm.js   # Formulaire d'ajout
│   ├── search/
│   │   ├── FilterBar.js    # Barre de filtres
│   │   ├── SearchBar.js    # Barre de recherche
│   │   └── SearchResults.js # Résultats de recherche
│   ├── map/
│   │   ├── MapView.js      # Composant carte
│   │   └── MapMarker.js    # Marqueur personnalisé
│   ├── reviews/
│   │   ├── ReviewCard.js   # Carte d'avis
│   │   ├── ReviewForm.js   # Formulaire d'avis
│   │   └── RatingStars.js  # Étoiles de notation
│   └── ui/
│       ├── Button.js       # Bouton réutilisable
│       ├── Card.js         # Carte générique
│       ├── Modal.js        # Modal générique
│       └── Input.js        # Input personnalisé
│
├── pages/                   # Pages Next.js
│   ├── _app.js             # Point d'entrée de l'app
│   ├── _document.js        # Document HTML personnalisé
│   ├── index.js            # Page d'accueil
│   ├── recherche.js        # Page de recherche
│   ├── carte.js            # Page carte interactive
│   ├── collection.js       # Ma collection de chichas
│   ├── bar/
│   │   └── [id].js         # Page détail d'un bar
│   └── api/                # API Routes
│       ├── chichas/
│       │   ├── index.js    # GET/POST chichas utilisateur
│       │   └── [id].js     # GET/PUT/DELETE chicha
│       ├── search/
│       │   └── index.js    # Recherche de bars
│       ├── osm/
│       │   ├── query.js    # Requêtes OpenStreetMap
│       │   └── geocode.js  # Géocodage d'adresses
│       └── reviews/
│           ├── index.js    # GET/POST avis
│           └── [id].js     # GET/PUT/DELETE avis
│
├── public/                  # Assets statiques
│   ├── images/
│   │   ├── icons/          # Icônes de chichas
│   │   └── placeholder.jpg # Image par défaut
│   └── favicon.ico
│
├── styles/                  # Styles globaux
│   ├── globals.css         # Styles CSS globaux + Tailwind
│   └── map.css             # Styles spécifiques carte
│
├── lib/                     # Bibliothèques et utilitaires
│   ├── db/
│   │   ├── schema.js       # Schéma de base de données
│   │   └── queries.js      # Requêtes DB réutilisables
│   ├── osm/
│   │   ├── overpass.js     # Client Overpass API
│   │   └── geocoding.js    # Fonctions de géocodage
│   └── utils/
│       ├── distance.js     # Calcul de distances
│       ├── filters.js      # Logique de filtrage
│       └── validation.js   # Validation de données
│
├── utils/                   # Fonctions helper
│   ├── constants.js        # Constantes de l'app
│   └── helpers.js          # Fonctions utilitaires
│
├── .gitignore
├── package.json            # Dépendances npm
├── next.config.js          # Configuration Next.js
├── tailwind.config.js      # Configuration Tailwind
├── postcss.config.js       # Configuration PostCSS
└── README.md               # Documentation
```

### 3.3 Modèle de base de données

#### Table: bars_chicha
```sql
CREATE TABLE bars_chicha (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  osm_id BIGINT UNIQUE,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(20),
  phone VARCHAR(50),
  website VARCHAR(255),
  price_range VARCHAR(10), -- '€', '€€', '€€€'
  average_rating DECIMAL(3, 2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  amenities JSONB, -- {wifi: true, parking: true, terrace: false}
  opening_hours JSONB,
  photos TEXT[], -- URLs des photos
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_bars_location ON bars_chicha(latitude, longitude);
CREATE INDEX idx_bars_rating ON bars_chicha(average_rating);
```

#### Table: user_chichas (collection personnelle)
```sql
CREATE TABLE user_chichas (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  icon VARCHAR(100), -- Nom de l'icône lucide-react
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Table: reviews
```sql
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  bar_id INTEGER REFERENCES bars_chicha(id),
  user_id INTEGER REFERENCES users(id),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  cleanliness_rating INTEGER CHECK (cleanliness_rating BETWEEN 1 AND 5),
  atmosphere_rating INTEGER CHECK (atmosphere_rating BETWEEN 1 AND 5),
  price_rating INTEGER CHECK (price_rating BETWEEN 1 AND 5),
  service_rating INTEGER CHECK (service_rating BETWEEN 1 AND 5),
  comment TEXT,
  photos TEXT[], -- URLs des photos
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_reviews_bar ON reviews(bar_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
```

#### Table: user_lists
```sql
CREATE TABLE user_lists (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50), -- 'favorites', 'to_visit', 'to_avoid', 'custom'
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Table: list_items
```sql
CREATE TABLE list_items (
  id SERIAL PRIMARY KEY,
  list_id INTEGER REFERENCES user_lists(id),
  bar_id INTEGER REFERENCES bars_chicha(id),
  added_at TIMESTAMP DEFAULT NOW()
);
```

#### Table: users
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE,
  password_hash VARCHAR(255),
  avatar_url VARCHAR(255),
  provider VARCHAR(50), -- 'email', 'google', 'facebook'
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);
```

### 3.4 API OpenStreetMap - Intégration

#### Requête Overpass API pour bars à chicha

**Endpoint:** https://overpass-api.de/api/interpreter

**Requête type:**
```javascript
// Recherche de bars à chicha dans un rayon de 3km autour d'une position
const overpassQuery = `
[out:json][timeout:25];
(
  node["amenity"="bar"]["hookah"="yes"](around:3000,${latitude},${longitude});
  node["amenity"="bar"]["name"~"chicha|shisha|hookah",i](around:3000,${latitude},${longitude});
  node["amenity"="cafe"]["hookah"="yes"](around:3000,${latitude},${longitude});
  way["amenity"="bar"]["hookah"="yes"](around:3000,${latitude},${longitude});
);
out body;
>;
out skel qt;
`;
```

**Tags OpenStreetMap à rechercher:**
- `amenity=bar` + `hookah=yes`
- `amenity=cafe` + `hookah=yes`
- `name` contenant "chicha", "shisha", ou "hookah"

**Données extraites:**
- name
- lat/lon
- addr:street, addr:housenumber, addr:city
- phone
- website
- opening_hours
- wheelchair (accessibilité)
- outdoor_seating (terrasse)

---

## 4. Spécifications UI/UX

### 4.1 Design System

**Palette de couleurs:**
- Primaire: Tons orangés/dorés (ambiance chicha)
- Secondaire: Bleu foncé
- Neutre: Gris modernes
- Succès: Vert
- Erreur: Rouge

**Typographie:**
- Titres: System font / Inter
- Corps: System font / Inter
- Taille de base: 16px

**Breakpoints (Tailwind):**
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

### 4.2 Pages principales

#### Page d'accueil (index.js)
- Hero section avec recherche rapide
- Catégories populaires
- Bars recommandés
- Derniers avis

#### Page de recherche (recherche.js)
- Barre de recherche en haut
- Filtres latéraux (desktop) / modal (mobile)
- Liste de résultats avec pagination
- Tri: pertinence, distance, note, prix

#### Page carte (carte.js)
- Carte plein écran avec Leaflet/OpenStreetMap
- Panneau latéral avec liste des bars visibles
- Filtres au-dessus de la carte
- Clustering automatique

#### Page collection (collection.js)
- Grille de chichas personnelles
- Bouton "+ Ajouter une chicha"
- Modal de création/édition
- Sélecteur d'icônes

#### Page détail bar ([id].js)
- Photos en carrousel
- Informations principales (nom, adresse, horaires)
- Note moyenne et répartition
- Liste des avis
- Bouton "Ajouter à une liste"
- Section Q&A
- Carte avec localisation

### 4.3 Composants réutilisables

**ChichaCard:**
- Image ou icône
- Nom
- Notes personnelles
- Actions (modifier, supprimer)

**BarCard:**
- Photo principale
- Nom et ville
- Note moyenne (étoiles)
- Prix (€€€)
- Distance
- Badge équipements

**FilterBar:**
- Slider distance
- Checkboxes équipements
- Select prix
- Select note minimum
- Bouton "Appliquer"

**ReviewCard:**
- Avatar utilisateur
- Nom et date
- Note par critère
- Commentaire
- Photos
- Bouton "Utile"

---

## 5. Phases de développement

### Phase 1: MVP (Minimum Viable Product)
**Durée:** 3-4 semaines

**Fonctionnalités:**
- [x] Configuration du projet (Next.js, Tailwind, etc.)
- [x] Structure de dossiers
- [ ] Page d'accueil basique
- [ ] Collection de chichas personnelle (localStorage)
- [ ] Recherche basique via OpenStreetMap
- [ ] Affichage des résultats en liste
- [ ] Page détail d'un bar
- [ ] Carte OpenStreetMap basique

### Phase 2: Améliorations
**Durée:** 2-3 semaines

**Fonctionnalités:**
- [ ] Système d'avis et notes
- [ ] Filtres avancés
- [ ] Upload de photos
- [ ] Gestion de listes
- [ ] Authentification utilisateur (email)

### Phase 3: Fonctionnalités sociales
**Durée:** 2-3 semaines

**Fonctionnalités:**
- [ ] Authentification via réseaux sociaux
- [ ] Profils utilisateurs
- [ ] Suivi d'amis
- [ ] Partage de listes
- [ ] Q&A communautaire

### Phase 4: Optimisations et marketing
**Durée:** 1-2 semaines

**Fonctionnalités:**
- [ ] Notifications push
- [ ] Recommandations personnalisées
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] Analytics

---

## 6. Critères de succès

### Métriques clés (KPIs)
- Nombre d'utilisateurs actifs mensuels
- Nombre de recherches effectuées
- Nombre d'avis publiés
- Taux de conversion (visiteur → utilisateur inscrit)
- Temps moyen passé sur l'application

### Objectifs quantitatifs (6 mois)
- 1000+ utilisateurs inscrits
- 5000+ bars référencés
- 2000+ avis publiés
- Taux de satisfaction > 4/5

---

## 7. Considérations techniques

### 7.1 Performance
- Lazy loading des images
- Code splitting automatique (Next.js)
- Caching des résultats de recherche
- Optimisation des requêtes DB

### 7.2 Sécurité
- Validation des inputs
- Protection CSRF
- Rate limiting sur les APIs
- Sanitisation des contenus utilisateur
- HTTPS obligatoire en production

### 7.3 Accessibilité
- Navigation au clavier
- Support lecteurs d'écran
- Contraste suffisant
- Textes alternatifs pour images

### 7.4 SEO
- Meta tags optimisés
- Sitemap XML
- URLs sémantiques
- Open Graph pour partage social

---

## 8. Dépendances et installation

### Installation du projet
```bash
npm install autoprefixer@^10.0.0 \
            lucide-react@^0.244.0 \
            next@13.4.12 \
            postcss@^8.4.0 \
            react@18.2.0 \
            react-dom@18.2.0 \
            tailwindcss@^3.2.0

# Dépendances additionnelles
npm install leaflet react-leaflet
```

### Variables d'environnement
```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
```

---

## 9. Documentation de référence

- Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- OpenStreetMap Overpass API: https://wiki.openstreetmap.org/wiki/Overpass_API
- Leaflet: https://leafletjs.com/reference.html
- Lucide Icons: https://lucide.dev/

---

## 10. Support et maintenance

### Canaux de support
- GitHub Issues pour les bugs
- Documentation en ligne
- FAQ

### Mises à jour
- Corrections de bugs: hebdomadaires
- Nouvelles fonctionnalités: mensuelles
- Mises à jour de sécurité: immédiatement

---

**Fin du document PRD**
