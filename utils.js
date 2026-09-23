const API_URL = 'https://fakestoreapi.com';
export const MAIN_PATH = 'products';

function isValidId(id) {
  const numericId = Number(id);
  return Number.isInteger(numericId) && numericId > 0;
}

function parseProductData(data) {
  if (!Array.isArray(data) || data.length !== 3) {
    console.log(
      'Debe ingresar los siguientes datos: NOMBRE_PRODUCTO PRECIO CATEGORIA en ese orden preciso.',
    );
    return null;
  }

  const [title, priceStr, category] = data;
  const price = parseFloat(priceStr);

  if (!title || !category || isNaN(price) || price <= 0) {
    console.log('Debe ingresar datos válidos.');
    return null;
  }

  return { title, price, category };
}

async function apiFetch(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`[API Error]: ${error.message}`);
    return null;
  }
}

async function getProducts() {
  return apiFetch(MAIN_PATH);
}

async function getProductByID(id) {
  return apiFetch(`${MAIN_PATH}/${id}`);
}

async function postProduct(product) {
  return apiFetch(MAIN_PATH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
}

async function updateProductById(id, updatedData) {
  return apiFetch(`${MAIN_PATH}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  });
}

async function deleteProductById(id) {
  return apiFetch(`${MAIN_PATH}/${id}`, { method: 'DELETE' });
}

export async function processGetRequest(id) {
  if (id === undefined) {
    return await getProducts();
  }

  if (isValidId(id)) {
    return await getProductByID(id);
  }

  console.log('Id no válido, debe ingresar un numero entero positivo');

  return null;
}

export async function processPostRequest(data) {
  const parsedProduct = parseProductData(data);
  if (!parsedProduct) {
    return null;
  }

  return await postProduct(parsedProduct);
}

export async function processUpdateRequest(id, data) {
  if (!isValidId(id)) {
    console.log('Id no válido, debe ingresar un numero entero positivo');
    return null;
  }

  const parsedProduct = parseProductData(data);
  if (!parsedProduct) {
    return null;
  }

  return await updateProductById(id, parsedProduct);
}

export async function processDeleteRequest(id) {
  if (isValidId(id)) {
    return await deleteProductById(id);
  }
  console.log('Id no válido, debe ingresar un numero entero positivo');

  return null;
}
