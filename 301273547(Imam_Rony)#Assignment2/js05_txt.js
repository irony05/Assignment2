"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Chapter Case

      Application to generate a slide show
      Author: Imam
      Date:  

      Filename: js05.js
*/

window.addEventListener("load", createLightBox);

function createLightBox() {
   let lightbox = document.getElementById("lightbox");
   let title = document.createElement("h1");
   let counter = document.createElement("div");
   let images = document.createElement("div");
   let next = document.createElement("div");
   let previous = document.createElement("div");
   let pplay = document.createElement("div");
   let runShow = true;
   let showRunning;

   lightbox.appendChild(title);
   title.id = "lbTitle";
   title.textContent = lightboxTitle;

   lightbox.appendChild(counter);
   counter.id = "lbCounter";
   let currentImage = 1;
   counter.textContent = currentImage + "/" + imgCount;

   lightbox.appendChild(images);
   images.id = "lbImages";
   images.onclick = createModal;
   
   lightbox.appendChild(next);
   next.id = "lbNext";
   next.innerHTML = "&#9654;";
   next.onclick = ShowNextImage;

   lightbox.appendChild(previous);
   previous.id = "lbPrev";
   previous.innerHTML = "&#9664;";
   previous.onclick = ShowPrevImage;

   lightbox.appendChild(pplay);
   pplay.id = "lbPlay";
   pplay.innerHTML = "&#9199;";
   pplay.onclick = StartStopShow;
   lightbox.appendChild(pplay);

   for (let j = 0; j < imgCount; j++) {
      let Image = document.createElement("img");
      Image.src = imgFiles[j];
      Image.alt = imgCaptions[j];
      Image.addEventListener("click", function () {
         createModal(Image);
      });
      images.appendChild(Image);
   }

   function ShowNextImage(){
      images.appendChild(images.firstElementChild);
      (currentImage < imgCount) ? currentImage++ : currentImage = 1;
      counter.textContent = currentImage + "/" + imgCount;
   }

   function ShowPrevImage(){
      images.insertBefore(images.lastElementChild, images.firstElementChild);
      currentImage--;
      if(currentImage < 1)
      { 
         currentImage = imgCount;
      }
      counter.textContent = currentImage + "/" + imgCount;
   }

   function StartStopShow(){
      if(pplay){
         showRunning = window.setInterval(ShowNextImage, 3000)
         runShow = false;
      }
      else {
         window.clearInterval(showRunning);
         runShow=true;
      }
   }
}

//---------------MODAL---------------
function createModal(clickedImage){
   let modalWindow = document.createElement("div");
   modalWindow.classList.add("modal-window");

   let figureBox = document.createElement("figure");

   let modalImage = clickedImage.cloneNode(true);
      modalImage.classList.add("modal-image");

   let figureCaption = document.createElement("figcaption");
   figureCaption.textContent = modalImage.alt;
   figureCaption.classList.add("modal-caption");

   let addButton = document.createElement("button");
   addButton.textContent = "Add to Favorites";
   addButton.classList.add("add-button");
   addButton.addEventListener("click", addToFavorites);

   figureBox.appendChild(modalImage);
   figureBox.appendChild(figureCaption);
   figureBox.appendChild(addButton);

   let closeBox = document.createElement("div");
   closeBox.classList.add("modal-close");
   closeBox.innerHTML = "&times;";
   closeBox.addEventListener("click", function (){
      document.body.removeChild(modalWindow);
   });

   modalWindow.appendChild(figureBox);
   modalWindow.appendChild(closeBox);

   document.body.appendChild(modalWindow);

}


for (let j = 0; j < imgCount; j++) {
   let Image = document.createElement("img");
   Image.src = imgFiles[j];
   Image.alt = imgCaptions[j];
   Image.addEventListener("click", (function (img) {
      return function () {
         createModal(img);
      };
   })(Image));
   images.appendChild(Image);
}

// ADD TO FAVORITES

function addToFavorites() {
   if (document.querySelectorAll("#favorites img").length >= 3) {
     alert("You can only add up to 3 images to favorites.");
     return;
   }
 
   let favoriteImages = document.querySelectorAll("#favorites img");
   let isDuplicate = false;
 
   for (let i = 0; i < favoriteImages.length; i++) {
     if (favoriteImages[i].src === this.parentNode.querySelector("img").src) {
       isDuplicate = true;
       break;
     }
   }
 
   if (isDuplicate) {
     alert("This image already exists in favorites.");
     return;
   }

   let favoriteImage = this.parentNode.querySelector("img").cloneNode(true);
   favoriteImage.style.width = "150px";
   favoriteImage.style.height = "150px";

   let favoriteItem = document.createElement("div");
   favoriteItem.className = "favorite-item";

   let removeButton = document.createElement("button");
   removeButton.textContent = "Remove from Favorites"
   removeButton.classList.add("remove-button");
   removeButton.addEventListener("click", removeFavorite);
   favoriteItem.appendChild(favoriteImage);
   favoriteItem.appendChild(removeButton);

   favoriteItem.classList.add("added"); 

   document.getElementById("favorites").appendChild(favoriteItem);

   this.style.display = "none";

   function removeFavorite() {
      let favoriteItem = this.parentNode;
      let favoritesArea = document.getElementById("favorites");
      favoritesArea.removeChild(favoriteItem);
    }

    if (document.querySelectorAll("#favorites img").length === 0) {
      document.getElementById("favorites").classList.remove("added");
    }
}