# 📍 Guide d'utilisation - ChichaAroundMe

## 🎯 Trouver Black Iris Lounge et autres bars à chicha

### Méthode 1 : Recherche directe

1. **Ouvrir la page de recherche**
   - Cliquez sur "Recherche" dans le menu
   - Ou allez sur http://localhost:3001/recherche

2. **Rechercher par adresse**
   - Tapez "Boulevard des Cygnes" dans la barre de recherche
   - OU tapez "Mantes-la-Jolie"
   - Cliquez sur "Rechercher"

3. **Résultats attendus**
   - Black Iris Lounge (5.0★)
   - Hookah Lounge 78 (4.6★)
   - Café Narguilé (4.2★)

### Méthode 2 : Utiliser la géolocalisation

1. **Cliquer sur "Ma position"** 📍
2. **Autoriser l'accès** à votre localisation
3. Les bars dans un rayon de **5 km** s'affichent automatiquement

### Méthode 3 : Carte interactive

1. **Ouvrir la carte**
   - Cliquez sur "Carte" dans le menu
   - Ou allez sur http://localhost:3001/carte

2. **Voir les marqueurs**
   - Les bars apparaissent comme des 📍 sur la carte
   - Rayon de recherche : **10 km**

3. **Cliquer sur un marqueur**
   - Voir le nom et l'adresse
   - Cliquer sur "Voir les détails" pour plus d'infos

## 🔍 Utiliser les filtres

### Distance
- 1 km, 2 km, 5 km, 10 km, 20 km
- Par défaut : 5 km

### Prix
- € (Économique)
- €€ (Moyen)
- €€€ (Élevé)

### Note minimale
- 1+ étoiles à 5 étoiles
- Filtrer les meilleurs bars

### Équipements
- ✓ Wi-Fi
- ✓ Parking
- ✓ Terrasse
- ✓ Accessible
- ✓ Musique
- ✓ Restauration

## 📱 Navigation

### Menu principal

```
┌─────────────────────────────────┐
│  🏠 Accueil                      │
│  🔍 Recherche                    │
│  🗺️  Carte                       │
│  ❤️  Ma Collection               │
└─────────────────────────────────┘
```

### Page d'accueil
- Présentation de l'application
- Boutons d'action rapide
- Fonctionnalités disponibles

### Page Recherche
- Barre de recherche
- Filtres latéraux (desktop)
- Filtres modal (mobile)
- Liste de résultats

### Page Carte
- Carte plein écran
- Panneau de contrôle
- Marqueurs cliquables
- Zoom/Déplacement

### Ma Collection
- Gérer vos chichas personnelles
- Ajouter/Modifier/Supprimer
- Icônes personnalisables

## 💡 Exemples de recherche

### Recherche par ville
```
Mantes-la-Jolie
→ 3 résultats
```

### Recherche par adresse
```
Boulevard des Cygnes
→ 2 résultats dont Black Iris Lounge
```

### Recherche par arrondissement
```
Paris 8ème
→ Shisha Paradise sur les Champs-Élysées
```

### Recherche générale
```
Paris
→ Tous les bars de Paris (Le Lounge Oriental, etc.)
```

## 📊 Informations affichées

Pour chaque bar :
- ⭐ Note moyenne (/5)
- 💬 Nombre d'avis
- 💰 Fourchette de prix
- 📍 Distance depuis votre position
- 🏷️ Équipements disponibles
- 📞 Téléphone (si disponible)
- 🌐 Site web (si disponible)
- 🕐 Horaires d'ouverture

## 🎨 Ma Collection de Chichas

### Ajouter une chicha

1. Cliquez sur "Ma Collection"
2. Cliquez sur "+ Ajouter une chicha"
3. Remplissez le formulaire :
   - Nom (obligatoire)
   - Icône (15 choix disponibles)
   - Notes (optionnel)
4. Cliquez sur "Ajouter"

### Icônes disponibles
🔥 Flame | ⭐ Star | ❤️ Heart | ☕ Coffee | 🍷 Wine  
✨ Sparkles | ☀️ Sun | 🌙 Moon | ☁️ Cloud | ⚡ Zap  
🏆 Award | 🎁 Gift | 🎵 Music | 😊 Smile | 📈 TrendingUp

### Modifier une chicha
- Cliquez sur l'icône ✏️ Modifier
- Changez les informations
- Sauvegardez

### Supprimer une chicha
- Cliquez sur l'icône 🗑️ Supprimer
- Confirmez la suppression

## 📱 Version Mobile

### Navigation
- Menu hamburger ☰ en haut à droite
- Menu déroulant avec toutes les pages

### Filtres
- Bouton "Filtres" pour ouvrir le modal
- Appliquer ou réinitialiser

### Carte
- Zoom avec 2 doigts
- Déplacement tactile
- Bouton "Ma position" toujours accessible

## 🆘 Dépannage

### Aucun résultat trouvé

**Solutions** :
1. Augmentez le rayon de recherche (filtres)
2. Vérifiez l'orthographe de votre recherche
3. Essayez une recherche plus générale (ville au lieu d'adresse)
4. Utilisez "Ma position" pour chercher près de vous

### La géolocalisation ne fonctionne pas

**Solutions** :
1. Vérifiez les permissions du navigateur
2. Autorisez l'accès à la localisation
3. Sur certains navigateurs, HTTPS est requis
4. Utilisez la recherche manuelle en alternative

### La carte ne s'affiche pas

**Solutions** :
1. Vérifiez votre connexion Internet
2. Rafraîchissez la page (F5)
3. Videz le cache du navigateur
4. Les tuiles OpenStreetMap nécessitent une connexion

### Les données ne se sauvent pas

**Solutions** :
1. Vérifiez que le localStorage n'est pas désactivé
2. Ne naviguez pas en mode navigation privée
3. Assurez-vous d'avoir de l'espace disque

## 🎯 Raccourcis clavier

| Touche | Action |
|--------|--------|
| Ctrl + K | Ouvrir la recherche |
| Esc | Fermer un modal |
| Tab | Naviguer entre les champs |
| Enter | Soumettre un formulaire |

## 📈 Statistiques

### Bars disponibles
- **5 bars** dans la base de données locale
- **Mantes-la-Jolie** : 3 bars
- **Paris** : 2 bars

### Zones couvertes
- Île-de-France
- Plus de bars via OpenStreetMap

## 🌟 Fonctionnalités à venir

- 🔐 Authentification utilisateur
- 📸 Upload de photos
- 💬 Système d'avis complet
- 📋 Listes personnalisées (favoris, à visiter)
- 🔔 Notifications
- 🌍 Plus de villes

## 💬 Support

Pour toute question ou problème :
- Consultez le [README.md](README.md)
- Consultez le [PRD.md](PRD.md)
- Consultez le [GUIDE.md](GUIDE.md)

---

**Bonne recherche ! 🎉**
