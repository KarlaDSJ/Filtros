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
    fConvolution.doConvolution(matrix);
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
    fConvolution.doConvolution(matrix);
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
    fConvolution.doConvolution(matrix);
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
    fConvolution.doConvolution(matrix);
  };

  //Sharpen
  btnSharpen.onclick = () => {
    let descripcion = "Utiliza la matriz de convolución: <br>[-1, -1, -1, </br> -1, 9, -1,</br> -1, -1, -1]";
    setInfo("Sharpen", descripcion);
    let matrix = [[-1, -1, -1],
                  [-1, 9, -1],
                  [-1, -1, -1]];
    fConvolution.doConvolution(matrix);
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
    fConvolution.doConvolution(matrix, 128);
  };
