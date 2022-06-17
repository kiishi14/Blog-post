
function renderView() {
    let viewedObject = localStorage.getItem("viewedPost");
    let post = JSON.parse(viewedObject);
    console.log(post.title);
    document.querySelector(".title").innerHTML = post.title;
    document.querySelector(".blog-post").innerHTML = post.body;
    document.querySelector(".author").innerHTML = post.id;
}

renderView();


// fetch("https://jsonplaceholder.typicode.com/posts")
//         .then((response) => response.json())
//         .then((data) => {
//             dataArray = data
//                 viewPage.innerHTML += `
//                     <a href="index.html"><i class="bi bi-arrow-left fs-1"></i></a>
//                     <div class="view text-center col-12">
//                         <img src="./img/post1.jpg" alt="img" class="img-fluid mb-3">
//                         <p class="title fw-bold text-primary">Title</p>
//                         <p class="blog-post text-primary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident voluptas unde
//                             animi quidem voluptate excepturi soluta cum quis iusto distinctio. Quod nemo nostrum libero ipsa voluptatibus
//                             repudiandae temporibus id, quis vitae corporis?</p>
//                     </div>
//                     <p class="author text-primary">Written by <u>author</u></p>
//             `;
//             }
//         );

