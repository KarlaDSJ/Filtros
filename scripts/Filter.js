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
    console.log(this.width +" x "+ this.height);
    this.nPixels = this.width*this.height;//Número de pixeles

    this.canvas = canvas;
    this.canvas.setAttribute("width", this.width);
    this.canvas.setAttribute("height", this.height);

    this.canvasContext = canvas.getContext("2d");
    this.canvasContext.drawImage(this.img, 0, 0, this.width, this.height);

    this.red = new Uint8ClampedArray(this.nPixels);
    this.blue = new Uint8ClampedArray(this.nPixels);
    this.green = new Uint8ClampedArray(this.nPixels);

    //Se obtienen los valores respectivos por cada pixel
    let data = this.canvasContext.getImageData(0, 0, this.width, this.height);
    for(var alfa = 0; alfa < this.nPixels; alfa++){
      this.red[alfa] = data.data[alfa*4];
      this.green[alfa] = data.data[(alfa*4)+1];
      this.blue[alfa] = data.data[(alfa*4)+2];
    }
  }

  /**
     * @desc Regresa los valores del color rojo de cada pixel
     * @return {Uint8ClampedArray} - una copia del arreglo (color rojo del pixel)
   */
  getRed(){
    return Uint8ClampedArray.from(this.red);
  }

  /**
     * @desc Regresa los valores del color verde de cada pixel
     * @return {Uint8ClampedArray} - una copia del arreglo (color verde del pixel)
   */
  getGreen(){
    return Uint8ClampedArray.from(this.green);
  }

  /**
     * @desc Regresa los valores del color azul de cada pixel
     * @return {Uint8ClampedArray} - una copia del arreglo (color azul del pixel)
   */
  getBlue(){
    return Uint8ClampedArray.from(this.blue);
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
    this._setFromRGB(this.red, this.green, this.blue);
  }

  /**
     * @desc Modifica los colores de cada pixel
     *       Muestra el resultado en el objeto canvas del html
     * @param {function} cb - función que especifica la modificación
     *                   que se le hará a cada color del pixel
   */
  setColor(cb){
    let red = Uint8ClampedArray.from(this.red);
    let green = Uint8ClampedArray.from(this.green);
    let blue = Uint8ClampedArray.from(this.blue);
    cb(red, green, blue);
    this._setFromRGB(red, green, blue);
  }

  /**
     * @desc Multiplica los colores de cada pixel por los valores dados
     *       Muestra el resultado en el objeto canvas del html
     * @param {number} redVal - valor que multiplicará el color rojo del pixel
     * @param {number} greenVal - valor que multiplicará el color verde
     *                            del pixel
     * @param {number} blueVal - valor que multiplicará el color azul del pixel
   */
  multiplyValues(redVal, greenVal, blueVal){
    let red = Uint8ClampedArray.from(this.red);
    let green = Uint8ClampedArray.from(this.green);
    let blue = Uint8ClampedArray.from(this.blue);
    for(var alfa = 0; alfa < this.red.length;alfa++){
      red[alfa] = red[alfa] * redVal;
      green[alfa] = green[alfa] * greenVal;
      blue[alfa] = blue[alfa] * blueVal;
    }
    this._setFromRGB(red, green, blue);
  }

  /**
     * @desc Calcula el promedio del color de los pixeles
     *       en un cuadrado de long * long
     * @param {number} long - Longitud del cuadrado
     * @param {number} alfa - Punto de inicio del cuadrado coordenada x
     * @param {number} beta - Punto de inicio del cuadrado coordenada y
     * @return {Array} - Arreglo con el promedio del cuadrado por colores
     *                 [0] - promedio del color rojo
     *                 [1] - promedio del color verde
     *                 [2] - promedio del color azul
   */
  _avarage(long, alfa, beta){
      let suma = [0, 0, 0];//Suma: sum[0]-rojo, sum[1]-verde, sum[2]-azul
      let numElem = long * long;
      for (var i = 0; i < long; i ++)
          for (var j = 0; j < long; j++) {
              var site = this.width * (beta + i) + alfa + j;
              suma[0] += this.red[site];
              suma[1] += this.green[site];
              suma[2] += this.blue[site];
          }
      suma = [suma[0]/numElem, suma[1]/numElem, suma[2]/numElem];//promedio
      return suma;
  }

  /**
     * @desc Dibuja cuadrados de long * long de color
     *       de acuerdo al promedio de cada pixel
     * @param {number} alfa - Punto de inicio del cuadrado coordenada x
     * @param {Array} prom - Arreglo con el promedio del cuadrado por colores
     *                 [0] - promedio del color rojo
     *                 [1] - promedio del color verde
     *                 [2] - promedio del color azul
     * @param {number} beta - Punto de inicio del cuadrado coordenada y
     * @param {number} long - Longitud del cuadrado
   */
 _pixel(alfa, beta, prom, long){
     let rgb = "rgb("+prom[0]+ ","+prom[1]+ ","+prom[2]+")";
     this.canvasContext.fillStyle = rgb;
     this.canvasContext.fillRect(alfa, beta, long, long);
 }

 /**
    * @desc Crea cuadrantes de long * long  para pixelar la imagen
    *       El resultado se muestra en el objeto canvas del html
    * @param {number} long - Longitud del cuadrado
  */
  doMosaic(long){
      let prom;
      for (var alfa = 0; alfa < this.width; alfa += long)
          for (var beta = 0; beta < this.height; beta += long) {
              prom = this._avarage(long, alfa, beta);
              this._pixel(alfa, beta, prom, long);
          }
  }

  /**
     * @desc Funcion generica para aplicar escala de grises
     * @param {function} f - función que especifica la modificación
     * que se le hará a cada del pixel según la escala de grises seleccionada
   */
  greyScaleGen(f){
    this.setColor((r,g,b)=>{
      for(var alfa=0; alfa<r.length;alfa++){
        let v = f(r[alfa],g[alfa],b[alfa]);
        r[alfa] = g[alfa] = b[alfa] = v;
      }
    });
  }
}
