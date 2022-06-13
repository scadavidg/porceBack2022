module.exports = {
  datosEncuestadosSource: {
    query: "select distinct(A.numDocumento),A.nombres,A.apellidos from (select DISTINCT (numDocumento),nombres, apellidos from  cseintegrantesgrupo UNION select DISTINCT (numDocumento),nombres, apellidos from  cpmgrupotrabajo UNION select DISTINCT (numDocumento),nombres, apellidos from  datosencuestado UNION select DISTINCT (numDocumento),nombres, apellidos from  tmpencuestadosygrupotrabajo UNION  select DISTINCT (numDocumento),nombres, apellidos from  datosnelson) A  ",
  },
};
