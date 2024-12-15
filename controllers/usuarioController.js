const admin = require("firebase-admin");
const Usuarios = require("../models/usuarioModel");


const createUsuario = async (req, res) => {
  const { displayName, email, photoURL, firebaseToken } = req.body;

  try {
    // Verificar el token de Firebase
    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);

    // Buscar el usuario en la base de datos
    let usuario = await Usuarios.findOne({ where: { email } });

    // Si no existe, lo crea
    if (!usuario) {
      usuario = await Usuarios.create({
        nombre: displayName,
        email,
        imagen: photoURL,
      });
    }

    return res.status(200).json({ ok: true, usuario });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return res.status(500).json({ ok: false, message: "Error al registrar usuario" });
  }
};


/*const createUsuario = async (req, res) => {
  const { displayName, email, photoURL, firebaseToken } = req.body;

  try {
    await admin
      .auth()
      .verifyIdToken(firebaseToken)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
       return res.json({ ok: true });
      });
    let cliente = await Usuarios.findOne({ where: { email } });
    if (!cliente) {
      cliente = await Usuarios.create({
        nombre: displayName,
        email,
        imagen: photoURL,
      });
    }

  } catch (error) {
    console.error("Error al registrar cliente:", error);
   return res.status(500).json({ message: "Error al registrar cliente" });
  }
};*/

const getAllUsuarios = async (req, res = response) => {
    try {
        const usuario = await Usuarios.findAll();
        res.json(usuario);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const deleteUsuario = async (req, res = response) => {
    try {
        const deleted = await Usuarios.destroy({ where: { id: req.params.id } });
        deleted ? res.status(204).send() : res.status(404).json({ error: 'Usuario no encontrado' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

module.exports = { 
    createUsuario,
    getAllUsuarios,
    deleteUsuario
 };