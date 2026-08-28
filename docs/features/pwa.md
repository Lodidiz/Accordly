# PWA

**Statut : option privilégiée, en cours d'évaluation ; non configurée.**

## Position actuelle

Accordly reste une web app React/Vite pendant la qualification du socle audio. La PWA
est l'option privilégiée pour distribuer l'application sur iPad et iPhone, mais sa
confirmation dépend de mesures réelles. Une solution hybride ou native ne sera
envisagée que si la plateforme web ne permet pas une expérience suffisamment fiable.

Les critères de comparaison couvrent la précision, la latence, la stabilité, la
consommation, la chauffe, la batterie et la compatibilité microphone. Les navigateurs
desktop restent supportés comme cible secondaire.

## Réalité du dépôt

- `vite-plugin-pwa` est déclaré dans `package.json` et verrouillé dans le lockfile.
- Le plugin n'est pas importé ni activé dans `vite.config.ts`.
- Aucun manifeste web applicatif n'est présent.
- Aucun service worker applicatif n'est présent ou enregistré.
- Aucune stratégie de cache ou expérience hors ligne n'est définie.

L'usage de HTTPS par le serveur de développement répond au besoin du microphone, mais
ne rend pas l'application installable. Accordly n'est donc pas une PWA fonctionnelle
aujourd'hui.

## Comparaison minimale autorisée avant décision

Une configuration Home Screen minimale pourra être ajoutée pour comparer :

- Safari en navigateur et le lancement depuis l'écran d'accueil ;
- les autorisations microphone ;
- la capture et la reconnaissance audio ;
- la stabilité après relance ou changement d'application.

Cette étape est un dispositif de test, pas la validation d'une PWA complète. Elle ne
doit pas introduire une stratégie hors ligne complexe.

## Travail conditionné par le jalon de plateforme

Si la PWA est confirmée, le travail complet comprendra :

- manifeste, icônes et mode autonome ;
- cache de l'interface et du modèle Basic Pitch ;
- lancement hors ligne ;
- gestion des mises à jour ;
- récupération après cache absent ou endommagé ;
- vérification du stockage et de sa persistance ;
- parcours d'installation compréhensible.

Le cache hors ligne, le cache du modèle, la gestion avancée des mises à jour et la
persistance ne doivent pas être planifiés pour implémentation avant le jalon de décision
sur la plateforme.

Voir [`../decisions/ADR-001-PWA.md`](../decisions/ADR-001-PWA.md).
