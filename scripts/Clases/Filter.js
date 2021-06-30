'use strict'

/**
 * @class
 * Clase filtro para controlar los filtros que se le aplican al canvas dado una
 * imagen.
 */
class Filter {
    /**
       * @desc Coloca la imagen en el canvas
       *       Extrae la información de los pixeles
       * @param {HTMLImageElement} img - Objeto html con la imagen
       * @param {HTMLCanvasElement} canvas - Objeto html al cual se le
       *                 aplicarán los filtros
     */
  constructor(img, canvas){
    this.img = img;
    this.width = img.width;
    this.height = img.height;
    this.nPixels = this.width*this.height;//Número de pixeles

    this.canvas = canvas;
    this.canvas.setAttribute("width", this.width);
    this.canvas.setAttribute("height", this.height);

    this.canvasContext = canvas.getContext("2d");
    this.canvasContext.drawImage(this.img, 0, 0, this.width, this.height);

    //Valores originales
    this.redOriginal = new Uint8ClampedArray(this.nPixels);
    this.blueOriginal = new Uint8ClampedArray(this.nPixels);
    this.greenOriginal = new Uint8ClampedArray(this.nPixels);

    //Se obtienen los valores respectivos por cada pixel
    let data = this.canvasContext.getImageData(0, 0, this.width, this.height);
    for(var alfa = 0; alfa < this.nPixels; alfa++){
      this.redOriginal[alfa] = data.data[alfa*4];
      this.greenOriginal[alfa] = data.data[(alfa*4)+1];
      this.blueOriginal[alfa] = data.data[(alfa*4)+2];
    }

    //Para modificar y aplicar varios filtros
    this.red = Uint8ClampedArray.from(this.redOriginal);
    this.green = Uint8ClampedArray.from(this.greenOriginal);
    this.blue = Uint8ClampedArray.from(this.blueOriginal);

  }

  /**
     * @desc Regresa los valores del color rojo de cada pixel
     * @return {Uint8ClampedArray} - una copia del arreglo (color rojo del pixel)
   */
  getRed(){
    return Uint8ClampedArray.from(this.redOriginal);
  }

  /**
     * @desc Regresa los valores del color verde de cada pixel
     * @return {Uint8ClampedArray} - una copia del arreglo (color verde del pixel)
   */
  getGreen(){
    return Uint8ClampedArray.from(this.greenOriginal);
  }

  /**
     * @desc Regresa los valores del color azul de cada pixel
     * @return {Uint8ClampedArray} - una copia del arreglo (color azul del pixel)
   */
  getBlue(){
    return Uint8ClampedArray.from(this.blueOriginal);
  }

  /**
     * @desc Actualiza el rgb de la imagen
   */
  _updateImageData(){
    let data = this.canvasContext.getImageData(0, 0, this.width, this.height);
    for(var alfa = 0; alfa < this.nPixels; alfa++){
      this.red[alfa] = data.data[alfa*4];
      this.green[alfa] = data.data[(alfa*4)+1];
      this.blue[alfa] = data.data[(alfa*4)+2];
    }

  }

  /**
     * @desc Construye una imagen con los valores rgb de cada pixel
     *       Modifica el objeto canvas del html con la nueva imagen
     * @param {Uint8ClampedArray} red - una copia del arreglo (color rojo del pixel)
     * @param {Uint8ClampedArray} green - una copia del arreglo (color verde del pixel)
     * @param {Uint8ClampedArray} blue - una copia del arreglo (color azul del pixel)
   */
  _setFromRGB(red, green, blue){
    let auxData = new Uint8ClampedArray(this.nPixels*4);
    for(var alfa = 0; alfa < this.nPixels; alfa++){ //Asigna valores rgb
      auxData[alfa*4] = red[alfa];
      auxData[(alfa*4)+1] = green[alfa];
      auxData[(alfa*4)+2] = blue[alfa];
      auxData[(alfa*4)+3] = 255;
    }
    let data = new ImageData(auxData, this.width, this.height);
    this.canvasContext.putImageData(data, 0, 0);
  } 

  /**
     * @desc Muestra la imagen original en el objeto canvas del html
   */
  reset(){
    this.red = Uint8ClampedArray.from(this.redOriginal);
    this.green = Uint8ClampedArray.from(this.greenOriginal);
    this.blue = Uint8ClampedArray.from(this.blueOriginal);

    this._setFromRGB(this.redOriginal, this.greenOriginal, this.blueOriginal);
  }

  /**
   * @desc Valida que el valor este ente 0 y 255
   * @return {number} valor RGB del pixel
 */
  _validarRango(valor){
    if(isNaN(valor) || valor > 255)
      valor = 255;
    else if(valor < 0)
      valor = 0;

    return valor;
  }

  /**
     * @desc Modifica los colores de cada pixel
     *       Muestra el resultado en el objeto canvas del html
     * @param {function} f - función que especifica la modificación
     *                   que se le hará a cada color del pixel
   */
   doPerPixel(f){
    for(var alfa = 0; alfa < this.red.length; alfa++){
      let v = f(this.redOriginal[alfa], this.greenOriginal[alfa], this.blueOriginal[alfa]);
      this.red[alfa] = this._validarRango(v[0]);
      this.green[alfa] = this._validarRango(v[1]);
      this.blue[alfa] = this._validarRango(v[2]);
    }
    this._setFromRGB(this.red, this.green, this.blue);
   }

  /**
     * @desc Calcula el promedio del color de los pixeles
     *       en un cuadrado de long * long
     * @param {number} radio[0] - Ancho del cuadrado
     * @param {number} radio[1] - Alto del cuadrado
     * @param {number} alfa - Punto de inicio del cuadrado coordenada x
     * @param {number} beta - Punto de inicio del cuadrado coordenada y
     * @return {Array} - Arreglo con el promedio del cuadrado por colores
     *                 [0] - promedio del color rojo
     *                 [1] - promedio del color verde
     *                 [2] - promedio del color azul
   */
  _avarage(radio, alfa, beta){
      let suma = [0, 0, 0];//Suma: sum[0]-rojo, sum[1]-verde, sum[2]-azul
      let numElem = radio[0] * radio[1];
      let site;
      for (var i = 0; i < radio[1]; i ++)
          for (var j = 0; j < radio[0]; j++) {
              site = this.width * (alfa + j) + beta + i;
              site = site > this.nPixels? this.nPixels - 1: site;
              suma[0] += this._validarRango(this.red[site]);
              suma[1] += this._validarRango(this.green[site]);
              suma[2] += this._validarRango(this.blue[site]);
          }
      suma = [suma[0]/numElem, suma[1]/numElem, suma[2]/numElem];//promedio
      return suma;
  }

 /**
    * @desc Crea cuadrantes de ancho * alto en la imagen
    *       El resultado se muestra en el objeto canvas del html
    * @param {number} radio[0] - Ancho del cuadrado
    * @param {number} radio[1] - Alto del cuadrado
  */
  doMosaic(radio){
    for (var alfa = 0; alfa < this.height; alfa += radio[1])
      for (var beta = 0; beta < this.width; beta += radio[0]) {
        let prom = this._avarage(radio, alfa, beta);
        let rgb = "rgb("+prom[0]+ ","+prom[1]+ ","+prom[2]+")";
        this.canvasContext.fillStyle = rgb;
        this.canvasContext.fillRect(beta, alfa, radio[0], radio[1]);
    }
    this._updateImageData();
  }
}
