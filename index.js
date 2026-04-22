const express = require('express');
const app = express();
const port = process.env.PORT || 3127;

app.use(express.json());

const db = require('./conexion');
app.use(express.static('public'));

app.get('/categoria', (req, res) => {
    db.query('SELECT * FROM categoria', (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error DB" });
        }
        return res.json(result);
    });
});


app.get('/categoria-id/:id', (req, res) => {
    const { id } = req.params;

    db.query(
        'SELECT * FROM categoria WHERE id_categoria=?',
        [id],
        (err, result) => {
            if (err) return res.json(err);
            return res.json(result);
        }
    );
});

app.post('/categoria-insertar', (req, res) => {

    const { descripcion } = req.body;

    db.query(
        'INSERT INTO categoria (descripcion) VALUES (?)',
        [descripcion],
        (err, result) => {
            if (err) return res.json(err);

            return res.status(200).json({
                mensaje: 'Categoria creada',
                id: result.insertId,
                descripcion
            });
        }
    );
});

app.put('/categoria-actualizar/:id', (req, res) => {
    const { id } = req.params;
    const { descripcion } = req.body;

    db.query(
        'UPDATE categoria SET descripcion=? WHERE id_categoria=?',
        [descripcion, id],
        (err, result) => {
            if (err) return res.json(err);

            return res.json({
                mensaje: 'Categoria actualizada'
            });
        }
    );
});

app.delete('/categoria-eliminar/:id', (req, res) => {
    const { id } = req.params;

    db.query(
        'DELETE FROM categoria WHERE id_categoria=?',
        [id],
        (err, result) => {
            if (err) return res.json(err);

            return res.json({
                mensaje: 'Categoria eliminada'
            });
        }
    );
});

app.listen(port, () => {
    console.log('Servidor escuchando en http://localhost:' + port);
});