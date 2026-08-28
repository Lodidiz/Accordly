# Produit

## Proposition actuelle

Accordly propose aujourd'hui un trainer d'accords dans une web app React/Vite.
L'utilisateur configure une session, joue l'accord affiché, reçoit un retour puis
consulte son résultat. Ce trainer est la première fonctionnalité à développer et
affiner, ainsi que le premier socle technique du produit ; il n'en fixe pas la portée
future.

Le contexte principal est un iPad ou iPhone posé sur le piano. Les navigateurs desktop
restent supportés comme cible secondaire.

## Parcours implémenté

1. Depuis l'accueil, choisir **Jouer** ou consulter l'**Historique**.
2. Configurer 10, 20 ou 50 accords, majeurs et/ou mineurs, avec une option pour les
   fondamentales accidentées.
3. Lancer un décompte de trois secondes.
4. Jouer l'accord affiché pendant que l'application analyse le microphone.
5. En cas de correspondance exacte, passer au suivant après un bref retour vert ; en
   cas d'échec, conserver l'accord après un retour rouge.
6. Afficher le temps total et le temps moyen, puis enregistrer la session localement.

L'historique conserve au maximum 20 sessions dans le navigateur. Il n'existe ni compte
utilisateur, ni synchronisation distante, ni backend.

## Portée des accords

Le catalogue contient des triades majeures et mineures. L'option « dièses / bémols »
inclut des fondamentales accidentées écrites en dièses ; la détection compare des
classes de hauteur sans tenir compte de l'octave. La validation exige exactement les
trois notes attendues.

## Statut

- **Implémenté** : parcours du trainer, résultat et historique local.
- **Expérimental** : reconnaissance automatique par microphone et seuils audio.
- **Option privilégiée, en cours d'évaluation** : distribution PWA sur iPad et iPhone.
- **Prévu** : qualification du socle audio, expérience mobile-first et future
  gamification après stabilisation de la reconnaissance.
- **Non vérifié récemment** : expérience réelle sur desktop, iPad et iPhone.

Accordly reste une web app pendant la qualification audio. Une solution hybride ou
native ne sera étudiée que si des mesures montrent que la plateforme web ne permet pas
une expérience suffisamment fiable. Le choix dépendra de la précision, de la latence,
de la stabilité, de la consommation et de la compatibilité microphone mesurées.

Les notifications, comptes utilisateurs, synchronisation cloud et publication App
Store ne font pas partie du périmètre immédiat. Les gammes et autres formes
d'entraînement restent dans la vision future et demanderont une décision produit.

Les détails techniques sont dans [`architecture.md`](architecture.md) ; les limites du
trainer sont dans [`features/trainer.md`](features/trainer.md).
