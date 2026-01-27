

## Autoplay des vidéos sur mobile

### Vidéos identifiées

| Fichier | Vidéo | Statut actuel |
|---------|-------|---------------|
| `src/pages/Index.tsx` | 3 vidéos hero mobile | Déjà avec refs + autoplay forcé |
| `src/pages/Index.tsx` | 1 vidéo hero desktop | Autoplay simple |
| `src/components/home/ContentGrid.tsx` | vidmil.mp4 (desktop) | Autoplay simple |
| `src/components/home/ContentGrid.tsx` | vidmil.mp4 (mobile) | Autoplay simple |

### Solution

Appliquer la même technique de force autoplay (avec `useRef` + `.play()`) aux vidéos de `ContentGrid.tsx`.

### Modifications

**Fichier:** `src/components/home/ContentGrid.tsx`

1. Ajouter `useRef` et `useEffect` imports
2. Créer des refs pour les vidéos (desktop et mobile)
3. Ajouter un `useEffect` qui force `.play()` au montage

### Limite technique concernant le son

Les navigateurs mobiles (Safari iOS, Chrome Android) **bloquent systématiquement** le son automatique sans interaction utilisateur. C'est une politique de sécurité impossible à contourner par code.

**Alternative possible :** Ajouter un bouton "Activer le son" qui apparaît au premier clic, puis le son se lance.

### Détails techniques

```tsx
// ContentGrid.tsx - ajout des refs et useEffect
import { useRef, useEffect } from "react";

export const DesktopGrid = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);
  
  // ... appliquer ref à la vidéo
};

export const MobileGrid = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);
  
  // ... appliquer ref à la vidéo
};
```

