# TD – Application Conteneurisée

## 1. Présentation

Ce projet consiste à construire une application complète conteneurisée avec trois services :

1. **API** : Node.js (Express.js) exposant deux routes :
   - `/status` : indique si l’API fonctionne.
   - `/items` : renvoie la liste des items stockés dans la base de données.
2. **Base de données** : PostgreSQL, initialisée automatiquement au démarrage et persistante via un volume Docker.
3. **Frontend** : application React compilée et servie via Nginx. Elle affiche la liste des items et l’état de l’API.

L’objectif était de mettre en pratique Docker, Docker Compose, et les bonnes pratiques de conteneurisation.

---

## 2. Architecture

```
┌─────────┐        ┌─────────┐        ┌─────────┐
│  Front  │ <----> │   API   │ <----> │  DB     │
│ (React) │        │(Node.js)│        │Postgres │
└─────────┘        └─────────┘        └─────────┘
```

- Le **frontend** interroge l’API via fetch pour afficher les items et le statut.  
- L’**API** communique avec PostgreSQL via les variables d’environnement définies dans Compose.  
- La **base** est initialisée automatiquement à partir du fichier `init.sql`.

---

## 3. Commandes clés

### Build et déploiement via Docker Compose

```bash
docker compose up -d --build
```

### Automatisation avec le script `deploy.sh`

```bash
./deploy.sh
```

- Construit les images API et frontend  
- Vérifie la configuration Compose  
- Déploie les conteneurs  
- Option de réinitialiser la base de données

---

## 4. Bonnes pratiques suivies

- **Dockerfiles multi-étapes** pour réduire la taille des images.  
- **Images légères** : `node:alpine` pour l’API, `nginx:alpine` pour le frontend.  
- **Variables d’environnement externalisées** pour l’API et le frontend.  
- **Volumes Docker** pour persistance de la base de données.  
- **Utilisateur non-root** pour l’API et le frontend.  
- **Healthchecks** configurés pour vérifier que la DB, l’API et le frontend sont prêts.  
- **UI frontend propre et centrée**, bouton pour rafraîchir les données et affichage du statut de l’API.

---

## 5. Difficultés rencontrées

- **Problèmes de CORS** : Le frontend et l’API étant sur des ports différents, il a fallu configurer l’API pour autoriser les requêtes provenant du frontend. Sans cette configuration, les fetch échouaient systématiquement.
- **Persistance et réinitialisation de la base de données** : Lorsqu’un volume Docker est utilisé pour PostgreSQL, les modifications du fichier init.sql ne sont pas appliquées si le volume existe déjà. Il a donc fallu comprendre comment gérer le volume pour réinitialiser la base et charger les nouvelles données.

---

## 6. Améliorations possibles

- Automatisation plus avancée avec CI/CD (GitHub Actions ou GitLab CI).  
- Mise en place d’un **reverse proxy Nginx** pour servir front + API sur le même domaine.  
- Sécurité plus poussée : `cap_drop`, filesystem en lecture seule complet, scan automatique des images.  
- Affichage temps réel et pagination pour les items dans le frontend.

---

## 7. Structure du dépôt

```
app-td/
├─ api/
│  ├─ server.js
│  ├─ package.json
│  └─ Dockerfile
├─ front/
│  ├─ src/
│  │  └─ App.jsx
│  ├─ package.json
│  ├─ Dockerfile
│  └─ nginx.conf
├─ db/
│  └─ init.sql
├─ docker-compose.yml
└─ deploy.sh
```

---

## 8. Accès aux services

- **Frontend** : [http://localhost:8080](http://localhost:8080)  
- **API** : [http://localhost:3000/status](http://localhost:3000/status)  

---

## 9. Conclusion

Le TD a permis de mettre en pratique :

- La conteneurisation multi-services (API, base, frontend)  
- La persistance et orchestration via Docker Compose  
- La sécurisation minimale des conteneurs  
- L’automatisation simple du build et du déploiement  

Le projet est fonctionnel, sécurisé au minimum, et facilement extensible pour un vrai environnement de production.