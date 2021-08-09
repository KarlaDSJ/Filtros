'use strict'

//Se obtienen los elementos necesarios del html
const img = document.querySelector('#img');
const canvas = document.querySelector("#canvi");
const canvasText = document.querySelector("#canviText");
const info = document.querySelector('#info');
const slides = document.querySelector('.slidecontainer');
const dimension = document.querySelector('.dimensionsContainer');
const waterMark = document.querySelector('.watermarkContainer');
const maxMin = document.querySelector('.maxMin');

let radio = [3, 3];
let cte = 50;
let text = "hola";
let f; //filtro
let fSopa; //filtro sopa de letras
let fRecursion; //filtro de recursión 
let fConvolution; //filtro de convolución
let fSemitones; //filtro de convolución
let s; //filtro marca de agua

/**
   * @desc Se encarga de obtener la imagen que selecciona el usuario
 */
function loadImage(){
  return new Promise(function(resolve, reject) {
   const reader  = new FileReader();
   const file = document.querySelector("#btnInput").files[0];


   reader.onload = () =>{
     img.onload = function () {
       resolve(reader.result);
     }
     img.src = reader.result;
   }

    if (file){
        reader.readAsDataURL(file);
        document.querySelector('#index').style.display = "none";
        slides.style.display = "none";
        dimension.style.display = "none";
        waterMark.style.display = "none";
        canvasText.style.display = "none";
        maxMin.style.display = "none";
        info.style.display = "block";
    }else
        img.src = "";
    
    info.childNodes[1].innerHTML = "Filtros";
    info.childNodes[3].innerHTML = "Selecciona un filtro del menú Colores, Escala de Grises u Otros";
  });
}

/**
   * @desc Se establece la longitud del cuadrante
 */
function setRadio(){
    radio[0] = parseInt(dimension.children[0].children[1].value);
    radio[1] = parseInt(dimension.children[1].children[1].value);

    if(!isNaN(radio[0]))
      radio[0] = radio[0] < 3 || img.width < radio[0]? 3: radio[0];
    if(!isNaN(radio[1]))
      radio[1] = radio[1] < 3 || img.height < radio[1]? 3: radio[1];
    return radio;
}

/**
   * @desc Se guarda la imagen con un filtro
 */
function guardar() {        
  var link = document.createElement('a');
  link.href = canvas.toDataURL("image/png");
  link.download = "imagen_con_filtro";
  link.click();
}

/**
  * @desc Cambia el nombre y la descripción del filtro en el html
  * @param {String} name - Nombre del filtro
  * @param {String} moreInfo - Descripción
*/
function setInfo(name, moreInfo){
  slides.style.display = "none";
  dimension.style.display = "none";
  waterMark.style.display = "none";
  canvasText.style.display = "none";
  maxMin.style.display = "none";
  img.style.display = "block";
  info.childNodes[1].innerHTML = name;
  info.childNodes[3].innerHTML = moreInfo; 
}

/**
   * @desc Le permite al usuario seleccionar
   *       y aplicar filtros a una imagen de su elección
 */
async function main() {
  await loadImage();
  f = new Filter(img, canvas);
  fSopa = new SopaDeLetras(f, canvas);
  fRecursion = new RecursionImage(f, canvas);
  fConvolution = new Convolution(f, canvas);
  fSemitones = new Semitones(f, canvas);
  s = new Sign(f);
}


document.addEventListener('DOMContentLoaded', main);
