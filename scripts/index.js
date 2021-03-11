'use strict'

//Se obtienen los elementos necesarios del html
const img = document.querySelector('#img');
const canvas = document.querySelector("#canvi");
const info = document.querySelector('#info');

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
        document.querySelector('#info').style.display = "block";
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
    let radio = 3;
    let boxR = parseInt(prompt("Tamaño de la casilla", "3"));
    if(!isNaN(boxR))
        radio = boxR < 3 || img.width < boxR? 3: boxR;
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
   * @desc Valida que el valor este ente 0 y 255
   * @return {number} valor
 */
function validarRango(valor){
  if(valor < 0)
    valor = 0
  else if(valor > 255)
    valor = 255

  return valor;
}

/**
   * @desc Le permite al usuario seleccionar
   *       y aplicar filtros a una imagen de su elección
 */
async function main() {
  await loadImage();
  let f = new Filter(img, canvas);
  let radio = 3;
  let cte = 50;

  //Brillo inical y botón para modificarlo
  btnBrillo.onclick = () => {
    cte = parseInt(prompt("Constante", "50"));
    cte = isNaN(cte)? 50: cte;
    info.childNodes[1].innerHTML = "Brillo";
    info.childNodes[3].innerHTML =  "Valor de la constante para el brillo: "+ cte +"<br> Para cambiar el valor del brillo selecciona nuevamente esta opción";
    
    f.setColor((r,g,b)=>{
      for(var alfa=0; alfa<r.length;alfa++){
        r[alfa] = validarRango(cte + r[alfa]);
        g[alfa] = validarRango(cte + g[alfa]);
        b[alfa] = validarRango(cte + b[alfa]);
      }
    });
  }

  //Mosaico
  btnPixel.onclick = () => {
    info.childNodes[1].innerHTML = "Mosaico";
    radio = setRadio();
    info.childNodes[3].innerHTML = "Tamaño del mosaico: "+ radio +"<br> Para cambiar el tamaño del mosaico selecciona nuevamente esta opción";
    console.log(radio);
    f.doMosaic(radio);
  };

  //Imagen original
  btnReset.onclick = () => {
    info.childNodes[1].innerHTML = "Filtros";
    info.childNodes[3].innerHTML = "Selecciona un filtro del menú Colores, Escala de Grises u Otros";
    f.reset();
  }

  //Filtro azul 
  btnBlue.onclick = ()=> {
    info.childNodes[1].innerHTML = "Colores";
    info.childNodes[3].innerHTML = "Imagen en color azul";
    f.multiplyValues(0,0,1);
  }

  //Filtro rojo
  btnRed.onclick = ()=> {
    info.childNodes[1].innerHTML = "Colores";
    info.childNodes[3].innerHTML = "Imagen en color rojo";
    f.multiplyValues(1,0,0);
  } 

  //Filtro verde
  btnGreen.onclick = ()=> {
    info.childNodes[1].innerHTML = "Colores";
    info.childNodes[3].innerHTML = "Imagen en color verde";
    f.multiplyValues(0,1,0);
  }

  //Escala de grises 1
  btnGray1.onclick = () => {
    info.childNodes[1].innerHTML = "Escala de grises";
    info.childNodes[3].innerHTML = "Utiliza la formula (Red + Green + Blue) / 3";
    f.greyScaleGen((r,g,b)=> (r + g + b) / 3)
  };

  //Escala de grises 2
  btnGray2.onclick = () => {
    info.childNodes[1].innerHTML = "Escala de grises";
    info.childNodes[3].innerHTML = "Utiliza la formula (Red * 0.3 + Green * 0.59 + Blue * 0.11)";
    f.greyScaleGen((r,g,b)=> (r * 0.3 + g * 0.59 + b * 0.11))
  };
  
  //Escala de grises 3
  btnGray3.onclick = () => {
    info.childNodes[1].innerHTML = "Escala de grises";
    info.childNodes[3].innerHTML = "Utiliza la formula (Red * 0.2126 + Green * 0.7152 + Blue * 0.0722)";
    f.greyScaleGen((r,g,b)=> (r * 0.2126 + g * 0.7152 + b * 0.0722))
  };

  //Escala de grises 4
  btnGray4.onclick = () => {
    info.childNodes[1].innerHTML = "Escala de grises";
    info.childNodes[3].innerHTML = "Utiliza la formula ( Max(Red, Green, Blue) + Min(Red, Green, Blue) ) / 2";
    f.greyScaleGen((r,g,b)=> (Math.max(r, g, b) + Math.min(r, g, b) ) / 2)
  };

  //Escala de grises 5
  btnGray5.onclick = () => {
    info.childNodes[1].innerHTML = "Escala de grises";
    info.childNodes[3].innerHTML = "Utiliza la formula Max(Red, Green, Blue)";
    f.greyScaleGen((r,g,b)=> Math.max(r, g, b))
  };

  //Escala de grises 6
 btnGray6.onclick = () => {
    info.childNodes[1].innerHTML = "Escala de grises";
    info.childNodes[3].innerHTML = "Utiliza la formula Min(Red, Green, Blue)";
    f.greyScaleGen((r,g,b)=> Math.min(r, g, b))
  };

  //Escala de grises 7
  btnGray7.onclick = () => {
    info.childNodes[1].innerHTML = "Escala de grises";
    info.childNodes[3].innerHTML = "Utiliza la formula Red";
    f.greyScaleGen((r,g,b)=> r)
  };

  //Escala de grises 8
  btnGray8.onclick = () => {
    info.childNodes[1].innerHTML = "Escala de grises";
    info.childNodes[3].innerHTML = "Utiliza la formula Green";
    f.greyScaleGen((r,g,b)=> g)
  };

  //Escala de grises 9
  btnGray9.onclick = () => {
    info.childNodes[1].innerHTML = "Escala de grises";
    info.childNodes[3].innerHTML = "Utiliza la formula Blue";
    f.greyScaleGen((r,g,b)=> b)
  };
}


document.addEventListener('DOMContentLoaded', main);
