'use strict'

//Se obtienen los elementos necesarios del html
const img = document.querySelector('#img');
const canvas = document.querySelector("#canvi");
const info = document.querySelector('#info');
const slides = document.querySelector('.slidecontainer');

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
    let radio = [3, 3];
    radio[0] = parseInt(prompt("Ancho del mosaico", "3"));
    radio[1] = parseInt(prompt("Alto del mosaico", "3"));
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
  info.childNodes[1].innerHTML = name;
  info.childNodes[3].innerHTML = moreInfo; 
}

/**
   * @desc Le permite al usuario seleccionar
   *       y aplicar filtros a una imagen de su elección
 */
async function main() {
  await loadImage();
  let f = new Filter(img, canvas);
  let radio = [3, 3];
  let cte = 50;
  let text = "hola"

  // -------- Práctica 1

  //Brillo inical y botón para modificarlo
  btnBrillo.onclick = () => {
    cte = parseInt(prompt("Constante", "50"));
    cte = isNaN(cte)? 50: cte;
    let info = "Valor de la constante para el brillo: "+ cte +"<br> Para cambiar el valor del brillo selecciona nuevamente esta opción";
    setInfo("Brillo", info);
    f.doPerPixel((r,g,b)=> [cte + r, cte + g, cte + b]);
  }

  //Mosaico
  btnPixel.onclick = () => {
    radio = setRadio();
    let info = "Tamaño del mosaico: "+ radio[0] + " x "+ radio[1] + "<br> Para cambiar el tamaño del mosaico selecciona nuevamente esta opción";
    setInfo("Mosaico", info);
    f.doMosaic(radio, [false]);
  };

  //Imagen original
  btnReset.onclick = () => {
    setInfo("Filtros", "Selecciona un filtro del menú Colores, Escala de Grises u Otros");
    f.reset();
  }

  //Filtro azul 
  btnBlue.onclick = ()=> {
    setInfo("Colores", "Imagen en color azul");
    f.doPerPixel((r,g,b)=> [0, 0, b & 255])
  }

  //Filtro rojo
  btnRed.onclick = ()=> {
    setInfo("Colores", "Imagen en color rojo");
    f.doPerPixel((r,g,b)=> [r & 255, 0, 0]);
  } 

  //Filtro verde
  btnGreen.onclick = ()=> {
    setInfo("Colores", "Imagen en color verde");
    f.doPerPixel((r,g,b)=> [0, g & 255, 0]);
  }

  //Escala de grises 1
  btnGray1.onclick = () => {
    setInfo("Escala de grises", "Utiliza la formula (Red + Green + Blue) / 3");
    f.doPerPixel((r,g,b)=> { let v = (r + g + b) / 3;
                             return [v, v, v];})
  };

  //Escala de grises 2
  btnGray2.onclick = () => {
    setInfo("Escala de grises", "Utiliza la formula (Red * 0.3 + Green * 0.59 + Blue * 0.11)");
    f.doPerPixel((r,g,b)=> { let v = (r * 0.3 + g * 0.59 + b * 0.11);
                             return [v, v, v];})
  };
  
  //Escala de grises 3
  btnGray3.onclick = () => {
    setInfo("Escala de grises", "Utiliza la formula (Red * 0.2126 + Green * 0.7152 + Blue * 0.0722)");
    f.doPerPixel((r,g,b)=> { let v = (r * 0.2126 + g * 0.7152 + b * 0.0722);
                             return [v, v, v];})
  };

  //Escala de grises 4
  btnGray4.onclick = () => {
    setInfo("Escala de grises", "Utiliza la formula (Max(Red, Green, Blue) + Min(Red, Green, Blue) ) / 2");
    f.doPerPixel((r,g,b)=> { let v =(Math.max(r, g, b) + Math.min(r, g, b) ) / 2;
                             return [v, v, v];})
  };

  //Escala de grises 5
  btnGray5.onclick = () => {
    setInfo("Escala de grises", "Utiliza la formula Max(Red, Green, Blue)");
    f.doPerPixel((r,g,b)=> { let v = Math.max(r, g, b);
                             return [v, v, v];})
  };

  //Escala de grises 6
  btnGray6.onclick = () => {
    setInfo("Escala de grises", "Utiliza la formula Min(Red, Green, Blue)");
    f.doPerPixel((r,g,b)=> { let v = Math.min(r, g, b);
                             return [v, v, v];})
  };

  //Escala de grises 7
  btnGray7.onclick = () => {
    setInfo("Escala de grises", "Utiliza la formula Red");
    f.doPerPixel((r,g,b)=> [r, r, r])
  };

  //Escala de grises 8
  btnGray8.onclick = () => {
    setInfo("Escala de grises", "Utiliza la formula Green");
    f.doPerPixel((r,g,b)=> [g, g, g])
  };

  //Escala de grises 9
  btnGray9.onclick = () => {
    setInfo("Escala de grises", "Utiliza la formula Blue");
    f.doPerPixel((r,g,b)=> [b, b, b])
  };
  
  // -------- Práctica 2
  //Alto contraste
  btnContraste.onclick = () => {
    setInfo("Alto contraste", "Utiliza el filtro Gris 2, si valor x pixel > 127 ? 255: 0");
    f.doPerPixel((r,g,b)=> { let v = (r * 0.3 + g * 0.59 + b * 0.11) > 127? 255: 0;
                             return [v, v, v];})
  };

  //Alto inverso
  btnInverso.onclick = () => {
    setInfo("Alto contraste", "Utiliza el filtro Gris 2, si valor x pixel > 127 ? 0: 255");
    f.doPerPixel((r,g,b)=> { let v = (r * 0.3 + g * 0.59 + b * 0.11) > 127? 0: 255;
                             return [v, v, v]})
  };

  //RGB
  btnRGB.onclick = () => {
    setInfo("RGB", "Pone una mica con los colores RGB que seleccione abajo, hace AND con cada pixel");
    slides.style.display = "block";
    slides.children[3].onclick = () =>{ //Obtenemos los valores RGB
      var rojo = slides.children[0].children[1].value;
      var verde = slides.children[1].children[1].value;
      var azul = slides.children[2].children[1].value;
      f.doPerPixel((r,g,b)=> [r & rojo, g & verde, b & azul])
    }
  }

  // Convolución: https://lodev.org/cgtutor/filtering.html
  //Blur 
  btnBlur1.onclick = () => {
    let descripcion = "Utiliza la matriz de convolución: <br>[0.0, 0.2,  0.0, <br> 0.2, 0.2,  0.2, <br> 0.0, 0.2,  0.0]";
    setInfo("Blur", descripcion);
    let matrix = [[0.0, 0.2,  0.0], 
                  [0.2, 0.2, 0.2], 
                  [0.0, 0.2,  0.0]];
    f.doConvolution(matrix);
  };

  //Blur 2
  btnBlur2.onclick = () => {
    let descripcion = "Utiliza la matriz de convolución: <br>[0, 0, 1, 0, 0, <br> 0, 1, 1, 1, 0, <br> 1, 1, 1, 1, 1, <br> 0, 1, 1, 1, 0, </br> 0, 0, 1, 0, 0,]";
    setInfo("Blur", descripcion);
    let matrix = [[0, 0, 1, 0, 0],
                  [0, 1, 1, 1, 0],
                  [1, 1, 1, 1, 1],
                  [0, 1, 1, 1, 0],
                  [0, 0, 1, 0, 0]];
    f.doConvolution(matrix);
  };

  //Blur Motion
  btnMotion.onclick = () => {
    let descripcion = "Utiliza la matriz de convolución: <br>[1, 0, 0, 0, 0, 0, 0, 0, 0 <br>0, 1, 0, 0, 0, 0, 0, 0, 0, <br>0, 0, 1, 0, 0, 0, 0, 0, 0, <br> 0, 0, 0, 1, 0, 0, 0, 0, 0, <br> 0, 0, 0, 0, 1, 0, 0, 0, 0, <br> 0, 0, 0, 0, 0, 1, 0, 0, 0, <br> 0, 0, 0, 0, 0, 0, 1, 0, 0, <br> 0, 0, 0, 0, 0, 0, 0, 1, 0, <br>0, 0, 0, 0, 0, 0, 0, 0, 1]";
    setInfo("Motion Blur", descripcion);
    let matrix = [[1, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 1, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 1, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 1, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 1, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 1, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 1, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 1, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 1]];
    f.doConvolution(matrix);
  };

  //Encontrar bordes
  btnBordes.onclick = () => {
    let descripcion = "Utiliza la matriz de convolución: <br>[-1, 0, 0, 0, 0, </br> 0, -2, 0, 0, 0, </br> 0, 0, 6, 0, 0, </br> 0, 0, 0, -2, 0,</br> 0, 0, 0, 0, -1]";
    setInfo("Encontrar Bordes", descripcion);
    let matrix = [[-1, 0, 0, 0, 0],
                  [0, -2, 0, 0, 0],
                  [0, 0, 6, 0, 0],
                  [0, 0, 0, -2, 0],
                  [0, 0, 0, 0, -1]];
    f.doConvolution(matrix);
  };

  //Sharpen
  btnSharpen.onclick = () => {
    let descripcion = "Utiliza la matriz de convolución: <br>[-1, -1, -1, </br> -1, 9, -1,</br> -1, -1, -1]";
    setInfo("Sharpen", descripcion);
    let matrix = [[-1, -1, -1],
                  [-1, 9, -1],
                  [-1, -1, -1]];
    f.doConvolution(matrix);
  };

  //Emboss
  btnEmboss.onclick = () => {
    let descripcion = "Utiliza la matriz de convolución: <br>[-1, -1, -1, -1, 0, </br> -1, -1, -1, 0, 1, </br> -1, -1, 0, 1, 1, </br> -1, 0, 1, 1, 1, </br> 0, 1, 1, 1, 1]";
    setInfo("Emboss", descripcion);
    let matrix = [[-1, -1, -1, -1, 0],
                  [-1, -1, -1, 0, 1],
                  [-1, -1, 0, 1, 1],
                  [-1, 0, 1, 1, 1],
                  [0, 1, 1, 1, 1]];
    f.doConvolution(matrix, 128);
  };

  // -------- Práctica 3
  //Imagen a color con letra M 
  btnMColor.onclick = () => {
    radio = setRadio();
    setInfo("Letra M a color", "Imagen formada con letras M a color <br> Tamaño de la letra: "+ radio[0] + " x "+ radio[1] + "<br> Para cambiar el tamaño selecciona nuevamente esta opción");
    f.doSopaDeLetras(radio, "ColorM");
  };

  //Imagen a escala de gris con letra M 
  btnMGris.onclick = () => {
    radio = setRadio();
    setInfo("Letra M escala gris", "Imagen formada con letras M a escala de grises <br> Tamaño de la letra: "+ radio[0] + " x "+ radio[1] + "<br> Para cambiar el tamaño selecciona nuevamente esta opción");
    f.doPerPixel((r,g,b)=> { let v = (r * 0.3 + g * 0.59 + b * 0.11);
      return [v, v, v];})
    f.doSopaDeLetras(radio, "GrisM");
  };

  //Imagen con letras a escala de gris
  btnLetrasEscala.onclick = () => {
    radio = setRadio();
    setInfo("Letras a escala de gris", "Imagen formada diferentes letras simulando una escala de gris <br> Tamaño de la letra: "+ radio[0] + " x "+ radio[1] + "<br> Para cambiar el tamaño selecciona nuevamente esta opción");
    f.doSopaDeLetras(radio, "letrasEscala", text);
  };

  //Imagen a color con letras a escala de gris
  btnLetrasColor.onclick = () => {
    radio = setRadio();
    setInfo("Letras a color", "Imagen formada diferentes letras a color <br> Tamaño de la letra: "+ radio[0] + " x "+ radio[1] + "<br> Para cambiar el tamaño selecciona nuevamente esta opción");
    f.doSopaDeLetras(radio, "letrasEscalaColor");
    
  };

  //Imagen a escala de grises con letras a escala de gris
  btnLetrasGris.onclick = () => {
    radio = setRadio();
    setInfo("Letras escala de grises", "Imagen formada con diferentes letras a escala de grises <br> Tamaño de la letra: "+ radio[0] + " x "+ radio[1] + "<br> Para cambiar el tamaño selecciona nuevamente esta opción");
    f.doPerPixel((r,g,b)=> { let v = (r * 0.3 + g * 0.59 + b * 0.11);
      return [v, v, v];})
    f.doSopaDeLetras(radio, "letrasEscalaGris");
  };

  //Imagen hecha con un texto
  btnConTexto.onclick = () => {
    radio = setRadio();
    text = prompt("Texto para la imagen", "Holaaa");
    setInfo("Imagen - texto", "Imagen formada con un texto <br> Tamaño de la letra: "+ radio[0] + " x "+ radio[1] + "<br> Para cambiar el tamaño selecciona nuevamente esta opción");
    f.doSopaDeLetras(radio, "texto", text);
  };

  //Imagen hecha con fichas de dominó negras
  btnDominoB.onclick = () => {
    radio = setRadio();
    setInfo("Imagen - Dominó", "Imagen formada con fichas blancas de dominó<br> Tamaño de la letra: "+ radio[0] + " x "+ radio[1] + "<br> Para cambiar el tamaño selecciona nuevamente esta opción");
    f.doSopaDeLetras(radio, "fDominoB");
  };

  //Imagen hecha con fichas de dominó blancas
  btnDominoN.onclick = () => {
    radio = setRadio();
    setInfo("Imagen - Dominó", "Imagen formada con fichas negras de dominó<br> Tamaño de la letra: "+ radio[0] + " x "+ radio[1] + "<br> Para cambiar el tamaño selecciona nuevamente esta opción");
    f.doSopaDeLetras(radio, "fDominoN");
  };

  //Imagen hecha con naipes
  btnNaipes.onclick = () => {
    radio = setRadio();
    setInfo("Imagen - Naipes", "Imagen formada con naipes<br> Tamaño de la letra: "+ radio[0] + " x "+ radio[1] + "<br> Para cambiar el tamaño selecciona nuevamente esta opción");
    f.doSopaDeLetras(radio, "fNaipes");
  };
}


document.addEventListener('DOMContentLoaded', main);
