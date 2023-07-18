//const { create } = require("jsdom/lib/jsdom/living/generated/Blob");

let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  const toyCollection = document.getElementById("toy-collection")
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
     //hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  
  });

  const baseUrl = "http://localhost:3000/toys"
  fetch(baseUrl)
  .then(r => r.json())
  .then (data => createCard( data)) 



function createCard(data) {
  for(let toy in data) {
    const toyName = data[toy].name
    const toyImage = data[toy].image 
    const toyLikes = data[toy].likes
    const toyId = data[toy].id     
  let toyCardDiv = document.createElement('div');
  
  toyCardDiv.classList.add('card')
   
  let toyCardH2 = document.createElement('h2')
  toyCardH2.innerText = toyName

  let toyCardImage = document.createElement('img')
  toyCardImage.src = toyImage 
  toyCardImage.setAttribute('class','toy-avatar') 
  
  let toyCardPTag = document.createElement('p')
  toyCardPTag.innerText = toyLikes

  let toyCardButton = document.createElement('button')
  toyCardButton.setAttribute('class', 'like-btn')
  toyCardButton.innerText = "Like"
  toyCardButton.setAttribute('id', toyId)
  
  toyCardDiv.append(toyCardH2,toyCardImage,toyCardPTag,toyCardButton)
  toyCollection.append(toyCardDiv) 
  }
}



document.getElementById("create-toy-button").addEventListener("click", (e) => {
  e.preventDefault()
  const inputName = document.getElementById("input-name").value
  const inputUrl = document.getElementById("input-url").value
  submitToy(inputName, inputUrl)
})

function submitToy(name, url) {
  console.log(name,url)
  fetch('http://localhost:3000/toys', {
    method: 'POST',  
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "url": url
    })
  })
  .then(res => res.json())
  //.then(card => )
}







// belongs to DOM event listener
})
