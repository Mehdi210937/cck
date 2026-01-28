

## Optimisation de l'autoplay vidéo mobile

### Diagnostic

Le système actuel utilise déjà toutes les techniques recommandées pour forcer l'autoplay. Le problème vient probablement de :

1. **Timing du chargement** : les tentatives de `.play()` arrivent avant que la vidéo soit prête
2. **Poids du fichier** : `banniere-cck.mp4` peut être trop lourd pour démarrer rapidement sur mobile

### Solution proposée

Renforcer le système avec des retries plus agressifs et ajouter une détection d'échec :

| Modification | Fichier | Description |
|-------------|---------|-------------|
| Retries prolongés | `useForceAutoplay.ts` | Ajouter plus de tentatives (1s, 2s, 3s) pour couvrir les connexions lentes |
| Event listener sur `loadedmetadata` | `useForceAutoplay.ts` | Déclencher `.play()` dès que les métadonnées sont chargées |
| Fallback avec interval | `useForceAutoplay.ts` | Boucle toutes les 500ms pendant 5 secondes si la vidéo ne joue pas |
| Attribut `webkit-playsinline` | `Index.tsx` | Attribut supplémentaire pour iOS Safari ancien |

### Modifications techniques

**Fichier : `src/hooks/useForceAutoplay.ts`**

```typescript
// Ajouter un interval qui vérifie si la vidéo est en pause
const interval = setInterval(() => {
  videos.forEach((v) => {
    if (v.paused) {
      v.muted = true;
      v.play().catch(() => {});
    }
  });
}, 500);

// Stopper après 5 secondes
const stopInterval = setTimeout(() => clearInterval(interval), 5000);

// Ajouter aussi loadedmetadata comme trigger
v.addEventListener("loadedmetadata", onReady);
```

**Fichier : `src/pages/Index.tsx`**

```tsx
// Ajouter l'attribut webkit pour compatibilité iOS ancienne
<video
  ref={videoRef1}
  src={banniereCck}
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  // @ts-ignore
  webkit-playsinline="true"
  className="w-full h-auto max-h-[32vh] object-contain"
/>
```

### Résultat attendu

Les vidéos démarreront automatiquement muettes dès que possible, avec des tentatives répétées pendant 5 secondes pour garantir le lancement même sur connexion lente.

