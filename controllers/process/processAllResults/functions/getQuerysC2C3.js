const generarString = require("./arrayToString");

const getQuerys = (parametros) => {
  const oficiosString = generarString(parametros.oficios);

  const querys = {};

  querys.queryOP7OP11 = `SELECT DISTINCT(A.numDocumento) FROM (SELECT distinct(numDocumento) FROM datosencuestado 
    WHERE (profesionPrin IN(${oficiosString}) OR profesionSec IN(${oficiosString})) 
    AND (numDocumento in(SELECT numDocumento FROM cpmgrupotrabajo WHERE tiempoZona >=${parametros.tiempoLabor})) 
    UNION SELECT distinct( numDocumento) FROM cpmgrupotrabajo A, (SELECT distinct codOficioSecundario as cod FROM tipooficiosecundario 
    WHERE nomOficioSecundario IN (${oficiosString})) T WHERE (A.codOficio IN(T.cod) OR A.codOficioSecundario IN(T.cod)) 
    AND tiempoZona >=${parametros.tiempoLabor}) A`;

  querys.queryOP8OP12 = `SELECT distinct( numDocumento) FROM cseintegrantesgrupo A, (SELECT distinct codOficioSecundario as cod FROM tipooficiosecundario 
    WHERE nomOficioSecundario IN (${oficiosString})) T WHERE (A.codOficioPrincipal IN(T.cod) OR A.codOficioSecundario IN(T.cod)) 
    AND tiempoZona>=${parametros.tiempoLabor}`;

  querys.queryOP9 = `SELECT  A.DOCUMEN,A.TENEVIV,A.ACTIVI,IF(MUNIC IN('ZARAGOZA') , '895', MUNIC) AS MUNIC,A.BARRIO 
    FROM ((SELECT sisben.DOCUMEN,sisben.TENEVIV,sisben.ACTIVI,sisben.MUNIC,sisben.BARRIO FROM sisbenanori sisben 
    WHERE sisben.EDAD <=${parametros.edadMaxima} AND sisben.EDAD >=${parametros.edadMinima}) 
    UNION (SELECT sisben.DOCUMEN,sisben.TENEVIV,sisben.ACTIVI,sisben.MUNIC,sisben.BARRIO FROM sisbenantioquiaepm sisben 
    WHERE sisben.TIPODOC in(1,2) AND sisben.MUNIC in(40,895,31)) UNION (SELECT sisben.DOCUMEN,sisben.TENEVIV,sisben.ACTIVI,sisben.MUNIC,sisben.BARRIO 
    FROM sisbenamalfi2004 sisben WHERE  sisben.EDAD <=${parametros.edadMaxima} AND sisben.EDAD >=${parametros.edadMinima})) A`;

  querys.queryOP13 = "SELECT nombreJAC,numDocumento,codMunicipio FROM jacporceiv";

  return querys;
};
module.exports = getQuerys;
