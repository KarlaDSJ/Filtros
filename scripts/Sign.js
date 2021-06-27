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
       * @param {HTMLImageElement} img - Objeto html con la imagen
       * @param {HTMLCanvasElement} canvas - Objeto html al cual se le
       *                 aplicarán los filtros
     */
  constructor(){
    this.canvasText = canvasText;
    this.canvasContext = canvasText.getContext("2d");
    this.canvasText.setAttribute("width", img.width);
    this.canvasText.setAttribute("height", img.height);
    this.canvasContext.fillStyle = "white";
    this.canvasContext.fillRect(0, 0, canvasText.width, canvasText.height);
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

    return this._getRGB();
  }

}