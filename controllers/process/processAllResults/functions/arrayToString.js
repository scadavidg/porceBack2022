/* eslint-disable no-useless-concat */
/* eslint-disable no-plusplus */
const generarString = (array) => {
  let cadena = "";
  for (let index = 0; index < (array.length - 1); index++) {
    cadena += `"${array[index].toUpperCase()}"` + ",";
  }
  cadena += `"${array[array.length - 1.0].toUpperCase()}"`;
  return (cadena);
};
module.exports = generarString;
