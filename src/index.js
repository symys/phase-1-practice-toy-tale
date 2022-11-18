let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const toyDBUrl = "http://localhost:3000/toys";
  const toyCard = document.getElementById("toy-collection");
  fetch(toyDBUrl)
    .then((res) => res.json())
    .then((toys) => {
      toys.forEach((toy) => {
        renderToy(toy.name, toy.image, toy.likes, toy.id);
      });
    });

  function renderToy(name, img, likes, id) {
    const toyDiv = document.createElement("div");
    const toyTitle = document.createElement("h2");
    const toyImg = document.createElement("img");
    const toyLikeStatus = document.createElement("p");
    const likeBtn = document.createElement("button");

    toyDiv.className = "card";
    toyTitle.textContent = name;
    toyImg.src = img;
    toyImg.alt = `${name} poster`;
    toyImg.className = "toy-avatar";
    toyLikeStatus.textContent = `${likes} Likes`;
    likeBtn.className = "like-btn";
    likeBtn.id = `${id}`;
    likeBtn.textContent = "Like";

    toyDiv.appendChild(toyTitle);
    toyDiv.appendChild(toyImg);
    toyDiv.appendChild(toyLikeStatus);
    toyDiv.appendChild(likeBtn);
    toyCard.appendChild(toyDiv);

    //count likes
    const singleLikeBtn = document.getElementById(id);
    singleLikeBtn.addEventListener('click', (e) => {
      pElement = singleLikeBtn.previousElementSibling.textContent;
      let currentLikes = parseInt(pElement.split(" ")[0]);
      let newLikes = currentLikes + 1;


      fetch(`http://localhost:3000/toys/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          likes: newLikes,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          singleLikeBtn.previousElementSibling.textContent = `${newLikes} Likes`;
        });
    });

   
  }

  const addToyForm = document.querySelector(".container .add-toy-form");

  addToyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelectorAll(".input-text")[0].value;
    const image = document.querySelectorAll(".input-text")[1].value;
    const likes = 0;

    fetch(toyDBUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify({
        name: name,
        image: image,
        likes: likes,
      }),
    })
      .then((res) => res.json())
      .then((newToy) =>
        renderToy(newToy.name, newToy.image, newToy.likes, newToy.id)
      )
      .catch((error) => alert(error));
  });
});
