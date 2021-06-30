// -------- Práctica 4 --------------------------------------------------------
  //Imagen a color con letra M 
  btnMarcaAgua.onclick = () => {
    setInfo("Marca de agua", "Da click en el recuadro blanco en el lugar donde deseas poner la marca de agua. <br> También puedes modificar el texto, tamaño y la transparencia.");
    waterMark.style.display = "block";
    canvasText.style.display = "block";
    img.style.display = "none";

    canvasText.addEventListener('click', function(event) { //Obtenemos los valores ancho x alto
      text = waterMark.children[0].children[1].value;
      let num = waterMark.children[1].children[1].value;
      let alpha = waterMark.children[2].children[1].value / 10;
      s.setText(text, num, 
            [event.offsetX, event.offsetY]);
      s.doWatermark(alpha);
    }, false)
  }