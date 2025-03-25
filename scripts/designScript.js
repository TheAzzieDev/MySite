
function createCard()
{
    let cardContainer = document.getElementById("card-container");
    let newCard = document.createElement("div");
    newCard.classList.add("inner-card-container");
    newCard.innerHTML = 
    `
    <div class ="project-card">
        <div class="neuton-bold">
            <h1>Security Camera</h1>
        </div>
        <div class="neuton-light">
            <div class = "card-description">
                Lorem ipsum dolor sit amet, consectetu
                adipiscing elit. Duis vulputate elit quis lectus finibus vehicula.
                Integer condimentum vehicula ante sed tincidunt. Pellentesque lobortis
                suscipit sapiens. Donec nisl lacus, lobortis a tortor ut, eleifend vulputate ipsum.
            </div>
        </div>
    </div>
    `
    let cardDescription = newCard.getElementsByClassName("card-description")[0];
    newCard.addEventListener("click", ()=> {
        cardDescription.style.marginTop = "0px";
        cardDescription.style.opacity = 1;
    });
    newCard.addEventListener("mouseleave", ()=>{
        cardDescription.style.marginTop = "200px"; 
        cardDescription.style.opacity = 0;
    });

    cardContainer.appendChild(newCard);
}
window.addEventListener("load", ()=>{
    createCard()
});
