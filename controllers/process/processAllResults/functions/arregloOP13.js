const generarArreglo = (datos) => datos.map((elemento) => ({
  DOCUMEN: elemento.numDocumento,
  JAC: elemento.nombreJAC,
  MUNIC: elemento.codMunicipio,
}));
module.exports = generarArreglo;
