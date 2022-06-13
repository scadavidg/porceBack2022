const pool = require("../../db/db.controller");
const { datosEncuestadosSource } = require("../../../sources/fuentes");

const GetDatosEncuestados = async () => {
  const arreglo = [];
  const datosEncuestados = await pool(datosEncuestadosSource.query);
  datosEncuestados.forEach((elemento) => {
    const casoEncuestado = {
      DOCUMEN: elemento.numDocumento,
      nombres: elemento.nombres,
      apellidos: elemento.apellidos ? elemento.apellidos : " ",
      puntaje: {
        criterio1: 0,
        criterio2: 0,
        criterio3: 0,
        criterio4: 0,

      },
      puntajeTotal: 0,
    };
    arreglo.push(casoEncuestado);
  });
  return arreglo;
};

module.exports = GetDatosEncuestados;
