

var snakeTable = document.querySelector(".snakeTable"); // initialise variable + querySelector() retourne le premier Element dans le document correspondant au sélecteur
var boxes = document.getElementsByClassName("box"); //initialise variaible + getElementsbyCLassName() retourne une liste d'élements au nom spécifique (ici il récupere tout les éléments avec class=box)
var modul = document.querySelector(".modul"); //initialise variable + querySelector
var start = document.querySelector(".start"); //initialise variable + querySelector

var table = {  //initialise variable table et on spécifie la  taille des champs de texte avec rowsCols et la taille des "carrés" avec les boxes
    rowsCols: 21,
    boxes : 21*21
};

var snake = { //initialise variable du serpent , sa position/diréction/intervalle/score etc..
    direction: "right",
    position: [[6,10], [7,10], [8,10], [9,10], [10,10]], //crochets utilisés pour obtenir les propriétés d'un Objet ou les éléments d'un tableau
    interval: 200,
    food: 0,
    score: 0,
    final: 0,
    time: 0,
    canTurn: 0,
    init:function() { //initialise une fonction pour le serpent
        snake.direction= "right";
        snake.position= [[6,10], [7,10], [8,10], [9,10], [10,10]];
        snake.interval= 200;
        snake.food= 0;
        snake.score= 0;
        snake.final = 0;
        snake.time = 0;
        snake.canTurn= 0;
        snakeTable.innerHTML = ""; // propriété de tout élément HTML qui désigne le contenu qui se trouve entre la balise entrante et la balise fermante. On l'utilise pour lire et insérer dynamiquement un contenu dans une page.
        tableCreation();
    }

};

//Maintenant , on va initialiser le jeu : 

snake.init();

start.addEventListener("click", startSnake); //attache une fonction à appeler chaque fois que l'évènement spécifié est envoyé à la cible.

document.addEventListener("keydown", function(e) { //le e est l'argument , l'évènement qu'on nomme e 
    if (e.keyCode === 13 && snake.time === 0) { //si le code du keydown est a 13h et que le snake time est à 0 
    startSnake(); //lancer le snake
    }
  
});

//on va programmer le lancement du jeu

function startSnake() {
    modul.classList.add("hidden");

    snake.time = 1;
    renderSnake();
    randomFood();

    setInt = setInterval(function() {
        move();

      },   snake.interval);
   
}

    


//on va maintenant programmer la fin du jeu

function stopp() {
    clearInterval(setInt);               //on efface le compteur en utilisant le clear interval avec la méthode setinterval
    snake.final = snake.score;
    start.querySelector("span").innerHTML = snake.final + " points " ; 
    setTimeout(function() {             // permet de définir un timer qui éxecute une fonction après le délai donné
        start.querySelector("span").innerHTML = "Jouer";
    }, 1500);
    snake.init();
    modul.classList.remove("hidden");   //on remove la classlist("hidden") qu'on a mise plus haut
}

//on va faire la fonction pour faire bouger le serpent avec les flèches du clavier en attendant le joystick

function move() {
  // check if move allowed & then eat food
  hitFood();
  hitBorder();
  hitSnake();
  // actually move the snake
  updatePositions();
  renderSnake();
  document.addEventListener("keydown", turn);
  snake.canTurn = 1;
}

function updatePositions() {
    //on va remove l'ancienne position du serpent
    boxes[snake.position[0][0] + snake.position[0][1] * table.rowsCols].classList.remove("snake");
    snake.position.shift();        //shift permet d'enlever le premier élément d'un tableau et renvoyer cet élément.
    //on ajoute maintenant la nouvelle partie du serpent
    
    var head = snake.position[snake.position.length - 1];    //on initialise la variable de la tête du snake.
    switch (snake.direction) {                              //switch évalue une expression et, selon le résultat obtenu et le cas associé, exécute les instructions correspondantes.
        case "left":
            snake.position.push([head[0] - 1, head[1]]);
            break;                                         // L’instruction break est exécutée après la fin d’un case pour sortir du switch
        case "up": 
            snake.position.push([head[0] , head[1] - 1]);
            break;
        case "right":
            snake.position.push([head[0] + 1, head[1]]);
            break;
        case "down":
            snake.position.push([head[0], head[1] + 1]);  //Le Case est une structure conditionnelle en Java qui permet de sélectionner un ensemble d’instructions à exécuter en fonction de la valeur d’une variable. Il s’agit en fait d’une instruction très similaire à l’instruction if de Java, à la différence qu’il offre une syntaxe plus comprimée qui permet d’exprimer facilement plusieurs conditions
            break;
        default:
            console.log("pas de direction");             //affiche un message dans la console Web


    }
}

//on va maintenant programmer les limites du snake avec les bordures et ce qui se passe lorsqu'il y a contact entre le serpent et la bordure du jeu

function hitBorder() {  //on définit la fonction de la bordure
    var headPos = snake.position.length-1 ; //on définit la variable de la position de la tête du serpent
    //on fait maintenant les limites
    if (((snake.position[headPos][0] === table.rowsCols-1) && (snake.direction === "right")) || ((snake.position[headPos][0] === 0) && (snake.direction === "left")) || ((snake.position[headPos][1] === table.rowsCols-1) && (snake.direction === "down")) ||  ((snake.position[headPos][1] === 0) && (snake.direction === "up"))) {
    
    
        console.log("bordure touchée"); //affiche un message dans la console web quand une bourdure est touchée.
        stopp();
    }

}

//on va ensuite programmer le contact du serpent sur lui même

function hitSnake() {
    var headPos = snake.position.length-1;
    for (var i =0; i<headPos; i++) { //++ est l'incrémentation , donc pour i=0 , quand i est inférieur a la position de la tête du serpent , on ajoute un.
        if (snake.position[headPos].toString() === snake.position[i].toString()) {  //la méthode toString() renvoie une chaîne de caractère représentant l'objet
            
            stopp();

        }
    } 
}

//on va maintenant établir le contact entre le serpent et la nourriture qu'il doit manger pour augmenter son score.

function hitFood() {
  var head = snake.position[snake.position.length-1];
  var tail = snake.position[0];
  if (head.toString() === foodPos.toString()) {
    boxes[random].classList.remove("food");
    snake.position.unshift(tail);
    randomFood();
    snake.food++;
    snake.score += snake.food;
    scoreElt.innerHTML = snake.score + " pts";
    // increase speed
    clearInterval(setInt);
    snake.interval = snake.interval - snake.interval/10;
    setInt = setInterval(function() {
      move();
    }, snake.interval);
  }
}

//Maintenant , on va programmer l'apparition de nourriture de manire aléatoire

function randomFood() {
  var randomX = Math.floor(Math.random() * table.rowsCols);
  var randomY = Math.floor(Math.random() * table.rowsCols);
  random = randomX + randomY * table.rowsCols;
  // picks another foodPos if food pops on snake
  while (boxes[random].classList.contains("snake")) {
    randomX = Math.floor(Math.random() * table.rowsCols);
    randomY = Math.floor(Math.random() * table.rowsCols);
    random = randomX + randomY * table.rowsCols;
  }  
  boxes[random].classList.add("food");
  foodPos = [randomX, randomY];
}


//ce qui va suivre va permettre de lire la position du serpent et de donner son rendu

function renderSnake() { //on créer la fonction du rendu du serpent
    for (var i=0; i<snake.position.length; i++) { //pour la variable i=0 , si i est inférieur à la position du serpent en longueur sur le tableau , on incrémente i
        boxes[snake.position[i][0] + snake.position[i][1] * table.rowsCols].classList.add("snake");

    }

}

//on va maintenant gérer les touches pour tourner

function turn(e) {
  var h = document.querySelector(".h");
  var b = document.querySelector(".b");
  var g = document.querySelector(".g");
  var d = document.querySelector(".d");
    if(snake.canTurn) {
        switch(e.keyCode) {
            case 13:
                break;
            case 37: //gauche
                if (snake.direction === "right") return;
                snake.direction = "left";
                break;
            case 38: //haut
                if(snake.direction === "down") return;
                snake.direction = "up";
                break;
            case 39: //droite
                 if(snake.direction === "left") return;
                 snake.direction = "right";
                 break;
            case 40: //bas
                 if(snake.direction === "up") return;
                 snake.direction = "down";
                 break;
            default:
                console.log("mauvaise clé");

        
        }
        snake.canTurn = 0;
    }
}

//on va créer la table (tableau)

function tableCreation() {
    
    if(snakeTable.innerHTML === "") {
        //tableau principal
    for (var i = 0; i<table.boxes; i++) {
        var divElt = document.createElement("div"); //Dans un document HTML, la méthode document.createElement() crée un élément HTML du type spécifié par tagName (tagName = Une chaîne de caractères (DOMString) spécifiant le type d’élément à créer)
        divElt.classList.add("box");
        snakeTable.appendChild(divElt); //ajoute un nœud à la fin de la liste des enfants d'un nœud parent spécifié. Si l'enfant donné est une référence à un nœud existant dans le document, appendChild() le déplace  de sa position actuelle vers une nouvelle position
        
    }
    //barre d'état
    var statusElt = document.createElement("div");
    statusElt.classList.add("status");
    snakeTable.appendChild(statusElt);
    scoreElt = document.createElement("span");
    scoreElt.classList.add("score");
    scoreElt.innerHTML = snake.score + " pts";
    statusElt.appendChild(scoreElt);

}

//swipe shocase

$("document").ready(function() { //Une page ne peut pas être manipulée en toute sécurité tant que le document n'est pas "prêt". jQuery détecte cet état de préparation pour vous. Le code inclus dans $( document ).ready() ne s'exécutera que lorsque la page Document Object Model (DOM) sera prête pour l'exécution du code JavaScript. 
    $("body") //$('body') sélectionne l'élément par le nom de la balise
    .swipeDetector() //un flutter pour détecter les mouvements vers le haut bas gauche et droite
    .on("swipeLeft.sd swipeRight.sd swipeUp.sd swipeDown.sd", function(event) { //Attache une fonction de gestionnaire d'événements pour un ou plusieurs événements aux éléments sélectionnés
        if(event.type === "swipeLeft") {
            if(snake.direction === "right") return;
            snake.direction = "left";
        }else if (event.type ==="swipeRight") {
            if(snake.direction === "left") return;
            snake.direction = "right";
        }else if (event.type === "swipeUp") {
            if (snake.direction === "down") return;
        }else if (event.type === "swipeDown") {
            if(snake.direction === "up") return;
            snake.direction = "down";

        }
        snake.canTurn=0;
    });
});

//fonction swipe

(function($) {
    $.fn.swipeDetector = function(options) {
      // States: 0 - no swipe, 1 - swipe started, 2 - swipe released
      var swipeState = 0;
      // Coordinates when swipe started
      var startX = 0;
      var startY = 0;
      // Distance of swipe
      var pixelOffsetX = 0;
      var pixelOffsetY = 0;
      // Target element which should detect swipes.
      var swipeTarget = this;
      var defaultSettings = {
        // Amount of pixels, when swipe don't count.
        swipeThreshold: 30,
        // Flag that indicates that plugin should react only on touch events.
        // Not on mouse events too.
        useOnlyTouch: true
      };
  
      // Initializer
      (function init() {
        options = $.extend(defaultSettings, options);
        // Support touch and mouse as well.
        swipeTarget.on("mousedown touchstart", swipeStart);
        $("html").on("mouseup touchend", swipeEnd);
        $("html").on("mousemove touchmove", swiping);
      })();
  
      function swipeStart(event) {
        if (options.useOnlyTouch && !event.originalEvent.touches) return;
  
        if (event.originalEvent.touches) event = event.originalEvent.touches[0];
  
        if (swipeState === 0) {
          swipeState = 1;
          startX = event.clientX;
          startY = event.clientY;
        }
      }
  
      function swipeEnd(event) {
        if (swipeState === 2) {
          swipeState = 0;
  
          if (
            Math.abs(pixelOffsetX) > Math.abs(pixelOffsetY) &&
            Math.abs(pixelOffsetX) > options.swipeThreshold
          ) {
            // Horizontal Swipe
            if (pixelOffsetX < 0) {
              swipeTarget.trigger($.Event("swipeLeft.sd"));
            } else {
              swipeTarget.trigger($.Event("swipeRight.sd"));
            }
          } else if (Math.abs(pixelOffsetY) > options.swipeThreshold) {
            // Vertical swipe
            if (pixelOffsetY < 0) {
              swipeTarget.trigger($.Event("swipeUp.sd"));
            } else {
              swipeTarget.trigger($.Event("swipeDown.sd"));
            }
          }
        }
      }
  
      function swiping(event) {
        // If swipe don't occuring, do nothing.
        if (swipeState !== 1) return;
  
        if (event.originalEvent.touches) {
          event = event.originalEvent.touches[0];
        }
  
        var swipeOffsetX = event.clientX - startX;
        var swipeOffsetY = event.clientY - startY;
  
        if (
          Math.abs(swipeOffsetX) > options.swipeThreshold ||
          Math.abs(swipeOffsetY) > options.swipeThreshold
        ) {
          swipeState = 2;
          pixelOffsetX = swipeOffsetX;
          pixelOffsetY = swipeOffsetY;
        }
      }
  
      return swipeTarget; // Return element available for chaining.
    };
  })(jQuery);
  
  
  
}