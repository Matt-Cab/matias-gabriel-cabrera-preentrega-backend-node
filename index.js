import {
  MAIN_PATH,
  processGetRequest,
  processPostRequest,
  processUpdateRequest,
  processDeleteRequest,
} from './utils.js';

const args = process.argv.slice(2);
const request = args[0]?.toUpperCase();
const [path, id] = args[1]?.split('/') || [];
const data = args?.slice(2);

async function main() {
  if (path !== MAIN_PATH) {
    console.log('Ruta especificada no válida.');
    return;
  }

  switch (request) {
    case 'GET': {
      const products = await processGetRequest(id);
      if (products) {
        console.log('Productos solicitados:', products);
      }
      break;
    }
    case 'POST': {
      const productSaved = await processPostRequest(data);
      if (productSaved) {
        console.log('Producto agregado correctamente:', productSaved);
      }
      break;
    }
    case 'PUT': {
      const updatedProduct = await processUpdateRequest(id, data);
      if (updatedProduct) {
        console.log('Producto actualizado con éxito:', updatedProduct);
      }
      break;
    }
    case 'DELETE': {
      const deletedProduct = await processDeleteRequest(id);
      if (deletedProduct) {
        console.log('Producto borrado con éxito:', deletedProduct);
      }
      break;
    }

    default:
      if (request) {
        console.log(
          "Comando no reconocido, debe ingresar 'GET', 'POST', 'PUT' o 'DELETE' y el resto de argumentos correspondientes.",
        );
      } else {
        console.log(
          "Debe ingresar un comando ('GET', 'POST', 'PUT' o 'DELETE') seguido de sus parámetros.",
        );
      }
      break;
  }
}

main();
