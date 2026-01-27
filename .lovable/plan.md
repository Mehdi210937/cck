

## Recentrage du bouton Scroll sur mobile

### Problème identifié
Le bouton scroll utilise `left-1/2` qui le centre par rapport au conteneur parent (`<section>`), mais pas forcément par rapport à l'écran entier.

### Solution
Utiliser `left-[50vw]` au lieu de `left-1/2` pour centrer le bouton par rapport à la **largeur de l'écran** (viewport) plutôt que par rapport au conteneur parent.

### Modification

**Fichier:** `src/pages/Index.tsx`

Changer la classe du bouton scroll mobile de:
```tsx
className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 ..."
```

À:
```tsx
className="absolute top-2/3 left-[50vw] -translate-x-1/2 -translate-y-1/2 ..."
```

### Détails techniques
- `left-[50vw]` positionne le bord gauche du bouton à 50% de la largeur du viewport (écran)
- `-translate-x-1/2` décale ensuite le bouton de la moitié de sa propre largeur vers la gauche
- Résultat : le bouton est parfaitement centré horizontalement par rapport à l'écran, indépendamment du conteneur parent
- Aucun changement sur les vidéos ou leur espacement

