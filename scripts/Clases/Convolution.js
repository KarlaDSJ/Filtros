'use strict'

/**
 * @class
 * Clase que aplica una matriz de convolución a una imagen
 */
class Convolution {
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
        var site = this.filtro.width * x + y;
        valor[0] += this.filtro.red[site] * matrix[i][j];
        valor[1] += this.filtro.green[site] * matrix[i][j];
        valor[2] += this.filtro.blue[site] * matrix[i][j];
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

    for (var i = 0; i < this.filtro.nPixels; i ++){
      //Calculamos alto y ancho (ubicación del pixel)
      var h = Math.trunc(i / this.filtro.height);
      var w = i % this.filtro.height;
      var valor =  this._applyMatrix(matrix, w, h); //aplicamos la matriz
      //Asignamos los nuevos valores
      this.filtro.red[w * this.filtro.width + h] = this.filtro._validarRango(factor * valor[0] + bias);
      this.filtro.green[w * this.filtro.width + h] = this.filtro._validarRango(factor * valor[1] + bias);
      this.filtro.blue[w * this.filtro.width + h] = this.filtro._validarRango(factor * valor[2] + bias);
    }
    this.filtro._setFromRGB(this.filtro.red, this.filtro.green, this.filtro.blue);
    this.filtro._updateImageData();
  }

  /**
   * Permite incrementar los puntos negros o minimizarlos
   * Recorre cada pixel, coloca una matriz y toma el mayor o el menor
   * @param {number} radio[0] - Ancho del cuadrado
   * @param {number} radio[1] - Alto del cuadrado 
   * @param {boolean} isMax
   */
   doMaxMin(radio, isMax){
    let val = [];
    let site, maxMin;
  
    for (var alfa = 0; alfa < this.filtro.height; alfa ++)
      for (var beta = 0; beta < this.filtro.width; beta ++) {
        //Matriz 
        for (var i = 0; i < radio[1]; i ++)
          for (var j = 0; j < radio[0]; j++) {
              site = this.filtro.width * (alfa + j) + beta + i;
              site = site > this.filtro.nPixels? this.filtro.nPixels - 1: site;
              //tomamos sólo el valor rojo porque al estar en escala de grises los demás son iguales
              val.push(this.filtro.red[site]);
          }
          //Obtnemos el mínimo o el máximo 
          maxMin = isMax? Math.max.apply(Math, val): Math.min.apply(Math,val);
          this.filtro.red[site] = maxMin;
          this.filtro.green[site] = maxMin;
          this.filtro.blue[site] = maxMin;
          val = [];
    }
    this.filtro._setFromRGB(this.filtro.red, this.filtro.green, this.filtro.blue);
  }

}