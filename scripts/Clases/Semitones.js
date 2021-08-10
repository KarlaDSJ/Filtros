'use strict'

/**
 * @class
 * Clase Semitonos que simula un efecto escala de grises con blanco y negro
 * Efecto Dithering
 */
class Semitones {
    /**
       * @desc Da el efecto de escala de grises utilizando círculos negros 
       * @param {Filter} f - Objeto tipo filter
       * @param {HTMLCanvasElement} canvas - Objeto html al cual se le
       *                 aplicarán los filtros
     */
  constructor(f, canvas){
    this.filtro = f;
    this.canvasContext = canvas.getContext("2d");
  }

  /**
   * Nos dice que imagen le corresponde según su valor de gris
   * @param {number} prom 
   * @param {number} numImages 
   */
  _getValue(prom, numImages){
    let gris = Math.round((prom[0] + prom[1] + prom[2])/ 3);
    //return gris % numImages;
    return Math.round((gris/255)*(numImages-1));
  }

  /**
   * Carga las imágenes del tipo que ocuparemos
   * @param {number} radio[0] - Ancho del cuadrado
   * @param {number} radio[1] - Alto del cuadrado
   * @param {string} type - Imágenes y número que ocuparemos
   */
  async getImages(radio, type){
    let letter = type.charAt(0);
    let num = type.charAt(1);
    let images = [];

    for (let i = 0; i <= num; i++){
      images[i] = await 
                    new Promise((resolve,reject)=>{
                      var img = new Image();
                      img.src = 'resources/imagenes-semitonos/'+ letter + i+".jpg";
                      img.onload = () =>{
                        console.log("aldapds");
                        resolve(img);
                      }
                    });
    }
    console.log(images);
    this.doSemitonos(radio, images);
  }

  /**
   * Crea el efecto de escala de grises con 
   * @param {number} radio[0] - Ancho del cuadrado
   * @param {number} radio[1] - Alto del cuadrado
   * @param {Array} images - Imágenes que ocuparemos
   */
  doSemitonos(radio, images){
    //limpiamos el canvas
    this.canvasContext.clearRect(0,0,canvas.width,canvas.height);
       
    for (var alfa = 0; alfa < this.filtro.height; alfa += radio[1])
      for (var beta = 0; beta < this.filtro.width; beta += radio[0]) {
        var prom = this.filtro._avarage(radio, alfa, beta);
        var value = this._getValue(prom, images.length);
        this.canvasContext.drawImage(images[value], beta, alfa, radio[0], radio[1]);
      }
    this.filtro._updateImageData();
  }

  /**
   * Hace Dithering ordenado o disperso según la matriz
   * @param {Array} matrix - indica si será ordenado o disperso
   */
  doDithering(matrix){
    let site, val;

    for (var alfa = 0; alfa < this.filtro.height; alfa += 3)
      for (var beta = 0; beta < this.filtro.width; beta += 3) {
        //tomamos sólo el valor rojo porque al estar en escala de grises los demás son iguales
        for (var i = 0; i < 3; i ++)
            for (var j = 0; j < 3; j++) {
                site = this.filtro.width * (alfa + j) + beta + i;
                site = site > this.filtro.nPixels? this.filtro.nPixels - 1: site;
                val = Math.round(this.filtro.red[site]) / 28;
                this.filtro.red[site] = val < matrix[i][j]? 0: 255;
                this.filtro.green[site] = this.filtro.red[site];
                this.filtro.blue[site] = this.filtro.red[site];
            }
      }
    this.filtro._setFromRGB(this.filtro.red, this.filtro.green, this.filtro.blue);
  }
}