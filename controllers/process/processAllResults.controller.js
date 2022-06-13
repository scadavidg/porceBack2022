/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
const fs = require("fs");
const path = require("path");
const GetDatosEncuestados = require("./processAllResults/GetDatosEncuestados");
const GetDatosEncuestadosC1C2 = require("./processAllResults/GetDatosEncuestadosC1C2");
const GetDatosEncuestadosC3C4 = require("./processAllResults/GetDatosEncuestadosC3C4");
const GetGroups = require("./processAllResults/GetGroups");

const processAllResults = async (req, res) => {
  //console.log(req.body.parametros);
  //global.IS_DATA_IN_PROCESS = 1;
  //res.json({ isDataInProcess: global.IS_DATA_IN_PROCESS === 1 });
  const oficios = ["draguero", "buzo", "Minidraguero o draguero", "propietario de draga",
    "operario de draga", "Minidraguero", "minidraguero", "draguero", "lavador", "barequero", "chorrero"];
  const newOfi = ["ADMINISTRADOR DE FINCA", "AGRICULTOR", "APARCERO", "ARRIERO",
    "BAREQUERO", "CARPINTERO O ASERRADOR", "COMERCIANTE FORMAL", "CORTERO", "CHORRERO", "GANADERO",
    "JORNALERO", "MADERERO", "MINERO DE VETA", "MINIDRAGUERO O DRAGUERO", "MOTORISTA Y/O AYUDANTE FLUVIAL", "PESCADOR", "RENTISTA",
    "TRANSPORTADOR FLUVIAL (PROPIETARIO DE EMBARCACIÓN)", "VAQUERO", "MOTORISTA O MAQUINISTA", "BUZO", "CACHERO", "PALERO", "CORTADOR",
    "BOMBERO", "PROPIRTARIO UNIDAD DE PRODUCCIÓN", "ADMINISTRADOR"];

  const veredasAnori = ["LIBERIA", "El ZAFIRO", "PUERTO RICO", "PARAJE LA AGUADA", "LA ESPERANZA", "LOS TROZOS"];
  const veredasZaragoza = ["PORCE MEDIO", "CANA MEDIO", "EL RETIRO", "LIMON ADENTRO", "Puerto Nuevo", "BOCAS DE CANA"];
  const veredasAmalfi = ["VEREDA LA MANGUITA", "VERDEDA TINITACITA", "VEREDA NARANJAL", "VEREDA LOS TORO"];

  const parametros = {
    edadMinima: req.body.parametros.edadMinima,
    edadMaxima: req.body.parametros.edadMaxima,
    tiempoLabor: req.body.parametros.tiempoLabor,
    veredasAnori: req.body.parametros.veredasAnori,
    veredasZaragoza: req.body.parametros.veredasZaragoza,
    veredasAmalfi: req.body.parametros.veredasAmalfi,
    oficios: req.body.parametros.oficios,
  };

  const datosEncuestados = await GetDatosEncuestados();
  const datosEncuestadosC1C2 = await GetDatosEncuestadosC1C2(datosEncuestados, parametros);
  const datosEncuestadosC1C2C3C4 = await GetDatosEncuestadosC3C4(datosEncuestadosC1C2, parametros);
  const grupos = GetGroups(datosEncuestadosC1C2C3C4);
  //fs.writeFileSync(`${__dirname}/temporaryBD.json`, JSON.stringify(grupos));
  res.json(grupos);
  //global.IS_DATA_IN_PROCESS = 0;
};

module.exports = processAllResults;
