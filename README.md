# QuizzNature
 QuizzNature est une application de quizz sur l'environnement. Elle a été conçu pour aider les utilisateurs à tester et à améliorer leurs connaissances sur l'environnement. Le code suivant présente l'API avec Strapi.

## Technologies utilisées

### Backend

Le backend de QuizzNature utilise **Strapi**, un CMS Headless.

### Frontend

Vous pouvez utiliser la technologie de votre choix pour rattacher l'API à une interface utilisateur.
Nous vous proposons un frontend en Vanilla pour tester l'application.

## Installation

Pour installer tous les dépendances : 

```bash
npm install
```

Pour démarrer le projet : 

```bash
cd QuizzNature/backend
```

```bash
npm run develop
```

## Fonctionnement du backend

Voici les commandes pour interagir avec l'API : 

### Questions

- **GET /api/questions** : récupère toutes les questions
- **POST /api/questions** : crée une nouvelle question
- **UPDATE /api/questions/:id** : met à jour une question existante avec l'ID spécifié
- **DELETE /api/questions/:id** : supprime une question existante avec l'ID spécifié

### Catégories

- **GET /api/categories** : récupère toutes les catégories
- **POST /api/categories** : crée une nouvelle catégorie
- **UPDATE /api/categories/:id** : met à jour une catégorie existante avec l'ID spécifié
- **DELETE /api/categories/:id** : supprime une catégorie existante avec l'ID spécifié

### Quizz

- **GET /api/quizzes** : récupère tous les quizz
- **POST /api/quizzes** : crée un nouveau quizz
- **UPDATE /api/quizzes/:id** : met à jour un quizz existant avec l'ID spécifié
- **DELETE /api/quizzes/:id** : supprime un quizz existant avec l'ID spécifié

## Licence

Ce projet est sous licence GNU GPL 3.0.
