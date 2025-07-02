const mongoose = require('mongoose');

const ejercicioSchema = mongoose.Schema({
  nombre: { type: String, required: true },
  tipo: { type: String, required: true },
  duracion: { type: Number, required: true },
  calorias: { type: Number, required: true },
});
const ejercicios=mongoose.model('Ejercicios', ejercicioSchema);
module.exports = ejercicios;

