const mongoose = require('mongoose');
const { Schema } = mongoose;

// Ticket
const ticketSchema = new Schema({
    asunto: { type: String, required: true },
    titulo: { type: String, required: true },
    descripcion: { type: String },
    tipoIncidencia: { type: String },
    estadoTrabajo: { type: String },
    fechaInicio: { type: Date, default: Date.now },
    fechaFin: { type: Date },
    notas: { type: String }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

// Usuario
const usuarioSchema = new Schema({
    nombre: { type: String, required: true },
    apellidos: { type: String },
    correo: { type: String, required: true },
    tipoUsuario: { type: String }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

// Archivo
const archivoSchema = new Schema({
    idTicket: { type: Schema.Types.ObjectId, ref: 'Ticket' },
    nombreArchivo: { type: String },
    urlArchivo: { type: String },
    tipoArchivo: { type: String }
});

const Archivo = mongoose.model('Archivo', archivoSchema);

module.exports = { Ticket, Usuario, Archivo };
