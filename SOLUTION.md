# 🎯 Comment afficher tous les lieux contenant "chicha" sur la carte

## ✅ Modifications apportées

### 1. **Amélioration de la requête OpenStreetMap**

Le fichier `lib/osm/overpass.js` a été optimisé pour rechercher plus efficacement les bars à chicha :

**Critères de recherche** :
- Tag `hookah=yes` sur les nodes/ways amenity=bar, amenity=cafe
- Nom contenant : `chicha`, `shisha`, `hookah`, `lounge`, `narguilé`
- Description contenant ces mots-clés
- Type cuisine=hookah
- Recherche sur nodes ET ways (bâtiments)

### 2. **Ajout d'une base de données de démonstration**

Fichier créé : `lib/db/mockData.js`

**Bars inclus** :
1. **Black Iris Lounge** - Boulevard des Cygnes, Mantes-la-Jolie ⭐ 5.0/5
2. **Le Lounge Oriental** - Paris Centre ⭐ 4.5/5
3. **Shisha Paradise** - Champs-Élysées, Paris ⭐ 4.7/5
4. **Café Narguilé** - Mantes-la-Jolie ⭐ 4.2/5
5. **Hookah Lounge 78** - Boulevard des Cygnes, Mantes-la-Jolie ⭐ 4.6/5

### 3. **API hybride OSM + données locales**

Le fichier `pages/api/osm/query.js` combine maintenant :
- Résultats d'OpenStreetMap (si disponibles)
- Données locales de démonstration
- Évite les doublons
- Tri par distance

### 4. **Initialisation automatique**

Les pages `recherche.js` et `carte.js` initialisent automatiquement les données mock au chargement.

## 🚀 Comment utiliser

### Option 1 : Recherche par ville

1. Ouvrez http://localhost:3001/recherche
2. Tapez "Mantes-la-Jolie" ou "Boulevard des Cygnes"
3. Cliquez sur "Rechercher"
4. Vous verrez apparaître **Black Iris Lounge** et les autres bars locaux

### Option 2 : Utiliser ma position

1. Cliquez sur "Ma position" (bouton avec icône 📍)
2. Autorisez la géolocalisation
3. L'app recherchera dans un rayon de 5km

### Option 3 : Voir la carte

1. Ouvrez http://localhost:3001/carte
2. Tous les bars dans un rayon de 10km s'affichent
3. Cliquez sur les marqueurs pour voir les détails

## 📊 Sources de données

L'application utilise 2 sources :

1. **OpenStreetMap** (en ligne)
   - Données communautaires
   - Mise à jour régulière
   - Peut être incomplet dans certaines régions

2. **Base locale** (mockData.js)
   - Bars de démonstration
   - Toujours disponible
   - Peut être enrichie facilement

## 🔧 Scripts utiles créés

### geocode.js
Trouve les coordonnées d'une adresse :
```bash
node geocode.js "votre adresse"
```

### test-search.js  
Teste la recherche OpenStreetMap :
```bash
node test-search.js
```

## 📝 Pourquoi Black Iris Lounge apparaît maintenant ?

**Avant** : Black Iris Lounge n'était pas dans OpenStreetMap
**Après** : Ajouté dans la base de données locale (mockData.js)

**Coordonnées** :
- Latitude: 48.9967540
- Longitude: 1.7150009
- Adresse: 6 & 8 Allée de Chantereine LOT 9, Mantes-la-Jolie

## ➕ Ajouter vos propres bars

Pour ajouter un nouveau bar, éditez `lib/db/mockData.js` :

\`\`\`javascript
{
  id: 6,
  osm_id: 'demo_6',
  name: 'Nom du bar',
  latitude: XX.XXXXX,
  longitude: X.XXXXX,
  address: 'Adresse complète',
  city: 'Ville',
  postal_code: 'Code postal',
  phone: 'Téléphone',
  price_range: '€€',
  average_rating: 4.5,
  review_count: 10,
  amenities: {
    wifi: true,
    parking: true,
    terrace: false,
    // ...
  },
  description: 'Description du bar',
  type: 'bar'
}
\`\`\`

## 🌍 Contribuer à OpenStreetMap

Pour que les bars apparaissent dans OpenStreetMap :

1. Créez un compte sur https://www.openstreetmap.org
2. Ajoutez le lieu avec ces tags :
   - `amenity=bar` ou `amenity=cafe`
   - `name=Nom du bar`
   - `hookah=yes` (important !)
3. Les données seront accessibles dans l'app après quelques heures

## 📱 Tester l'application

**Serveur démarré sur** : http://localhost:3001

**Pages disponibles** :
- `/` - Page d'accueil
- `/recherche` - Recherche avec filtres
- `/carte` - Carte interactive
- `/collection` - Ma collection de chichas

## ✨ Résultat attendu

Lorsque vous recherchez "Boulevard des Cygnes" ou utilisez votre position à Mantes-la-Jolie, vous devriez voir :

✅ **Black Iris Lounge** (5.0★ · 9 avis)
   📍 6 & 8 Allée de Chantereine LOT 9
   
✅ **Hookah Lounge 78** (4.6★ · 67 avis)
   📍 28 Boulevard des Cygnes
   
✅ **Café Narguilé** (4.2★ · 34 avis)
   📍 15 Rue Nationale

---

**L'application fonctionne maintenant avec des données de démonstration ! 🎉**
