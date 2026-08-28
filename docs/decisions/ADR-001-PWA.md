# ADR-001 — Stratégie de distribution mobile

- **Statut :** Option privilégiée, en cours d'évaluation
- **Date de décision :** 28 août 2026 pour le présent cadrage

## Contexte

L'iPad et l'iPhone sont les plateformes produit principales d'Accordly : le cas d'usage
central est un appareil portable posé sur le piano. Les navigateurs desktop restent
supportés comme cible secondaire. L'application actuelle est une web app React/Vite et
son pipeline audio n'est pas encore qualifié sur les appareils mobiles cibles.

## Problème

Choisir une stratégie de distribution mobile qui conserve une reconnaissance précise,
une latence acceptable, une bonne stabilité, une consommation raisonnable et un accès
fiable au microphone.

## Options pertinentes

1. Web app dans Safari : état technique actuel et base de qualification.
2. PWA : option privilégiée pour l'installation mobile avec une base web unique.
3. Solution hybride : enveloppe mobile autour de la base web et accès natif ciblé.
4. Application native : contrôle plateforme maximal, avec une stack et une maintenance
   distinctes.

## Décision

> Accordly reste une web app pendant la qualification du socle audio. La PWA est
> l'option privilégiée pour la distribution mobile, mais sa confirmation dépend de
> mesures sur iPad et iPhone.

Une solution hybride ou native ne sera envisagée que si les mesures montrent que la
plateforme web ne permet pas d'obtenir une expérience suffisamment fiable.

Une configuration Home Screen minimale peut servir à comparer Safari et le lancement
depuis l'écran d'accueil. Elle ne vaut ni confirmation de la PWA ni autorisation de
construire dès maintenant une stratégie hors ligne complète.

## Critères de décision

La comparaison doit mesurer la précision, la latence, les faux positifs et négatifs,
la stabilité prolongée, les erreurs microphone, la consommation, la chauffe, la
batterie et le comportement dans Safari et en mode installé. Aucun seuil chiffré n'est
fixé avant une première campagne de mesures.

## Issues du jalon de plateforme

- Mesures satisfaisantes : confirmer la PWA comme stratégie principale.
- Mesures insuffisantes mais améliorables : optimiser le pipeline web puis remesurer.
- Limites web persistantes : comparer formellement PWA, hybride et native.

Toute confirmation définitive devra mettre à jour cet ADR.

## Conséquences

- La PWA ne doit pas être présentée comme une destination certaine.
- Le travail mobile indépendant de la distribution peut avancer avant le jalon.
- Le cache hors ligne, le cache du modèle Basic Pitch, la gestion avancée des mises à
  jour et la persistance attendent la décision de plateforme.
- Notifications, comptes, synchronisation cloud et publication App Store restent hors
  du périmètre immédiat.

Voir l'[état de la fonctionnalité PWA](../features/pwa.md).
