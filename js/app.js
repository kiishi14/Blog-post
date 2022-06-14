const createBtn = document.querySelector('.create-btn');
const closeOverlay = document.querySelector('.bi-x-circle');
const submitBtn = document.querySelector('.submit-btn');
const title = document.querySelector('#title');
const content = document.querySelector('#content');
const overlayCreate = document.querySelector('.create-post-overlay');

// open overlay
createBtn.addEventListener('click', () => {
    overlayCreate.classList.add(`show-create-post`);
});

// close overlay
closeOverlay.addEventListener('click', () => {
    overlayCreate.classList.remove(`show-create-post`);
    title.value = "";
    content.value = "";
});
