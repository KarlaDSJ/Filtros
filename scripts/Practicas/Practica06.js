// -------- Práctica 6 --------------------------------------------------------
  //Imagen semitonos  2x2
  btnCirc2x2.onclick = () => {
    setInfo("Semitonos 2x2", "Da la idea de tener tonos de gris utilizando círculos en una cuadrícula de 2x2<br> Tamaño del pixel:");
    dimension.style.display = "block";
    dimension.children[2].onclick = () =>{ //Obtenemos los valores ancho x alto
      dimension.children[3].onclick = setRadio(radio); 
      fSemitones.getImages(radio,'c4');  
    }
  };

  //Imagen semitonos  3x3
  btnCirc3x3.onclick = () => {
    setInfo("Semitonos 3x3", "Da la idea de tener tonos de gris utilizando círculos en una cuadrícula de 3x3<br> Tamaño del pixel:");
    dimension.style.display = "block";
    dimension.children[2].onclick = () =>{ //Obtenemos los valores ancho x alto
      dimension.children[3].onclick = setRadio(radio);
      fSemitones.getImages(radio,'b9');
    }
  };

  //Imagen semitonos  3x3 variación
  btnCirc4.onclick = () => {
    setInfo("Semitonos 3x3", "Da la idea de tener tonos de gris utilizando un círculo de diferente tamaño en una cuadrícula de 3x3<br> Tamaño del pixel:");
    dimension.style.display = "block";
    dimension.children[2].onclick = () =>{ //Obtenemos los valores ancho x alto
        dimension.children[3].onclick = setRadio(radio); 
        fSemitones.getImages(radio,'a9');
    }
  };