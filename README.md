Markdown
# 🎓 UniTrack — Plataforma de Gestión Universitaria Basada en Estructuras de Datos Nativas

Este repositorio contiene el sistema de control académico **UniTrack**, desarrollado de forma personalizada para la **Universidad Regional de Guatemala**. El núcleo técnico del proyecto destaca por la total exclusión de librerías de colecciones comerciales, implementando de forma manual y a nivel de punteros en memoria las estructuras fundamentales para la aprobación del curso de **Estructuras de Datos**.

---

## 🛠️ Stack Tecnológico y Arquitectura

El sistema implementa una arquitectura desacoplada y limpia:
* **Backend:** Node.js (v20+) + Express.js en arquitectura de capas (Rutas, Controladores, Servicios y Modelos de Memoria).
* **Frontend:** Angular 17+ estructurado mediante módulos con carga perezosa (*Lazy Loading*).
* **Lienzos de Renderizado Gráfico:** D3.js (Árboles y Listas) y Vis-network (Físicas de Grafos).

---

## 📂 Arquitectura del Repositorio Local

```text
C:\UNITRACK_EXM\
├── backend/                           # Servidor de API REST (Node.js)
│   ├── src/
│   │   ├── app.js                     # Punto de entrada de Express
│   │   ├── routes/                    # Despachadores de Endpoints
│   │   ├── controllers/               # Interceptores de Petición HTTP
│   │   ├── data/                      # Persistencia en Archivos JSON de Prueba
│   │   └── services/
│   │       └── data-structures/       # ¡JOYAS DE LA CORONA (Algoritmia Pura)!
│   │           ├── LinkedList.js      # Lista Simple para Estudiantes activos
│   │           ├── DoublyLinkedList.js# Lista Doble para Historiales Académicos
│   │           ├── AVLTree.js         # Árbol Auto-balanceado para Asignaturas
│   │           ├── HashTable.js       # Tabla de Dispersión para Catedráticos
│   │           └── DirectedGraph.js   # Grafo Dirigido para el Pensum
│   └── package.json
└── frontend/                          # Interfaz de Usuario (Angular 17+)
🚀 Guía de Instalación y Despliegue Local
Sigue este orden estricto de terminales para inicializar el proyecto en tu máquina de desarrollo:

📥 Paso 1: Configurar e Inicializar el Backend
Abre tu primera terminal y ejecuta los siguientes comandos:

Bash
cd C:\UNITRACK_EXM\backend
npm install
npm run dev
🟢 Resultado esperado: Deberás ver el mensaje: UniTrack API corriendo en http://localhost:3000.

💻 Paso 2: Inicializar el Frontend en Angular
Abre una segunda terminal en paralelo y levanta el servidor de desarrollo de la UI:

Bash
cd C:\UNITRACK_EXM\frontend
npm install
ng serve
🟢 Resultado esperado: Deberás ver el mensaje: Local: http://localhost:4200.

🛡️ Restricciones Académicas y Reglas de Calidad (QA)
Cero Arrays como Sustituto: Está terminantemente prohibido el uso de arrays nativos de JavaScript para almacenar o simular listas o árboles. La información debe fluir a través de instancias de objetos conectados por punteros de memoria (next, prev, left, right).

Uso Permitido de Arrays: Los arreglos nativos se permiten únicamente para dimensionar los buckets iniciales indexados dentro de la clase HashTable.js.

Flujo Reactivo Completo: El ciclo de datos debe cumplir la regla: UI (Angular) ➔ Petición HTTP ➔ Backend (Algoritmo de Memoria) ➔ Serialización toVisualStructure() ➔ Renderizado Dinámico en el lienzo.
