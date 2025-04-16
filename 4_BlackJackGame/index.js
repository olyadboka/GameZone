let sum = 0
let cards =[]
isAlive = false
hasBlackjack = false

let messageEl = document.getElementById("message-el")
let cardsEl = document.getElementById("cards-el")
let sumEl = document.getElementById("sum-el")


let player = {
    name: "Sonasri",
    chips: 145
}


let playerEl = document.getElementById("player-el")
playerEl.textContent = player.name + ": $" + player.chips


function getRandomCard(){
    let randomNumber = Math.floor((Math.random())*12)+1
    if (randomNumber > 10){
        return 10
    } else if(randomNumber===1){
        return 11
    } else{
        return randomNumber
    }
}

function startGame(){
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    let sum = firstCard + secondCard
    let cards =[firstCard , secondCard]
    isAlive= true
    renderGame()
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for(i = 0; i < cards.length ; i++ ) {
        cardsEl.textContent+= cards[i]+" "
    }
    sumEl.textContent = "Sum: " + sum
    if (sum<21) {
        message = "Do you want to draw a new card?"
    } else if (sum===21){
        message = "You've got Blackjack!"
        hasBlackjack= true
    } else {
        message = "You're out of the game!"
        isAlive= false
    }
    messageEl.textContent = message
}

function newCard(){
    if(isAlive === true && hasBlackjack === false){
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
        console.log(cards)
    }  
}

