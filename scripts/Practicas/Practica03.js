// -------- Práctica 3 --------------------------------------------------------
  //Imagen a color con letra M 
  btnMColor.onclick = () => {
    setInfo("Letra M a color", "Imagen formada con letras M a color <br> Tamaño del pixel:");
    dimension.style.display = "block";
    dimension.children[2].onclick = () =>{ //Obtenemos los valores ancho x alto
      dimension.children[3].onclick = setRadio(radio);
      fSopa.doSopaDeLetras(radio, "ColorM");
    }
  };

  //Imagen a escala de gris con letra M 
  btnMGris.onclick = () => {
    setInfo("Letra M escala gris", "Imagen formada con letras M a escala de grises <br> Tamaño del pixel:");
    dimension.style.display = "block";
    dimension.children[2].onclick = () =>{ //Obtenemos los valores ancho x alto
      dimension.children[3].onclick = setRadio(radio);
      fSopa.doSopaDeLetras(radio, "GrisM");
    }
  };

  //Imagen con letras a escala de gris
  btnLetrasEscala.onclick = () => {
    setInfo("Letras a escala de griss", "Imagen formada diferentes letras simulando una escala de griss <br> Tamaño del pixel:");
    dimension.style.display = "block";
    dimension.children[2].onclick = () =>{ //Obtenemos los valores ancho x alto
      dimension.children[3].onclick = setRadio(radio);
      fSopa.doSopaDeLetras(radio, "letrasEscala");
    }
  };

  //Imagen a color con letras a escala de gris
  btnLetrasColor.onclick = () => {
    setInfo("Letras a color", "Imagen formada diferentes letras a color<br> Tamaño del pixel:");
    dimension.style.display = "block";
    dimension.children[2].onclick = () =>{ //Obtenemos los valores ancho x alto
      dimension.children[3].onclick = setRadio(radio);
      fSopa.doSopaDeLetras(radio, "letrasEscalaColor");
    }
  };

  //Imagen a escala de grises con letras a escala de gris
  btnLetrasGris.onclick = () => {
    setInfo("Letras escala de grises", "Imagen formada con diferentes letras a escala de grises<br> Tamaño del pixel:");
    dimension.style.display = "block";
    dimension.children[2].onclick = () =>{ //Obtenemos los valores ancho x alto
      dimension.children[3].onclick = setRadio(radio);
      fSopa.doSopaDeLetras(radio, "letrasEscalaGris");
    }
  };

  //Imagen hecha con un texto
  btnConTexto.onclick = () => {
    setInfo("Imagen - texto", "Imagen formada con un texto<br> Tamaño del pixel:");
    dimension.style.display = "block";
    dimension.children[2].onclick = () =>{ //Obtenemos los valores ancho x alto
      dimension.children[3].onclick = setRadio(radio);
      text = prompt("Texto para la imagen", "Holaaa");
      fSopa.doSopaDeLetras(radio, "texto", text);
    }
  };

  //Imagen hecha con fichas de dominó negras
  btnDominoB.onclick = () => {
    setInfo("Imagen - Dominó", "Imagen formada con fichas blancas de dominó<br> Tamaño del pixel:");
    dimension.style.display = "block";
    dimension.children[2].onclick = () =>{ //Obtenemos los valores ancho x alto
      dimension.children[3].onclick = setRadio(radio);
      fSopa.doSopaDeLetras(radio, "fDominoB");
    }
  };

  //Imagen hecha con fichas de dominó blancas
  btnDominoN.onclick = () => {
    setInfo("Imagen - Dominó", "Imagen formada con fichas negras de dominó<br> Tamaño del pixel:");
    dimension.style.display = "block";
    dimension.children[2].onclick = () =>{ //Obtenemos los valores ancho x alto
      dimension.children[3].onclick = setRadio(radio);
      fSopa.doSopaDeLetras(radio, "fDominoN");
    }
  };

  //Imagen hecha con naipes
  btnNaipes.onclick = () => {
    setInfo("Imagen - Naipes", "Imagen formada con naipes<br> Tamaño del pixel:");
    dimension.style.display = "block";
    dimension.children[2].onclick = () =>{ //Obtenemos los valores ancho x alto
      dimension.children[3].onclick = setRadio(radio);
      fSopa.doSopaDeLetras(radio, "fNaipes");
    }
  };