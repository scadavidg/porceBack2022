const generarArreglo = (datos) => datos.map((elemento) => ({
  DOCUMEN: elemento.numDocumento,
}));
module.exports = generarArreglo;
