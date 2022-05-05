

// window.addEventListener("paste", function (e) {
//     var item = Array.from(e.clipboardData.items).find(x => /^image\//.test(x.type));

//     var blob = item.getAsFile();

//     var img = new Image();

//     img.onload = function () {
//         createPostInput.appendChild(this);
//     };

//     img.src = URL.createObjectURL(blob);
// });