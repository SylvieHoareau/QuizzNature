# QuizzNature
 QuizzNature est une application de quizz sur l'environnement. Elle a été conçu pour aider les utilisateurs à tester et à améliorer leurs connaissances sur l'environnement.

## Technologies utilisées

### Frontend

L'interface utilisateur de Quizz Nature a été développé en utilisant **Android Studio**.
 
### Backend

Le backend de QuizzNature utilise **Strapi**, un CMS Headless.

## Installation

Pour installer tous les dépendances : 

```bash
npm install
```

## Fonctionnement du backend

Voici les commandes pour interagir avec l'API : 

### Questions

- **GET /api/questions** : récupère toutes les questions
- **POST /api/questions** : crée une nouvelle question
- **UPDATE /api/questions/:id** : met à jour une question existante avec l'ID spécifié
- **DELETE /api/questions/:id** : supprime une question existante avec l'ID spécifié

### Quizz

- **GET /api/quizzes** : récupère tous les quizz
- **POST /api/quizzes** : crée un nouveau quizz
- **UPDATE /api/quizzes/:id** : met à jour un quizz existant avec l'ID spécifié
- **DELETE /api/quizzes/:id** : supprime un quizz existant avec l'ID spécifié

## Licence

Ce projet est sous licence GNU GPL 3.0.
