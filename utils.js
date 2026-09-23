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

async function getProducts() {
  try {
    const response = await fetch(`${API_URL}/${MAIN_PATH}`);
    if (!response.ok) {
      throw new Error('Error al intentar obtener los productos');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function getProductByID(id) {
  try {
    const response = await fetch(`${API_URL}/${MAIN_PATH}/${id}`);
    if (!response.ok) {
      throw new Error('Error al intentar obtener el producto indicado.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function postProduct(product) {
  try {
    const response = await fetch(`${API_URL}/${MAIN_PATH}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error('Error al intentar guardar el producto indicado.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function updateProductById(id, updatedData) {
  try {
    const response = await fetch(`${API_URL}/${MAIN_PATH}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error('Error al intentar actualizar el producto.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function deleteProductById(id) {
  try {
    const response = await fetch(`${API_URL}/${MAIN_PATH}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error al intentar eliminar el producto indicado.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
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
