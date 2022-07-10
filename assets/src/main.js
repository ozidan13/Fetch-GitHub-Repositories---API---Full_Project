// Main Variables
let theInput = document.querySelector(".get-repos input"),
    getButton = document.querySelector(".get-button"),
    reposData = document.querySelector(".show-data"),
    introImg = document.querySelector(".show-data img");

// Animated Inrto 
const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

tl.to(".text", { y: "0%", duration: 1, stagger: 0.25 });
tl.to(".slider", { y: "-100%", duration: 1.5, delay: 0.5 });
tl.to(".intro", { y: "-100%", duration: 1 }, "-=1");
tl.fromTo("nav", { opacity: 0 }, { opacity: 1, duration: 1 });
tl.fromTo(".big-text", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=1");

// Search Button function to get repos
getButton.onclick = function () {
  getRepos();
  introImg.style.display = "none";
};

// Start Animated CURSOR
let mouseCursor = document.querySelector('.cursor'),
    boxHeader = document.querySelector('.repo-box');

window.addEventListener('mousemove', cursor);

function cursor(e) {
    mouseCursor.style.top = e.pageY + 'px';
    mouseCursor.style.left = e.pageX + 'px';
}


getButton.addEventListener("mouseleave", () => {
  mouseCursor.classList.remove("link-grow");
  });

getButton.addEventListener("mouseover", () => {
  mouseCursor.classList.add("link-grow");
  getButton.style.zIndex = "4";
  });

introImg.addEventListener("mouseleave", () => {
    mouseCursor.classList.remove("link-grow");
    });
  
introImg.addEventListener("mouseover", () => {
    mouseCursor.classList.add("link-grow");
    });

/*
boxHeader.forEach(boxR => {
    boxR.addEventListener("mouseleave", () => {
        mouseCursor.classList.remove("link-grow");
    });
    boxR.addEventListener("mouseover", () => {
        mouseCursor.classList.add("link-grow");
    });
});

*/



// Get Repos Function
function getRepos() {

  if (theInput.value == "") { // If Value Is Empty

    reposData.innerHTML = "<span>Please Write Github Username.</span>";

  } else {

    fetch(`https://api.github.com/users/${theInput.value}/repos`)

    .then((response) => response.json())

    .then((repositories) => {

      // Empty The Container
      reposData.innerHTML = '';

      // Change reposData background-color to white
      // reposData.style.backgroundColor = "#01564e";

      // add box shadow to reposData
      reposData.style.boxShadow = "rgb(159 159 159 / 77%) 0px 0px 41px inset";
      
      // Loop On Repositories
      repositories.forEach(repo => {

        // Create The Main Div Element
        let mainDiv = document.createElement("div");
        let secDiv = document.createElement("div");

        // Create avatar img 
        let imgContainer = document.createElement("div");
        let avatarImg = document.createElement("img");
        imgContainer.className = "avatar-img";
        avatarImg.src = repo.owner.avatar_url;
        
        // Append Avatar Img To container
        imgContainer.appendChild(avatarImg);

        // Append container to mainDev
        mainDiv.appendChild(imgContainer);

        // Create Repo Name Text
        let repoNameH = document.createElement("h3");
        let repoName = document.createTextNode(repo.name);
        repoNameH.appendChild(repoName);

        // Append The Text To Main Div
        mainDiv.appendChild(repoNameH);

        // Create Repo URL Anchor
        let theUrl = document.createElement('a');

        // Create Repo Url Text
        let theUrlText = document.createTextNode("Visit");

        // Append The Repo Url Text To Anchor Tag
        theUrl.appendChild(theUrlText);

        // Add Thje Hypertext Reference "href"
        theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;

        // Set Attribute Blank
        theUrl.setAttribute('target', '_blank');

        // Append Url Anchor To Main Div
        secDiv.appendChild(theUrl);

        // Create Stars Count Span
        let starsSpan = document.createElement("span");

        // Create The Stars Count Text
        let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);

        // Add Stars Count Text To Stars Span
        starsSpan.appendChild(starsText);

        // Append Stars Count Span To sec Div
        secDiv.appendChild(starsSpan);

        // Add Class On Main & Sec Div
        mainDiv.className = 'repo-box';
        secDiv.className = 'repo-lights';

        // Append The Main Div To Container
        mainDiv.appendChild(secDiv);
        reposData.appendChild(mainDiv);
        


      });

    });

  }

}




