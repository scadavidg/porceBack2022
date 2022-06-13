const generarArreglo = (datos) => datos.map((elemento) => ({
  DOCUMEN: elemento.DOCUMEN,
  TENEVIV: elemento.TENEVIV,
  ACTIVI: elemento.ACTIVI,
  MUNIC: elemento.MUNIC,
  BARRIO: elemento.BARRIO,
}));
module.exports = generarArreglo;
