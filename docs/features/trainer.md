# Trainer d'accords

**Statut : implémenté, avec reconnaissance audio expérimentale.**

## Objectif

Faire répéter rapidement des triades en affichant un accord aléatoire et en validant
les notes jouées au microphone.

Le trainer est la première fonctionnalité à continuer de développer, le premier socle
technique audio et le premier outil réellement utilisable d'Accordly. Il doit devenir
mobile-first pour un iPad ou iPhone posé sur le piano, sans perdre le support desktop.
Il ne représente pas la totalité future du produit.

## Règles implémentées

- Session de 10, 20 ou 50 accords.
- Accords majeurs, mineurs ou les deux ; au moins une qualité est obligatoire.
- Option pour inclure les accords dont la fondamentale est accidentée.
- 24 accords codés en dur : 14 à fondamentale naturelle et 10 à fondamentale diésée.
- Pas de répétition immédiate du même identifiant lorsqu'un autre accord est disponible.
- Succès si l'ensemble détecté correspond exactement aux trois classes de hauteur
  attendues ; l'ordre et l'octave sont ignorés.
- Après un succès, passage automatique à l'accord suivant après 500 ms.
- Après un échec, reprise du même accord après 1 s.

L'option « dièses / bémols » agit sur la fondamentale. Des accords à fondamentale
naturelle peuvent déjà contenir des notes accidentées, par exemple D majeur.

## Résultat et historique

Le trainer mesure le temps de chaque accord validé, puis affiche le total et la
moyenne. Il conserve localement les 20 derniers résultats avec leur date, leur nombre
d'accords et leur temps moyen. Effacer les données du navigateur supprime l'historique.

## Limites

- Les contrôles « Debug correct » et « Debug faux » sont visibles dans l'interface.
- La progression dépend d'une reconnaissance audio encore non qualifiée.
- Il n'y a ni pause, ni abandon explicite, ni gestion dédiée d'une erreur microphone.
- Le catalogue, le filtrage, le tirage et la validation des accords sont couverts par
  des tests unitaires ; le déroulement complet d'une session et ses résultats ne le
  sont pas encore.

## Évolutions décidées, non implémentées

- Adapter les interactions, zones sûres et mises en page aux tailles iPhone et iPad,
  en validant portrait et paysage avant de privilégier une orientation.
- Ajouter des états clairs pour les permissions et erreurs microphone.
- Permettre pause, abandon et reprise contrôlée d'une session.
- Prévenir la mise en veille pendant une session lorsque la plateforme le permet.
- Sortir les contrôles de debug de l'expérience normale sans perdre leur utilité de
  développement.
- Mieux suivre les tentatives et erreurs, puis enrichir métriques et historique.
- Étendre progressivement le catalogue et les configurations après validation.

La première gamification viendra après stabilisation suffisante de la reconnaissance :
score compréhensible, vitesse, réussite, nombre de tentatives, meilleurs résultats et
objectifs. Les séries quotidiennes, la progression et les niveaux pourront suivre.

Le pipeline de détection est décrit dans
[`audio-recognition.md`](audio-recognition.md).
