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
  let products = null;

  if (id === undefined) {
    products = await getProducts();
  } else if (isValidId(id)) {
    products = await getProductByID(id);
  } else {
    console.log('Id no válido, debe ingresar un numero entero positivo');
  }

  return products;
}

export async function processPostRequest(data) {
  let product = null;

  if (data.length !== 3) {
    console.log(
      'Debe ingresar los siguientes datos: NOMBRE_PRODUCTO PRECIO CATEGORIA en ese orden preciso.',
    );
  } else {
    product = parseProductData(data);
  }

  return product;
}

export async function processUpdateRequest(id, data) {
  let product = null;

  if (!isValidId(id)) {
    console.log('Id no válido, debe ingresar un numero entero positivo');
  } else if (data.length !== 3) {
    console.log(
      'Debe ingresar los siguientes datos: NOMBRE_PRODUCTO PRECIO CATEGORIA en ese orden preciso.',
    );
  } else {
    product = parseProductData(data);
  }

  return product;
}

export async function processDeleteRequest(id) {
  let product = null;

  if (isValidId(id)) {
    product = await deleteProductById(id);
  } else {
    console.log('Id no válido, debe ingresar un numero entero positivo');
  }

  return product;
}
