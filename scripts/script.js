let container;
let elementData;
let currentIndex = 0;
let size;
let displayItemSize = 3;
let deviceMaxItemSize; //THIS WILL BE CHANGED DEPENDING ON THE DEVICE!
let projects;
let itemsToAdd;

function configureProjects(updateChildren)
{
    if(screen.width > 1485)
        {
        deviceMaxItemSize = 3;
        updateChildren();
    }

    if(screen.width < 1485 && screen.width > 1000)
        {
        deviceMaxItemSize = 2;
        updateChildren();
    }

    if(screen.width < 1000)
        {
        deviceMaxItemSize = 1;
        updateChildren();
    }
    
}

function accessProjectContent()
{
    projects = elementData["projects"];
    for(let i = 0; i < deviceMaxItemSize; i++)
    {
        createProjectItem(currentIndex++);
    }
    displayItemSize = deviceMaxItemSize;
}

function createProjectItem(index)
{
    let name = projects[index]["name"];  
    let description = projects[index]["description"];
    let url = projects[index]["url"];
    let src = projects[index]["img"];
    

    let newCard = document.createElement("div");

    newCard.classList.add("project-card");
    newCard.style.backgroundImage = "url(" + src  + ")";
    newCard.style.backgroundPosition = "center";
    newCard.innerHTML = 
    `
    <div class="neuton-bold">
        <h1 class = "card-title">${name}</h1>
    </div>
    <div class="neuton-light">
        <div class = "card-description">
            ${description}
        </div>
    </div>
    `
   
    let cardDescription = newCard.getElementsByClassName("card-description")[0];
    newCard.addEventListener("mouseenter", ()=> {
        cardDescription.style.marginTop = "0px";
        cardDescription.style.opacity = 1;
    });
    newCard.addEventListener("mouseleave", ()=>{
        cardDescription.style.marginTop = "200px"; 
        cardDescription.style.opacity = 0;
    });

    newCard.addEventListener("click", ()=>{
        window.open(url, '_blank');
    });

    container.appendChild(newCard);
}

function deleteChildren(itemsToRemove)
{
    let children = container.getElementsByClassName("project-card");

    for(let i = 0; i < itemsToRemove; i++)
    {
        container.removeChild(children[0]);
    }
}

function reloadChildren()
{
    deleteChildren(displayItemSize);
    currentIndex = currentIndex == 0 ? 0 : currentIndex - displayItemSize;
    for(let i = 0; i < deviceMaxItemSize; i++)
    {
        createProjectItem(currentIndex++)
    }
    displayItemSize = deviceMaxItemSize;
}

function rightArrow()
{
    if(size > deviceMaxItemSize){
        deleteChildren(displayItemSize)

        if(currentIndex + 1 <= size)
        {
            itemsToAdd = (size - currentIndex > deviceMaxItemSize) ? deviceMaxItemSize : size - currentIndex;
            currentIndex = (currentIndex == 0) ? displayItemSize : currentIndex;
           
            //create projects
            for(let i = 0; i < itemsToAdd; i++)
            {
                createProjectItem(currentIndex);
                currentIndex++;
            }
            displayItemSize = itemsToAdd;
        }
        else 
        {
            currentIndex = 0;
            for(let i = 0; i < deviceMaxItemSize; i++)
            {
                createProjectItem(currentIndex);
                currentIndex++;
            }

            displayItemSize = deviceMaxItemSize;
            currentIndex = 0;
        } 
    }

}


function leftArrow() 
{
    let itemSpaceStart;
    let itemSpaceEnd;
    
    if(size > deviceMaxItemSize){

        deleteChildren(displayItemSize)

        if(currentIndex - 1 < 0 || currentIndex - displayItemSize == 0)
        {
            //create projects
            itemSpaceEnd = (size % deviceMaxItemSize == 0) ? deviceMaxItemSize : size % deviceMaxItemSize;  // How many card will be in the end?
            currentIndex = size - itemSpaceEnd;
            for(let i = 0; i < itemSpaceEnd; i++)
            {
                createProjectItem(currentIndex);
                currentIndex++;
            }
            displayItemSize = itemSpaceEnd;
        }
        else
        {

            //Where Checking two cases, when left items are less than and more thean
            currentIndex = currentIndex - displayItemSize;
            let itemSpaceStart = currentIndex % displayItemSize;

            let SpaceAvailable = currentIndex - deviceMaxItemSize >= 0; 
            if(SpaceAvailable)
            {
                for(let i = deviceMaxItemSize; i > 0;  i--)
                {
                    createProjectItem(currentIndex - i);
                }
                displayItemSize = deviceMaxItemSize;
            }
        } 
    }
}

function openModal(elemName){
    console.log(document.getElementById(elemName));
    document.getElementById(elemName).style.display = "block";
}

function closeModal(elemName)
{
    document.getElementById(elemName).style.display = "none";
}





window.addEventListener("load", (async()=>{
    await fetch("https://theazziedev.github.io/MySite/myProjects.json").then(async(data) =>{
        elementData = await data.json();
        size = elementData["projects"].length;
    })
    .catch((error) =>{
        console.log("An error occured while fetching project data: ", error);
    });
    container = document.getElementsByClassName("inner-card-container")[0];
    configureProjects(accessProjectContent);

}));

window.addEventListener("resize", ()=>{
    configureProjects(reloadChildren);
});

document.getElementById("Navbar").addEventListener("click", (e)=>
{
    e.preventDefault();
    if(e.target && e.target.nodeName == "LI")
    {
        if(e.target.id == "services")
            openModal("services-modal");
        else
        {
           document.getElementById(e.target.innerHTML).scrollIntoView({
                behavior: "smooth"
            }); 
        }
            
    }
});








