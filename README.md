Vincent ARNONE & Sophie ROMANO

# Projet DevMobile - M2 GI 2020-2021
## Application mobile TODO Liste

![checklist](/src/assets/checklist.jpg "image checklist")

### Fonctionnalités implémentées
* Création d'un compte avec adresse email
* Connexion par adresse email
* Création d'une nouvelle liste
* Suppression d'une liste (slide à gauche)
* Ajout d'un collaborateur à une liste (slide à gauche)
* Ajout d'un TODO à une liste
* Suppression d'un TODO
* Cocher/décocher un TODO
* Déconnexion
* Bouton retour page précédente
* Ajout d'une règle Firestore

### IHM
* Changement couleur du thème (respect couleurs thème clair/sombre + couleurs basiques IHM, ex: rouge = fermer/erreur, vert = valider/succès)
* Affichage permanent de la section "Créer un compte" sur la page d'accueil
* Affichage du titre de chaque page
* Affichage du nom de la liste dans la liste
* Affichage du nom de l'application dans l'onglet web
* Modification de l'icône de l'application

### Règles Firebase
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /lists/{listId} {
      allow read: if
          request.auth.token.email in resource.data.owners;
      allow write: if
      		request.auth!=null;
    }
    match /lists/{listId}/todos/{id}{
    	allow read, write: if
          request.auth!=null;
    }
  }
}
```

### Fonctionnalités envisageables
* Tri des TODO par ordre d'ajout
* Réorganisation de l'ordre des TODO
* Passage en bas de liste d'un TODO fait
* Réorganisation de l'ordre des listes
* Modification du titre d'une liste
* Modification d'un TODO
* Ajouter une photo dans un TODO
* Gestion des collaborateurs dans une liste
* Ajout de la localisation
* Rappels
* Notifications (ajout d'un collaborateur par exemple)
* Authentification Google
* Modification de la couleur d'une liste
* Archivage d'une liste
* Epingler une liste
