# Blogifey 

## Descriere
Blogifey este o aplicatie tip blog, in care utilizatorii au posibilitatea de a posta un text personal, fara o categorie din care sa faca parte anume si sa ataseze o poza la acesta. Acestia pot primi like-uri pentru postare dar si comentarii. De asemenea, pot sterge postarea facuta (doar cele proprii) dar si comentariile oferite. 


## Microservicii 

- Posts
Rute: 
    - /posts (post)
    - /posts/:postId (delete)
    - /posts (get)

- Comments 
Rute: 
    - /comments (post)
    - /comments/:postId (get)
    - /comments/:commentId (delete)

- Likes 
Rute: 
    - /likes (post)
    - /likes/:postId (get)
    - /likes/:userId/:postId (delete)
- Users 
Rute: 
    - /register (post)
    - /login (get)
    - /users (get)

Fiecare componenta are baza de date proprie Mongo DB. 

## Comanda rulare 

docker-compose up -d --build 




