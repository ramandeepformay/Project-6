const qwerty = document.getElementById("qwerty");
const phraseId = document.getElementById("phrase");
const start = document.querySelector(".btn__reset");
const missed = 0;
const phrases =["caesar salad", "dark horse", "darkest hour", "fair play", "game is up"];


//hide the strat screen display;
start.addEventListener("click", (e)=>{
    if(event.target.tagName === "A"){
        event.target.style.display = "none";
    }
});

//generate single letter from the phrases randomly
function getRandomPhraseArray(arr){
    const splitChar =[];
    //randomly select the phrase
    let charPhrase = arr[Math.floor(Math.random()*arr.length)];
    console.log(charPhrase);
    if(charPhrase){
        for(let i =0; i<charPhrase.length; i++){
            //pushing the elemnts 
            splitChar.push(charPhrase[i]);
        }
    }
    return splitChar;
}
//adding all the characters in the list item and attaching it to ul item 
const phraseArray = getRandomPhraseArray(phrases);
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
const liClass = addPhraseToDisplay(phraseArray);

function checkLetter(button){
    const liItems = phraseId.children;
    let match = null;
    for(let i =0; i<liItems.length; i++){
     if(liItems[i].textContent === button){
        liItems.className = "show";
        match = liItems.textContent;
        return match;
         
     }
     
  }

}
