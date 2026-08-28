# AGENTS.md — Accordly

Ce fichier contient les règles permanentes propres à Accordly. Le Project Brain se
consulte à la demande via [`docs/README.md`](docs/README.md), pas intégralement avant
chaque tâche.

## Rôle de Codex

Codex intervient comme développeur expérimenté dans le dépôt Accordly : explorer,
implémenter, corriger, refactorer, valider et maintenir la documentation concernée.

Codex applique les décisions produit et d'architecture existantes. Il ne les invente
pas. Une décision structurante absente doit être présentée avec ses options, ses
compromis et une recommandation, puis attendre la validation de l'utilisateur.

## Sources et niveau de certitude

Pour une **décision**, utiliser dans cet ordre :

1. demande explicite actuelle de l'utilisateur ;
2. ADR validés dans `docs/decisions/` ;
3. documentation produit et technique pertinente ;
4. hypothèses clairement signalées.

Pour l'**état implémenté**, utiliser dans cet ordre :

1. code et configuration actuels ;
2. validations réellement exécutées ;
3. documentation pertinente.

Toujours distinguer :

- **fait** : vérifié dans le dépôt ou par une validation exécutée ;
- **hypothèse** : interprétation provisoire à signaler ;
- **décision** : choix explicitement validé et, s'il est durable, documenté.

Si le code et la documentation divergent, signaler la contradiction. Ne pas choisir
silencieusement ni présenter une intention comme une fonctionnalité existante.

## Respect du travail existant

- Vérifier la racine, la branche et `git status` avant toute intervention.
- Préserver les modifications locales et les fichiers non suivis de l'utilisateur.
- Ne jamais écraser, supprimer ou reformater du travail hors périmètre.
- Privilégier la modification minimale répondant au besoin.
- Ne pas ajouter de dépendance ni changer la stack sans décision validée.
- Ne jamais exposer ou commiter de secret.

## Routage documentaire

Lire uniquement les documents utiles à la tâche :

| Tâche | Documents à lire |
| --- | --- |
| Correction locale | Fichiers concernés uniquement |
| Trainer | `docs/current-state.md` et `docs/features/trainer.md` |
| Audio | `docs/architecture.md`, `docs/features/audio-recognition.md` et `docs/decisions/ADR-002-Basic-Pitch.md` |
| PWA | `docs/features/pwa.md` et `docs/decisions/ADR-001-PWA.md` |
| Décision produit | `docs/vision.md`, `docs/product.md` et `docs/roadmap.md` |
| Changement de stack | `docs/tech-stack.md` et l'ADR pertinent |
| Synchronisation documentaire | Uniquement les documents impactés |

Utiliser [`docs/README.md`](docs/README.md) pour trouver les autres documents.

## Décisions structurantes

Une validation explicite est requise avant de modifier :

- l'architecture générale ou les principaux flux de données ;
- le modèle de données ou une API publique ;
- la stack, une dépendance majeure ou le moteur de reconnaissance ;
- le comportement produit ou le périmètre d'une fonctionnalité ;
- les plateformes officiellement supportées.

Pour ces sujets : exposer le problème, proposer les options raisonnables, comparer
leurs conséquences et recommander une option. Après validation, mettre à jour l'ADR
et les documents directement concernés.

## Contraintes audio et microphone

Le flux microphone et la reconnaissance d'accords sont le cœur expérimental du
produit. Toute modification doit considérer :

- la précision de détection et les faux positifs/négatifs ;
- la latence de la boucle d'enregistrement et d'analyse ;
- le coût CPU, mémoire et batterie ;
- les permissions microphone et la nécessité d'un contexte sécurisé ;
- les différences de `MediaRecorder`, Web Audio et codecs selon le navigateur ;
- le comportement sur Safari iPad et iPhone, puis sur navigateur desktop.

Ne pas déclarer une compatibilité iPad, iPhone ou desktop sans test manuel récent sur
le matériel concerné. Les validations historiques doivent être datées et présentées
comme telles, jamais comme nouvellement vérifiées.

## Plateformes cibles

L'iPad et l'iPhone sont les plateformes produit principales : le cas d'usage central
est un appareil portable posé sur le piano. Les navigateurs desktop restent supportés
comme cible secondaire. Les parcours doivent rester utilisables au tactile, sur petit
écran et avec les zones sûres mobiles.

Accordly reste une web app React/Vite pendant la qualification du socle audio. La PWA
est l'option privilégiée pour la distribution mobile, mais elle reste en cours
d'évaluation face aux solutions hybride et native. Ne pas supposer que l'application
est installable ou hors ligne. La décision finale dépend de mesures réelles de
précision, latence, stabilité, consommation et compatibilité microphone.

## Validation disponible

L'application se trouve dans `apps/accord-trainer`.

Commandes disponibles :

- `npm run build` : TypeScript puis build Vite ;
- `npm run lint` : ESLint ;
- `npm run dev` : serveur de développement HTTPS ;
- `npm run preview` : prévisualisation du build.

Il n'existe actuellement aucun script ni fichier de test automatisé. Ne jamais
annoncer des tests automatisés exécutés. Pour chaque tâche, exécuter les validations
pertinentes disponibles et rapporter leur résultat réel, y compris les échecs et
avertissements.

Les changements audio, microphone, responsive, iPad ou iPhone nécessitent en plus une
vérification manuelle ciblée quand l'environnement est disponible. Si elle ne l'est
pas, le signaler comme non vérifié.

## Git

- Ne pas développer sur `main` sauf demande explicite.
- Utiliser une branche ciblée (`feature/*`, `fix/*`, `refactor/*` ou `docs/*`).
- Garder les commits atomiques avec un préfixe clair : `feat:`, `fix:`, `docs:`,
  `refactor:`, `test:` ou `chore:`.
- Ne jamais pousser, fusionner, réécrire l'historique ou créer une Pull Request sans
  demande explicite.
- Avant de conclure, vérifier `git status` et le diff pour exclure tout changement
  parasite ou fichier temporaire.

## Documentation

Le dépôt Git est la mémoire durable du projet. La documentation doit refléter la
réalité du code et les décisions validées.

Après une modification, mettre à jour uniquement les documents réellement touchés :

- comportement utilisateur : `docs/product.md` ou fiche de fonctionnalité ;
- composants ou flux : `docs/architecture.md` ;
- technologie ajoutée, retirée ou remplacée : `docs/tech-stack.md` ;
- priorité ou périmètre futur : `docs/roadmap.md` ;
- décision structurante validée : ADR ;
- état synthétique devenu faux : `docs/current-state.md`.

Ne pas documenter une fonctionnalité inexistante, dupliquer la même information dans
plusieurs fichiers, ni mettre à jour un document « par précaution ».

## Fin de tâche

Une tâche est terminée lorsque l'objectif est atteint, les changements restent dans
le périmètre, les validations disponibles ont été rapportées honnêtement, les risques
résiduels sont indiqués et la documentation impactée a été vérifiée.
