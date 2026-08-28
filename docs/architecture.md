# Architecture

## Vue d'ensemble

Le dépôt contient une application cliente autonome dans `apps/accord-trainer`. Elle
est construite avec React, TypeScript et Vite. Il n'existe actuellement ni backend,
ni API distante, ni base de données.

## Composants

- `src/App.tsx` orchestre les écrans, l'état de session, la boucle audio et l'historique.
- `src/game/` contient le catalogue d'accords, le tirage et la validation.
- `src/audio/recordAudio.ts` capture des segments via `getUserMedia` et `MediaRecorder`.
- `src/audio/basicPitchEngine.ts` décode, rééchantillonne à 22 050 Hz et exécute Basic
  Pitch dans le navigateur.
- `public/basic-pitch-model/` contient le modèle chargé à l'exécution.
- `localStorage` conserve les 20 derniers résultats sous la clé
  `accord-trainer-history`.

## Flux d'une tentative

1. React déclenche l'enregistrement d'un segment de deux secondes.
2. Un niveau RMS est calculé ; le segment est ignoré sous le seuil manuel.
3. Basic Pitch produit des événements de notes.
4. Le code conserve au plus trois classes de hauteur uniques dépassant le seuil
   d'amplitude.
5. Le validateur compare l'ensemble détecté à l'ensemble attendu.
6. La boucle recommence tant que la partie est active.

## Limites actuelles

- L'orchestration principale est concentrée dans `App.tsx`.
- Chaque segment ouvre des contextes audio et un nouveau flux microphone ; la latence,
  le coût CPU et le comportement mobile ne sont pas mesurés.
- Les erreurs audio sont journalisées, sans état d'erreur dédié pour l'utilisateur.
- Le bundle de production inclut actuellement un chunk JavaScript volumineux.
- Aucune architecture PWA n'est active malgré la dépendance installée.

Les décisions du moteur et de la stratégie de distribution mobile sont documentées dans
[`decisions/`](decisions/).
