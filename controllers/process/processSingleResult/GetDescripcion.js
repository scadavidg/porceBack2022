const pool = require("../../db/db.controller");

const GetDescripcion = async (numDocumento) => {
  const descripcion = {
    cse: null,
    cpm: null,
    personal: null,
    sisbenAntioquiaEpm: null,
    sisbenAnori: null,
    sisbenAmalfi: null,
  };

  const sisbenNoAplica = {
    documento: "No registra",
    nombre: "No registra",
    apellidos: "No registra",
    edad: "No registra",
    municipio: "No registra",
    tenenciaVivienda: "No registra",
    fecha: "No registra",
    barrio: "No registra",
    actividad: "No registra",
    zona: "No registra",
    numeroHijos: "No registra",
  };

  const cse = await pool(`SELECT cse.nombres as nombres,cse.edadCumplida as edad ,cse.apellidos as apellidos,
    cse.consecutivo,mun.nomMunicipio as municipio,cse.fechaGraba as fecha ,ocup.nomOcupacion as ocupacion ,
    activhabi.nomActivHabitual as actividadHabitual,oficiosec.nomOficioSecundario as oficioPrincipal,
    sitiosec.nomSitioActivSec as sitioActividad,cse.tiempoZona as tiempoZona,cse.numMeses numMeses1,
    oficiosec2.nomOficioSecundario as oficioSecundario,cse.numMesesSec as numMeses2,cse.tiempoOficio as tiempoOficio,
    sitiosec2.nomSitioActivSec as sitioActividadSec,ingresomensual.nomIngreso as ingresos,
    fuentetrabajo.codFuenteTrabajo as fuenteTrabajo FROM cseintegrantesgrupo cse,municipios mun,tipoocupacional ocup,
    tipoactivhabitual activhabi,tipooficiosecundario oficiosec,tipooficiosecundario oficiosec2,tipositiosecundario sitiosec,
    tipositiosecundario sitiosec2,tipoingresomensual ingresomensual, tipofuentetrabajo fuentetrabajo  
    WHERE (mun.codMunicipio=cse.codMunicipioVivia and mun.codDepartamento=05) and (ocup.codOcupacion=cse.codOcupacion) 
    and (activhabi.codActivHabitual=cse.codActivHabitual) and (oficiosec.codOficioSecundario= cse.codOficioPrincipal) 
    and (oficiosec2.codOficioSecundario= cse.codOficioSecundario) and (sitiosec.codSitioActivSec= cse.codSitioActivPrin) 
    and   (sitiosec2.codSitioActivSec= cse.codSitioActivSec) and (cse.codIngreso =ingresomensual.codIngreso) 
    and (fuentetrabajo.nomFuenteTrabajo = cse.codFuenteTrabajo) and  numDocumento=${numDocumento}`);
  if (cse.length >= 1) {
    descripcion.personal = {
      nombres: cse[0].nombres,
      apellidos: cse[0].apellidos,
    };
    descripcion.cse = {
      nombre: `${cse[0].nombres} ${cse[0].apellidos}`,
      consecutivo: cse[0].consecutivo,
      edad: cse[0].edad,
      municipioResidencia: cse[0].municipio,
      fecha: cse[0].fecha,
      ocupacion: cse[0].ocupacion,
      actividadHabitual: cse[0].actividadHabitual,
      oficioPrincipal: cse[0].oficioPrincipal,
      sitioActividad: cse[0].sitioActividad,
      tiempoZona: cse[0].tiempoZona,
      numMeses1: cse[0].numMeses1,
      oficioSecundario: cse[0].oficioSecundario,
      numMeses2: cse[0].numMeses2,
      tiempoOficio: cse[0].tiempoOficio,
      sitioActividadSec: cse[0].sitioActividadSec,
      ingresos: cse[0].ingresos,
      fuenteTrabajo: cse[0].fuenteTrabajo,
    };
  } else {
    descripcion.personal = {
      nombres: "No registra",
      apellidos: "No registra",
    };
    descripcion.cse = {
      nombre: "No registra",
      consecutivo: "No registra",
      edad: "No registra",
      municipioResidencia: "No registra",
      fecha: "No registra",
      ocupacion: "No registra",
      actividadHabitual: "No registra",
      oficioPrincipal: "No registra",
      sitioActividad: "No registra",
      tiempoZona: "No registra",
      numMeses1: "No registra",
      oficioSecundario: "No registra",
      numMeses2: "No registra",
      tiempoOficio: "No registra",
      sitioActividadSec: "No registra",
      ingresos: "No registra",
      fuenteTrabajo: "No registra",
    };
  }

  const cpm = await pool(`SELECT cpm.nombres as nombres,cpm.apellidos as apellidos,cpm.edadCumplida as edad,cpm.consecutivo as consecutivo,
    mun.nomMunicipio as municipio,cpm.fechaGraba as fecha,ocup.nomOcupacion as ocupacion,activhabi.nomActivHabitual as actividadHabitual,
    oficio.nomOficio as oficio,sitioactividad.nomSitioActividad as sitioActividad,cpm.tiempoZona as tiempoZona,cpm.numMeses as numMeses1,
    oficiosec2.nomOficioSecundario as oficioSecundario,cpm.numMesesSec as numMeses2,cpm.tiempoOficio as tiempoOficio,sitiosec2.nomSitioActivSec as sitioActividadSec,
    ingresomensual.nomIngreso as ingresos,fuentetrabajo.codFuenteTrabajo as fuenteTrabajo FROM cpmgrupotrabajo cpm,municipios mun,tipoocupacional ocup,
    tipoactivhabitual activhabi,tipooficio oficio,tipooficiosecundario oficiosec2,tipositioactividad sitioactividad,tipositiosecundario sitiosec2,tipoingresomensual ingresomensual,
    tipofuentetrabajo fuentetrabajo  WHERE (mun.codMunicipio=cpm.codMunicipioRes and mun.codDepartamento=05) and (ocup.codOcupacion=cpm.codOcupacion) and
    (activhabi.codActivHabitual=cpm.codActivHabitual) and (oficio.codOficio= cpm.codOficio)and (oficiosec2.codOficioSecundario= cpm.codOficioSecundario) and 
    (sitioactividad.codSitioActividad= cpm.codSitioActividad) and   (sitiosec2.codSitioActivSec= cpm.codSitioActivSec) and (cpm.codIngreso =ingresomensual.codIngreso) and 
    (fuentetrabajo.nomFuenteTrabajo = cpm.codFuenteTrabajo) and  numDocumento=${numDocumento}`);
  if (cpm.length >= 1) {
    descripcion.personal = {
      nombres: cpm[0].nombres,
      apellidos: cpm[0].apellidos,
    };
    descripcion.cpm = {
      nombre: `${cpm[0].nombres} ${cpm[0].apellidos}`,
      consecutivo: cpm[0].consecutivo,
      edad: cpm[0].edad,
      municipioResidencia: cpm[0].municipio,
      fecha: cpm[0].fecha,
      ocupacion: cpm[0].ocupacion,
      actividadHabitual: cpm[0].actividadHabitual,
      oficioPrincipal: cpm[0].oficio,
      sitioActividad: cpm[0].sitioActividad,
      tiempoZona: cpm[0].tiempoZona,
      numMeses1: cpm[0].numMeses1,
      oficioSecundario: cpm[0].oficioSecundario,
      numMeses2: cpm[0].numMeses2,
      tiempoOficio: cpm[0].tiempoOficio,
      sitioActividadSec: cpm[0].sitioActividadSec,
      ingresos: cpm[0].ingresos,
      fuenteTrabajo: cpm[0].fuenteTrabajo,
    };
  } else {
    descripcion.personal = {
      nombres: "No registra",
      apellidos: "No registra",
    };
    descripcion.cpm = {
      nombre: "No registra",
      consecutivo: "No registra",
      edad: "No registra",
      municipioResidencia: "No registra",
      fecha: "No registra",
      ocupacion: "No registra",
      actividadHabitual: "No registra",
      oficioPrincipal: "No registra",
      sitioActividad: "No registra",
      tiempoZona: "No registra",
      numMeses1: "No registra",
      oficioSecundario: "No registra",
      numMeses2: "No registra",
      tiempoOficio: "No registra",
      sitioActividadSec: "No registra",
      ingresos: "No registra",
      fuenteTrabajo: "No registra",
    };
  }

  const sisbenAntioquiaEpm = await pool(`SELECT sisben.DOCUMEN,sisben.NOM1,sisben.NOM2,sisben.APE1,sisben.APE2,sisben.EDAD,municipio.nomMunicipio AS MUNIC,tenencia.descripcion AS TENEVIV,
    sisben.FECHA,sisben.BARRIO,actividad.nomActividad AS ACTIVI,sisben.ZONA, 'No registra' AS HIJOS FROM sisbenantioquiaepm sisben,municipios municipio,p3_tipo_tenencia tenencia,p3_tipo_actividad actividad 
    WHERE municipio.codMunicipio=sisben.MUNIC AND tenencia.cod_tipo_tenencia=sisben.TENEVIV AND actividad.codActividad=sisben.ACTIVI AND DOCUMEN=${numDocumento}`);

  if (sisbenAntioquiaEpm.length >= 1) {
    descripcion.sisbenAntioquiaEpm = {
      documento: sisbenAntioquiaEpm[0].DOCUMEN,
      nombre: `${sisbenAntioquiaEpm[0].NOM1} ${sisbenAntioquiaEpm[0].NOM2}`,
      apellidos: `${sisbenAntioquiaEpm[0].APE1} ${sisbenAntioquiaEpm[0].APE2}`,
      edad: sisbenAntioquiaEpm[0].EDAD,
      municipio: sisbenAntioquiaEpm[0].MUNIC,
      tenenciaVivienda: sisbenAntioquiaEpm[0].TENEVIV,
      fecha: sisbenAntioquiaEpm[0].FECHA.slice(0, 10),
      barrio: sisbenAntioquiaEpm[0].BARRIO,
      actividad: sisbenAntioquiaEpm[0].ACTIVI,
      zona: sisbenAntioquiaEpm[0].ZONA,
      numeroHijos: sisbenAntioquiaEpm[0].HIJOS,
    };
  } else {
    descripcion.sisbenAntioquiaEpm = sisbenNoAplica;
  }

  const sisbenAnori = await pool(`SELECT sisben.DOCUMEN,sisben.NOM1,sisben.NOM2,sisben.APE1,sisben.APE2,sisben.EDAD,municipio.nomMunicipio AS MUNIC,
    tenencia.descripcion AS TENEVIV,sisben.FECHA,sisben.BARRIO,actividad.nomActividad AS ACTIVI,sisben.ZONA, sisben.HIJOSDE AS HIJOS FROM sisbenanori sisben,municipios 
    municipio,p3_tipo_tenencia tenencia,p3_tipo_actividad actividad WHERE municipio.codMunicipio=sisben.MUNIC AND tenencia.cod_tipo_tenencia=sisben.TENEVIV 
    AND actividad.codActividad=sisben.ACTIVI AND DOCUMEN=${numDocumento}`);
  if (sisbenAnori.length >= 1) {
    descripcion.sisbenAnori = {
      documento: sisbenAnori[0].DOCUMEN,
      nombre: `${sisbenAnori[0].NOM1} ${sisbenAnori[0].NOM2}`,
      apellidos: `${sisbenAnori[0].APE1} ${sisbenAnori[0].APE2}`,
      edad: sisbenAnori[0].EDAD,
      municipio: sisbenAnori[0].MUNIC,
      tenenciaVivienda: sisbenAnori[0].TENEVIV,
      fecha: `${sisbenAnori[0].FECHA.toString().slice(0, 4)}-${sisbenAnori[0].FECHA.toString().slice(4, 6)}-${sisbenAnori[0].FECHA.toString().slice(6, 8)}`,
      barrio: sisbenAnori[0].BARRIO,
      actividad: sisbenAnori[0].ACTIVI,
      zona: sisbenAnori[0].ZONA,
      numeroHijos: sisbenAnori[0].HIJOS,
    };
  } else {
    descripcion.sisbenAnori = sisbenNoAplica;
  }

  const sisbenAmalfi = await pool(`SELECT sisben.DOCUMEN,sisben.NOM1,sisben.NOM2,sisben.APE1,sisben.APE2,sisben.EDAD,municipio.nomMunicipio AS MUNIC,tenencia.descripcion TENEVIV,
    sisben.FECHA,sisben.BARRIO,actividad.nomActividad ACTIVI,sisben.ZONA, sisben.HIJOSDE AS HIJOS FROM sisbenamalfi2004 sisben,municipios municipio,p3_tipo_tenencia tenencia,p3_tipo_actividad actividad 
    WHERE municipio.codMunicipio=sisben.MUNIC AND tenencia.cod_tipo_tenencia=sisben.TENEVIV AND actividad.codActividad=sisben.ACTIVI AND DOCUMEN=${numDocumento}`);
  if (sisbenAmalfi.length >= 1) {
    descripcion.sisbenAmalfi = {
      documento: sisbenAmalfi[0].DOCUMEN,
      nombre: `${sisbenAmalfi[0].NOM1} ${sisbenAmalfi[0].NOM2}`,
      apellidos: `${sisbenAmalfi[0].APE1} ${sisbenAmalfi[0].APE2}`,
      edad: sisbenAmalfi[0].EDAD,
      municipio: sisbenAmalfi[0].MUNIC,
      tenenciaVivienda: sisbenAmalfi[0].TENEVIV,
      fecha: `${sisbenAmalfi[0].FECHA.toString().slice(0, 4)}-${sisbenAmalfi[0].FECHA.toString().slice(4, 6)}-${sisbenAmalfi[0].FECHA.toString().slice(6, 8)}`,
      barrio: sisbenAmalfi[0].BARRIO,
      actividad: sisbenAmalfi[0].ACTIVI,
      zona: sisbenAmalfi[0].ZONA,
      numeroHijos: sisbenAmalfi[0].HIJOS,
    };
  } else {
    descripcion.sisbenAmalfi = sisbenNoAplica;
  }

  return descripcion;
};

module.exports = GetDescripcion;
