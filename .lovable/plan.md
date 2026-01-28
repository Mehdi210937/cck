
## Remplacement des vidéos mobiles par un GIF

### Objectif
Remplacer les 3 éléments `<video>` de la section hero mobile par un seul GIF animé qui se lancera automatiquement sans restriction des navigateurs mobiles.

### Modifications

**Fichier:** `src/pages/Index.tsx`

1. **Copier le GIF** dans le dossier `src/assets/`
   - Source: `user-uploads://bannirecck-ezgif.com-video-to-gif-converter.gif`
   - Destination: `src/assets/banniere-cck.gif`

2. **Importer le GIF** en haut du fichier :
   ```tsx
   import banniereCckGif from "@/assets/banniere-cck.gif";
   ```

3. **Supprimer le code inutile** :
   - Supprimer les refs vidéo (`videoRef1`, `videoRef2`, `videoRef3`)
   - Supprimer le `useEffect` qui forçait l'autoplay des vidéos

4. **Remplacer les 3 vidéos** par 3 images GIF :
   ```tsx
   <div className="flex-1 flex items-center justify-center">
     <img
       src={banniereCckGif}
       alt="Bannière CCK"
       className="w-full h-auto max-h-[32vh] object-contain"
     />
   </div>
   ```
   (Répété 3 fois pour garder la même structure visuelle)

### Avantages
- Les GIFs se lancent automatiquement sur tous les navigateurs mobiles sans restriction
- Aucun JavaScript nécessaire pour forcer la lecture
- Code simplifié (moins de refs et d'effets)
- La version desktop conserve la vidéo originale
