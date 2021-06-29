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

 /**
  * @desc Selecciona una caracter según la escala de gris del pixel
  * @param {Array} prom - Arreglo con el promedio del cuadrado por colores
  *                 [0] - promedio del color rojo
  *                 [1] - promedio del color verde
  *                 [2] - promedio del color azul
  * @return {string} letter - Caracter según la escala de gris del pixel 
*/
 _selectLetterGris(prom){
  let letter;
  switch (true) {    
    case (prom < 16):
      letter = "M ";  
      break;                                
    case (prom < 32):
      letter = "N ";
      break;
    case (prom < 48):
      letter = "H ";
      break;
    case (prom < 64):
      letter = "# ";
      break;
    case (prom < 80):
      letter = "Q ";
      break;
    case (prom < 96):
      letter = "U ";
      break;
    case (prom < 112):
      letter = "A ";
      break;
    case (prom < 128):
      letter = "D ";
      break;
    case (prom < 144):
      letter = "O ";
      break;
    case (prom < 160):
      letter = "Y ";
      break;
    case (prom < 176):
      letter = "2 ";
      break;
    case (prom < 192):
      letter = "$ ";
      break;
    case (prom < 210):
      letter = "% ";
      break;
    case (prom < 226):
      letter = "+ ";
      break;
    case (prom < 240):
      letter = ". ";
      break;
    case (prom < 255):
      letter = " ";
      break;
  }

  return letter;
 }

/**
  * @desc Selecciona una ficha de dominó según la escala de gris del pixel
  * @param {Array} prom - Arreglo con el promedio del cuadrado por colores
  *                 [0] - promedio del color rojo
  *                 [1] - promedio del color verde
  *                 [2] - promedio del color azul
  * @return {string} letter - Caracter según la escala de gris del pixel 
*/
 _selectLetterDomino(prom){
  let letter;
  switch (true) {    
    case (prom < 37):
      letter = "0";  
      break;                                
    case (prom < 73):
      letter = "1";
      break;
    case (prom < 109):
      letter = "2";
      break;
    case (prom < 145):
      letter = "3";
      break;
    case (prom < 181):
      letter = "4";
      break;
    case (prom < 217):
      letter = "5";
      break;
    case (prom < 256):
      letter = "6";
      break;
  }

  return letter;
 }

  /**
    * @desc Selecciona una carta de naipes según la escala de gris del pixel
    * @param {Array} prom - Arreglo con el promedio del cuadrado por colores
    *                 [0] - promedio del color rojo
    *                 [1] - promedio del color verde
    *                 [2] - promedio del color azul
    * @return {string} letter - Caracter según la escala de gris del pixel 
  */
 _selectLetterNaipes(prom){
  let letter;
  switch (true) {    
    case (prom < 21):
      letter = "M ";  
      break;                                
    case (prom < 41):
      letter = "L ";
      break;
    case (prom < 61):
      letter = "K ";
      break;
    case (prom < 81):
      letter = "J ";
      break;
    case (prom < 101):
      letter = "I ";
      break;
    case (prom < 121):
      letter = "H ";
      break;
    case (prom < 141):
      letter = "G ";
      break;
    case (prom < 161):
      letter = "F ";
      break;
    case (prom < 181):
      letter = "E ";
      break;
    case (prom < 201):
      letter = "D ";
      break;
    case (prom < 221):
      letter = "C ";
      break;
    case (prom < 241):
      letter = "B ";
      break;
    case (prom < 256):
      letter = "A ";
      break;
  }

  return letter;
 }

 /**
    * @desc Selecciona el caracter correspondiente según el tipo
    * @param {Array} prom - Arreglo con el promedio del cuadrado por colores
    *                 [0] - promedio del color rojo
    *                 [1] - promedio del color verde
    *                 [2] - promedio del color azul
    * @param {string} type - Tipo de caracter
    * @param {string} text - Texto si el usuario quiere poner más de un caracter
    * @return {string} letter - Caracter según el tipo seleccionado
  */
 _selectLetter(prom, alfa, type, text){
    let letter = "M";

    prom = (prom[0] + prom[1] + prom[2])/ 3;
    if(type.startsWith('letrasEscala'))
      letter = this._selectLetterGris(prom);
    else if (type == 'texto')
      letter = text.charAt(alfa % text.length);
    else if(type.startsWith('fDomino')){
      letter = this._selectLetterDomino(prom);
      if(type == 'fDominoB')
        letter = (6 - parseInt(letter)).toString();
    } else if(type == 'fNaipes')
      letter = this._selectLetterNaipes(prom);

    return letter;
 }

  /**
    * @desc Selecciona el color del caracter según el tipo
    * @param {Array} prom - Arreglo con el promedio del cuadrado por colores
    *                 [0] - promedio del color rojo
    *                 [1] - promedio del color verde
    *                 [2] - promedio del color azul
    * @param {string} type - Tipo de caracter
    * @return {string} rgb - Regresa el color del caracter
  */
   _selectColor(prom, type){
    let rgb = "black";
    let gris = (prom[0] + prom[1] + prom[2])/ 3;

    if(type.includes("Gris"))
      rgb = "rgb("+ gris + ","+ gris + ","+ gris+")";
    if(type.includes("Color") || type == "texto") 
      rgb = "rgb("+prom[0]+ ","+prom[1]+ ","+prom[2]+")";

    return rgb;
 }

 /**
    * @desc Crea cuadrantes de ancho * alto en la imagen
    *       En cada cuadrante pone un caracter
    * @param {number} radio[0] - Ancho del cuadrado
    * @param {number} radio[1] - Alto del cuadrado
    * @param {string} type - Tipo de caracter
    * @param {string} text - Texto si el usuario quiere poner más de un caracter
  */
  doSopaDeLetras(radio, type, text){
    this.canvasContext.clearRect(0,0,canvas.width,canvas.height);
    let letter;
    let font = type.startsWith('f')? type : "Verdana";
    let i = 0; // Contador para poner el texto 

    for (var alfa = 0; alfa < this.height; alfa += radio[1])
      for (var beta = 0; beta < this.width; beta += radio[0]) {
        let prom = this._avarage(radio, alfa, beta);
        letter = this._selectLetter(prom, i++, type, text);
        this.canvasContext.fillStyle = this._selectColor(prom, type);
        this.canvasContext.font = radio[0] + "px "+ font;
        this.canvasContext.fillText(letter, beta, alfa, radio[1]);
    }
 }

  /**
    * @desc Calcula el factor de la matriz de convolución 
    * @param {Array} matrix - Matriz de convolución 
    * @return {number} regresa el factor de la matriz, si la suma es
    * mayor a 1 se divide 
  */
  _getFactor(matrix){
    let suma = 0
    for (var alfa = 0; alfa < matrix.length; alfa ++)
      for (var beta = 0; beta < matrix.length; beta ++) {
          suma += matrix[alfa][beta];
      }
    suma = suma == 0? 1: 1 / suma;
    return suma;
  }

  _applyMatrix(matrix, alfa, beta) {
    let valor = [0, 0, 0]; // [0] - r, [1] - g, [2] - b
    var length = matrix.length;
    for (var i = 0; i < length; i ++)
      for (var j = 0; j < length; j++) {
        var x = (alfa + i - Math.trunc(length/2));
        var y = (beta + j - Math.trunc(length/2));
        var site = this.width * x + y;
        valor[0] += this.red[site] * matrix[i][j];
        valor[1] += this.green[site] * matrix[i][j];
        valor[2] += this.blue[site] * matrix[i][j];
      }
    return valor;
  }

  /**
    * @desc Aplica una matriz de convolución a cada pixel
    * @param {Array} matrix - Matriz de convolución 
    * @param {number} biaas - Brillo de la imagen
  */
  doConvolution(matrix, bias = 0){
    let factor = this._getFactor(matrix);

    for (var i = 0; i < this.nPixels; i ++){
      //Calculamos alto y ancho (ubicación del pixel)
      var h = Math.trunc(i / this.height);
      var w = i % this.height;
      var valor =  this._applyMatrix(matrix, w, h); //aplicamos la matriz
      //Asignamos los nuevos valores
      this.red[w * this.width + h] = this._validarRango(factor * valor[0] + bias);
      this.green[w * this.width + h] = this._validarRango(factor * valor[1] + bias);
      this.blue[w * this.width + h] = this._validarRango(factor * valor[2] + bias);
    }
    this._setFromRGB(this.red, this.green, this.blue);
    this._updateImageData();
  }

  /**
     * @desc Agrega una marca de agua a la imagen
     * @param {Uint8ClampedArray} rgb - Valores rgb de la marca de agua
     *                            rgb[0]-rojo, rgb[1]-verde, rgb[2]-azul
     * @param {number} alpha - Valor alpha
     *                        Tranparencia de la marca de agua
   */
  doWatermark(rgb, alpha){
    for(var site = 0; site < this.nPixels; site++){
        if(rgb[0][site] == 0 && rgb[1][site] == 0 && rgb[2][site] == 0){
          let r = this.red[site] * alpha +  rgb[0][site] * (1.0 - alpha);
          let g = this.green[site] * alpha + rgb[1][site] * (1.0 - alpha);
          let b = this.blue[site] * alpha + rgb[2][site] * (1.0 - alpha);

          this.red[site] = this._validarRango(r);
          this.green[site] = this._validarRango(g);
          this.blue[site] = this._validarRango(b);
        } 
      }

    this._setFromRGB(this.red, this.green, this.blue);
  }


  /**
     * @desc Aplica una mica en escala de grises
     * @param {Uint8ClampedArray} red - una copia del arreglo (color rojo del pixel)
     * @param {Uint8ClampedArray} green - una copia del arreglo (color verde del pixel)
     * @param {Uint8ClampedArray} blue - una copia del arreglo (color azul del pixel)
   */
  _doMicaBN(r, g, b){
    for(var alfa = 0; alfa < this.red.length; alfa++){
      let value = (this.red[alfa] + this.green[alfa] + this.blue[alfa]) / 3
      this.red[alfa] = this._validarRango(value & r[alfa]);
      this.green[alfa] = this._validarRango(value & g[alfa]);
      this.blue[alfa] = this._validarRango(value & b[alfa]);
    }
  }

  /**
     * @desc Aplica una mica a color
     * @param {Uint8ClampedArray} red - una copia del arreglo (color rojo del pixel)
     * @param {Uint8ClampedArray} green - una copia del arreglo (color verde del pixel)
     * @param {Uint8ClampedArray} blue - una copia del arreglo (color azul del pixel)
   */
  _doMicaC(r, g, b){
    for(var alfa = 0; alfa < this.red.length; alfa++){
      this.red[alfa] = this._validarRango(this.red[alfa] & r[alfa]);
      this.green[alfa] = this._validarRango(this.green[alfa] & g[alfa]);
      this.blue[alfa] = this._validarRango(this.blue[alfa] & b[alfa]);
    }
  }

  /**
    * @desc Genera una cuadrícula, en cada una pone la imagen 
    * @param {number} radio[0] - Ancho del cuadrado
    * @param {number} radio[1] - Alto del cuadrado
  */
  _doRecursionImage(radio){
    for (var alfa = 0; alfa < this.height; alfa += radio[1])
      for (var beta = 0; beta < this.width; beta += radio[0]) {
        this.canvasContext.drawImage(this.img, beta, alfa, radio[0], radio[1]);
    }
    
    this._updateImageData();
  }

  /**
    * @desc Genera una imagen compuesta por pequeñas imágenes de la misma
    *       Genera una mica de color y hace AND con la imagen de imágenes
    * @param {number} radio[0] - Ancho del cuadrado
    * @param {number} radio[1] - Alto del cuadrado
    * @param {boolean} isColor - si es a color la imagen 
  */
  doRecursion(radio, isColor){
    //Mica de colores
    let r = Uint8ClampedArray.from(this.red),
        g = Uint8ClampedArray.from(this.green),
        b = Uint8ClampedArray.from(this.blue);

    //Imágenes de Imágenes
    this._doRecursionImage(radio);

    //Combinamos la imágenes
    if(isColor)
      this._doMicaC(r, g, b);
    else
      this._doMicaBN(r, g, b);  

    this._setFromRGB(this.red, this.green, this.blue);
  }

}
