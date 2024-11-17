

// remove splash screen
document.querySelector('.start-btn').addEventListener('click', ()=>{
  document.querySelector('.start-scr').remove();
})


// cards
let cardsContainer = document.getElementById('cards-container');
let images=[
    'media/cards/avocado.png',
    'media/cards/kiwi.webp',
    'media/cards/fig.webp',
    'media/cards/apricot.png',
    'media/cards/coconut.png',
    'media/cards/lemon.webp',
    'media/cards/plum.webp',
    'media/cards/raspberry.webp',
    'media/cards/watermelon.webp',
    'media/cards/apple1.webp',
]
let duplicatedImages = [...images, ...images];

duplicatedImages.sort(()=>Math.random()- .5);

duplicatedImages.forEach((image) => {
  let card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML =`
  <div class='front'>?</div>
  <div class='back'>
    <img width='100%' height='100%' src=${image}><img>
  </div>
  `

  // click card
  card.addEventListener('click',()=>{
    document.querySelector('#flip').play();
    flipCard(card);
  })

  cardsContainer.append(card)

})


// flip cards
let flippedCards =[];

function flipCard(card){
  if(flippedCards.length ===2 || card.classList.contains('flipped')) return;

  card.classList.add('flipped');
  flippedCards.push(card);

  if(flippedCards.length ===2){
    matchCards();
  }
}


// match cards
let matchedCards =0;

function matchCards(){
  let [card1, card2] = flippedCards ;

  // success
  if(card1.innerHTML === card2.innerHTML){
    document.querySelector('#success').play();

    document.querySelector('.match span').innerHTML = +document.querySelector('.match span').innerHTML +1

    matchedCards++;
    flippedCards =[];


    if(matchedCards === duplicatedImages.length /2){
      setTimeout(()=>{
        document.querySelector('.play-again-scr').classList.remove('hidden');

        document.querySelector('.play-again-btn').addEventListener('click',()=>{
          document.querySelector('.play-again-scr').classList.add('hidden');
          console.log(location);
          location.reload();
        
        })
      },1000)
      
    }
  }

  // fail
  else{
    setTimeout(()=>{
      document.querySelector('#fail').play();

      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
    },1000)
  
    // document.querySelector('.wrong span').innerHTML = Number(document.querySelector('.wrong span').innerHTML) + 1;
    document.querySelector('.wrong span').innerHTML = +document.querySelector('.wrong span').innerHTML + 1;
    flippedCards =[];

  }
}



