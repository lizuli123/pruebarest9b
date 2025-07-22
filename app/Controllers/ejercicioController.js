const ejercicioModel = require('../models/EjerciciosModel');

// Obtener todos los ejercicios
function buscarTodo(req, res) {
    ejercicioModel.find({})
        .then(ejercicios => {
            if (ejercicios.length) {
                return res.status(200).send({ ejercicios });
            }
            return res.status(204).send({ mensaje: "No hay información que mostrar" });
        })
        .catch(e => {
            return res.status(404).send({ mensaje: `Error al buscar la información: ${e}` });
        });
}

// Guardar un nuevo ejercicio
function guardarEjercicio(req, res) {
    console.log(req.body);
    new ejercicioModel(req.body).save()
        .then(info => {
            return res.status(200).send({ mensaje: "Información guardada con éxito", info });
        })
        .catch(e => {
            return res.status(404).send({ mensaje: "Error al guardar la información", error: e });
        });
}

// Buscar ejercicio por key y value
function buscarEjercicio(req, res, next) {
    const consulta = {};
    consulta[req.params.key] = req.params.value;

    ejercicioModel.find(consulta)
        .then(info => {
            if (!info.length) return next(); // No encontrado, sigue al siguiente middleware

            req.ejercicios = info; // ✅ Guardamos en req, no en req.body
            return next();
        })
        .catch(e => {
            req.error = e; 
            return next();
        });
}

// Mostrar ejercicio (resultado de buscarEjercicio)
function mostrarEjercicio(req, res) {
    if (req.error) {
        return res.status(404).send({
            mensaje: "Error al buscar la información",
            error: req.error
        });
    }

    if (!req.ejercicios) {
        return res.status(204).send({ mensaje: "No hay información que mostrar" });
    }

    return res.status(200).send({ ejercicios: req.ejercicios });
}
function eliminarEjercicio(req, res) {
    const consulta = {};
    consulta[req.params.key] = req.params.value;

    ejercicioModel.deleteMany(consulta)
        .then(resultado => {
            if (resultado.deletedCount === 0) {
                return res.status(404).send({ mensaje: "No se encontró ningún ejercicio para eliminar" });
            }
            return res.status(200).send({
                mensaje: `${resultado.deletedCount} ejercicio(s) eliminado(s) con éxito`
            });
        })
        .catch(error => {
            return res.status(500).send({ mensaje: "Error al eliminar ejercicio", error });
        });
}
function actualizarEjercicio(req, res) {
    const consulta = {};
    consulta[req.params.key] = req.params.value;

    ejercicioModel.findOneAndUpdate(consulta, req.body, { new: true })
        .then(ejercicioActualizado => {
            if (!ejercicioActualizado) {
                return res.status(404).send({ mensaje: "Ejercicio no encontrado para actualizar" });
            }
            return res.status(200).send({ mensaje: "Ejercicio actualizado con éxito", ejercicioActualizado });
        })
        .catch(e => {
            return res.status(500).send({ mensaje: "Error al actualizar el ejercicio", error: e });
        });
}



module.exports = {
    buscarTodo,
    guardarEjercicio,
    buscarEjercicio,
    mostrarEjercicio,
    eliminarEjercicio,
    actualizarEjercicio
};
