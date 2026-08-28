# Accordly

Accordly est une application d'apprentissage musical gamifiée qui veut rendre la
répétition plus autonome, motivante et mesurable. Son premier outil est un trainer
d'accords dans le navigateur : il affiche un accord, écoute le microphone et compare
les notes détectées aux notes attendues. La reconnaissance audio et la compatibilité
entre appareils restent expérimentales.

## État actuel

- Trainer jouable : configuration de 10, 20 ou 50 accords, majeurs/mineurs et option
  dièses/bémols.
- Détection expérimentale par Basic Pitch sur des segments audio de deux secondes.
- Résultats de session et historique local limité à 20 entrées.
- Web app React/Vite actuelle, pensée d'abord pour un iPad ou iPhone posé sur le piano ;
  les navigateurs desktop restent une cible secondaire.
- PWA privilégiée pour la distribution mobile, mais encore en évaluation et non
  configurée : la dépendance est installée, sans plugin activé, manifeste ni service
  worker.
- `tonal` est installé mais n'est importé par aucun fichier source.
- Build réussi le 28 août 2026 ; lint en échec ; aucun test automatisé.

Voir [`docs/current-state.md`](docs/current-state.md) pour la photographie factuelle
et ses limites.

## Installation

Prérequis : Node.js et npm. Les validations du 28 août 2026 ont été exécutées avec
Node.js `22.12.0` et npm `10.9.0` ; le lockfile verrouille les dépendances applicatives,
pas les versions de ces outils.

```bash
cd apps/accord-trainer
npm install
npm run dev
```

Le serveur Vite utilise HTTPS et écoute sur le réseau local. Le navigateur demandera
l'autorisation d'accéder au microphone.

## Commandes

À exécuter depuis `apps/accord-trainer` :

| Commande | Usage |
| --- | --- |
| `npm run dev` | Démarrer le serveur de développement HTTPS |
| `npm run build` | Vérifier TypeScript et produire le build Vite |
| `npm run lint` | Exécuter ESLint |
| `npm run preview` | Prévisualiser le build de production |

Aucune commande de test n'est définie actuellement.

## Structure

```text
apps/accord-trainer/  application React/Vite
docs/                 Project Brain
AGENTS.md             règles permanentes pour les agents
workflow.md           cycle court décision → documentation → implémentation
```

## Documentation

- [`docs/README.md`](docs/README.md) — index et routage par type de tâche ;
- [`docs/current-state.md`](docs/current-state.md) — état factuel actuel ;
- [`docs/product.md`](docs/product.md) — comportement produit ;
- [`docs/architecture.md`](docs/architecture.md) — composants et flux ;
- [`docs/roadmap.md`](docs/roadmap.md) — éléments futurs et leur statut ;
- [`docs/tech-stack.md`](docs/tech-stack.md) — technologies réellement présentes ;
- [`docs/features/`](docs/features/) — fiches trainer, audio et PWA ;
- [`docs/decisions/`](docs/decisions/) — décisions structurantes.

La compatibilité desktop, iPad et iPhone n'a pas été revalidée lors de cette mise à
jour documentaire.
