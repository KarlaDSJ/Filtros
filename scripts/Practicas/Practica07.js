// -------- Práctica 7 --------------------------------------------------------
  //Filtro Máximo / Mínimo 
  btnMaxMin.onclick = () => {
    setInfo("Filtro Máximo y mínimo", "Permite incrementar los puntos negros o minimizarlos (incrementar los puntos blancos).<br> Se recomienda una vecidad de 3x3, 5x5 o 7x7<br> Tamaño de la vecindad:");
    dimension.style.display = "block";
    maxMin.style.display = "flex";
    dimension.children[2].onclick = () =>{ //Obtenemos los valores ancho x alto
      dimension.children[3].onclick = setRadio(radio);
      let filtro = maxMin.children[0].checked;
      f.doPerPixel((r,g,b)=> { let v = (r + g + b) / 3; //Pasamos a escala de grises
        return [v, v, v];})
      fConvolution.doMaxMin(radio, filtro);
    }
  };