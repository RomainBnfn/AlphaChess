# Alphachess

Le projet a été réalisé avec Angular, NodeJs (Socket.io) et Firebase (pour l'Authentification). Une démo publiée est disponible sur [en ligne](http://alphachesson.000webhostapp.com/), en revanche elle n'est pas utilisable car l'abonnement du serveur NodeJS a été interrompu pour raisons budgétaire. (le 01/09/2021) 

## Contexte

Le 23 octobre 2020, Netflix met en ligne la série The Queen's Gambit (Le Jeu de la dame), une série au succès fulgurant ayant pour thème le jeu d’échecs. Cette œuvre a eu un tel impact que ce dernier est devenu très tendance (à en croire l’augmentation du nombre de ventes d’échiquiers). 

En revanche, posséder un plateau de jeu et connaître les règles de base ne suffisent pas à atteindre un niveau important, ni à comprendre toutes les stratégies mises en place durant une partie. (du moins pour le commun des humains) D’une part, les cours en ligne ou en livre sont parfois longs et lourds pour un joueur lambda qui n’a pas forcément envie de passer 2 heures sur une théorie sans pratiquer. D’autre part, une autre alternative serait de participer à des cours/ateliers, mais là encore cette solution présente quelques inconvénients : les autres professeurs ou joueurs ne sont pas disponibles 24h/24 et les professeurs ne peuvent pas se consacrer à plein temps à chacun de leurs élèves.

Initialement, le projet AlphaChess avait pour objectif de pallier ces problèmes en proposant une solution permettant d’apprendre le jeu et d’améliorer son niveau mais également de jouer une partie avec un autre joueur en temps réel. Cette solution devait être composée d’une application web permettant de présenter un plateau de jeu virtuel aux joueurs.
Suite à l’évolution du cahier des charges au cours du projet, les objectifs ont été simplifiés et recentrés sur l’obtention d’un plateau de jeu en temps réel fonctionnel et sur sa publication.

## Démo
### Page d'accueil
![Home Page Image](https://github.com/RomainBnfn/AlphaChess/blob/main/images/Homepage.PNG?raw=true&=100x20)

Sur cette page il est possible de naviguer afin d'accéder aux différentes fonctionnalitées de l'application. 
### Page d'inscription
![Register Page Image](https://github.com/RomainBnfn/AlphaChess/blob/main/images/Register.PNG?raw=true)

Le formulaire d'inscription présente des messages d'erreurs en direct, et des réponses après avoir interrogé les serveurs Firebase de Google sans rafraichir la page.
### Plateau de jeu
![Chess Plate 1 Image](https://github.com/RomainBnfn/AlphaChess/blob/main/images/Plate1.PNG?raw=true) ![Chess Plate 2 with possible mooves in pink Image](https://github.com/RomainBnfn/AlphaChess/blob/main/images/Plate2.PNG?raw=true)

Ces images montrent les plateaux de jeu de l'application. Lors d'un tour en cours, il est possible de voir les coups possibles en cliquant sur les pièces. Il est possible de lancer la partie en choisissant le temps pour chacun.

## Installation
Le projet est constitué en deux parties, une partie client (ce repo GitHub) et une partie serveur ([AlphaChess Serveur](https://github.com/RomainBnfn/AlphaChessServer)). La première permet la génération de l’application graphique, et la seconde permet la communication entre les différents utilisateurs. Ces deux parties nécessitent NodeJS. 
  
Pour voir s’il est installé sur une machine, ouvrez un terminal et entrez la commande node -v. Si une version s’affiche à la ligne suivante, c’est bon, sinon il faut la télécharger sur le site de NodeJS. (https://nodejs.org/en/) 

Ensuite, il faut cloner les différentes parties du projet (soit via GitHub, soit en exportant les deux dossier “AlphaChess” et “AlphaChessServer” du zip suivant.)

Ouvrez maintenant deux terminaux : (1) qui sera pour la partie client et (2) pour la partie serveur.

• Avec (1), rendez vous dans le dossier “AlphaChess” que vous venez de cloner (avec la commande cd “chemin”). Installez les différents modules nécessaires avec la commande npm install. Attendez la fin de l’installation des différents modules. Puis utilisez la commande ng serve pour démarrer l’application client en local. (Si Angular n’est pas installé et que vous avez une erreur, utilisez la commande npm install angular). Désormais, l’application est lancée et est accessible à l’adresse http://localhost:4200/ (sur un navigateur).

• Avec (2), rendez vous dans le dossier “AlphaChessServer”, puis de même, lancez la commande npm install. Attendez que l’installation se complète, puis lancez la commande node main.js. Un message indiquant que le serveur est lancé et écoute un certain port s’affiche, le serveur est prêt, vous pouvez utiliser l’application.

→ Pour connecter deux utilisateurs simultanément (pour s’auto-affronter, afin de tester les différentes fonctionnalités), il suffit d’avoir deux navigateurs différents, ou d’ouvrir un navigateur en navigation privée et l’autre non. 
→ De base, l’application client est programmée pour se connecter au serveur NodeJS hébergée en ligne. Si vous souhaitez tout tester en local, il est nécessaire de modifier l'adresse du serveur à laquelle l’application doit se connecter, via le fichier AlphaChess/src/environments/environnement.ts. En l’ouvrant, modifiez la ligne 7 “ws_url: 'http://beta.projectheberg.fr:20247/',” par “ws_url: 'http://localhost:3000/',”

# Architecture de l'application 
## Architecture générale
Comme vu précédemment, le projet est séparé en deux parties : une cliente et une serveur. La première permet d’afficher aux utilisateurs leur application sur leur navigateur. La deuxième partie, le serveur, est unique et écoute/communique avec les différentes applications qui s’y connectent. Le serveur communique à partir d’une adresse (ip) et d’un port, que l’application doit connaître afin de s’y connecter (informations présentes dans le code). 

![Explation schema of connexion between users](https://github.com/RomainBnfn/AlphaChess/blob/main/images/SocketIo1.PNG?raw=true)

## Fonctionnement de la communication serveur/client
Comme indiqué dans le schéma, les applications angular sont capables de communiquer avec le serveur (et inversement) grâce à Socket.io. En effet, en connaissant l’adresse du serveur (partie précedente), socket.io permet d’écouter et d’envoyer des messages d’une application au serveur. 

Lorsqu’un utilisateur se connecte, l’application envoie un message au serveur, qui stocke ses informations (afin d’avoir accès à la liste des utilisateurs en ligne en permanence).
  
Par la suite, les applications angular écoutent certains messages que le serveur pourrait leur envoyer (nouvelle connexion, l’adversaire joue un tour, l’adversaire abandonne, …). De même, le serveur écoute ce que les différents utilisateurs pourraient envoyer, et en fonction de qui est reçu, réagit. Il peut, par exemple, renvoyer le message à l’adversaire (lors d’un tour de jeu).
 
La structure d’un message est : 
- Un nom (string) permettant d’identifier le type de message
- Un objet de data (any) comportant les informations associées au message
- 
![Explation schema of connexion between users during time](https://github.com/RomainBnfn/AlphaChess/blob/main/images/SocketIo2.PNG?raw=true)

Le schéma ci-dessus représente le fonctionnement des communications clients/serveur entre deux utilisateurs lorsque ces derniers se connectent. Les flèches horizontales représentent le temps, les flèches verticales les messages envoyés (Le bout de la flèche indique le destinataire). (Ce n’est qu’un exemple, pour voir visuellement comment la communication fonctionne)

Comme vu précédemment, il existe différents types de messages que les utilisateurs et le serveur peuvent s’envoyer. Voici la liste des messages:
- initConnexion : **\[Client → Serveur]** Lorsqu’un utilisateur se connecte
- listOpponent : **\[Serveur → Client]** Le serveur envoie la liste de tous les utilisateurs déjà connectés
- newConnexion : **\[Serveur → Client]** Le serveur envoie le nouvel utilisateur 
- newDisconnexion : **\[Serveur → Client]** Le serveur envoie l’utilisateur qui vient de se déconnecter
- changePseudo : **\[Client→ Serveur → Client]** Lors d’un changement de pseudo
- demandeDuel : **\[Client→ Serveur → Client]** Lors d’une demande de duel
- refusDuel : **\[Client→ Serveur → Client]** Lors d’un refus d’une demande de duel
- acceptationDuel : **\[Client→ Serveur → Client]** Lors d’une acceptation d’une demande de duel
- startGame : **\[Serveur → Client]** Pour démarrer une partie
- turn : **\[Client→ Serveur → Client]** Lorsqu’un tour de jeu est joué
- giveup : **\[Client→ Serveur → Client]** Lorsqu’un joueur abandonne
- timeout : **\[Client→ Serveur → Client]** Lorsqu’un joueur n’a plus de temps
- close : **\[Serveur → Client]** : Pour forcer la connexion 
- disconnect : **\[Client → Serveur]** : Quand l’utilisateur se déconnecte

Côté serveur, socket.io fonctionne grâce au fichier main.js (voir 5.2.), côté utilisateur grâce au serveur socket-io-service (dans le dossier service). (voir 5.3.).

