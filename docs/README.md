# Project Brain Accordly

Le Project Brain documente la réalité du dépôt et les décisions durables. Il se lit à
la demande : commencer par le document directement lié à la tâche, puis suivre ses
liens si nécessaire.

Les statuts employés sont :

- **implémenté** : présent dans le code actuel ;
- **expérimental** : présent mais pas encore suffisamment validé ;
- **en cours d'évaluation** : option privilégiée dont la confirmation dépend encore de
  mesures ou d'un jalon de décision ;
- **prévu** : intention documentée, absente du code ;
- **non vérifié** : aucune validation récente ne permet de conclure.

## Index

| Document | Quand le lire |
| --- | --- |
| [`current-state.md`](current-state.md) | Pour une photographie factuelle rapide |
| [`vision.md`](vision.md) | Pour comprendre le problème et la valeur recherchée |
| [`product.md`](product.md) | Pour une décision ou un parcours produit |
| [`architecture.md`](architecture.md) | Pour modifier un composant ou un flux technique |
| [`roadmap.md`](roadmap.md) | Pour discuter des prochaines priorités |
| [`tech-stack.md`](tech-stack.md) | Pour toucher aux technologies ou dépendances |
| [`conventions.md`](conventions.md) | Pour les conventions propres au dépôt |
| [`glossary.md`](glossary.md) | Pour le vocabulaire métier |
| [`features/trainer.md`](features/trainer.md) | Pour le trainer et ses règles |
| [`features/audio-recognition.md`](features/audio-recognition.md) | Pour le microphone ou la reconnaissance |
| [`features/audio-acceptance-criteria.md`](features/audio-acceptance-criteria.md) | Pour mesurer et qualifier la reconnaissance audio |
| [`features/pwa.md`](features/pwa.md) | Pour l'installabilité et le hors-ligne |
| [`decisions/ADR-001-PWA.md`](decisions/ADR-001-PWA.md) | Pour l'évaluation de la stratégie de distribution mobile |
| [`decisions/ADR-002-Basic-Pitch.md`](decisions/ADR-002-Basic-Pitch.md) | Pour le choix actuel du moteur audio |
| [`changelog/`](changelog/) | Pour les jalons documentaires significatifs |

## Routage rapide

- Correction locale : lire uniquement les fichiers concernés.
- Trainer : `current-state.md` puis `features/trainer.md`.
- Audio : `architecture.md`, `features/audio-recognition.md` et l'ADR Basic Pitch.
- PWA : `features/pwa.md` et l'ADR PWA.
- Décision produit : `vision.md`, `product.md` et `roadmap.md`.
- Changement de stack : `tech-stack.md` et l'ADR pertinent.
- Synchronisation documentaire : lire uniquement les documents réellement impactés.

Le code reste la preuve de ce qui est implémenté. Une contradiction doit être signalée
et corrigée sans transformer une hypothèse en décision.
