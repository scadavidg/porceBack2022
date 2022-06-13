const generarString = require("./arrayToString");

const getQuerys = (parametros) => {
  const veredasanoriString = generarString(parametros.veredasAnori);
  const veredasamalfiString = generarString(parametros.veredasAmalfi);
  const veredaszaragozaString = generarString(parametros.veredasZaragoza);
  const veredas = `${veredasanoriString},${veredasamalfiString},${veredaszaragozaString}`;
  const oficiosString = generarString(parametros.oficios);

  const querys = {};

  querys.queryOP1OP5OP9OP10 = `SELECT DISTINCT(DOCUMEN),TENEVIV,ACTIVI,MUNIC,BARRIO  FROM ((SELECT sisben.DOCUMEN,sisben.TENEVIV,sisben.ACTIVI,sisben.BARRIO,sisben.MUNIC  
        FROM sisbenanori sisben, (SELECT codVereda,tipoVereda AS nomVereda FROM veredasanori WHERE tipoVereda IN(${veredasanoriString})) 
        veredas WHERE sisben.BARRIO IN (veredas.codVereda) AND sisben.EDAD <=${parametros.edadMaxima} AND sisben.EDAD >=${parametros.edadMinima}) 
        UNION (SELECT sisben.DOCUMEN,sisben.TENEVIV,sisben.ACTIVI,sisben.BARRIO,sisben.MUNIC  FROM sisbenantioquiaepm sisben, (SELECT codVereda,tipoVereda AS nomVereda 
        FROM veredasanori WHERE tipoVereda IN(${veredasanoriString})) veredas WHERE sisben.BARRIO IN (veredas.codVereda) AND sisben.TIPODOC in(1,2) AND sisben.MUNIC=40) 
        UNION (SELECT sisben.DOCUMEN,sisben.TENEVIV,sisben.ACTIVI,sisben.BARRIO,sisben.MUNIC   FROM sisbenantioquiaepm sisben, (SELECT codVereda ,nombreVereda AS nomVereda 
        FROM veredaszaragoza WHERE nombreVereda IN(${veredaszaragozaString})) veredas WHERE  sisben.BARRIO IN (veredas.codVereda) AND sisben.TIPODOC in(1,2) AND sisben.MUNIC=895) 
        UNION (SELECT sisben.DOCUMEN,sisben.TENEVIV,sisben.ACTIVI,sisben.BARRIO,sisben.MUNIC   FROM sisbenamalfi2004 sisben,(SELECT codVereda,nombreVereda AS nomVereda FROM veredasamalfi 
        WHERE nombreVereda IN(${veredasamalfiString})) veredas WHERE sisben.BARRIO IN (veredas.codVereda) AND sisben.EDAD <=${parametros.edadMaxima} AND sisben.EDAD >=${parametros.edadMinima}) 
        UNION (SELECT sisben.DOCUMEN,sisben.TENEVIV,sisben.ACTIVI,sisben.BARRIO,sisben.MUNIC   FROM sisbenantioquiaepm sisben,(SELECT codVereda,nombreVereda AS nomVereda FROM veredasamalfi 
        WHERE nombreVereda IN(${veredasamalfiString})) veredas 
        WHERE sisben.BARRIO IN (veredas.codVereda) AND sisben.TIPODOC in(1,2) AND sisben.MUNIC=31)) A`;

  querys.queryOP2 = `SELECT distinct (T.numDocumento) FROM  cpmgrupotrabajo T WHERE (T.codOficio  IN(SELECT codOficio FROM tipooficio 
        WHERE nomOficio IN(${oficiosString})) AND T.codSitioActividad IN ( SELECT codSitioActividad  from tipositioactividad WHERE nomSitioActividad IN(${veredas})) ) 
        OR (T.codOficioSecundario  IN(SELECT codOficioSecundario 
        FROM tipooficiosecundario WHERE nomOficioSecundario IN(${oficiosString})) AND  T.codSitioActivSec <=4 )`;

  querys.queryOP3 = ` SELECT distinct(numDocumento) FROM cseintegrantesgrupo A WHERE (A.codOficioPrincipal IN(SELECT distinct codOficioSecundario
        FROM tipooficiosecundario WHERE nomOficioSecundario IN(${oficiosString})) AND A.codSitioActivPrin =4 ) 
        OR (A.codOficioSecundario IN(SELECT distinct codOficioSecundario FROM tipooficiosecundario WHERE nomOficioSecundario IN(${oficiosString})) AND codSitioActivSec<=4)`;

  querys.queryOP4OP6OP9OP10 = `SELECT DISTINCT(DOCUMEN),TENEVIV,ACTIVI FROM ((SELECT sisben.DOCUMEN,sisben.TENEVIV,sisben.ACTIVI FROM sisbenanori sisben,(SELECT codVereda,tipoVereda  AS nomVereda 
        FROM veredasanori WHERE tipoVereda IN(${veredasanoriString})) veredas WHERE sisben.BARRIO NOT IN (veredas.codVereda) AND sisben.EDAD <= ${parametros.edadMaxima} 
        AND sisben.EDAD >=${parametros.edadMinima}) UNION (SELECT sisben.DOCUMEN,sisben.TENEVIV,sisben.ACTIVI FROM sisbenantioquiaepm sisben, (SELECT codVereda ,tipoVereda nomVereda FROM veredasanori 
        WHERE tipoVereda IN(${veredasanoriString}) ) veredas WHERE sisben.BARRIO NOT IN (veredas.codVereda) AND sisben.TIPODOC in(1,2) AND sisben.MUNIC=40) UNION (SELECT sisben.DOCUMEN,sisben.TENEVIV,sisben.ACTIVI 
        FROM sisbenantioquiaepm sisben, (SELECT codVereda ,nombreVereda AS nomVereda FROM veredaszaragoza WHERE nombreVereda IN(${veredaszaragozaString})) veredas WHERE sisben.BARRIO NOT IN (veredas.codVereda) 
        AND sisben.TIPODOC in(1,2) AND sisben.MUNIC=895) UNION (SELECT sisben.DOCUMEN,sisben.TENEVIV,sisben.ACTIVI FROM sisbenamalfi2004 sisben,(SELECT codVereda,nombreVereda AS nomVereda FROM veredasamalfi 
        WHERE nombreVereda IN(${veredasamalfiString})) veredas WHERE sisben.BARRIO NOT IN (veredas.codVereda) AND sisben.EDAD <= ${parametros.edadMaxima} AND sisben.EDAD >=${parametros.edadMinima}) 
        UNION (SELECT sisben.DOCUMEN,sisben.TENEVIV,sisben.ACTIVI FROM sisbenantioquiaepm sisben,(SELECT codVereda,nombreVereda AS nomVereda FROM veredasamalfi WHERE nombreVereda IN(${veredasamalfiString})) veredas 
        WHERE sisben.BARRIO NOT IN (veredas.codVereda) AND sisben.TIPODOC in(1,2) AND sisben.MUNIC=31)) A`;

  return querys;
};
module.exports = getQuerys;
