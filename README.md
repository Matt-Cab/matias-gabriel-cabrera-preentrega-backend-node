# Pre-entrega de proyecto para el curso de backend con Node

Desarrollada en Node.js, interactúa con la API REST [FakeStoreAPI](https://fakestoreapi.com/?utm_source=gemini) para gestionar productos mediante los métodos HTTP principales (`GET`, `POST`, `PUT`, `DELETE`).

---

## Descripción

Este proyecto permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre la colección de productos de **FakeStoreAPI** directamente desde la terminal de comandos, utilizando **Node.js** y la API nativa `fetch`.

---

## Requisitos Previos

* **Node.js** v18.0.0 o superior (para soporte nativo de `fetch`).

---

## Instalación y Uso

Clonar o descargar este repositorio y situarte dentro del directorio del proyecto en la terminal.

### Sintaxis General

```
node index.js <MÉTODO> <RUTA[/ID]> [<NOMBRE>] [<PRECIO>] [<CATEGORÍA>]

```

* **`<MÉTODO>`**: Acción a realizar (`GET`, `POST`, `PUT`, `DELETE`). Se pueden utilizar tanto mayusculas como minúsculas.

* **`<RUTA>`**: Debe ser obligatoriamente `products`. Para endpoints con ID se utiliza el formato `products/<id>`.

* **`<NOMBRE>`**: Nombre o título del producto (utiliza comillas si contiene espacios).

* **`<PRECIO>`**: Precio numérico positivo (ej: `25.99`).

* **`<CATEGORÍA>`**: Categoría a la que pertenece el producto.

---

## Ejemplos de Comandos

### 1. Obtener todos los productos (`GET`)

Recupera el listado completo de productos desde la API.

```
node index.js GET products
```

### 2. Obtener un producto por ID (`GET`)

Recupera la información de un producto específico pasando su identificador.

```
node index.js GET products/1
```

### 3. Crear un nuevo producto (`POST`)

Agrega un nuevo producto a la API. Se deben proporcionar tres parámetros adicionales: **Nombre**, **Precio** y **Categoría**.

```
node index.js POST products "Polera Deportiva" 29.99 "ropa"
```

> **Nota:** Si el nombre del producto contiene espacios, asegúrate de envolverlo entre comillas dobles (`"..."`).

### 4. Actualizar un producto existente (`PUT`)

Actualiza la información de un producto especificando su ID y los nuevos datos: **Nombre**, **Precio** y **Categoría**.

```
node index.js PUT products/1 "Zapatillas Deportivas" 79.99 "calzado"
```

### 5. Eliminar un producto (`DELETE`)

Elimina un producto de la base de datos a través de su ID.

```
node index.js DELETE products/1
```
---

## Manejo de Errores y Validaciones

* **Ruta inválida**: Si indicas una ruta distinta a `products` (ej: `users`), la CLI responderá con `Ruta especificada no válida.`.

* **Parámetros insuficientes**: Para comandos `POST` o `PUT`, es obligatorio incluir exactamente 3 argumentos para los datos del producto (Nombre, Precio y Categoría).

* **ID no válido**: Los ID deben ser números enteros positivos.

* **Comando no reconocido**: Si ingresas un método distinto a `GET`, `POST`, `PUT` o `DELETE`, se mostrará un mensaje de ayuda en pantalla.
