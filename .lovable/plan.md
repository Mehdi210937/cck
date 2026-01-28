

## Autoplay garanti sur iOS : 1 vidéo + 2 copies visuelles

### Problème identifié

iOS Safari limite le nombre de vidéos qui peuvent jouer simultanément en autoplay. Même avec tous les attributs corrects (`muted`, `playsInline`, `webkit-playsinline`), Safari peut bloquer l'autoplay quand plusieurs balises `<video>` sont présentes.

### Solution retenue

Utiliser **une seule vraie vidéo** qui joue, et **2 canvas** qui copient visuellement cette vidéo en temps réel. Visuellement identique, mais techniquement une seule vidéo autoplay.

```text
┌─────────────────────────────────────┐
│  <video> (source, peut être cachée) │
│         ↓ copie frame par frame     │
├─────────────┬─────────────┬─────────┤
│  <canvas>   │  <canvas>   │<canvas> │
│   Zone 1    │   Zone 2    │  Zone 3 │
└─────────────┴─────────────┴─────────┘
```

### Modifications

| Fichier | Description |
|---------|-------------|
| `src/components/VideoMirror.tsx` | Nouveau composant qui affiche 3 canvas synchronisés à partir d'une seule vidéo |
| `src/pages/Index.tsx` | Remplacer les 3 `<video>` mobiles par le nouveau composant `VideoMirror` |

### Détails techniques

**Nouveau composant `VideoMirror.tsx` :**

```tsx
// Crée 1 vidéo cachée + 3 canvas qui copient les frames
// Utilise requestAnimationFrame pour synchroniser en temps réel
// La vidéo source est muted + playsInline + autoPlay
// Les canvas héritent automatiquement du contenu vidéo
```

**Modification `Index.tsx` :**

```tsx
// Avant (3 vidéos séparées - bloqué par iOS)
<video ref={videoRef1} src={banniereCck} ... />
<video ref={videoRef2} src={banniereCck} ... />
<video ref={videoRef3} src={banniereCck} ... />

// Après (1 composant qui gère tout)
<VideoMirror 
  src={banniereCck} 
  copies={3}
  className="w-full h-auto max-h-[32vh] object-contain"
/>
```

### Avantages

- Contourne la limitation iOS sur les autoplay multiples
- Une seule vidéo = autoplay garanti (muet)
- Visuellement identique aux 3 vidéos actuelles
- Le bouton son reste fonctionnel sur la vidéo source

### Résultat attendu

Les 3 "vidéos" se lancent instantanément à l'ouverture du site sur iOS, sans bouton play.

