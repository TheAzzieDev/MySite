let container;
let elementData;
let currentIndex = 0;
let size;
let displayItemSize = 3;
let deviceMaxItemSize = 3; //THIS WILL BE CHANGED DEPENDING ON THE DEVICE!
let projects;
let itemsToAdd;

function accessProjectContent()
{
    projects = elementData["projects"];
    let name;
    let description;
    let elem;
    let node;

    for(let i = 0; i < 3; i++)
    {
        createProjectItem(i);
    }
}


function createProjectItem(index)
{
    let name = projects[index]["name"];  
    elem = document.createElement("div");
    description = document.createTextNode(projects[index]["description"]);
    elem.appendChild(description);
    container.appendChild(elem);
}

function rightArrow()
{
    if(size > deviceMaxItemSize){
        let children = container.getElementsByTagName("div");

        for(let i = 0; i < displayItemSize; i++)
            container.removeChild(children[0]);

        if(currentIndex + 1 <= size)
        {
            itemsToAdd = (size - currentIndex > deviceMaxItemSize) ? 3 : size - currentIndex;
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
        let children = container.getElementsByTagName("div");
        for(let i = 0; i < displayItemSize; i++)
        {
            container.removeChild(children[0]);
        }
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
    await fetch("http://127.0.0.1:5500/myProjects.json").then(async(data) =>{
        elementData = await data.json();
        size = elementData["projects"].length;
    })
    .catch((error) =>{
        console.log("An error occured while fetching project data: ", error);
    });
    container = document.getElementsByClassName("inner-card-container")[0];
    console.log(container);
    accessProjectContent();

}));

document.getElementById("Navbar").addEventListener("click", (e)=>
{
    e.preventDefault();
    if(e.target && e.target.nodeName == "LI")
    {
        document.getElementById(e.target.innerHTML).scrollIntoView({
            behavior: "smooth"
        });
    }
});




