

## Correction du menu mobile sur la page d'accueil

### Probleme identifie
Sur la page d'accueil (`/`), le Header est positionne **apres** la section hero fullscreen. Sur mobile, cela signifie que le bouton hamburger du menu n'est pas visible tant que l'utilisateur n'a pas scrolle jusqu'au contenu principal.

### Solution
Ajouter un bouton hamburger flottant directement sur la section hero mobile, qui ouvrira le meme menu overlay existant. Ce bouton sera visible en permanence sur le hero.

### Modifications prevues

**Fichier:** `src/pages/Index.tsx`

1. Importer les icones necessaires et le composant MobileMenu ou son state
2. Ajouter un bouton hamburger fixe en haut a droite de la section hero mobile
3. Ce bouton ouvrira le menu overlay fullscreen existant

**Fichier:** `src/components/MobileMenu.tsx`

1. Modifier le composant pour accepter un prop optionnel `externalTrigger` permettant de controler l'ouverture depuis l'exterieur
2. Ou creer une version du menu qui peut etre declenchee depuis Index.tsx

### Implementation technique

Option retenue : Ajouter un Header mobile overlay directement sur le hero

```text
+------------------------------------------+
|  [Logo]                    [Hamburger]   |  <- Barre fixe sur hero mobile
|                                          |
|            HERO GIF                      |
|                                          |
+------------------------------------------+
```

**Changements dans `src/pages/Index.tsx`:**
- Ajouter un header mobile simplifie (logo + hamburger) en position absolue sur la section hero mobile
- Utiliser le meme composant MobileMenu avec son comportement existant

**Alternative plus simple:**
- Deplacer le Header avant les sections hero mais le rendre visible uniquement sur mobile sur le hero
- Utiliser un z-index eleve pour le superposer au hero

### Plan detaille

1. **Modifier `src/pages/Index.tsx`:**
   - Importer MobileMenu, les navItems et l'asset logo
   - Ajouter une barre de navigation mobile overlay sur la section hero mobile avec:
     - Logo a gauche (lien vers `/`)
     - Bouton hamburger a droite (via MobileMenu)
   - Style: position absolue, z-index eleve, fond semi-transparent ou transparent

2. **Conserver le style actuel du menu overlay:**
   - L'animation `menu-overlay-enter` reste inchangee
   - Le design editorial avec numeros reste identique
   - Seul l'emplacement du declencheur change

### Resultat attendu
- Le bouton hamburger sera visible en haut du hero mobile
- Au clic, le menu fullscreen s'ouvrira avec l'animation actuelle
- Le design et le style restent coherents avec l'existant
