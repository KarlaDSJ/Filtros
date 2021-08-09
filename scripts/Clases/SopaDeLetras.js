'use strict'

/**
 * @class
 * Clase filtro Sopa de letras, crea la imagen con legras, fichas 
 * de dominó o naipes 
 */
class SopaDeLetras {
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
  
      for (var alfa = 0; alfa < this.filtro.height; alfa += radio[1])
        for (var beta = 0; beta < this.filtro.width; beta += radio[0]) {
          let prom = this.filtro._avarage(radio, alfa, beta);
          letter = this._selectLetter(prom, i++, type, text);
          this.canvasContext.fillStyle = this._selectColor(prom, type);
          this.canvasContext.font = radio[0] + "px "+ font;
          this.canvasContext.fillText(letter, beta, alfa, radio[1]);
          
      }
   }
}