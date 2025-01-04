/*const admin = require("firebase-admin")

const validarFirebase = async (req, res, next) => {
  const firebaseToken = req.headers["authorization"]?.replace("Bearer ", "")

  try {
    if (!firebaseToken) {
      return res.status(401).json({ ok: false, error: "Token no enviado" })
    }
    await admin
      .auth()
      .verifyIdToken(firebaseToken)
      .then((decodedToken) => {
        const uid = decodedToken.uid
        next()
      })
  } catch (error) {
    console.log(error)
    return res.status(401).json({ ok: false, error: "Token inválido" })
  }
}

module.exports = {validarFirebase}*/

const admin = require("firebase-admin");

const validarFirebase = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ ok: false, error: "Token no enviado o inválido" });
    }

    const firebaseToken = authHeader.replace("Bearer ", "");

    // Verificar el token de Firebase
    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);

    // Agregar la información del usuario al objeto `req`
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      displayName: decodedToken.name || "",
      photoUrl: decodedToken.picture || "",
    };

    next(); // Continuar con el siguiente middleware/controlador
  } catch (error) {
    console.error("Error al validar el token de Firebase:", error);
    return res.status(401).json({ ok: false, error: "Token inválido" });
  }
};

module.exports = { validarFirebase };
