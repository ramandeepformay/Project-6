//getting the dom elements
const qwerty = document.getElementById("qwerty");
const phraseId = document.getElementById("phrase");
const start = document.querySelector(".start");
const heading =document.getElementsByClassName("title")[0];
const overlay = document.getElementById("overlay");
let liItemsShow = document.getElementsByClassName("show");
let missed = 0;
const phrases =["caesar salad", "dark horse", "darkest hour", "fair play", "game is up"];

//hide the strat screen display;
overlay.addEventListener("click", (e)=>{
    if(event.target.tagName === "A")
    start.style.display = "none";
});

//remove child function
function removeChild(list){
   list.parentNode.removeChild(list);
}

// generate single letter from the phrases randomly
function getRandomPhraseArray(arr){
    const splitChar =[];
    //randomly select the phrase
    let charPhrase = arr[Math.floor(Math.random()*arr.length)];
    if(charPhrase){
        for(let i =0; i<charPhrase.length; i++){
            //pushing the elemnts 
            splitChar.push(charPhrase[i]);
        }
    }
    return splitChar;
}

//adding all the characters in the list item and attaching it to ul item 
 function addPhraseToDisplay(arr){
    for(let i = 0; i<arr.length; i++){
        const li =document.createElement("li");
        li.textContent = arr[i];
        phraseId.appendChild(li);
        //checking for the letter with no space 
        // adding letter with class name letter 
            if(li.textContent !== " "){
                li.classList.add("letter");     
            }
        } 
    return arr;
}
//saving random phrase in phrase array
const phraseArray = getRandomPhraseArray(phrases);
//using phrase array to call phrase to display which adds class letter
const liClass = addPhraseToDisplay(phraseArray);

//checkletter function
function checkLetter(button){
    //selecting all the elements with the classname letter
   let liItems = document.querySelectorAll(".letter");
    let match = null;
    //checking for the li items with text content and matching that to phrase letters
    for(let i =0; i<liItems.length; i++){
        if(liItems[i].textContent === button){
            //adding animation to the li elemnts which will show in the phrase
            liItems[i].classList.add("show", "animated", "pulse");
            match = document.getElementsByClassName("show");
        }
    }
    return match;
}

///query keyboard listener
qwerty.addEventListener("click", (e)=>{
    if(event.target.tagName==="BUTTON" && event.target.className !== "chosen"){
        //disabling button and adding class chosen
        const button =event.target;
        button.classList.add("chosen");
        button.setAttribute("disabled", true);
        const text = button.textContent;
        //calling checkletter function with text arg
        let check = checkLetter(text);
        //comparing check with null 
        if(check === null){
            //increasing missed counter
            missed+=1;
            //selecting all the img elements
            let li = document.querySelectorAll("img");
            if(li.length>0){
                //removing child which is img 
                 //calling removeChild function
                removeChild(li[0]);
            }
        }
        //calling checkwin ()
       checkWin();
    }
}) 
   
//checkwinFunction
//sub fucntion status
function status(state, text, disp){
    let liItemsLetter = document.querySelectorAll(".letter");
    start.className = state;
    heading.textContent = text;
    start.style.display =disp;
    //adding class to the li ittems with class name letter
    for(let i =0; i<liItemsLetter.length; i++){
        liItemsLetter[i].className = "";
    }  
}
//main function
function checkWin(){
    let liItemsLetter = document.querySelectorAll(".letter");
    //comparing by length
    if(liItemsLetter.length === liItemsShow.length){
        //calling status function
        status("win", "Player Won", "flex");
    }
    else if(missed > 4){
       //calling status function 
        status("lose", "Game Over", "flex");
    }
    //calling reset function
    reset();  
}

//resetting the game
function reset(){
    //selection anchor tag 
    const button = document.getElementsByTagName("a")[0];
    button.textContent = "Restart"
    //rermoving old phrase
    button.addEventListener("click", (e)=>{
        let li =  document.getElementById('phrase').getElementsByTagName('li');
        for(let i=0; li.length>i;){
            //calling removeChild function
            removeChild(li[0]);
        }
       //adding new phrase to the screen by calling the random and disp function
        const newPhrase = getRandomPhraseArray(phrases);
        addPhraseToDisplay(newPhrase);
        missed=0;

       //resetting keyboard key
       let buttonChosen = document.getElementsByClassName("chosen");
       let buttonAll = document.getElementsByTagName("button");
       //setting chosen key to nothing
        buttonChosen.className = ""; 
        for(var i=0; i<buttonAll.length; i++){
            //selecting all the buttons 
            buttonAll[i].className = ""; 
            buttonAll[i].removeAttribute('disabled');
        }
        //showing hearts   
        const tries = document.getElementsByClassName("tries");  
        //creating img element
        const img = document.createElement("img");
        const images = document.getElementsByTagName("img");
        img.setAttribute("src", "images/liveHeart.png");
        img.setAttribute("height", "35px");
        img.setAttribute("width", "30px");
        for(var i=0; i<tries.length; i++){
            tries[i].appendChild(img);
        } 
        if(images.length>4){
            for(var i=0; i<images.length-5; i++)
            //calling removeChild function
            removeChild(images[i]);
        }         
   })
}
