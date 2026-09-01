# Roadmap

Cette roadmap conserve le socle actuel et organise les intentions validées. Elle ne
fixe ni échéance ni seuil chiffré non mesuré.

## Socle disponible à préserver

- Trainer de triades majeures et mineures.
- Historique local et métriques simples.
- Pipeline microphone + Basic Pitch, encore expérimental.

## 1. Finaliser le Project Brain

- Intégrer le nouveau cadrage produit et mobile.
- Corriger les incohérences factuelles.
- Conserver une lecture documentaire à la demande.

## 2. Établir la base de qualité

- Maintenir le lint sans erreur ni avertissement (base assainie le 28 août 2026).
- Maintenir une base de tests unitaires Vitest avant d'étendre fortement le trainer.
- Étendre au besoin la couverture initiale du catalogue, du tirage et de la validation
  des accords, ajoutée le 28 août 2026.
- Maintenir `npm run validate` comme commande générale pour le lint, les tests et le
  build.
- Décider du maintien ou du retrait de `tonal`, installé mais inutilisé.
- Continuer à surveiller la taille du bundle et le chargement du moteur audio avant
  toute optimisation.

## 3. Définir les critères d'acceptation

Définir des critères mesurables pour :

- la latence entre l'accord joué et le retour ;
- la précision de reconnaissance ;
- les faux positifs et faux négatifs ;
- la stabilité d'une session prolongée ;
- les pertes ou erreurs microphone ;
- la consommation, la chauffe et la batterie ;
- le comportement dans Safari et en mode installé.

Les seuils chiffrés seront définis après une première campagne de mesures, pas inventés
dans la documentation.

Le [protocole de première campagne](features/audio-acceptance-criteria.md) précise les
mesures, les conditions, les données à conserver et les règles de conclusion. Les
seuils restent volontairement ouverts jusqu'à l'analyse de cette campagne.

## 4. Instrumenter le pipeline audio

- Mesurer la durée de capture.
- Mesurer le calcul RMS.
- Mesurer l'inférence Basic Pitch.
- Mesurer le post-traitement.
- Mesurer la latence totale.
- Conserver les notes attendues et détectées.
- Comptabiliser les tentatives, réussites et erreurs.
- Permettre d'exploiter ou d'exporter les résultats de validation.
- Gérer durablement le cycle de vie du flux microphone.
- Améliorer les erreurs présentées à l'utilisateur.
- Évaluer le seuil adaptatif et la calibration.

## 5. Construire l'expérience mobile-first

Conserver toutes les capacités actuelles et :

- adapter les interactions tactiles aux tailles iPhone et iPad ;
- prendre en compte les zones sûres ;
- vérifier portrait et paysage avant de privilégier une orientation ;
- afficher des états clairs pour les permissions et erreurs microphone ;
- permettre pause, abandon et reprise contrôlée d'une session ;
- prévenir la mise en veille pendant une session lorsque la plateforme le permet ;
- proposer un parcours d'installation compréhensible.

Ces améliorations peuvent avancer avant la décision finale sur la PWA lorsqu'elles
restent indépendantes de la technologie de distribution.

## 6. Préparer la comparaison navigateur/mode installé

Prévoir uniquement le minimum nécessaire pour comparer :

- Safari en navigateur ;
- le lancement depuis l'écran d'accueil ;
- les autorisations microphone ;
- la capture et la reconnaissance audio ;
- la stabilité après relance ou changement d'application.

Ne pas inclure encore de stratégie hors ligne complexe.

## 7. Exécuter la campagne de qualification

Valider sur :

- iPad ;
- iPhone ;
- Safari ;
- navigateurs desktop supportés ;
- mode installé depuis l'écran d'accueil ;
- environnement calme puis bruit modéré ;
- plusieurs accords, octaves et niveaux sonores ;
- sessions prolongées.

## 8. Créer un jalon de décision sur la plateforme

- Mesures satisfaisantes : confirmer la PWA comme stratégie principale.
- Mesures insuffisantes mais améliorables : optimiser le pipeline web puis mesurer à
  nouveau.
- Limites web persistantes : comparer formellement PWA, solution hybride et application
  native.

Toute confirmation définitive devra mettre à jour l'ADR-001.

## 9. Développer la PWA complète si elle est confirmée

- Manifeste et icônes.
- Mode autonome.
- Cache de l'interface.
- Cache du modèle Basic Pitch.
- Lancement hors ligne.
- Gestion des mises à jour.
- Récupération après cache absent ou endommagé.
- Vérification du stockage et de sa persistance.

## 10. Solidifier le trainer

Conserver les capacités actuelles et :

- sortir les contrôles de debug de l'expérience normale sans perdre leur utilité de
  développement ;
- améliorer les métriques et l'historique ;
- gérer les tentatives et erreurs ;
- mieux gérer les interruptions de session ;
- étendre progressivement le catalogue et les configurations après validation.

## 11. Ajouter la première gamification

Après stabilisation suffisante de la reconnaissance :

- définir un score compréhensible ;
- prendre en compte vitesse, réussite et nombre de tentatives ;
- conserver les meilleurs résultats ;
- proposer des objectifs ou défis ;
- envisager ensuite séries quotidiennes, progression et niveaux.

## 12. Étendre les exercices

Conserver dans la vision :

- gammes ;
- nouveaux types d'exercices ;
- suivi d'apprentissage ;
- gamification plus riche.

Chaque nouveau type d'exercice nécessitera une décision produit avant implémentation.

Les notifications, comptes utilisateurs, synchronisation cloud et publication App
Store ne font pas partie du périmètre immédiat.
