const createBtn = document.querySelector(".create-btn");
const closeOverlay = document.querySelector(".bi-x-circle");
const submitBtn = document.querySelector(".submit-btn");
const title = document.querySelector("#title");
const content = document.querySelector("#content");
const author = document.querySelector("#author");
const overlayCreate = document.querySelector(".create-post-overlay");
const postContainer = document.querySelector(".post-container");
const postForm = document.querySelector(".post-form");
const latestBtn = document.querySelector(".latest-btn");
const heading = document.querySelector(".heading");
const updateBtn = document.querySelector(".update-btn");
// data array
let dataArray = [];

let imageArray = [
    { img: `./img/post1.jpg` },
    { img: `./img/post2.jpg` },
    { img: `./img/post3.jpg` },
    { img: `./img/post4.jpg` },
    { img: `./img/post5.jpg` },
    { img: `./img/post6.jpg` },
];

let authorArray = [
    { author: `John Snow` },
    { author: `Susan Doe` },
    { author: `Towetodo Jane` },
    { author: `Bob Spoon` },
    { author: `Sussy Park` },
    { author: `John Snow Junior` },
];

heading.style.display = "none";

// open overlay
createBtn.addEventListener("click", () => {
    overlayCreate.classList.add(`show-create-post`);
    submitBtn.innerHTML = "SUBMIT"

});

// close overlay
closeOverlay.addEventListener("click", () => {
    overlayCreate.classList.remove(`show-create-post`);
    title.value = "";
    content.value = "";
});

// POST METHOD
postForm.addEventListener('submit', function (e) {
    e.preventDefault()
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title.value,
            body: content.value,
            author: author.value,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            heading.style.display = "block";
            let defaultPost = 0;
            dataArray.unshift(json)
            postContainer.innerHTML += `
                    <div class="col-lg-4 col-md-6 mb-3">
                        <div class="card h-100 d-flex flex-column" data-id=${dataArray[defaultPost].id}>
                            <div class="card-body">
                                <img src="${imageArray[defaultPost].img}" class="card-img-top img-fluid mb-2" alt="img">
                                <h5 class="card-title">${title.value.slice(0,20)}</h5>
                                <p class="card-text mb-1 card-content">${content.value.slice(0,50)}</p>
                                <p class="card-text text-info">${author.value}</p>
                                <div class="buttons">
                                <a href="#" class="btn btn-primary" onclick="viewPost(${dataArray[defaultPost].id})">View More</i></a>
                                    <i class="bi bi-pencil-square btn btn-primary" id="update-btn" ></i>
                                    
                                    <i class="bi bi-trash-fill text-white btn btn-danger" id="delete-btn"></i>
                                </div>
                                

                            </div>
                        </div>
                    </div>
            `;
            defaultPost++;
            overlayCreate.classList.remove(`show-create-post`);
            title.value = "";
            content.value = "";
        });
})

// GET METHOD
latestBtn.addEventListener("click", function () {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((data) => {
            dataArray = data
            heading.style.display = "block";


            for (i = 0; i < 6; i++) {
                postContainer.innerHTML += `
                    <div class="col-lg-4 col-md-6 mb-3">
                        <div class="card h-100" data-id=${dataArray[i].id}>
                            <div class="card-body">
                                <img src="${imageArray[i].img}" class="card-img-top img-fluid mb-2" alt="img">
                                <h5 class="card-title">${dataArray[i].title.slice(0,10)}</h5>
                                <p class="card-text mb-1 card-content">${dataArray[i].body.slice(0,200)}</p>
                                <p class="card-text text-info">${authorArray[i].author}</p>
                                <div class="buttons">
                                    <button class="align-self-end btn btn-primary" id="view-btn" onclick="viewPost(${dataArray[i].id})">View More</i></button>
                                    <i class="bi bi-pencil-square btn btn-primary" id="update-btn"></i>
                                    
                                    <i class="bi bi-trash-fill text-white btn btn-danger" id="delete-btn"></i>
                                </div>

                            </div>
                        </div>
                    </div>
            `;
            }
        });
});

// DELETE & UPDATE METHOD
postContainer.addEventListener("click", function(e){
let deleteBtn = e.target.id == "delete-btn"
let id = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id
    
    if(deleteBtn){
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'DELETE',
    })
    .then(response => response.json())
    .then(json => {console.log(json)
        e.target.parentElement.parentElement.parentElement.parentElement.remove()
    })
    }

    let updateBtn = e.target.id == "update-btn"
    if(updateBtn){
        overlayCreate.classList.add(`show-create-post`);
        submitBtn.innerHTML = "UPDATE"

        let cardTitle = e.target.parentElement.parentElement.firstChild.nextElementSibling.nextElementSibling;
        title.value = cardTitle.textContent;

        let cardContent = e.target.parentElement.parentElement.firstChild.nextElementSibling.nextElementSibling.nextElementSibling;
        content.value = cardContent.textContent;

        author.placeholder = "CAN NOT BE CHANGED!!"

        let updateId = e.target.parentElement.parentElement.parentElement.dataset.id
    

        submitBtn.addEventListener("click", function(e) {
            e.preventDefault()
        fetch(`https://jsonplaceholder.typicode.com/posts/${updateId}`, {
        method: 'PUT',
        body: JSON.stringify({
        title: title.value,
        body: content.value,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            cardTitle.innerHTML = title.value;
            cardContent.innerHTML = content.value;
            overlayCreate.classList.remove(`show-create-post`);
            title.value = "";
            content.value = "";
        });
        })
        
            
    }
    
});

// UPDATE method


// function updatePost(id) {
//     fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify({
//         id: id,
//         title: title.value,
//         body: content.value,
//         userId: 1,
// }),
//     headers: {
//     'Content-type': 'application/json; charset=UTF-8',
// },
// })
//     .then((response) => response.json())
//     .then((json) => {

//         console.log(json)
//         let updateTitle = document.querySelectorAll(".card-title")
//         let updateContent = document.querySelectorAll(".card-content")
//         for (i = 0; i < 7; i++) {
//             if(i + 1 === id ){
//                 if(title.value  !== ""){
//                     updateTitle[i].innerHTML = title.value
//                 }
                
//             }
//         }
//         for (i = 0; i < 7; i++) {
//             if(i + 1 === id ){
//                 if(content.value  !== ""){
//                 updateContent[i].innerHTML = content.value
//                 }
//             }
//         }
//     });
// }

// view
function viewPost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        localStorage.setItem("viewedPost", JSON.stringify(json))
        window.location.href = `view.html?id=${id}`
    });
}