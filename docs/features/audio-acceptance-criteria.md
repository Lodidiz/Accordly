# Critères d'acceptation de la reconnaissance audio

**Statut : protocole de première campagne défini ; seuils d'acceptation non
définis ; aucune plateforme qualifiée.**

Ce document définit comment mesurer le pipeline audio et comment transformer les
mesures en un verdict. Il ne fixe pas encore les valeurs à atteindre. Les seuils
seront proposés à partir d'une première campagne, puis devront être validés avant de
devenir des décisions produit durables.

Les nombres qui décrivent le déroulement du test, comme le nombre de répétitions ou
la durée d'une session, sont des paramètres de collecte. Ils ne constituent pas des
seuils de qualité.

## Périmètre réellement implémenté

Le code actuel :

1. ouvre un nouveau flux microphone pour chaque segment ;
2. enregistre un segment demandé de deux secondes avec `MediaRecorder` ;
3. décode le segment et calcule son niveau RMS ;
4. ignore le segment sous le seuil RMS manuel ;
5. décode à nouveau le segment, le rééchantillonne à 22 050 Hz et exécute Basic
   Pitch ;
6. transforme les événements MIDI en classes de hauteur, conserve au plus trois
   notes et les compare exactement aux trois notes attendues ;
7. affiche un retour vert ou rouge, tandis que les erreurs audio restent dans la
   console.

Le pipeline ne produit actuellement aucun journal structuré avec les durées, les
notes attendues et détectées ou les erreurs. L'instrumentation nécessaire appartient
au jalon suivant de la roadmap.

`vite-plugin-pwa` est installé mais non configuré. Le build actuel ne permet donc pas
de conclure sur un mode PWA installé.

## Deux campagnes distinctes

### Campagne A — établir la référence

La première campagne décrit le comportement observé. Elle produit des distributions,
des taux et des écarts entre plateformes, mais pas de verdict global « Accordly est
accepté ».

Un résultat d'acceptation de cette campagne est **non concluant** tant que le seuil
correspondant n'a pas été validé. Une panne bloquante observée, comme un crash, un
arrêt définitif de la boucle ou un microphone devenu inutilisable, reste un échec
fonctionnel à signaler immédiatement.

### Campagne B — qualifier

Après examen de la campagne A :

1. proposer les seuils avec leurs effets sur l'expérience et les plateformes ;
2. faire valider ces seuils ;
3. figer le protocole, le build et les conditions de qualification ;
4. exécuter une nouvelle campagne indépendante ;
5. conclure succès, échec ou résultat non concluant selon les règles ci-dessous.

Les données de la campagne A ne doivent pas servir à la fois à choisir un seuil et à
prouver que ce seuil est respecté.

## Matrice minimale de la première campagne

La matrice ne modifie pas la liste des plateformes officiellement supportées. Elle
définit seulement le minimum à observer avant de prendre cette décision.

| Cible | Exécution minimale |
| --- | --- |
| iPad | Safari, version exacte d'iPadOS et modèle consignés |
| iPhone | Safari, version exacte d'iOS et modèle consignés |
| Desktop principal | Un navigateur Chromium stable, version et système consignés |
| Desktop complémentaire | Firefox stable sur le même ordinateur |
| Safari desktop | À ajouter si un Mac est disponible ; sinon noter « non exécuté » |
| Mode installé | À exécuter seulement avec un artefact réellement installable ; avec le build actuel, noter « non mesurable » |

Un résultat vaut uniquement pour le modèle d'appareil, le système, le navigateur et
la version effectivement testés. Il ne constitue pas une revendication de
compatibilité pour les autres matériels.

## Jeu d'essai minimal

### Tentatives positives

- Tester les 24 accords du catalogue actuel.
- Jouer chaque accord trois fois, en position fondamentale, dans une octave médiane,
  à intensité habituelle et en environnement calme.
- Randomiser l'ordre des accords et conserver exactement le même ordre sur toutes les
  plateformes.
- Effectuer une première série après un chargement neuf, puis distinguer les mesures
  de la première inférence des inférences suivantes.

Ces 72 tentatives par plateforme constituent une exploration. Elles ne suffisent pas
à elles seules à revendiquer une précision générale avec une marge statistique
prédéfinie.

### Variations ciblées

Sélectionner dans le catalogue un accord majeur à fondamentale naturelle, un accord
mineur à fondamentale naturelle, un accord majeur à fondamentale écrite en dièse et
un accord mineur à fondamentale écrite en dièse. Le catalogue actuel ne contient pas
de fondamentale écrite en bémol ; les équivalences enharmoniques ne constituent donc
pas une catégorie supplémentaire à tester. Pour chacun, ajouter :

- une autre octave ;
- les deux renversements ;
- une exécution plus faible et une exécution plus forte ;
- une exécution en présence du bruit modéré décrit plus bas.

Cette série cherche des écarts par condition. Elle ne remplace pas la série couvrant
le catalogue entier.

### Tentatives négatives

Pour chaque accord affiché retenu dans la série ciblée, exécuter séparément :

- aucun accord, dans le calme ;
- le bruit modéré seul ;
- un autre accord du catalogue ;
- deux notes seulement de l'accord attendu ;
- l'accord attendu accompagné d'une note étrangère.

Une tentative négative devient un faux positif uniquement si l'application affiche
que l'accord attendu est reconnu.

### Déroulement d'une tentative

1. Attendre l'affichage de l'accord et l'état « écoute en cours ».
2. Annoncer ou marquer l'identifiant de la tentative dans l'enregistrement de
   référence.
3. Jouer une fois le stimulus prévu.
4. Le premier retour vert ou rouge est la décision principale.
5. En l'absence de retour, arrêter l'observation dix secondes après l'attaque et
   classer la tentative « sans décision ».
6. Conserver aussi un éventuel succès ultérieur comme diagnostic, sans remplacer la
   première décision.

La fenêtre de dix secondes évite qu'une tentative sans retour bloque indéfiniment la
collecte. Elle n'est pas un objectif de latence.

## Conditions à contrôler

Pour toute comparaison, conserver le même piano, la même pièce, la même position de
l'appareil, la même orientation, le même ordre de stimuli et le même interprète dans
la mesure du possible.

Consigner avant chaque exécution :

- SHA Git et date du build ;
- appareil, système, navigateur et versions exactes ;
- navigateur ou mode installé ;
- modèle de piano, pièce, position, orientation et distance approximative ;
- alimentation branchée ou débranchée, niveau de batterie et luminosité ;
- état initial de la permission microphone ;
- périphérique d'entrée, codec choisi et réglages exposés par la piste ;
- température ambiante et température de surface si un instrument de mesure est
  disponible.

Le bruit modéré est un même enregistrement de bruit diffusé par le même haut-parleur,
au même volume et à la même position pendant toute une campagne. Conserver le fichier,
son empreinte, le réglage de volume, la distance et, si un sonomètre est disponible,
le niveau observé. Sans calibration, les résultats restent comparables au sein de la
campagne, pas entre deux lieux différents.

## Mesures de performance

Toutes les durées applicatives utilisent une horloge monotone. Un horodatage civil
ISO est ajouté uniquement pour corréler les événements entre sources.

### Durée de capture

- **Mesure :** durée réelle de l'enregistrement et durée audio décodée.
- **Départ :** juste avant `MediaRecorder.start()`.
- **Arrivée :** entrée dans `onstop`, puis création terminée du blob.
- **Unité :** millisecondes ; durée audio en millisecondes.
- **Collecte :** chaque tentative, en séparant l'acquisition du flux microphone.
- **Données :** durée demandée, durées observées, taille, type MIME, état et réglages
  de la piste, erreur éventuelle.
- **Verdict :** succès si les distributions et pertes respectent les tolérances
  validées ; échec si elles les dépassent ; non concluant si le blob, les timestamps
  ou les conditions manquent.

L'acquisition du microphone est mesurée séparément entre l'appel à `getUserMedia` et
sa résolution ou son rejet. Elle ne doit pas être confondue avec les deux secondes de
signal enregistrées.

### Calcul RMS

- **Mesure :** durée totale de `getBlobRmsLevel` et durée de la boucle de calcul sur
  les échantillons.
- **Départ :** entrée dans la fonction, puis début du parcours des échantillons.
- **Arrivée :** résultat RMS disponible, puis résolution de la fonction après
  fermeture du contexte.
- **Unité :** millisecondes et valeur RMS sans unité.
- **Collecte :** chaque segment, y compris ceux ignorés sous le seuil.
- **Données :** durée de décodage, nombre d'échantillons, durée de calcul, RMS, seuil
  appliqué et décision d'ignorer ou d'analyser.
- **Verdict :** succès ou échec selon les tolérances validées ; non concluant si le
  décodage échoue ou si la sous-mesure n'est pas disponible.

### Inférence Basic Pitch

- **Mesure :** durée de `evaluateModel`.
- **Départ :** immédiatement avant son appel.
- **Arrivée :** résolution ou rejet de sa promesse.
- **Unité :** millisecondes.
- **Collecte :** chaque segment analysé, en étiquetant la première inférence après
  chargement et les inférences suivantes.
- **Données :** durée audio, durée d'inférence, nombre de frames, onsets et contours,
  progression finale et erreur.
- **Verdict :** succès si la distribution validée est respectée ; échec sinon ; non
  concluant si le statut froid ou chaud n'est pas connu.

### Post-traitement

- **Mesure :** transformation de la sortie du modèle en classes de hauteur finales.
- **Départ :** fin de `evaluateModel`.
- **Arrivée :** liste triée et dédupliquée prête pour `validateChord`.
- **Unité :** millisecondes.
- **Collecte :** chaque segment analysé.
- **Données :** événements MIDI, amplitudes, classes avant et après filtrage, notes
  écartées, notes finales et durée.
- **Verdict :** succès ou échec selon la tolérance validée ; non concluant si les
  événements intermédiaires n'ont pas été conservés.

### Latence totale jusqu'au retour utilisateur

- **Mesure :** temps réellement subi entre le jeu et le retour visible.
- **Départ :** première attaque acoustique identifiable de l'accord.
- **Arrivée :** première image où le retour vert ou rouge est visible.
- **Unité :** millisecondes.
- **Collecte :** enregistrement externe synchronisé du son et de l'écran pour la
  série ciblée ; timestamps applicatifs pour toutes les tentatives.
- **Données :** média ou annotation de référence, onset, retour, première décision,
  durées de chaque étape et latence totale.
- **Verdict :** succès si la distribution respecte le seuil validé ; échec sinon ;
  non concluant si la résolution de la référence ne permet pas d'identifier le départ
  ou l'arrivée.

La latence principale est résumée par sa médiane et un percentile haut, accompagnés
des données brutes. La moyenne seule n'est pas suffisante pour masquer ou qualifier
les blocages ponctuels.

## Mesures de reconnaissance

### Précision

- **Mesure :** part des tentatives positives dont la première décision reconnaît
  exactement l'accord attendu.
- **Départ :** vérité terrain fixée avant la tentative.
- **Arrivée :** première décision ou fin de la fenêtre d'observation.
- **Unité :** proportion et pourcentage, toujours accompagnés du numérateur et du
  dénominateur.
- **Collecte :** résultats globaux puis séparés par accord, qualité, fondamentale
  naturelle ou écrite en dièse, octave, renversement, intensité, bruit et plateforme.
- **Données :** stimulus prévu, notes attendues, notes brutes et filtrées, RMS, seuil,
  décision, éventuel succès ultérieur et erreur.
- **Verdict :** succès si les résultats globaux et les strates obligatoires respectent
  les seuils validés ; échec sinon ; non concluant si le corpus est incomplet ou la
  vérité terrain ambiguë.

### Faux positifs

- **Mesure :** tentatives négatives donnant à tort un retour vert.
- **Départ :** stimulus négatif fixé avant la tentative.
- **Arrivée :** première décision ou fin de la fenêtre.
- **Unité :** taux par catégorie de stimulus négatif.
- **Collecte et données :** identiques à la précision, sans regrouper silence, bruit,
  mauvais accord, accord incomplet et note supplémentaire.
- **Verdict :** succès si chaque catégorie obligatoire respecte son seuil validé ;
  échec sinon ; non concluant si une catégorie manque.

### Faux négatifs

- **Mesure :** accord attendu réellement joué mais rejeté, ignoré ou laissé sans
  décision.
- **Départ :** attaque acoustique du bon accord.
- **Arrivée :** première décision ou fin de la fenêtre.
- **Unité :** taux, avec distinction entre retour rouge et absence de retour.
- **Collecte :** toutes les tentatives positives.
- **Données :** notes, RMS, seuil, étapes exécutées, décision et erreur éventuelle.
- **Verdict :** succès si le taux validé est respecté ; échec sinon ; non concluant si
  le jeu réel ne peut pas être confirmé.

Les taux de la campagne de qualification devront être accompagnés d'un intervalle
d'incertitude. La taille définitive du corpus sera choisie après la campagne A selon
la variabilité observée, plutôt qu'en prétendant que trois répétitions suffisent à
une conclusion statistique.

## Stabilité et cycle de vie du microphone

### Session prolongée

Exécuter pendant trente minutes des sessions de 50 accords consécutives, en relançant
une session dès que la précédente se termine. Alterner jeu correct, mauvais accord,
silence et bruit selon un script préparé. Ne pas recharger la page entre les sessions.

- **Mesure :** capacité à poursuivre la boucle, erreurs, segments perdus, évolution
  des latences et ressources accessibles.
- **Départ :** passage à la première écoute.
- **Arrivée :** fin planifiée ou panne empêchant de continuer.
- **Unité :** minutes, tentatives, erreurs, taux de pertes, millisecondes et ressources
  disponibles.
- **Données :** mesures par tentative, événements de cycle de vie, erreurs, mémoire et
  CPU si exposés, raison et instant de fin.
- **Verdict :** échec fonctionnel si l'application plante, si la boucle s'arrête
  définitivement ou si le microphone devient inutilisable ; sinon succès ou échec
  selon les tolérances de dérive validées ; non concluant si la session est interrompue
  par une cause extérieure ou si les données cessent d'être collectées.

Trente minutes définissent ici la charge de la première campagne, pas la durée que le
produit promet de supporter.

### Erreurs et pertes microphone

Tester séparément, lorsque la plateforme permet de provoquer le scénario :

- permission refusée au premier lancement ;
- autorisation accordée après un refus ;
- passage en arrière-plan puis retour ;
- verrouillage puis déverrouillage de l'appareil ;
- interruption ou désactivation du périphérique d'entrée ;
- changement de périphérique ou de route audio si disponible ;
- rechargement et relance après une erreur.

- **Mesure :** erreur classée, segments perdus, état visible, récupération automatique
  ou manuelle et délai de récupération.
- **Départ :** action provoquant l'interruption.
- **Arrivée :** reprise d'une capture valide ou constat d'impossibilité de continuer.
- **Unité :** événements, segments et millisecondes.
- **Données :** type d'action, exception avec nom et message, états de la piste et de
  `MediaRecorder`, information affichée, action de récupération et résultat.
- **Verdict :** selon la politique de récupération et d'information utilisateur qui
  sera validée ; non concluant si le scénario n'est pas reproductible. Le comportement
  actuel, limité à la console, doit être rapporté comme tel et non comme une gestion
  utilisateur validée.

## Consommation, chauffe et batterie

Sur chaque appareil mobile, comparer deux exécutions de trente minutes dans les mêmes
conditions : application ouverte sans session audio, puis session prolongée. Garder
la luminosité, le réseau, le volume, la température ambiante et l'alimentation
identiques. L'appareil reste débranché pendant la mesure de batterie.

- **Mesure :** variation de batterie, température de surface si mesurable, alertes
  thermiques et ressources exposées par les outils de la plateforme.
- **Départ :** juste avant l'exécution témoin ou audio.
- **Arrivée :** fin des trente minutes.
- **Unité :** points de batterie, degrés Celsius si un thermomètre est disponible,
  observations thermiques et métriques CPU ou mémoire disponibles.
- **Données :** valeurs initiales, intermédiaires et finales, conditions, tâches de
  fond connues et incidents.
- **Verdict :** succès si l'écart avec le témoin respecte la tolérance relative
  validée ; échec sinon ; non concluant si une tâche de fond, une recharge, une
  variation de température ou la granularité de la jauge invalide la comparaison.

Une appréciation « froid », « tiède » ou « chaud » peut être conservée comme
observation, mais ne remplace pas une mesure de température et ne suffit pas seule à
qualifier la chauffe.

## Comparaison des plateformes et du mode installé

Exécuter le même script et conserver les mêmes identifiants de tentatives sur chaque
plateforme. Comparer les mesures brutes et les distributions ; ne pas fusionner les
résultats iPad, iPhone et desktop dans un taux unique.

- **Succès :** chaque plateforme déclarée obligatoire respecte les seuils validés.
- **Échec :** au moins une plateforme obligatoire ne les respecte pas.
- **Non concluant :** plateforme, version, condition obligatoire ou volume de données
  manquant.

Lorsque l'application deviendra réellement installable, exécuter sur le même iPad et
le même iPhone une paire navigateur/mode installé. Comparer :

- demande et persistance de la permission microphone ;
- capture et reconnaissance ;
- première ouverture et ouvertures suivantes ;
- passage en arrière-plan, retour, verrouillage et relance ;
- latence, stabilité, consommation et erreurs.

L'absence actuelle d'un artefact installable donne le résultat « non mesurable » pour
ce volet. Elle ne prouve ni compatibilité ni incompatibilité PWA.

## Données à conserver

### Exécution

- identifiant de campagne et d'exécution ;
- version du schéma de données ;
- SHA Git, build et date ;
- appareil, OS, navigateur, versions et mode de lancement ;
- conditions matérielles, acoustiques et énergétiques ;
- ordre du corpus et paramètres audio.

### Tentative

- identifiant, stimulus prévu et vérité terrain ;
- accord et notes attendus ;
- timestamps et durées de chaque étape ;
- blob, codec, taille et durée audio ;
- RMS, seuil et décision de poursuivre ;
- événements MIDI et amplitudes ;
- notes avant et après filtrage ;
- première décision, décision ultérieure et latence visible ;
- erreur, état du microphone et récupération.

### Session

- début, fin et raison de fin ;
- effectifs de tentatives et résultats ;
- erreurs et pertes ;
- résumés de latence sans supprimer les données brutes ;
- ressources, batterie et température disponibles.

Les enregistrements audio ou vidéo ne sont conservés que s'ils sont nécessaires à la
vérité terrain et avec l'accord des participants. Les métadonnées doivent rester
exploitables sans rendre ces médias obligatoires pour toutes les tentatives.

## Forme des futurs seuils

Après la campagne A, les options raisonnables seront :

1. un seuil identique sur toutes les plateformes, simple à expliquer mais susceptible
   de masquer la cause d'un échec ;
2. des seuils différents par plateforme, plus permissifs mais produisant une
   expérience incohérente ;
3. des seuils produit communs pour la précision et la latence totale, complétés par
   des budgets diagnostiques par étape et des comparaisons relatives pour la
   consommation.

La recommandation est l'option 3 : l'élève doit recevoir un niveau de service commun
sur les plateformes retenues, tandis que les diagnostics peuvent expliquer où le
temps ou l'énergie sont consommés. Les valeurs elles-mêmes ne seront inscrites
qu'après mesure et validation explicite.
