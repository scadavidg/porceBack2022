/* eslint-disable no-param-reassign */
const arregloOP1OP4 = require("./functions/arregloOP1OP4(OP5OP9OP10_OP6OP9OP10)");
const arregloOP2OP3 = require("./functions/arregloOP2OP3(OP7OP11)(OP8OP12)");

const getQuerys = require("./functions/getQuerysC1C2");
const pool = require("../../db/db.controller");

const GetDatosEncuestadosC1C2 = async (datosEncuestados, parametros) => {
  const querys = getQuerys(parametros);
  const OP1 = arregloOP1OP4(await pool(querys.queryOP1OP5OP9OP10));
  const OP2 = arregloOP2OP3(await pool(querys.queryOP2));
  const OP3 = arregloOP2OP3(await pool(querys.queryOP3));
  const OP4 = arregloOP1OP4(await pool(querys.queryOP4OP6OP9OP10));

  datosEncuestados.forEach((element) => {
    const foundOP1 = OP1.find((elemento) => elemento.DOCUMEN === element.DOCUMEN);
    const foundOP2 = OP2.find((elemento) => elemento.DOCUMEN === element.DOCUMEN);
    const foundOP3 = OP3.find((elemento) => elemento.DOCUMEN === element.DOCUMEN);
    const foundOP4 = OP4.find((elemento) => elemento.DOCUMEN === element.DOCUMEN);
    if (foundOP1 && foundOP2 && foundOP3) {
      element.puntaje.criterio1 = 30;
      if (foundOP1.TENEVIV) {
        if (foundOP1.TENEVIV === "1") {
          element.puntaje.criterio2 = 30;
        } else if (foundOP1.TENEVIV === "2") {
          element.puntaje.criterio2 = 25;
        } else if (foundOP1.TENEVIV === "3" || foundOP1.TENEVIV === "4" || foundOP1.TENEVIV === "5" || foundOP1.TENEVIV === "6" || foundOP1.TENEVIV === "20") {
          element.puntaje.criterio2 = 20;
        }
      }
    } else if (foundOP1 && (foundOP2 || foundOP3)) {
      element.puntaje.criterio1 = 25;
      if (foundOP1.TENEVIV) {
        if (foundOP1.TENEVIV === "1") {
          element.puntaje.criterio2 = 30;
        } else if (foundOP1.TENEVIV === "2") {
          element.puntaje.criterio2 = 25;
        } else if (foundOP1.TENEVIV === "3" || foundOP1.TENEVIV === "4" || foundOP1.TENEVIV === "5" || foundOP1.TENEVIV === "6" || foundOP1.TENEVIV === "20") {
          element.puntaje.criterio2 = 20;
        }
      }
    } else if ((foundOP4 && foundOP2) || (foundOP4 && foundOP3)) {
      element.puntaje.criterio1 = 10;

      if (foundOP4.TENEVIV) {
        element.puntaje.criterio2 = 10;
      } else {
        element.puntaje.criterio2 = 5;
      }
    } else if (foundOP2 && foundOP3) {
      element.puntaje.criterio1 = 5;
    }
  });

  return datosEncuestados;
};

module.exports = GetDatosEncuestadosC1C2;
