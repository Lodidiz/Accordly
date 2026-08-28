# Conventions du dépôt

## Organisation

- L'application actuelle reste dans `apps/accord-trainer`.
- Le Project Brain reste dans `docs/` et s'utilise via son index.
- Les règles permanentes des agents restent dans le `AGENTS.md` racine.

## Code

- La configuration TypeScript actuelle n'active pas l'option `strict`. Ne pas la
  présenter comme active ; son adoption éventuelle est une décision future.
- Éviter `any` dans le code nouveau, même sans mode strict global.
- Employer le vocabulaire de [`glossary.md`](glossary.md).
- Garder les responsabilités métier dans `src/game/` et audio dans `src/audio/`.
- Préférer une modification locale et lisible à un refactoring large non demandé.
- Ne pas masquer les erreurs microphone ou audio par une valeur par défaut trompeuse.

## Validation

Exécuter depuis `apps/accord-trainer` les commandes disponibles et pertinentes :
`npm run build` et `npm run lint`. Les tests automatisés ne sont pas encore configurés.
Les parcours microphone, iPad et iPhone nécessitent une vérification manuelle
explicite. Vérifier portrait et paysage avant de privilégier une orientation.

## Git et documentation

- Utiliser une branche ciblée et des commits atomiques au format Conventional Commits.
- Ne pas mélanger une évolution documentaire avec des changements applicatifs sans
  nécessité.
- Mettre à jour uniquement les documents rendus faux par le changement.
- Créer un ADR seulement pour une décision structurante validée.
