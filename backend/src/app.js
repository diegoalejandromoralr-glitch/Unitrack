const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const estudiantesRoutes    = require('./routes/estudiantes.routes');
const cursosRoutes         = require('./routes/cursos.routes');
const catedraticosRoutes   = require('./routes/catedraticos.routes');
const pensumRoutes         = require('./routes/pensum.routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/estudiantes',  estudiantesRoutes);
app.use('/api/cursos',       cursosRoutes);
app.use('/api/catedraticos', catedraticosRoutes);
app.use('/api/pensum',       pensumRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'UniTrack API funcionando correctamente' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor', detalle: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`UniTrack API corriendo en http://localhost:${PORT}`);
});

module.exports = app;
