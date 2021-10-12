const sidebar = document.getElementById('sidebar');
const toggleButton = document.getElementById('toggleButton');
const loginTab = document.getElementById('loginTab')
const registerTab = document.getElementById('registerTab')
const formModal = document.getElementById('formModal')
const createPostButton = document.getElementById('create_post')
const createThreadButton = document.getElementById('create_thread')
const createPostInput = document.getElementById('createPostInput')

// window.addEventListener("paste", function (e) {
//     var item = Array.from(e.clipboardData.items).find(x => /^image\//.test(x.type));

//     var blob = item.getAsFile();

//     var img = new Image();

//     img.onload = function () {
//         createPostInput.appendChild(this);
//     };

//     img.src = URL.createObjectURL(blob);
// });