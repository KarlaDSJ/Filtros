'use strict'


/**
 * @class
 * Clase filtro para controlar los filtros que se le aplican al canvas dado una
 * imagen.
 */
class Sign {
    /**
       * @desc Coloca la imagen en el canvas
       *       Extrae la información de los pixeles
       * @param {Filter} f- Objeto html con la imagen
     */
  constructor(f){
    this.canvasText = canvasText;
    this.canvasContext = canvasText.getContext("2d");
    this.canvasText.setAttribute("width", img.width);
    this.canvasText.setAttribute("height", img.height);
    this.canvasContext.fillStyle = "white";
    this.canvasContext.fillRect(0, 0, canvasText.width, canvasText.height);

    this.filtro = f;
  }

  /**
     * @desc Regresa los valores rgb de cada pixel
     * @return {Uint8ClampedArray} - una copia del arreglo (rgb)
   */
  _getRGB(){
    let nPixels = canvasText.width * canvasText.width;

    let red = new Uint8ClampedArray(nPixels);
    let blue = new Uint8ClampedArray(nPixels);
    let green = new Uint8ClampedArray(nPixels);

    //Se obtienen los valores respectivos por cada pixel
    let data = this.canvasContext.getImageData(0, 0, canvasText.width, canvasText.width);
    for(var alfa = 0; alfa < nPixels; alfa++){
      red[alfa] = data.data[alfa*4];
      green[alfa] = data.data[(alfa*4)+1];
      blue[alfa] = data.data[(alfa*4)+2];
    }
    return [red, green, blue];
  }

  /**
     * @desc Agrega un texto al canvas en la coordenada deseada
     * @param {string} text - texto 
     * @param {number} px - tamaño de la letra 
     * @param {Array} coord - Coordenadas, 
     *                      coord[0] - x, coord[1] - y
     * @return {Uint8ClampedArray} - una copia del arreglo (rgb)
   */
  setText(text, px, coord){
    this.canvasContext.fillStyle = "black";
    this.canvasContext.font = px +"px Arial";
    this.canvasContext.fillText(text, coord[0], coord[1]);
  }

  /**
     * @desc Agrega una marca de agua a la imagen
     * @param {number} alpha - Valor alpha
     *                        Tranparencia de la marca de agua
   */
   doWatermark(alpha){
    let rgb = this._getRGB();

    for(var site = 0; site < this.filtro.nPixels; site++){
        if(rgb[0][site] == 0 && rgb[1][site] == 0 && rgb[2][site] == 0){
          let r = this.filtro.red[site] * alpha +  rgb[0][site] * (1.0 - alpha);
          let g = this.filtro.green[site] * alpha + rgb[1][site] * (1.0 - alpha);
          let b = this.filtro.blue[site] * alpha + rgb[2][site] * (1.0 - alpha);

          this.filtro.red[site] = this.filtro._validarRango(r);
          this.filtro.green[site] = this.filtro._validarRango(g);
          this.filtro.blue[site] = this.filtro._validarRango(b);
        } 
      }

    this.filtro._setFromRGB(this.filtro.red, this.filtro.green, this.filtro.blue);
  }

}