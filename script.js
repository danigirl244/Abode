
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
var width = canvas.width;
var height = canvas.height;

ctx.maxHeight=600;
ctx.maxWidth = 800;

var originalImg;

ctx.fillStyle="#080048";
ctx.fillRect(0,0, width, height);

function upload(){
    $('input[type=text]').click(function() {
        $('input[type=file]').trigger('click');
    });

    $('input[type=file]').change(function() {
        $('input[type=text]').val($(this).val());
    });
}
function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            originalImg = img;
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
}

function grayscale() {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;

    for(var i = 0; i < data.length; i += 4) {
        var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
        data[i] = brightness;
        data[i + 1] = brightness;
        data[i + 2] = brightness;
    }

    ctx.putImageData(imageData, 0, 0);

}

function invert() {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    for(var i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
    }
    ctx.putImageData(imageData, 0, 0);
}



function download() {
    var dt = canvas.toDataURL('image/jpeg');
    this.href = dt;
}
downloadLnk.addEventListener('click', download, false);

function draw() {

}

function chooseText(){

}
function addText() {
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = document.getElementById("textColor").value;
    ctx.textAlign = "center";
    var textEntry = document.getElementById("textEntry").value;
    ctx.fillText(textEntry, canvas.width/2, canvas.height/2);
}

function revert() {
    ctx.drawImage(originalImg, 0, 0);
}