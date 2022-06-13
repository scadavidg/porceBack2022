/* eslint-disable no-param-reassign */
const GetGroups = (datosEncuestadosC1C2C3C4) => {
  datosEncuestadosC1C2C3C4.forEach((element) => {
    element.puntajeTotal = element.puntaje.criterio1 + element.puntaje.criterio2
      + element.puntaje.criterio3 + element.puntaje.criterio4;
    if (element.puntajeTotal < 40) {
      element.grupo = "Inconsistente";
    } else if (element.puntajeTotal >= 40 && element.puntajeTotal < 50) {
      element.grupo = "Muy Baja Consistencia";
    } else if (element.puntajeTotal >= 50 && element.puntajeTotal < 60) {
      element.grupo = "Baja Consistencia";
    } else if (element.puntajeTotal >= 60 && element.puntajeTotal < 71) {
      element.grupo = "Mediana Consistencia";
    } else if (element.puntajeTotal >= 71 && element.puntajeTotal < 85) {
      element.grupo = "Alta Consistencia";
    } else if (element.puntajeTotal >= 85) {
      element.grupo = "Muy Alta Consistencia";
    } else {
      element.grupo = "Fuera de Rango";
    }
    element.documento = element.DOCUMEN;
    element.criterio1 = element.puntaje.criterio1;
    element.criterio2 = element.puntaje.criterio2;
    element.criterio3 = element.puntaje.criterio3;
    element.criterio4 = element.puntaje.criterio4;
    delete element.puntaje;
    delete element.DOCUMEN;
  });

  return datosEncuestadosC1C2C3C4;
};

module.exports = GetGroups;
