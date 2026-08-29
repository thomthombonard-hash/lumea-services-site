# Intégration « Qui peut m’aider ? »

L’outil d’orientation Luméa est intégré au site principal à l’adresse :

- `/qui-peut-maider`

## Intégration réalisée

- page dédiée avec le header et le footer du site Luméa ;
- lien « Qui peut m’aider ? » dans le menu desktop et mobile ;
- bloc de présentation sur la page d’accueil ;
- CTA commerciaux flottants masqués pendant l’utilisation de l’outil afin de préserver sa neutralité ;
- moteur complet conservé (768 communes, routage 72/49/53, parcours proche, feuille de route, checklists, mutuelles/assurances/banques, glossaire, détresse, fraîcheur) ;
- styles de l’outil isolés afin de ne pas modifier les autres pages ;
- compatibilité adaptée au projet principal Next.js 14 / Tailwind 3 ;
- scripts `npm run test:orientation` et `npm run audit` ajoutés.

## Avant déploiement

Dans le dossier local du site relié à GitHub :

```powershell
npm run build
npm run audit
npm run dev
```

Vérifier ensuite :

- `/`
- `/qui-peut-maider`
- menu desktop et mobile
- un parcours complet « Pour moi »
- un parcours complet « J’aide un proche »

Puis déployer via le dépôt GitHub déjà relié à Vercel :

```powershell
git status
git add .
git commit -m "Ajout de l'outil Qui peut m'aider"
git push
```

Aucune modification DNS ou création d’un nouveau projet Vercel n’est nécessaire.
