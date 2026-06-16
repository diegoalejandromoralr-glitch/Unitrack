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
