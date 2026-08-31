# État actuel

Photographie vérifiée dans le dépôt le **31 août 2026**.

## Implémenté

- Une application React/Vite unique dans `apps/accord-trainer`.
- Un trainer d'accords majeurs et mineurs : sessions de 10, 20 ou 50 accords, avec
  option pour inclure les fondamentales accidentées.
- Un décompte, une boucle de jeu, un retour succès/échec, le temps total et moyen.
- Un historique des 20 dernières sessions stocké dans `localStorage`.
- Une capture microphone par `getUserMedia` et `MediaRecorder`, par segments de 2 s.
- Une analyse locale par Basic Pitch avec modèle servi depuis `public/`.
- Une validation par égalité exacte des trois classes de hauteur détectées et attendues.
- Des tests unitaires Vitest pour le catalogue, le filtrage, le tirage aléatoire et la
  validation des accords.

## Expérimental ou non vérifié

- La précision, la latence et les seuils audio ne disposent d'aucun test automatisé.
- Le seuil RMS est manuel ; le mode adaptatif existe dans le code mais est désactivé.
- L'interface contient encore des contrôles et journaux de debug.
- La compatibilité microphone sur navigateurs desktop, Safari iPad et Safari iPhone
  n'a pas été revalidée le 28 août 2026. Aucune validation historique n'est revendiquée
  ici comme actuelle.

## Présent mais non utilisé/configuré

- `tonal` est installé et verrouillé, mais aucun fichier source ne l'importe.
- `vite-plugin-pwa` est installé et verrouillé, mais absent de `vite.config.ts` ; aucun
  manifeste ni service worker applicatif n'est présent ou enregistré.

## Validations du 31 août 2026

- `npm run build` : **réussi**, avec un avertissement sur un chunk JavaScript minifié
  d'environ 1,24 Mo.
- `npm run lint` : **réussi**, sans erreur ni avertissement.
- `npm test` : **réussi**, avec 28 tests unitaires dans 3 fichiers.
- `npm run validate` : disponible pour exécuter successivement lint, tests et build.

## Orientations non implémentées

- Stabiliser et mesurer la reconnaissance sur iPad et iPhone en priorité, puis desktop.
- Évaluer la PWA comme option privilégiée de distribution mobile, sans la considérer
  comme définitivement confirmée.

Les détails appartiennent aux [fiches de fonctionnalités](features/) et à la
[roadmap](roadmap.md).
