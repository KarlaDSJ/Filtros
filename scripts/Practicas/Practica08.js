// -------- Práctica 8 --------------------------------------------------------
  //Dithering al azar
  btnAzar.onclick = () => {
    setInfo("Dithering al azar", "Crea la ilusión de profundidad de color en imágenes con una paleta de colores limitada <br> dado un número al azar el cual será la referencia para poner puntos blancos o negros.");
    f.doPerPixel((r,g,b)=> { 
        let gris = (r + g + b) / 3;
        let v = Math.random() * 255;
        v = v > gris? 0: 255;
        return [v, v, v];
    })
  };

  //Dithering ordenado
  btnOrdenado.onclick = () => {
    setInfo("Dithering ordenado", "Crea la ilusión de profundidad de color en imágenes con una paleta de colores limitada <br> Utiliza la matriz de convolución: <br>[8, 3, 4, </br> 6, 1, 2, </br> 7, 5, 9]");
    //Pasamos a grises
    let matrix = [[8,3,4], [6,1,2], [7,5,9]];
    f.doPerPixel((r,g,b)=> { let v = (r + g + b) / 3;
        return [v, v, v];})
    fSemitones.doDithering(matrix);
  };

  //Dithering disperso
  btnDisperso.onclick = () => {
    setInfo("Dithering disperso", "Crea la ilusión de profundidad de color en imágenes con una paleta de colores limitada <br> Utiliza la matriz de convolución: <br>[1, 7, 4, </br> 5, 8, 3, </br> 6, 2, 9]");
    let matrix = [[1,7,4], [5,8,3], [6,2,9]];
    f.doPerPixel((r,g,b)=> { let v = (r + g + b) / 3;
        return [v, v, v];})
    fSemitones.doDithering(matrix);
  };