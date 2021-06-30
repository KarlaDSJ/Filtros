'use strict'

/**
 * @class
 * Clase filtro Recursión de una imágen que se le aplican al canvas dado una
 * imagen.
 */
class RecursionImage {
    /**
       * @desc Contiene un objeto tipo Filter
       * @param {Filter} f - Objeto tipo filter
       * @param {HTMLCanvasElement} canvas - Objeto html al cual se le
       *                 aplicarán los filtros
     */
  constructor(f, canvas){
    this.filtro = f;
    this.canvasContext = canvas.getContext("2d");
  }


  /**
     * @desc Aplica una mica en escala de grises
     * @param {Uint8ClampedArray} red - una copia del arreglo (color rojo del pixel)
     * @param {Uint8ClampedArray} green - una copia del arreglo (color verde del pixel)
     * @param {Uint8ClampedArray} blue - una copia del arreglo (color azul del pixel)
   */
   _doMicaBN(r, g, b){
    for(var alfa = 0; alfa < this.filtro.red.length; alfa++){
      let value = (this.filtro.red[alfa] + this.filtro.green[alfa] + this.filtro.blue[alfa]) / 3
      this.filtro.red[alfa] = this.filtro._validarRango(value & r[alfa]);
      this.filtro.green[alfa] = this.filtro._validarRango(value & g[alfa]);
      this.filtro.blue[alfa] = this.filtro._validarRango(value & b[alfa]);
    }
  }

  /**
     * @desc Aplica una mica a color
     * @param {Uint8ClampedArray} red - una copia del arreglo (color rojo del pixel)
     * @param {Uint8ClampedArray} green - una copia del arreglo (color verde del pixel)
     * @param {Uint8ClampedArray} blue - una copia del arreglo (color azul del pixel)
   */
  _doMicaC(r, g, b){
    for(var alfa = 0; alfa < this.filtro.red.length; alfa++){
      this.filtro.red[alfa] = this.filtro._validarRango(this.filtro.red[alfa] & r[alfa]);
      this.filtro.green[alfa] = this.filtro._validarRango(this.filtro.green[alfa] & g[alfa]);
      this.filtro.blue[alfa] = this.filtro._validarRango(this.filtro.blue[alfa] & b[alfa]);
    }
  }

  /**
    * @desc Genera una cuadrícula, en cada una pone la imagen 
    * @param {number} radio[0] - Ancho del cuadrado
    * @param {number} radio[1] - Alto del cuadrado
  */
  _doRecursionImage(radio){
    for (var alfa = 0; alfa < this.filtro.height; alfa += radio[1])
      for (var beta = 0; beta < this.filtro.width; beta += radio[0]) {
        this.canvasContext.drawImage(this.filtro.img, beta, alfa, radio[0], radio[1]);
    }
    
    this.filtro._updateImageData();
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
    let r = Uint8ClampedArray.from(this.filtro.red),
        g = Uint8ClampedArray.from(this.filtro.green),
        b = Uint8ClampedArray.from(this.filtro.blue);

    //Imágenes de Imágenes
    this._doRecursionImage(radio);

    //Combinamos la imágenes
    if(isColor)
      this._doMicaC(r, g, b);
    else
      this._doMicaBN(r, g, b);  

    this.filtro._setFromRGB(this.filtro.red, this.filtro.green, this.filtro.blue);
  }

}