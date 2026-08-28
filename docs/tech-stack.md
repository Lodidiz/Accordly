# Stack technique

Source : `apps/accord-trainer/package.json`, lockfile et configuration actuels.

## Application

| Technologie | Usage réel |
| --- | --- |
| React 19 | Interface et état client |
| TypeScript 6 | Typage et compilation |
| Vite 8 | Développement et build |
| CSS | Styles, sans bibliothèque de composants |
| Web Audio API | Décodage, RMS et rééchantillonnage |
| MediaDevices / MediaRecorder | Capture microphone |
| `@spotify/basic-pitch` 1.0.1 | Inférence de notes dans le navigateur |
| `localStorage` | Historique local des sessions |

## Outillage

- ESLint 10 avec règles TypeScript et React Hooks.
- `@vitejs/plugin-basic-ssl` pour le serveur de développement HTTPS.
- npm et `package-lock.json` pour verrouiller les dépendances.

## Installé mais non actif

- `tonal` 6.4.3 : présent dans les dépendances et le lockfile, sans import dans les
  sources du dépôt.
- `vite-plugin-pwa` 1.3.0 : présent dans les dépendances et le lockfile, sans activation
  dans Vite ni artefact PWA applicatif.

## Absent

Aucun backend, base de données, framework de test ou service cloud n'est configuré.
Tout ajout ou remplacement structurant exige une décision validée et un ADR pertinent.
