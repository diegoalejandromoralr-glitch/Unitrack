# 🎓 UNITRACK — PLAN MAESTRO PARA CURSOR
## Plataforma Integral de Gestión Universitaria
### Universidad Regional de Guatemala

---

> **¿QUÉ ES ESTE DOCUMENTO?**
> Este es el plan maestro que le darás a Cursor (el editor de código con IA) para que construya
> el proyecto UniTrack completo. Cada sección le dice exactamente qué crear, cómo organizarlo
> y qué código escribir. Puedes dárselo completo o sección por sección por fase.

---

## 📋 ÍNDICE

1. [Resumen del Proyecto](#1-resumen-del-proyecto)
2. [Stack Tecnológico](#2-stack-tecnológico)
3. [Estructura de Carpetas](#3-estructura-de-carpetas)
4. [Configuración Inicial](#4-configuración-inicial)
5. [FASE 1 — Listas Enlazadas (Estudiantes)](#5-fase-1--listas-enlazadas-estudiantes)
6. [FASE 2 — Árboles BST y AVL (Cursos)](#6-fase-2--árboles-bst-y-avl-cursos)
7. [FASE 3 — Tabla Hash (Catedráticos)](#7-fase-3--tabla-hash-catedráticos)
8. [FASE 4 — Grafos (Pensum)](#8-fase-4--grafos-pensum)
9. [API REST — Todos los Endpoints](#9-api-rest--todos-los-endpoints)
10. [Frontend Angular — Módulos](#10-frontend-angular--módulos)
11. [Criterios de Calidad](#11-criterios-de-calidad)

---

## 1. RESUMEN DEL PROYECTO

**UniTrack** es una aplicación web universitaria que gestiona:
- Estudiantes (con Lista Enlazada Simple)
- Historial de inscripciones (con Lista Doblemente Enlazada)
- Catálogo de cursos (con Árbol BST + AVL)
- Directorio de catedráticos (con Tabla Hash)
- Mapa de prerrequisitos del pensum (con Grafo Dirigido)

**REGLA FUNDAMENTAL:** Todas las estructuras de datos deben codificarse desde cero como
clases propias. NO usar librerías como `collections`, `lodash`, ni ninguna que ya traiga
estas estructuras listas.

---

## 2. STACK TECNOLÓGICO

```
FRONTEND:  Angular 17+  con  TypeScript (modo estricto)
BACKEND:   Node.js      con  Express.js
BASE DE DATOS:  Archivos JSON  (o MongoDB/PostgreSQL si se prefiere)
VISUALIZACIÓN:  D3.js  o  vis.js  (para dibujar las estructuras en pantalla)
UI COMPONENTS:  Angular Material  o  PrimeNG
```

**¿Qué significa cada uno?**
- **Angular**: Framework (conjunto de herramientas) para construir la pantalla que ve el usuario (frontend).
- **TypeScript**: Es JavaScript pero con "tipos" — obliga a declarar qué tipo de dato es cada variable (número, texto, etc.), lo que reduce errores.
- **Node.js**: Permite ejecutar JavaScript en el servidor (backend), no solo en el navegador.
- **Express.js**: Librería que simplifica crear un servidor web con Node.js.
- **D3.js / vis.js**: Librerías para dibujar gráficos interactivos en el navegador (árboles, grafos, etc.).

---

## 3. ESTRUCTURA DE CARPETAS

Instrucción para Cursor: **Crea exactamente esta estructura de archivos y carpetas.**

```
unitrack/
├── backend/                          ← Servidor Node.js
│   ├── package.json                  ← Dependencias del backend
│   ├── src/
│   │   ├── app.js                    ← Punto de entrada del servidor
│   │   ├── routes/                   ← Define las URLs de la API
│   │   │   ├── estudiantes.routes.js
│   │   │   ├── cursos.routes.js
│   │   │   ├── catedraticos.routes.js
│   │   │   └── pensum.routes.js
│   │   ├── controllers/              ← Lógica de cada ruta
│   │   │   ├── estudiantes.controller.js
│   │   │   ├── cursos.controller.js
│   │   │   ├── catedraticos.controller.js
│   │   │   └── pensum.controller.js
│   │   ├── services/                 ← Aquí viven las estructuras de datos
│   │   │   ├── data-structures/
│   │   │   │   ├── LinkedList.js           ← Lista Enlazada Simple
│   │   │   │   ├── DoublyLinkedList.js     ← Lista Doblemente Enlazada
│   │   │   │   ├── BST.js                  ← Árbol Binario de Búsqueda
│   │   │   │   ├── AVLTree.js              ← Árbol AVL (balanceado)
│   │   │   │   ├── HashTable.js            ← Tabla Hash
│   │   │   │   └── DirectedGraph.js        ← Grafo Dirigido
│   │   │   ├── estudiantes.service.js
│   │   │   ├── cursos.service.js
│   │   │   ├── catedraticos.service.js
│   │   │   └── pensum.service.js
│   │   └── data/                     ← Archivos JSON de persistencia
│   │       ├── estudiantes.json
│   │       ├── cursos.json
│   │       ├── catedraticos.json
│   │       └── pensum.json
│
└── frontend/                         ← Aplicación Angular
    ├── package.json
    ├── angular.json
    ├── src/
    │   ├── main.ts                   ← Punto de entrada Angular
    │   ├── app/
    │   │   ├── app.module.ts         ← Módulo raíz
    │   │   ├── app-routing.module.ts ← Rutas de navegación
    │   │   ├── shared/               ← Componentes reutilizables
    │   │   │   ├── navbar/
    │   │   │   └── sidebar/
    │   │   └── modules/              ← Un módulo por fase
    │   │       ├── estudiantes/      ← FASE 1
    │   │       ├── cursos/           ← FASE 2
    │   │       ├── catedraticos/     ← FASE 3
    │   │       └── pensum/           ← FASE 4
```

---

## 4. CONFIGURACIÓN INICIAL

### 4.1 Backend — package.json

Instrucción para Cursor: **Crea el archivo `backend/package.json` con este contenido:**

```json
{
  "name": "unitrack-backend",
  "version": "1.0.0",
  "description": "Backend de UniTrack - Estructuras de Datos",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

> **¿Qué es cada dependencia?**
> - `express`: El framework del servidor web.
> - `cors`: Permite que Angular (en otro puerto) hable con Node.js sin errores de seguridad.
> - `morgan`: Muestra en consola cada petición que llega al servidor (útil para depurar).
> - `nodemon`: Reinicia el servidor automáticamente cuando guardas cambios (solo en desarrollo).

### 4.2 Backend — app.js (Servidor Principal)

Instrucción para Cursor: **Crea `backend/src/app.js`:**

```javascript
// ============================================================
// app.js — Punto de entrada del servidor Express
// ============================================================
// "require" es la forma en Node.js de importar módulos (librerías o archivos propios)
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Importamos las rutas de cada módulo
const estudiantesRoutes = require('./routes/estudiantes.routes');
const cursosRoutes = require('./routes/cursos.routes');
const catedraticosRoutes = require('./routes/catedraticos.routes');
const pensumRoutes = require('./routes/pensum.routes');

// Creamos la aplicación Express
const app = express();

// ---- MIDDLEWARES ----
// Un "middleware" es una función que se ejecuta ANTES de llegar a la ruta final.
// Piénsalo como un guardia de seguridad que revisa cada petición.

app.use(cors());                        // Permite peticiones desde el frontend Angular
app.use(morgan('dev'));                  // Muestra logs de peticiones en consola
app.use(express.json());                // Permite leer datos JSON del body de las peticiones

// ---- RUTAS ----
// Asociamos cada prefijo de URL con su archivo de rutas
app.use('/api/estudiantes', estudiantesRoutes);
app.use('/api/cursos', cursosRoutes);
app.use('/api/catedraticos', catedraticosRoutes);
app.use('/api/pensum', pensumRoutes);

// Ruta raíz para verificar que el servidor está vivo
app.get('/', (req, res) => {
  res.json({ message: 'UniTrack API funcionando correctamente 🎓' });
});

// ---- MANEJO DE ERRORES ----
// Esta función recibe 4 parámetros — Express la identifica como manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor', detalle: err.message });
});

// ---- INICIAR SERVIDOR ----
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ UniTrack API corriendo en http://localhost:${PORT}`);
});

module.exports = app;
```

### 4.3 Frontend — Crear proyecto Angular

Instrucción para Cursor: **Ejecuta estos comandos en la terminal para crear el proyecto Angular:**

```bash
# Instalar Angular CLI globalmente (si no está instalado)
npm install -g @angular/cli

# Crear el proyecto Angular dentro de la carpeta frontend
ng new unitrack-frontend --routing=true --style=scss --strict=true

# Entrar a la carpeta
cd unitrack-frontend

# Instalar Angular Material (componentes de UI listos: botones, tablas, etc.)
ng add @angular/material

# Instalar D3.js para visualizaciones gráficas
npm install d3
npm install --save-dev @types/d3
```

### 4.4 Frontend — app-routing.module.ts

Instrucción para Cursor: **Configura las rutas con lazy loading en `src/app/app-routing.module.ts`:**

```typescript
// ============================================================
// app-routing.module.ts — Definición de rutas de navegación
// ============================================================
// "Lazy loading" significa que cada módulo se carga solo cuando el usuario navega a esa sección.
// Ventaja: la aplicación carga más rápido inicialmente porque no carga todo de una vez.
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Redirigir la raíz "/" al módulo de estudiantes
  { path: '', redirectTo: 'estudiantes', pathMatch: 'full' },

  // FASE 1 — Lazy load del módulo de estudiantes
  {
    path: 'estudiantes',
    loadChildren: () =>
      import('./modules/estudiantes/estudiantes.module').then(m => m.EstudiantesModule)
  },

  // FASE 2 — Catálogo de cursos
  {
    path: 'cursos',
    loadChildren: () =>
      import('./modules/cursos/cursos.module').then(m => m.CursosModule)
  },

  // FASE 3 — Directorio de catedráticos
  {
    path: 'catedraticos',
    loadChildren: () =>
      import('./modules/catedraticos/catedraticos.module').then(m => m.CatedraticosModule)
  },

  // FASE 4 — Mapa de pensum
  {
    path: 'pensum',
    loadChildren: () =>
      import('./modules/pensum/pensum.module').then(m => m.PensumModule)
  },

  // Ruta 404 — cualquier ruta desconocida
  { path: '**', redirectTo: 'estudiantes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

---

## 5. FASE 1 — LISTAS ENLAZADAS (ESTUDIANTES)

### 5.1 Concepto: ¿Qué es una Lista Enlazada?

Una **Lista Enlazada Simple** es una secuencia de "nodos" donde cada nodo tiene:
1. **Datos** (en este caso, los datos de un estudiante)
2. **Un puntero `next`** (una referencia que apunta al siguiente nodo)

Imagínalo como una cadena: cada eslabón conoce al siguiente, pero no al anterior.

```
[Estudiante A | next→] → [Estudiante B | next→] → [Estudiante C | next→null]
```

Una **Lista Doblemente Enlazada** agrega un segundo puntero `prev` (previous = anterior):

```
null←[prev | Estudiante A | next→] ↔ [prev | Estudiante B | next→] ↔ [prev | Estudiante C | next→null]
```

### 5.2 Backend — LinkedList.js (Lista Enlazada Simple)

Instrucción para Cursor: **Crea `backend/src/services/data-structures/LinkedList.js`:**

```javascript
// ============================================================
// LinkedList.js — Lista Enlazada Simple
// MÓDULO: Gestión de Estudiantes
// ============================================================

// ---- CLASE NODO ----
// Un "nodo" es el bloque básico de la lista. Cada nodo guarda un dato y apunta al siguiente.
class Node {
  constructor(data) {
    this.data = data;   // Los datos del estudiante (objeto JSON)
    this.next = null;   // Referencia al siguiente nodo. Empieza en null (no hay siguiente)
  }
}

// ---- CLASE LISTA ENLAZADA SIMPLE ----
class LinkedList {
  constructor() {
    this.head = null; // "head" (cabeza) es el primer nodo de la lista. Empieza vacía.
    this.size = 0;    // Contador de cuántos nodos hay
  }

  // ---- INSERTAR AL INICIO ----
  // Complejidad: O(1) — siempre tarda lo mismo sin importar el tamaño de la lista
  insertAtBeginning(data) {
    const newNode = new Node(data);
    newNode.next = this.head; // El nuevo nodo apunta al que antes era el primero
    this.head = newNode;      // Ahora el nuevo nodo ES el primero
    this.size++;
  }

  // ---- INSERTAR AL FINAL ----
  // Complejidad: O(n) — debe recorrer toda la lista para llegar al final
  insertAtEnd(data) {
    const newNode = new Node(data);

    // Si la lista está vacía, el nuevo nodo es el único (es la cabeza)
    if (!this.head) {
      this.head = newNode;
    } else {
      // Recorremos hasta encontrar el último nodo (el que tiene next = null)
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode; // El último nodo ahora apunta al nuevo
    }
    this.size++;
  }

  // ---- INSERTAR EN POSICIÓN ESPECÍFICA (por índice) ----
  // Complejidad: O(n) — en el peor caso recorre casi toda la lista
  insertAtPosition(data, index) {
    // Validar que el índice sea válido
    if (index < 0 || index > this.size) {
      throw new Error(`Índice ${index} fuera de rango. Tamaño actual: ${this.size}`);
    }

    // Si el índice es 0, es igual a insertar al inicio
    if (index === 0) {
      this.insertAtBeginning(data);
      return;
    }

    const newNode = new Node(data);
    let current = this.head;
    let contador = 0;

    // Recorremos hasta el nodo ANTERIOR a la posición deseada
    while (contador < index - 1) {
      current = current.next;
      contador++;
    }

    // Insertamos el nuevo nodo entre "current" y "current.next"
    newNode.next = current.next;
    current.next = newNode;
    this.size++;
  }

  // ---- ELIMINAR POR CARNET ----
  // Complejidad: O(n) — debe buscar el nodo recorriendo la lista
  deleteByCarnet(carnet) {
    if (!this.head) {
      return false; // Lista vacía, nada que eliminar
    }

    // Caso especial: el nodo a eliminar es la cabeza
    if (this.head.data.carnet === carnet) {
      this.head = this.head.next; // La cabeza ahora es el segundo nodo
      this.size--;
      return true;
    }

    // Buscar el nodo ANTERIOR al que queremos eliminar
    let current = this.head;
    while (current.next !== null) {
      if (current.next.data.carnet === carnet) {
        current.next = current.next.next; // "Saltamos" el nodo a eliminar
        this.size--;
        return true;
      }
      current = current.next;
    }

    return false; // No se encontró el carnet
  }

  // ---- BUSCAR POR CARNET (búsqueda lineal) ----
  // Complejidad: O(n) — en el peor caso revisa todos los nodos
  searchByCarnet(carnet) {
    let current = this.head;
    let index = 0;

    while (current !== null) {
      if (current.data.carnet === carnet) {
        return { found: true, data: current.data, index };
      }
      current = current.next;
      index++;
    }

    return { found: false, data: null, index: -1 };
  }

  // ---- LISTAR TODOS (recorrido completo) ----
  // Complejidad: O(n)
  toArray() {
    const result = [];
    let current = this.head;
    while (current !== null) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }

  // ---- OBTENER TAMAÑO ----
  // Complejidad: O(1) — solo devuelve el contador
  getSize() {
    return this.size;
  }

  // ---- INVERTIR LA LISTA (in-place) ----
  // "In-place" = no crea una nueva lista, modifica la existente
  // Complejidad: O(n)
  reverse() {
    let prev = null;
    let current = this.head;
    let next = null;

    while (current !== null) {
      next = current.next;    // Guardamos referencia al siguiente
      current.next = prev;    // Invertimos el puntero
      prev = current;         // Avanzamos "prev"
      current = next;         // Avanzamos "current"
    }

    this.head = prev; // El nuevo "head" es el último nodo (ahora primero)
  }

  // ---- REPRESENTACIÓN VISUAL (para el frontend) ----
  // Devuelve la estructura de la lista como JSON para que Angular la visualice
  toVisualStructure() {
    const nodes = [];
    let current = this.head;
    let index = 0;

    while (current !== null) {
      nodes.push({
        index,
        data: current.data,
        hasNext: current.next !== null
      });
      current = current.next;
      index++;
    }

    return { nodes, size: this.size };
  }
}

// Exportamos la clase para usarla en otros archivos
module.exports = LinkedList;
```

### 5.3 Backend — DoublyLinkedList.js (Lista Doblemente Enlazada)

Instrucción para Cursor: **Crea `backend/src/services/data-structures/DoublyLinkedList.js`:**

```javascript
// ============================================================
// DoublyLinkedList.js — Lista Doblemente Enlazada
// MÓDULO: Historial de Inscripciones
// ============================================================

class DNode {
  constructor(data) {
    this.data = data;   // Datos de la inscripción
    this.next = null;   // Apunta al siguiente nodo
    this.prev = null;   // Apunta al nodo anterior (la diferencia con la simple)
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null; // Primer nodo
    this.tail = null; // Último nodo (ventaja de tener dos extremos)
    this.size = 0;
  }

  // ---- INSERTAR AL INICIO ----
  // Complejidad: O(1)
  insertAtBeginning(data) {
    const newNode = new DNode(data);

    if (!this.head) {
      // Lista vacía: el nuevo nodo es cabeza Y cola
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;  // El nuevo apunta al antiguo head
      this.head.prev = newNode;  // El antiguo head apunta hacia atrás al nuevo
      this.head = newNode;       // El nuevo es ahora la cabeza
    }
    this.size++;
  }

  // ---- INSERTAR AL FINAL ----
  // Complejidad: O(1) — gracias al puntero "tail" no necesitamos recorrer
  insertAtEnd(data) {
    const newNode = new DNode(data);

    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;  // El nuevo apunta hacia atrás a la antigua cola
      this.tail.next = newNode;  // La antigua cola apunta al nuevo
      this.tail = newNode;       // El nuevo es ahora la cola
    }
    this.size++;
  }

  // ---- ELIMINAR POR CÓDIGO DE CURSO ----
  // Complejidad: O(n)
  deleteByCourse(codigoCurso) {
    let current = this.head;

    while (current !== null) {
      if (current.data.codigoCurso === codigoCurso) {
        // Desconectar el nodo de la cadena
        if (current.prev) current.prev.next = current.next;
        else this.head = current.next; // Era la cabeza

        if (current.next) current.next.prev = current.prev;
        else this.tail = current.prev; // Era la cola

        this.size--;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  // ---- NAVEGAR HACIA ADELANTE (head → tail) ----
  traverseForward() {
    const result = [];
    let current = this.head;
    while (current !== null) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }

  // ---- NAVEGAR HACIA ATRÁS (tail → head) ----
  traverseBackward() {
    const result = [];
    let current = this.tail;
    while (current !== null) {
      result.push(current.data);
      current = current.prev;
    }
    return result;
  }

  // ---- BUSCAR POR CÓDIGO DE CURSO O SEMESTRE ----
  search(campo, valor) {
    let current = this.head;
    const resultados = [];
    while (current !== null) {
      if (current.data[campo] === valor) {
        resultados.push(current.data);
      }
      current = current.next;
    }
    return resultados;
  }

  // ---- ORDENAR POR SEMESTRE O NOTA (Bubble Sort sobre la lista) ----
  // Bubble Sort: compara pares de nodos adyacentes e intercambia si están en el orden incorrecto
  // Complejidad: O(n²) — no es el más eficiente, pero es simple de implementar sobre una lista
  sortBy(campo) {
    if (!this.head || !this.head.next) return; // 0 o 1 elementos, ya está ordenado

    let swapped;
    do {
      swapped = false;
      let current = this.head;
      while (current.next !== null) {
        // Si el dato actual es MAYOR que el siguiente, los intercambiamos
        if (current.data[campo] > current.next.data[campo]) {
          // Intercambiamos solo los DATOS, no los nodos
          const temp = current.data;
          current.data = current.next.data;
          current.next.data = temp;
          swapped = true;
        }
        current = current.next;
      }
    } while (swapped); // Repetimos hasta que no haya más intercambios
  }

  // ---- REPRESENTACIÓN VISUAL ----
  toVisualStructure() {
    const nodes = [];
    let current = this.head;
    let index = 0;
    while (current !== null) {
      nodes.push({
        index,
        data: current.data,
        hasPrev: current.prev !== null,
        hasNext: current.next !== null
      });
      current = current.next;
      index++;
    }
    return { nodes, size: this.size };
  }
}

module.exports = DoublyLinkedList;
```

### 5.4 Backend — estudiantes.service.js

Instrucción para Cursor: **Crea `backend/src/services/estudiantes.service.js`:**

```javascript
// ============================================================
// estudiantes.service.js — Lógica de negocio de estudiantes
// Usa LinkedList y DoublyLinkedList
// ============================================================
const LinkedList = require('./data-structures/LinkedList');
const DoublyLinkedList = require('./data-structures/DoublyLinkedList');
const fs = require('fs');
const path = require('path');

// Ruta al archivo JSON de persistencia
const DATA_FILE = path.join(__dirname, '../data/estudiantes.json');

// Instancia ÚNICA de la lista (vive en memoria mientras el servidor esté activo)
const listaEstudiantes = new LinkedList();

// Mapa de historiales: { carnet → DoublyLinkedList }
const historiales = {};

// ---- CARGAR DATOS DESDE JSON AL INICIAR ----
function cargarDatos() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const datos = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      datos.forEach(est => {
        listaEstudiantes.insertAtEnd(est);
        historiales[est.carnet] = new DoublyLinkedList();
        if (est.historial) {
          est.historial.forEach(insc => historiales[est.carnet].insertAtEnd(insc));
        }
      });
      console.log(`✅ ${listaEstudiantes.getSize()} estudiantes cargados desde JSON`);
    }
  } catch (error) {
    console.error('Error cargando datos de estudiantes:', error.message);
  }
}

// ---- GUARDAR DATOS A JSON ----
function guardarDatos() {
  const estudiantes = listaEstudiantes.toArray().map(est => ({
    ...est,
    historial: historiales[est.carnet] ? historiales[est.carnet].traverseForward() : []
  }));
  fs.writeFileSync(DATA_FILE, JSON.stringify(estudiantes, null, 2));
}

// Cargar datos al iniciar el módulo
cargarDatos();

module.exports = {
  // ---- CRUD DE ESTUDIANTES ----
  getAllEstudiantes: () => listaEstudiantes.toArray(),

  getEstudianteByCarnet: (carnet) => {
    const resultado = listaEstudiantes.searchByCarnet(carnet);
    return resultado.found ? resultado.data : null;
  },

  insertEstudiante: (data, posicion = 'end') => {
    // Validar que no exista el carnet
    const existe = listaEstudiantes.searchByCarnet(data.carnet);
    if (existe.found) throw new Error(`El carnet ${data.carnet} ya existe`);

    if (posicion === 'beginning') listaEstudiantes.insertAtBeginning(data);
    else if (typeof posicion === 'number') listaEstudiantes.insertAtPosition(data, posicion);
    else listaEstudiantes.insertAtEnd(data);

    historiales[data.carnet] = new DoublyLinkedList();
    guardarDatos();
    return data;
  },

  deleteEstudiante: (carnet) => {
    const eliminado = listaEstudiantes.deleteByCarnet(carnet);
    if (eliminado) {
      delete historiales[carnet];
      guardarDatos();
    }
    return eliminado;
  },

  invertirLista: () => {
    listaEstudiantes.reverse();
    guardarDatos();
    return listaEstudiantes.toArray();
  },

  getEstructuraVisual: () => listaEstudiantes.toVisualStructure(),

  // ---- HISTORIAL DE INSCRIPCIONES ----
  getHistorial: (carnet) => {
    if (!historiales[carnet]) return null;
    return historiales[carnet].toVisualStructure();
  },

  addInscripcion: (carnet, inscripcion, posicion = 'end') => {
    if (!historiales[carnet]) throw new Error(`Estudiante ${carnet} no encontrado`);
    if (posicion === 'beginning') historiales[carnet].insertAtBeginning(inscripcion);
    else historiales[carnet].insertAtEnd(inscripcion);
    guardarDatos();
    return inscripcion;
  },

  deleteInscripcion: (carnet, codigoCurso) => {
    if (!historiales[carnet]) throw new Error(`Estudiante ${carnet} no encontrado`);
    const eliminado = historiales[carnet].deleteByCourse(codigoCurso);
    if (eliminado) guardarDatos();
    return eliminado;
  },

  getHistorialForward: (carnet) => {
    if (!historiales[carnet]) return [];
    return historiales[carnet].traverseForward();
  },

  getHistorialBackward: (carnet) => {
    if (!historiales[carnet]) return [];
    return historiales[carnet].traverseBackward();
  },

  sortHistorial: (carnet, campo) => {
    if (!historiales[carnet]) throw new Error(`Estudiante ${carnet} no encontrado`);
    historiales[carnet].sortBy(campo);
    guardarDatos();
    return historiales[carnet].traverseForward();
  }
};
```

### 5.5 Backend — Rutas y Controlador de Estudiantes

Instrucción para Cursor: **Crea `backend/src/routes/estudiantes.routes.js`:**

```javascript
// ============================================================
// estudiantes.routes.js — Define las URLs del módulo de estudiantes
// ============================================================
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/estudiantes.controller');

// Rutas de la lista de estudiantes
router.get('/',                    ctrl.getAllEstudiantes);
router.get('/visual',              ctrl.getEstructuraVisual);
router.get('/invertir',            ctrl.invertirLista);
router.get('/:carnet',             ctrl.getEstudianteByCarnet);
router.post('/',                   ctrl.insertEstudiante);
router.delete('/:carnet',          ctrl.deleteEstudiante);

// Rutas del historial (lista doblemente enlazada)
router.get('/:carnet/historial',            ctrl.getHistorial);
router.get('/:carnet/historial/backward',   ctrl.getHistorialBackward);
router.post('/:carnet/historial',           ctrl.addInscripcion);
router.delete('/:carnet/historial/:curso',  ctrl.deleteInscripcion);
router.put('/:carnet/historial/sort/:campo',ctrl.sortHistorial);

module.exports = router;
```

Instrucción para Cursor: **Crea `backend/src/controllers/estudiantes.controller.js`:**

```javascript
// ============================================================
// estudiantes.controller.js — Maneja peticiones HTTP de estudiantes
// Un controlador recibe la petición (req) y envía la respuesta (res)
// ============================================================
const service = require('../services/estudiantes.service');

// Patrón helper para manejar errores sin repetir código
const handleError = (res, error) => {
  console.error(error);
  res.status(400).json({ error: error.message });
};

module.exports = {
  getAllEstudiantes: (req, res) => {
    try {
      const estudiantes = service.getAllEstudiantes();
      res.json({ data: estudiantes, total: estudiantes.length });
    } catch (e) { handleError(res, e); }
  },

  getEstudianteByCarnet: (req, res) => {
    try {
      const est = service.getEstudianteByCarnet(req.params.carnet);
      if (!est) return res.status(404).json({ error: 'Estudiante no encontrado' });
      res.json({ data: est });
    } catch (e) { handleError(res, e); }
  },

  insertEstudiante: (req, res) => {
    try {
      // req.body contiene los datos enviados en el cuerpo de la petición POST
      const { posicion, ...estudianteData } = req.body;
      const nuevo = service.insertEstudiante(estudianteData, posicion);
      res.status(201).json({ message: 'Estudiante insertado', data: nuevo });
    } catch (e) { handleError(res, e); }
  },

  deleteEstudiante: (req, res) => {
    try {
      const eliminado = service.deleteEstudiante(req.params.carnet);
      if (!eliminado) return res.status(404).json({ error: 'Estudiante no encontrado' });
      res.json({ message: 'Estudiante eliminado correctamente' });
    } catch (e) { handleError(res, e); }
  },

  invertirLista: (req, res) => {
    try {
      const lista = service.invertirLista();
      res.json({ message: 'Lista invertida', data: lista });
    } catch (e) { handleError(res, e); }
  },

  getEstructuraVisual: (req, res) => {
    try {
      res.json(service.getEstructuraVisual());
    } catch (e) { handleError(res, e); }
  },

  getHistorial: (req, res) => {
    try {
      const historial = service.getHistorial(req.params.carnet);
      if (!historial) return res.status(404).json({ error: 'Estudiante no encontrado' });
      res.json(historial);
    } catch (e) { handleError(res, e); }
  },

  getHistorialBackward: (req, res) => {
    try {
      res.json({ data: service.getHistorialBackward(req.params.carnet) });
    } catch (e) { handleError(res, e); }
  },

  addInscripcion: (req, res) => {
    try {
      const { posicion, ...inscripcionData } = req.body;
      const nueva = service.addInscripcion(req.params.carnet, inscripcionData, posicion);
      res.status(201).json({ message: 'Inscripción agregada', data: nueva });
    } catch (e) { handleError(res, e); }
  },

  deleteInscripcion: (req, res) => {
    try {
      const eliminado = service.deleteInscripcion(req.params.carnet, req.params.curso);
      if (!eliminado) return res.status(404).json({ error: 'Inscripción no encontrada' });
      res.json({ message: 'Inscripción eliminada' });
    } catch (e) { handleError(res, e); }
  },

  sortHistorial: (req, res) => {
    try {
      const sorted = service.sortHistorial(req.params.carnet, req.params.campo);
      res.json({ data: sorted });
    } catch (e) { handleError(res, e); }
  }
};
```

---

## 6. FASE 2 — ÁRBOLES BST Y AVL (CURSOS)

### 6.1 Concepto: ¿Qué es un Árbol Binario de Búsqueda (BST)?

Un **BST** organiza datos en forma de árbol:
- Cada nodo tiene máximo 2 hijos: izquierdo y derecho
- Todo lo que va a la **izquierda** es MENOR que el nodo padre
- Todo lo que va a la **derecha** es MAYOR que el nodo padre

```
       [MAT201]
      /         \
 [INF101]    [QUI301]
```

Un **Árbol AVL** es un BST que se **balancea automáticamente**: garantiza que ningún lado
crezca mucho más que el otro, haciendo que las búsquedas siempre sean rápidas O(log n).

### 6.2 Backend — AVLTree.js

Instrucción para Cursor: **Crea `backend/src/services/data-structures/AVLTree.js`:**

```javascript
// ============================================================
// AVLTree.js — Árbol Binario de Búsqueda con auto-balanceo AVL
// MÓDULO: Catálogo de Cursos
// ============================================================

class AVLNode {
  constructor(data) {
    this.data = data;       // Datos del curso
    this.key = data.codigo; // La clave de búsqueda es el código del curso
    this.left = null;       // Hijo izquierdo (menores)
    this.right = null;      // Hijo derecho (mayores)
    this.height = 1;        // Altura del nodo (hojas tienen altura 1)
  }
}

class AVLTree {
  constructor() {
    this.root = null; // La raíz del árbol (nodo principal)
  }

  // ---- FUNCIÓN DE UTILIDAD: Obtener altura de un nodo ----
  // Si el nodo es null (no existe), su altura es 0
  getHeight(node) {
    return node ? node.height : 0;
  }

  // ---- FUNCIÓN DE UTILIDAD: Actualizar altura ----
  // La altura de un nodo = 1 + la mayor altura entre sus dos hijos
  updateHeight(node) {
    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
  }

  // ---- FACTOR DE BALANCE ----
  // Balance = altura(hijo izquierdo) - altura(hijo derecho)
  // Si balance > 1: el árbol está desbalanceado hacia la izquierda
  // Si balance < -1: el árbol está desbalanceado hacia la derecha
  // Balance ideal: entre -1 y 1
  getBalance(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  // ---- ROTACIÓN SIMPLE A LA DERECHA ----
  // Se usa cuando el subárbol izquierdo está demasiado pesado
  //       y              x
  //      / \            / \
  //     x   C   →     A   y
  //    / \                / \
  //   A   B              B   C
  rotateRight(y) {
    const x = y.left;
    const B = x.right;

    // Realizar la rotación
    x.right = y;
    y.left = B;

    // Actualizar alturas (primero el hijo, luego el padre)
    this.updateHeight(y);
    this.updateHeight(x);

    return x; // x es ahora la raíz de este subárbol
  }

  // ---- ROTACIÓN SIMPLE A LA IZQUIERDA ----
  // Se usa cuando el subárbol derecho está demasiado pesado
  rotateLeft(x) {
    const y = x.right;
    const B = y.left;

    y.left = x;
    x.right = B;

    this.updateHeight(x);
    this.updateHeight(y);

    return y;
  }

  // ---- INSERTAR CURSO ----
  // Complejidad: O(log n) gracias al balanceo
  insert(data) {
    this.root = this._insert(this.root, data);
  }

  _insert(node, data) {
    // Caso base: nodo vacío, creamos uno nuevo
    if (!node) return new AVLNode(data);

    // Insertar en el subárbol correcto según la clave
    if (data.codigo < node.key) {
      node.left = this._insert(node.left, data);
    } else if (data.codigo > node.key) {
      node.right = this._insert(node.right, data);
    } else {
      // Clave duplicada: actualizar datos
      node.data = data;
      return node;
    }

    // Actualizar altura del nodo actual
    this.updateHeight(node);

    // Verificar y corregir el balance
    return this._rebalance(node, data.codigo);
  }

  // ---- REBALANCEAR ----
  _rebalance(node, key) {
    const balance = this.getBalance(node);

    // Caso 1: Izquierda-Izquierda → rotación derecha simple
    if (balance > 1 && key < node.left.key) {
      return this.rotateRight(node);
    }

    // Caso 2: Derecha-Derecha → rotación izquierda simple
    if (balance < -1 && key > node.right.key) {
      return this.rotateLeft(node);
    }

    // Caso 3: Izquierda-Derecha → rotación doble
    if (balance > 1 && key > node.left.key) {
      node.left = this.rotateLeft(node.left);
      return this.rotateRight(node);
    }

    // Caso 4: Derecha-Izquierda → rotación doble
    if (balance < -1 && key < node.right.key) {
      node.right = this.rotateRight(node.right);
      return this.rotateLeft(node);
    }

    return node; // Sin rotaciones necesarias
  }

  // ---- BUSCAR CURSO ----
  // Complejidad: O(log n)
  search(codigo) {
    return this._search(this.root, codigo);
  }

  _search(node, codigo) {
    if (!node) return null;
    if (codigo === node.key) return node.data;
    if (codigo < node.key) return this._search(node.left, codigo);
    return this._search(node.right, codigo);
  }

  // ---- ELIMINAR CURSO ----
  delete(codigo) {
    this.root = this._delete(this.root, codigo);
  }

  _delete(node, codigo) {
    if (!node) return null;

    if (codigo < node.key) {
      node.left = this._delete(node.left, codigo);
    } else if (codigo > node.key) {
      node.right = this._delete(node.right, codigo);
    } else {
      // Nodo encontrado
      if (!node.left || !node.right) {
        // Nodo con 0 o 1 hijo
        node = node.left || node.right;
      } else {
        // Nodo con 2 hijos: reemplazar con el sucesor inorden (mínimo del subárbol derecho)
        const sucesor = this._getMin(node.right);
        node.key = sucesor.key;
        node.data = sucesor.data;
        node.right = this._delete(node.right, sucesor.key);
      }
    }

    if (!node) return null;

    this.updateHeight(node);
    return this._rebalance(node, node.key);
  }

  // ---- RECORRIDOS ----
  // InOrden: izquierda → raíz → derecha = resultado ORDENADO
  inOrder() {
    const result = [];
    this._inOrder(this.root, result);
    return result;
  }
  _inOrder(node, result) {
    if (!node) return;
    this._inOrder(node.left, result);
    result.push({ ...node.data, balance: this.getBalance(node), height: node.height });
    this._inOrder(node.right, result);
  }

  // PreOrden: raíz → izquierda → derecha
  preOrder() {
    const result = [];
    this._preOrder(this.root, result);
    return result;
  }
  _preOrder(node, result) {
    if (!node) return;
    result.push(node.data);
    this._preOrder(node.left, result);
    this._preOrder(node.right, result);
  }

  // PostOrden: izquierda → derecha → raíz
  postOrder() {
    const result = [];
    this._postOrder(this.root, result);
    return result;
  }
  _postOrder(node, result) {
    if (!node) return;
    this._postOrder(node.left, result);
    this._postOrder(node.right, result);
    result.push(node.data);
  }

  // ---- MÍN Y MÁX ----
  _getMin(node) {
    return node.left ? this._getMin(node.left) : node;
  }
  getMin() { return this.root ? this._getMin(this.root).data : null; }
  getMax() {
    let node = this.root;
    while (node && node.right) node = node.right;
    return node ? node.data : null;
  }

  // ---- ALTURA DEL ÁRBOL ----
  getTreeHeight() { return this.getHeight(this.root); }

  // ---- REPRESENTACIÓN VISUAL (para D3.js en el frontend) ----
  toVisualStructure() {
    return this._nodeToJSON(this.root);
  }
  _nodeToJSON(node) {
    if (!node) return null;
    return {
      name: node.key,
      data: node.data,
      balance: this.getBalance(node),
      height: node.height,
      children: [
        this._nodeToJSON(node.left),
        this._nodeToJSON(node.right)
      ].filter(Boolean) // Eliminar nulls
    };
  }
}

module.exports = AVLTree;
```

### 6.3 Instrucciones para Servicio, Rutas y Controlador de Cursos

Instrucción para Cursor: **Crea `backend/src/services/cursos.service.js`** con:
- Una instancia de `AVLTree`
- Funciones: `insertCurso`, `deleteCurso`, `searchCurso`, `getInOrder`, `getPreOrder`, `getPostOrder`, `getMin`, `getMax`, `getTreeHeight`, `getVisualStructure`
- Persistencia en `data/cursos.json`

Instrucción para Cursor: **Crea `backend/src/routes/cursos.routes.js`** con estos endpoints:

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/cursos` | Lista todos (inOrden) |
| GET | `/api/cursos/inorden` | Recorrido InOrden |
| GET | `/api/cursos/preorden` | Recorrido PreOrden |
| GET | `/api/cursos/postorden` | Recorrido PostOrden |
| GET | `/api/cursos/visual` | Estructura para D3.js |
| GET | `/api/cursos/min` | Curso con código mínimo |
| GET | `/api/cursos/max` | Curso con código máximo |
| GET | `/api/cursos/altura` | Altura del árbol |
| GET | `/api/cursos/:codigo` | Buscar por código |
| POST | `/api/cursos` | Insertar curso |
| DELETE | `/api/cursos/:codigo` | Eliminar curso |

---

## 7. FASE 3 — TABLA HASH (CATEDRÁTICOS)

### 7.1 Concepto: ¿Qué es una Tabla Hash?

Una **Tabla Hash** es una estructura que permite encontrar datos en tiempo O(1) promedio.

Funciona así:
1. Tienes un arreglo de "buckets" (cubetas), por ejemplo de tamaño 10.
2. Cuando insertas `empleado-007`, una **función hash** convierte ese código en un número (ej: 3).
3. El empleado se guarda en la posición 3 del arreglo.
4. Para buscarlo, aplicas la misma función hash → vas directo a posición 3 → encontrado instantáneamente.

**¿Qué pasa si dos claves dan el mismo número?** Eso es una **colisión**. Se resuelve con:
- **Encadenamiento (chaining)**: cada bucket tiene una lista enlazada de elementos.
- **Direccionamiento abierto**: si hay colisión, busca el siguiente espacio disponible.

### 7.2 Backend — HashTable.js

Instrucción para Cursor: **Crea `backend/src/services/data-structures/HashTable.js`:**

```javascript
// ============================================================
// HashTable.js — Tabla Hash con dos funciones hash y dos métodos de colisión
// MÓDULO: Directorio de Catedráticos
// ============================================================

// ---- FUNCIONES HASH ----
// Una función hash convierte una clave (string) en un índice del arreglo (número)

// Hash 1: División — suma los códigos ASCII de cada carácter y divide por el tamaño
function hashDivision(key, size) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    // charCodeAt(i) devuelve el código numérico del carácter i
    hash += key.charCodeAt(i);
  }
  return hash % size; // El operador % (módulo) devuelve el resto de la división
}

// Hash 2: DJB2 — algoritmo más robusto que distribuye mejor los valores
function hashDJB2(key, size) {
  let hash = 5381; // Valor inicial elegido por sus buenas propiedades matemáticas
  for (let i = 0; i < key.length; i++) {
    // Operación bit a bit: hash * 33 + charCode
    hash = ((hash << 5) + hash) + key.charCodeAt(i);
    hash = hash & hash; // Mantener como entero de 32 bits
  }
  return Math.abs(hash) % size;
}

// ---- CLASE TABLA HASH ----
class HashTable {
  constructor(size = 10, hashFunc = 'division', collisionMethod = 'chaining') {
    this.size = size;                    // Número de buckets
    this.hashFunc = hashFunc;            // 'division' o 'djb2'
    this.collisionMethod = collisionMethod; // 'chaining' o 'linear_probing'
    this.collisions = 0;                 // Contador de colisiones (para estadísticas)
    this.count = 0;                      // Número de elementos almacenados
    this.LOAD_FACTOR_THRESHOLD = 0.75;   // Si se llena más del 75%, redimensionar

    // Inicializar el arreglo de buckets
    // En "chaining": cada bucket es un arreglo []
    // En "linear_probing": cada bucket es null, {key, data}, o 'DELETED'
    if (collisionMethod === 'chaining') {
      this.buckets = Array.from({ length: size }, () => []);
    } else {
      this.buckets = new Array(size).fill(null);
    }
  }

  // ---- CALCULAR HASH ----
  _hash(key) {
    if (this.hashFunc === 'djb2') return hashDJB2(key, this.size);
    return hashDivision(key, this.size);
  }

  // ---- FACTOR DE CARGA ----
  // Factor de carga = elementos / tamaño total
  // Si supera 0.75, hay demasiados elementos y la tabla se vuelve lenta
  getLoadFactor() {
    return this.count / this.size;
  }

  // ---- INSERTAR ----
  insert(key, data) {
    // Redimensionar si es necesario ANTES de insertar
    if (this.getLoadFactor() >= this.LOAD_FACTOR_THRESHOLD) {
      this._rehash();
    }

    const index = this._hash(key);

    if (this.collisionMethod === 'chaining') {
      // Verificar si ya existe la clave en la lista de ese bucket
      const bucket = this.buckets[index];
      const existingIndex = bucket.findIndex(item => item.key === key);

      if (existingIndex !== -1) {
        bucket[existingIndex].data = data; // Actualizar
      } else {
        if (bucket.length > 0) this.collisions++; // Hay colisión
        bucket.push({ key, data });
        this.count++;
      }
    } else {
      // Linear Probing: buscar la siguiente posición disponible
      let i = index;
      let attempts = 0;
      while (this.buckets[i] !== null && this.buckets[i] !== 'DELETED' && attempts < this.size) {
        if (this.buckets[i].key === key) {
          this.buckets[i].data = data; // Actualizar existente
          return;
        }
        this.collisions++;
        i = (i + 1) % this.size; // Circular: si llegamos al final, volvemos al inicio
        attempts++;
      }
      this.buckets[i] = { key, data };
      this.count++;
    }
  }

  // ---- BUSCAR ----
  // Complejidad promedio: O(1)
  search(key) {
    const index = this._hash(key);

    if (this.collisionMethod === 'chaining') {
      const item = this.buckets[index].find(item => item.key === key);
      return item ? item.data : null;
    } else {
      let i = index;
      let attempts = 0;
      while (this.buckets[i] !== null && attempts < this.size) {
        if (this.buckets[i] !== 'DELETED' && this.buckets[i].key === key) {
          return this.buckets[i].data;
        }
        i = (i + 1) % this.size;
        attempts++;
      }
      return null;
    }
  }

  // ---- ELIMINAR ----
  delete(key) {
    const index = this._hash(key);

    if (this.collisionMethod === 'chaining') {
      const bucket = this.buckets[index];
      const i = bucket.findIndex(item => item.key === key);
      if (i !== -1) { bucket.splice(i, 1); this.count--; return true; }
      return false;
    } else {
      let i = index;
      let attempts = 0;
      while (this.buckets[i] !== null && attempts < this.size) {
        if (this.buckets[i] !== 'DELETED' && this.buckets[i].key === key) {
          this.buckets[i] = 'DELETED'; // "Tombstone" — marcado como eliminado
          this.count--;
          return true;
        }
        i = (i + 1) % this.size;
        attempts++;
      }
      return false;
    }
  }

  // ---- REHASHING (redimensionar) ----
  // Cuando la tabla está muy llena, creamos una más grande y reinsertamos todo
  _rehash() {
    const nuevoTamaño = this.size * 2;
    const tablaVieja = this.buckets;
    const metodoViejo = this.collisionMethod;

    this.size = nuevoTamaño;
    this.count = 0;
    this.collisions = 0;

    if (this.collisionMethod === 'chaining') {
      this.buckets = Array.from({ length: nuevoTamaño }, () => []);
      tablaVieja.forEach(bucket => bucket.forEach(item => this.insert(item.key, item.data)));
    } else {
      this.buckets = new Array(nuevoTamaño).fill(null);
      tablaVieja.forEach(slot => {
        if (slot && slot !== 'DELETED') this.insert(slot.key, slot.data);
      });
    }

    console.log(`🔄 Rehashing: tabla expandida a ${nuevoTamaño} buckets`);
  }

  // ---- ESTADÍSTICAS (para mostrar en el frontend) ----
  getStats() {
    return {
      size: this.size,
      count: this.count,
      loadFactor: this.getLoadFactor().toFixed(2),
      collisions: this.collisions,
      hashFunc: this.hashFunc,
      collisionMethod: this.collisionMethod
    };
  }

  // ---- REPRESENTACIÓN VISUAL ----
  toVisualStructure() {
    const buckets = this.buckets.map((bucket, index) => {
      if (this.collisionMethod === 'chaining') {
        return { index, items: bucket, type: 'chain' };
      } else {
        return {
          index,
          item: bucket,
          status: bucket === null ? 'empty' : bucket === 'DELETED' ? 'deleted' : 'occupied'
        };
      }
    });
    return { buckets, stats: this.getStats() };
  }
}

module.exports = { HashTable, hashDivision, hashDJB2 };
```

### 7.3 Instrucciones para Servicio, Rutas y Controlador de Catedráticos

Instrucción para Cursor: **Crea `backend/src/services/catedraticos.service.js`** con:
- Una instancia de `HashTable` (configurable por el usuario)
- Funciones: `insertCatedratico`, `searchCatedratico`, `deleteCatedratico`, `getStats`, `getVisualStructure`, `cambiarConfiguracion(hashFunc, collisionMethod)`
- Persistencia en `data/catedraticos.json`

Instrucción para Cursor: **Crea `backend/src/routes/catedraticos.routes.js`** con:

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/catedraticos` | Listar todos |
| GET | `/api/catedraticos/stats` | Factor de carga y estadísticas |
| GET | `/api/catedraticos/visual` | Estructura visual de la tabla |
| GET | `/api/catedraticos/:codigo` | Buscar por código |
| POST | `/api/catedraticos` | Insertar catedrático |
| PUT | `/api/catedraticos/:codigo` | Actualizar catedrático |
| DELETE | `/api/catedraticos/:codigo` | Eliminar catedrático |
| POST | `/api/catedraticos/config` | Cambiar función hash y método de colisión |

---

## 8. FASE 4 — GRAFOS (PENSUM)

### 8.1 Concepto: ¿Qué es un Grafo Dirigido?

Un **Grafo Dirigido** tiene:
- **Vértices (nodos)**: en este caso, los cursos
- **Aristas (edges)**: relaciones entre cursos, con dirección

Una arista `A → B` significa "el curso A es prerrequisito del curso B".

```
INF101 ──→ INF201 ──→ INF301
              ↑
           MAT101
```

### 8.2 Backend — DirectedGraph.js

Instrucción para Cursor: **Crea `backend/src/services/data-structures/DirectedGraph.js`:**

```javascript
// ============================================================
// DirectedGraph.js — Grafo Dirigido para el Mapa de Prerrequisitos
// MÓDULO: Pensum Académico
// ============================================================

class DirectedGraph {
  constructor() {
    // Lista de adyacencia: Map donde cada clave es un vértice y
    // su valor es un Set (conjunto) de vértices a los que apunta
    // Usamos Map porque permite cualquier tipo de clave, no solo números
    this.adjacencyList = new Map();

    // Almacenamos también los datos de cada vértice (información del curso)
    this.vertices = new Map(); // { codigoCurso → datosCurso }
  }

  // ---- AGREGAR VÉRTICE (curso) ----
  addVertex(codigo, data) {
    if (!this.adjacencyList.has(codigo)) {
      this.adjacencyList.set(codigo, new Set());
      this.vertices.set(codigo, data);
    }
  }

  // ---- ELIMINAR VÉRTICE ----
  removeVertex(codigo) {
    if (!this.adjacencyList.has(codigo)) return false;

    // Eliminar todas las aristas que apuntan a este vértice
    this.adjacencyList.forEach((neighbors, vertex) => {
      neighbors.delete(codigo);
    });

    this.adjacencyList.delete(codigo);
    this.vertices.delete(codigo);
    return true;
  }

  // ---- AGREGAR ARISTA (prerrequisito) ----
  // addEdge("MAT101", "INF201") = MAT101 es prerrequisito de INF201
  addEdge(from, to) {
    if (!this.adjacencyList.has(from) || !this.adjacencyList.has(to)) {
      throw new Error(`Uno o ambos cursos no existen: ${from}, ${to}`);
    }
    this.adjacencyList.get(from).add(to);
  }

  // ---- ELIMINAR ARISTA ----
  removeEdge(from, to) {
    if (this.adjacencyList.has(from)) {
      this.adjacencyList.get(from).delete(to);
      return true;
    }
    return false;
  }

  // ---- BFS (Recorrido en Amplitud — Breadth First Search) ----
  // Explora nivel por nivel, como un árbol genealógico generación por generación
  // Usa una COLA (queue): FIFO — el primero en entrar es el primero en salir
  // Devuelve todos los cursos que se "desbloquean" a partir del curso dado
  bfs(startCodigo) {
    if (!this.adjacencyList.has(startCodigo)) return [];

    const visited = new Set();  // Para no visitar el mismo nodo dos veces
    const queue = [startCodigo]; // Cola: empezamos con el nodo inicial
    const result = [];
    const levels = {}; // En qué nivel está cada nodo

    visited.add(startCodigo);
    levels[startCodigo] = 0;

    while (queue.length > 0) {
      const current = queue.shift(); // "shift" saca el primer elemento (FIFO)
      result.push({
        codigo: current,
        data: this.vertices.get(current),
        level: levels[current]
      });

      // Agregar vecinos no visitados a la cola
      this.adjacencyList.get(current).forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          levels[neighbor] = levels[current] + 1;
          queue.push(neighbor);
        }
      });
    }

    return result;
  }

  // ---- DFS (Recorrido en Profundidad — Depth First Search) ----
  // Explora tan profundo como puede antes de retroceder
  // Usa una PILA (stack) o recursión: LIFO — el último en entrar es el primero en salir
  dfs(startCodigo) {
    if (!this.adjacencyList.has(startCodigo)) return [];

    const visited = new Set();
    const result = [];

    const dfsHelper = (codigo, depth = 0) => {
      visited.add(codigo);
      result.push({ codigo, data: this.vertices.get(codigo), depth });

      this.adjacencyList.get(codigo).forEach(neighbor => {
        if (!visited.has(neighbor)) {
          dfsHelper(neighbor, depth + 1);
        }
      });
    };

    dfsHelper(startCodigo);
    return result;
  }

  // ---- DETECCIÓN DE CICLOS ----
  // Un ciclo significa que un curso termina siendo prerrequisito de sí mismo (error lógico)
  // Usa DFS con 3 estados: sin visitar, en proceso, completado
  hasCycle() {
    // Estados: 0 = no visitado, 1 = en recursión actual, 2 = completado
    const state = new Map();
    this.adjacencyList.forEach((_, vertex) => state.set(vertex, 0));

    const dfsCheck = (vertex) => {
      state.set(vertex, 1); // Marcamos como "en proceso"

      for (const neighbor of this.adjacencyList.get(vertex)) {
        if (state.get(neighbor) === 1) return true;  // Encontramos un ciclo
        if (state.get(neighbor) === 0 && dfsCheck(neighbor)) return true;
      }

      state.set(vertex, 2); // Marcamos como "completado"
      return false;
    };

    for (const vertex of this.adjacencyList.keys()) {
      if (state.get(vertex) === 0) {
        if (dfsCheck(vertex)) return true;
      }
    }

    return false;
  }

  // ---- ORDENAMIENTO TOPOLÓGICO ----
  // Genera el orden en que deben llevarse los cursos respetando todos los prerrequisitos
  // Solo funciona si NO hay ciclos
  topologicalSort() {
    if (this.hasCycle()) {
      throw new Error('El grafo contiene ciclos. No es posible el ordenamiento topológico.');
    }

    const visited = new Set();
    const stack = []; // Usamos un stack para construir el resultado en orden inverso

    const dfsTopological = (vertex) => {
      visited.add(vertex);
      this.adjacencyList.get(vertex).forEach(neighbor => {
        if (!visited.has(neighbor)) dfsTopological(neighbor);
      });
      stack.push(vertex); // Agregar al stack DESPUÉS de procesar todos los vecinos
    };

    this.adjacencyList.forEach((_, vertex) => {
      if (!visited.has(vertex)) dfsTopological(vertex);
    });

    // El resultado está en orden inverso (primer curso a tomar está al final del stack)
    return stack.reverse().map(codigo => ({
      codigo,
      data: this.vertices.get(codigo)
    }));
  }

  // ---- PRERREQUISITOS DIRECTOS E INDIRECTOS ----
  getPrerequisites(codigoCurso) {
    const directos = [];
    const indirectos = new Set();

    // Prerrequisitos directos: nodos que tienen arista hacia codigoCurso
    this.adjacencyList.forEach((neighbors, vertex) => {
      if (neighbors.has(codigoCurso)) {
        directos.push(vertex);
      }
    });

    // Prerrequisitos indirectos: BFS inverso
    const queue = [...directos];
    const visited = new Set(directos);

    while (queue.length > 0) {
      const current = queue.shift();
      this.adjacencyList.forEach((neighbors, vertex) => {
        if (neighbors.has(current) && !visited.has(vertex)) {
          visited.add(vertex);
          indirectos.add(vertex);
          queue.push(vertex);
        }
      });
    }

    return {
      directos: directos.map(c => ({ codigo: c, data: this.vertices.get(c) })),
      indirectos: [...indirectos].map(c => ({ codigo: c, data: this.vertices.get(c) }))
    };
  }

  // ---- CAMINO MÁS CORTO (BFS entre dos cursos) ----
  shortestPath(from, to) {
    if (!this.adjacencyList.has(from) || !this.adjacencyList.has(to)) return null;

    const visited = new Set([from]);
    const queue = [[from]]; // Cola de caminos completos

    while (queue.length > 0) {
      const path = queue.shift();
      const current = path[path.length - 1];

      if (current === to) return path; // Camino encontrado

      this.adjacencyList.get(current).forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([...path, neighbor]);
        }
      });
    }

    return null; // No hay camino
  }

  // ---- REPRESENTACIÓN VISUAL (para vis.js o D3.js) ----
  toVisualStructure() {
    const nodes = [];
    const edges = [];

    this.vertices.forEach((data, codigo) => {
      nodes.push({ id: codigo, label: codigo, data });
    });

    this.adjacencyList.forEach((neighbors, from) => {
      neighbors.forEach(to => {
        edges.push({ from, to });
      });
    });

    return { nodes, edges };
  }
}

module.exports = DirectedGraph;
```

### 8.3 Instrucciones para Servicio, Rutas y Controlador del Pensum

Instrucción para Cursor: **Crea `backend/src/services/pensum.service.js`** con:
- Una instancia de `DirectedGraph`
- Funciones: `addCurso`, `removeCurso`, `addPrerrequisito`, `removePrerrequisito`, `bfsDesde`, `dfsDesde`, `detectarCiclos`, `ordenTopologico`, `getPrerequisitos`, `caminoCorto`
- Persistencia en `data/pensum.json`

Instrucción para Cursor: **Crea `backend/src/routes/pensum.routes.js`** con:

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/pensum` | Todos los cursos del grafo |
| GET | `/api/pensum/visual` | Nodos y aristas para D3/vis.js |
| GET | `/api/pensum/topological-sort` | Orden recomendado de materias |
| GET | `/api/pensum/detect-cycles` | Detectar ciclos |
| GET | `/api/pensum/bfs/:codigo` | BFS desde un curso |
| GET | `/api/pensum/dfs/:codigo` | DFS desde un curso |
| GET | `/api/pensum/:codigo/prerequisites` | Prerrequisitos directos e indirectos |
| GET | `/api/pensum/path/:from/:to` | Camino más corto entre dos cursos |
| POST | `/api/pensum/cursos` | Agregar curso al grafo |
| DELETE | `/api/pensum/cursos/:codigo` | Eliminar curso del grafo |
| POST | `/api/pensum/prerrequisito` | Agregar relación (arista) |
| DELETE | `/api/pensum/prerrequisito/:from/:to` | Eliminar relación |

---

## 9. API REST — TODOS LOS ENDPOINTS

Resumen completo de todos los endpoints de la API:

### Módulo de Estudiantes (`/api/estudiantes`)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Listar todos los estudiantes |
| GET | `/visual` | Estructura visual de la lista |
| GET | `/invertir` | Invertir la lista |
| GET | `/:carnet` | Buscar por carnet |
| POST | `/` | Insertar nuevo estudiante |
| DELETE | `/:carnet` | Eliminar estudiante |
| GET | `/:carnet/historial` | Historial de inscripciones |
| GET | `/:carnet/historial/backward` | Historial en orden inverso |
| POST | `/:carnet/historial` | Agregar inscripción |
| DELETE | `/:carnet/historial/:curso` | Eliminar inscripción |
| PUT | `/:carnet/historial/sort/:campo` | Ordenar historial |

### Módulo de Cursos (`/api/cursos`)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Listar todos (InOrden) |
| GET | `/inorden` | Recorrido InOrden |
| GET | `/preorden` | Recorrido PreOrden |
| GET | `/postorden` | Recorrido PostOrden |
| GET | `/visual` | JSON para D3.js |
| GET | `/min` | Curso con código mínimo |
| GET | `/max` | Curso con código máximo |
| GET | `/altura` | Altura del árbol AVL |
| GET | `/:codigo` | Buscar curso |
| POST | `/` | Insertar curso |
| DELETE | `/:codigo` | Eliminar curso |

### Módulo de Catedráticos (`/api/catedraticos`)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Listar todos |
| GET | `/stats` | Estadísticas de la tabla hash |
| GET | `/visual` | Visualización de buckets |
| GET | `/:codigo` | Buscar catedrático |
| POST | `/` | Insertar catedrático |
| PUT | `/:codigo` | Actualizar catedrático |
| DELETE | `/:codigo` | Eliminar catedrático |
| POST | `/config` | Cambiar configuración hash |

### Módulo de Pensum (`/api/pensum`)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Todos los cursos del grafo |
| GET | `/visual` | Nodos y aristas |
| GET | `/topological-sort` | Orden de materias |
| GET | `/detect-cycles` | Detectar ciclos |
| GET | `/bfs/:codigo` | Recorrido BFS |
| GET | `/dfs/:codigo` | Recorrido DFS |
| GET | `/:codigo/prerequisites` | Prerrequisitos |
| GET | `/path/:from/:to` | Camino más corto |
| POST | `/cursos` | Agregar curso |
| DELETE | `/cursos/:codigo` | Eliminar curso |
| POST | `/prerrequisito` | Agregar arista |
| DELETE | `/prerrequisito/:from/:to` | Eliminar arista |

---

## 10. FRONTEND ANGULAR — MÓDULOS

### 10.1 Módulo de Estudiantes

Instrucción para Cursor: **Genera el módulo con Angular CLI:**

```bash
ng generate module modules/estudiantes --routing
ng generate component modules/estudiantes/estudiantes-list
ng generate component modules/estudiantes/estudiantes-form
ng generate component modules/estudiantes/linked-list-visual
ng generate component modules/estudiantes/historial-visual
ng generate service modules/estudiantes/estudiantes
```

Instrucción para Cursor: **El servicio Angular debe comunicarse con el backend:**

```typescript
// estudiantes.service.ts
// HttpClient es el módulo de Angular para hacer peticiones HTTP (GET, POST, DELETE...)
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EstudiantesService {
  private apiUrl = 'http://localhost:3000/api/estudiantes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getVisual(): Observable<any> {
    return this.http.get(`${this.apiUrl}/visual`);
  }

  insert(data: any, posicion: string = 'end'): Observable<any> {
    return this.http.post(this.apiUrl, { ...data, posicion });
  }

  delete(carnet: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${carnet}`);
  }

  invertirLista(): Observable<any> {
    return this.http.get(`${this.apiUrl}/invertir`);
  }

  getHistorial(carnet: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${carnet}/historial`);
  }

  sortHistorial(carnet: string, campo: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${carnet}/historial/sort/${campo}`, {});
  }
}
```

### 10.2 Visualización de la Lista Enlazada con D3.js

Instrucción para Cursor: **En `linked-list-visual.component.ts` usa D3.js para dibujar la lista:**

```typescript
import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-linked-list-visual',
  template: `<svg #svgContainer width="100%" height="200"></svg>`
})
export class LinkedListVisualComponent implements OnInit {
  // @Input recibe datos del componente padre
  @Input() nodes: any[] = [];

  // @ViewChild obtiene referencia al elemento SVG del HTML
  @ViewChild('svgContainer', { static: true }) svgRef!: ElementRef;

  ngOnInit() {
    this.render();
  }

  render() {
    const svg = d3.select(this.svgRef.nativeElement);
    svg.selectAll('*').remove(); // Limpiar antes de redibujar

    const nodeWidth = 120;
    const nodeHeight = 60;
    const gap = 40;

    this.nodes.forEach((node, i) => {
      const x = i * (nodeWidth + gap) + 20;
      const y = 70;

      // Dibujar rectángulo del nodo
      svg.append('rect')
        .attr('x', x).attr('y', y)
        .attr('width', nodeWidth).attr('height', nodeHeight)
        .attr('rx', 8) // Bordes redondeados
        .style('fill', '#1E3A5F')
        .style('cursor', 'pointer')
        .on('click', () => console.log('Nodo clickeado:', node.data));

      // Texto del carnet
      svg.append('text')
        .attr('x', x + nodeWidth / 2).attr('y', y + 25)
        .attr('text-anchor', 'middle')
        .style('fill', 'white').style('font-size', '12px')
        .text(node.data.carnet);

      // Texto del nombre
      svg.append('text')
        .attr('x', x + nodeWidth / 2).attr('y', y + 45)
        .attr('text-anchor', 'middle')
        .style('fill', '#A8D8EA').style('font-size', '10px')
        .text(node.data.nombre);

      // Flecha → al siguiente nodo
      if (node.hasNext) {
        svg.append('line')
          .attr('x1', x + nodeWidth).attr('y1', y + nodeHeight / 2)
          .attr('x2', x + nodeWidth + gap).attr('y2', y + nodeHeight / 2)
          .style('stroke', '#FFA500').style('stroke-width', 2);

        // Punta de flecha
        svg.append('polygon')
          .attr('points', `${x + nodeWidth + gap},${y + nodeHeight / 2 - 5} ${x + nodeWidth + gap + 10},${y + nodeHeight / 2} ${x + nodeWidth + gap},${y + nodeHeight / 2 + 5}`)
          .style('fill', '#FFA500');
      }
    });
  }
}
```

### 10.3 Módulos de Cursos, Catedráticos y Pensum

Instrucción para Cursor: **Genera los módulos restantes:**

```bash
# Módulo Cursos (FASE 2)
ng generate module modules/cursos --routing
ng generate component modules/cursos/cursos-list
ng generate component modules/cursos/cursos-form
ng generate component modules/cursos/avl-tree-visual
ng generate service modules/cursos/cursos

# Módulo Catedráticos (FASE 3)
ng generate module modules/catedraticos --routing
ng generate component modules/catedraticos/catedraticos-list
ng generate component modules/catedraticos/catedraticos-form
ng generate component modules/catedraticos/hash-table-visual
ng generate service modules/catedraticos/catedraticos

# Módulo Pensum (FASE 4)
ng generate module modules/pensum --routing
ng generate component modules/pensum/pensum-map
ng generate component modules/pensum/pensum-form
ng generate component modules/pensum/graph-visual
ng generate service modules/pensum/pensum
```

### 10.4 Visualización del Árbol AVL con D3.js

Instrucción para Cursor: **El componente `avl-tree-visual` debe usar D3.js para:**
- Dibujar el árbol jerárquico con `d3.hierarchy()` y `d3.tree()`
- Mostrar el factor de balance en cada nodo
- Colorear en rojo los nodos con balance fuera de rango (-1 a 1)
- Incluir botones para alternar entre vista BST y AVL

### 10.5 Visualización del Grafo con vis.js

Instrucción para Cursor: **Para el grafo del pensum, instala vis.js:**

```bash
npm install vis-network
npm install --save-dev @types/vis
```

Y en `graph-visual.component.ts`:

```typescript
import { Network } from 'vis-network';
// Usar this.apiService.getVisual() para obtener {nodes, edges}
// Crear new Network(container, {nodes, edges}, options)
// Configurar opciones: layout.hierarchical para mostrar niveles del pensum
// Agregar evento de click en nodo para resaltar prerrequisitos
```

---

## 11. CRITERIOS DE CALIDAD

### 11.1 Archivos README

Instrucción para Cursor: **Crea `README.md` en la raíz con:**

```markdown
# UniTrack — Gestión Universitaria

## Requisitos Previos
- Node.js 18+
- npm 9+
- Angular CLI 17+

## Instalación y Ejecución

### Backend
cd backend
npm install
npm run dev       # Inicia en http://localhost:3000

### Frontend
cd frontend
npm install
ng serve          # Inicia en http://localhost:4200

## Estructura del Proyecto
[incluir el árbol de carpetas]

## API Documentation
Ver sección 9 del plan maestro o consultar /api/docs
```

### 11.2 Análisis de Complejidad Big-O

Instrucción para Cursor: **Crea `COMPLEXITY_ANALYSIS.md` con:**

| Operación | Lista Simple | Lista Doble | BST/AVL | Hash Table | Grafo |
|-----------|-------------|------------|---------|------------|-------|
| Insertar | O(1) inicio / O(n) final | O(1) ambos | O(log n) | O(1) prom. | O(1) |
| Buscar | O(n) | O(n) | O(log n) | O(1) prom. | O(V+E) |
| Eliminar | O(n) | O(n) | O(log n) | O(1) prom. | O(V+E) |
| Recorrer | O(n) | O(n) | O(n) | O(n) | O(V+E) |

*n = número de elementos, V = vértices, E = aristas*

### 11.3 Datos de Prueba

Instrucción para Cursor: **Crea `backend/src/data/estudiantes.json` con al menos 5 estudiantes:**

```json
[
  {
    "carnet": "2024001",
    "nombre": "María",
    "apellido": "García",
    "correo": "maria.garcia@universidad.edu.gt",
    "fechaNacimiento": "2002-03-15",
    "carrera": "Ingeniería en Sistemas",
    "semestreActual": 3,
    "historial": [
      { "codigoCurso": "MAT101", "semestre": "2023-1", "nota": 85, "estado": "completada" },
      { "codigoCurso": "INF101", "semestre": "2023-1", "nota": 92, "estado": "completada" }
    ]
  }
]
```

---

## 📝 ORDEN DE IMPLEMENTACIÓN RECOMENDADO PARA CURSOR

Dile a Cursor que implemente en este orden:

1. **Primero**: Estructura de carpetas + configuración base (app.js, package.json)
2. **Segundo**: FASE 1 completa — LinkedList + DoublyLinkedList + backend + frontend básico
3. **Tercero**: FASE 2 — AVLTree + backend + visualización D3
4. **Cuarto**: FASE 3 — HashTable + backend + visualización de buckets
5. **Quinto**: FASE 4 — DirectedGraph + backend + visualización vis.js
6. **Finalmente**: Navbar, estilos globales, responsive design, README

---

## ⚠️ RESTRICCIONES IMPORTANTES (Recuérdales a Cursor)

1. **NO usar** `Array.prototype` como sustituto de listas enlazadas
2. **NO usar** librerías como `graphlib`, `mnemonist`, o similares para las estructuras
3. **SÍ se permite** D3.js, vis.js, Chart.js solo para VISUALIZACIÓN gráfica
4. **SÍ se permite** arreglos nativos solo como soporte interno en la Tabla Hash
5. Cada estructura debe ser una clase con su propia lógica de nodos
6. El flujo siempre es: datos entran por Angular → se procesan en Node.js con las estructuras → el resultado vuelve a Angular

---

*Plan generado para el Proyecto Final UniTrack — Universidad Regional de Guatemala*
*Curso: Estructura de Datos — Stack: Angular + TypeScript / Node.js + Express*
