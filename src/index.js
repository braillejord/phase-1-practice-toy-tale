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
    .then(data => createCard(data))



  function createCard(data) {
    for (let toy in data) {
      const toyName = data[toy].name
      const toyImage = data[toy].image
      let toyLikes = data[toy].likes
      const toyId = data[toy].id
      let toyCardDiv = document.createElement('div');

      toyCardDiv.classList.add('card')

      let toyCardH2 = document.createElement('h2')
      toyCardH2.innerText = toyName

      let toyCardImage = document.createElement('img')
      toyCardImage.src = toyImage
      toyCardImage.setAttribute('class', 'toy-avatar')

      let toyCardPTag = document.createElement('p')
      toyCardPTag.innerText = toyLikes

      let toyCardButton = document.createElement('button')
      toyCardButton.setAttribute('class', 'like-btn')
      toyCardButton.innerText = "Like"
      toyCardButton.setAttribute('id', toyId)

      toyCardDiv.append(toyCardH2, toyCardImage, toyCardPTag, toyCardButton)
      toyCollection.append(toyCardDiv)

      toyCardButton.addEventListener("click", (e) => {
        e.preventDefault()
        //  capture that toy's id = toyId
        //  calculate the new number of likes,
        let newNumberOfLikes = toyLikes += 1
        //  submit the patch request, and
        fetch(`http://localhost:3000/toys/${toyId}`, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },

          body: JSON.stringify({
            "likes": newNumberOfLikes
          })
        }) 
        .then(res => res.json())
        .then(toyData => toyCardPTag.innerText = toyData.likes)
        //  update the toy's card in the DOM based on the Response returned by the fetch request.
      })
    }
  }


  document.getElementById("create-toy-button").addEventListener("click", (e) => {
    e.preventDefault()
    const inputName = document.getElementById("input-name").value
    const inputUrl = document.getElementById("input-url").value
    submitToy(inputName, inputUrl)
  })

  function submitToy(name, url) {
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
      .then(toyData => document.body.append(toyData))
  }
})
