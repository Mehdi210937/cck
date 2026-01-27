
# Plan : Amélioration de la page d'accueil Hero

## Objectif
1. **Desktop** : Faire en sorte que seule la vidéo + flèche scroll soit visible à l'arrivée sur le site
2. **Mobile** : Adapter les couleurs de fond selon la vidéo

---

## Modifications

### 1. Desktop - Plein écran à l'arrivée

**Fichier** : `src/pages/Index.tsx`

**Changement** : 
- Modifier la hauteur de la section hero de `h-[85vh]` à `h-screen` (100vh)
- Cela garantit que la vidéo occupe exactement la hauteur visible de l'écran
- Le scroll indicator reste en bas, invitant l'utilisateur à descendre
- Le contenu du site ne sera visible qu'après avoir scrollé

```
Section hero : h-[85vh] → h-screen
```

### 2. Mobile - Alternance des fonds

**Option A - Alternance statique** (recommandée) :
- Premier bloc vidéo : fond noir
- Deuxième bloc vidéo : fond blanc  
- Troisième bloc vidéo : fond noir

Cela crée un rythme visuel et s'adapte aux transitions de couleur de la vidéo de manière simple.

**Option B - Synchronisation dynamique** (complexe) :
- Nécessiterait d'analyser la vidéo en temps réel avec canvas
- Plus lourd en performance
- Risque de décalage visuel

**Recommandation** : L'option A est plus fiable et performante. Si la vidéo a des moments spécifiques où les couleurs changent, on pourrait ajuster les fonds en conséquence.

---

## Détails techniques

### Desktop
```tsx
// Avant
<section className="hidden md:flex relative h-[85vh] ...">

// Après  
<section className="hidden md:flex relative h-screen ...">
```

### Mobile (Option A)
```tsx
// Section mobile avec alternance
<section className="md:hidden flex flex-col justify-between min-h-screen py-6">
  {/* Bloc 1 - Fond noir */}
  <div className="flex-1 flex items-center justify-center px-4 bg-black">
    <video ... />
  </div>
  
  {/* Bloc 2 - Fond blanc */}
  <div className="flex-1 flex items-center justify-center px-4 bg-white">
    <video ... />
  </div>
  
  {/* Bloc 3 - Fond noir */}
  <div className="flex-1 flex items-center justify-center px-4 bg-black">
    <video ... />
  </div>
</section>
```

---

## Résultat attendu

- **Desktop** : En arrivant sur le site, l'utilisateur voit uniquement la vidéo plein écran avec la flèche "Scroll" en bas. Le contenu du site apparaît en scrollant.
- **Mobile** : Les 3 vidéos sont affichées avec une alternance de fonds noir/blanc/noir créant un effet visuel rythmé.

---

## Question en suspens

Pour le mobile, souhaites-tu :
- **Alternance statique** (noir/blanc/noir) comme décrit ci-dessus ?
- Ou une couleur uniforme mais qui change dynamiquement avec la vidéo ?
