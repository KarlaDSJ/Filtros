// -------- Práctica 5 --------------------------------------------------------
  //Imagen Recursiva escala de grises 
  btnRecursivaBN.onclick = () => {
    setInfo("Imagen recursiva", "Imagen formada con la misma imagen a escala de grises<br> Tamaño del pixel:");
    dimension.style.display = "block";
    dimension.children[2].onclick = () =>{ //Obtenemos los valores ancho x alto
      dimension.children[3].onclick = setRadio(radio);
      f.doPerPixel((r,g,b)=> { let v = (r + g + b) / 3;
        return [v, v, v];})
      f.doMosaic(radio);
      fRecursion.doRecursion(radio, false);
    }
  };

  //Imagen Recursiva color
  btnRecursivaC.onclick = () => {
    setInfo("Imagen recursiva", "Imagen formada con la misma imagen a color<br> Tamaño del pixel:");
    dimension.style.display = "block";
    dimension.children[2].onclick = () =>{ //Obtenemos los valores ancho x alto
      dimension.children[3].onclick = setRadio(radio);
      f.doMosaic(radio);
      fRecursion.doRecursion(radio, true);
    }
  };