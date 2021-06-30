// -------- Práctica 1 --------------------------------------------------------

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
    setInfo("Mosaico", "Hace que la imagen se vea pixelada <br> Tamaño del pixel:");
    dimension.style.display = "block";
    dimension.children[2].onclick = () =>{ //Obtenemos los valores ancho x alto
      slides.children[3].onclick = setRadio(radio);
      f.doMosaic(radio);
    }
    
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