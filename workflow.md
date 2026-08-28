# Workflow Accordly

1. **Décider** : les choix produit ou d'architecture sont discutés et validés avant
   implémentation.
2. **Synchroniser si nécessaire** : documenter uniquement les décisions et documents
   réellement impactés ; créer un ADR seulement pour une décision structurante.
3. **Implémenter** : Codex consulte la route pertinente dans
   [`docs/README.md`](docs/README.md), puis réalise le changement minimal.
4. **Valider** : exécuter les contrôles disponibles, compléter par une vérification
   manuelle ciblée si le microphone, le responsive, l'iPad ou l'iPhone sont concernés.
5. **Relire** : vérifier le diff, les risques résiduels et la cohérence documentaire
   avant commit ou merge.

Le code prouve ce qui existe ; la documentation distingue faits, intentions et
décisions. Une conversation ne devient une mémoire durable qu'après synchronisation
dans le dépôt Git.
