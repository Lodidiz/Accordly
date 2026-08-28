# ADR-002 — Basic Pitch dans le navigateur

- **Statut :** accepté pour le prototype, à réévaluer après mesures
- **Date de décision :** non documentée ; Basic Pitch est présent depuis le premier
  commit applicatif du 23 juin 2026

## Contexte

Le trainer doit estimer plusieurs notes jouées simultanément à partir du microphone.
Le prototype doit fonctionner sans backend audio.

## Problème

Choisir un moteur de transcription polyphonique compatible avec une exécution locale
dans le navigateur.

## Options pertinentes

Les échanges historiques ne sont pas conservés dans le dépôt ; cette liste expose les
alternatives, sans prétendre qu'elles ont toutes été formellement étudiées.

1. Basic Pitch côté navigateur : traitement local et polyphonique, au prix d'un modèle
   et d'un bundle lourds ainsi que d'un coût CPU à qualifier.
2. Analyse fréquentielle spécifique : contrôle accru, mais algorithme complexe à
   développer et valider.
3. Traitement serveur : client plus léger, mais latence, réseau, coût et contraintes de
   confidentialité.

## Décision

Utiliser `@spotify/basic-pitch` dans le navigateur pour le prototype. Le modèle est
servi avec l'application et l'inférence reste locale.

`tonal` n'intervient pas dans ce choix : la dépendance est installée mais inutilisée
dans les sources actuelles. Son avenir nécessite une décision distincte.

## Conséquences

- La précision, la latence et la consommation doivent être mesurées sur les appareils
  cibles avant de pérenniser le choix.
- Le build actuel produit un chunk JavaScript volumineux ; sa composition n'a pas été
  mesurée.
- Les seuils et le post-traitement restent propres au projet.
- Un changement de moteur constitue une décision structurante.

Voir le [pipeline audio actuel](../features/audio-recognition.md).
