//getting the dom elements
const qwerty = document.getElementById("qwerty");
const phraseId = document.getElementById("phrase");
const start = document.querySelector(".start");
const heading =document.getElementsByClassName("title")[0];
const overlay = document.getElementById("overlay");
let missed = 0;
const phrases =["caesar salad", "dark horse", "darkest hour", "fair play", "game is up"];


//hide the strat screen display;
overlay.addEventListener("click", (e)=>{
    if(event.target.tagName === "A")
    start.style.display = "none";
});

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

//
function checkLetter(button){
    //selecting all the elements with the classname letter
    const liItems = document.querySelectorAll(".letter");
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
        const button =event.target;
        button.classList.add("chosen");
        button.setAttribute("disabled", true);
        const text = button.textContent;;
        let check = checkLetter(text);
        if(check === null){
            missed+=1;
            const img = document.getElementsByClassName("tries");
           for(let i=0; i<img.length; i++){
               const newImg= img[i].remove();
               return newImg;
           }
             
           }
       }
       checkWin();
    }
) 

// function reset(){
//     const butt = document.getElementsByTagName("a")[0];
//    butt.textContent = "Restart"
//    butt.addEventListener("click", ()=>{
//     let lis = document.getElementById('phrase').getElementsByTagName('li');
//     while (lis.length > 0) {
//         lis[0].parentNode.removeChild(lis[0]);
//     }
//     const newPhrase = getRandomPhraseArray(phrases);
//     addPhraseToDisplay(newPhrase);
//     missed=0;
//    let button = document.getElementsByClassName("chosen");
//     console.log(button);
//         button.className = "";
      
//         button.removeAttribute('disabled');

//    })
// }
//checkwinFunction
function checkWin(){
    const liItemsLetter = document.querySelectorAll(".letter");
    const liItemsShow = document.getElementsByClassName("show");
    if(liItemsLetter.length === liItemsShow.length){
        start.className = "win";
        heading.textContent = "Player Won";
        start.style.display ="flex";
        for(let i =0; i<liItemsLetter.length; i++){
            liItemsLetter[i].classList.remove("animated", "pulse");
            }

       
    }
    else if(missed > 4){
        start.className = "lose";
        heading.textContent = "Player lose";
        start.style.display ="flex";
        for(let i =0; i<liItemsLetter.length; i++){
        liItemsLetter[i].classList.remove("animated", "pulse");
        }
        reset();
       
    }
 

}