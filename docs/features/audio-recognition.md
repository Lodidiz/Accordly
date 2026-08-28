# Reconnaissance audio

**Statut : implémentée à titre expérimental, non qualifiée sur les plateformes cibles.**

## Pipeline actuel

1. Demander un flux microphone avec annulation d'écho, réduction du bruit et gain
   automatique activés.
2. Enregistrer deux secondes avec `MediaRecorder`, en préférant WebM/Opus puis WebM
   lorsqu'ils sont supportés.
3. Décoder le blob avec Web Audio et calculer son niveau RMS.
4. Ignorer le segment sous le seuil manuel `0.015`.
5. Rééchantillonner le signal mono à 22 050 Hz dans un `OfflineAudioContext`.
6. Exécuter le modèle Basic Pitch livré dans `public/basic-pitch-model/`.
7. Convertir les événements MIDI en classes de hauteur, conserver la meilleure
   amplitude par note, filtrer au-dessus de `0.25` et garder au plus trois notes.
8. Comparer ces notes à l'accord attendu.

Le mode de seuil adaptatif est codé mais désactivé. Le moteur Basic Pitch est conservé
en mémoire après sa première création ; les contextes audio et flux microphone sont
créés pour chaque segment.

## Comportement d'erreur

Les erreurs de permission, capture, décodage ou analyse sont écrites dans la console.
La boucle retente ensuite tant que l'état de jeu reste actif. Aucun message spécifique
n'est présenté à l'utilisateur.

## Limites et validations requises

- Deux secondes de capture imposent une latence minimale perceptible.
- Les seuils sont des constantes sans calibration validée.
- Le choix des trois notes les plus fortes peut masquer ou introduire des erreurs.
- Les équivalences enharmoniques sont représentées en dièses seulement.
- Aucun corpus audio ni test de précision, de bruit, de CPU ou de mémoire n'existe.
- Le comportement réel de `MediaRecorder` et Web Audio n'a pas été revalidé récemment
  sur desktop, Safari iPad ou Safari iPhone.

## Qualification prévue

Les critères d'acceptation devront couvrir la latence entre jeu et retour, la précision,
les faux positifs et négatifs, la stabilité des sessions prolongées, les pertes ou
erreurs microphone, la consommation, la chauffe, la batterie et le comportement dans
Safari comme depuis l'écran d'accueil. Aucun seuil chiffré n'est arrêté avant une
première campagne de mesures.

L'instrumentation devra mesurer séparément la capture, le calcul RMS, l'inférence Basic
Pitch, le post-traitement et la latence totale. Elle devra conserver les notes attendues
et détectées, compter tentatives, réussites et erreurs, et permettre d'exploiter ou
d'exporter les résultats de validation.

Le travail prévu comprend aussi un cycle de vie durable du flux microphone, des erreurs
utilisateur explicites, et l'évaluation du seuil adaptatif et de la calibration.

Avant de changer de moteur ou de flux, consulter
[`../decisions/ADR-002-Basic-Pitch.md`](../decisions/ADR-002-Basic-Pitch.md).
