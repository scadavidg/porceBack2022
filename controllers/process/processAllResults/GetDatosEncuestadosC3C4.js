/* eslint-disable no-param-reassign */
const arregloOP9 = require("./functions/arregloOP1OP4(OP5OP9OP10_OP6OP9OP10)");
const arregloOP7OP11OP8OP12 = require("./functions/arregloOP2OP3(OP7OP11)(OP8OP12)");
const arregloOP13 = require("./functions/arregloOP13");

const getQuerys = require("./functions/getQuerysC2C3");
const pool = require("../../db/db.controller");

const GetDatosEncuestadosC3C4 = async (datosEncuestadosC1C2, parametros) => {
  const querys = getQuerys(parametros);
  const OP7OP11 = arregloOP7OP11OP8OP12(await pool(querys.queryOP7OP11));
  const OP8OP12 = arregloOP7OP11OP8OP12(await pool(querys.queryOP8OP12));
  const OP9 = arregloOP9(await pool(querys.queryOP9));
  const OP13 = arregloOP13(await pool(querys.queryOP13));

  datosEncuestadosC1C2.forEach((element) => {
    const foundOP7OP11 = OP7OP11.find((elemento) => elemento.DOCUMEN === element.DOCUMEN);
    const foundOP8OP12 = OP8OP12.find((elemento) => elemento.DOCUMEN === element.DOCUMEN);
    const foundOP9 = OP9.find((elemento) => elemento.DOCUMEN === element.DOCUMEN);
    const foundOP13 = OP13.find((elemento) => elemento.DOCUMEN === element.DOCUMEN);

    if ((foundOP7OP11 || foundOP8OP12) && foundOP9) {
      if (foundOP13) {
        if (foundOP13.MINIC === foundOP9.MINIC) {
          element.puntaje.criterio4 = 10;
        }
      }
      if (foundOP9.ACTIVI) {
        if (foundOP9.ACTIVI === "1") {
          element.puntaje.criterio3 = 30;
        } else if (foundOP9.ACTIVI === "4") {
          element.puntaje.criterio3 = 15;
        }
      }
    }
  });

  return datosEncuestadosC1C2;
};

module.exports = GetDatosEncuestadosC3C4;
