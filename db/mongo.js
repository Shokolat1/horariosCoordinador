const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
// var ObjectId = require('mongodb').ObjectId

const dbName = "horariosCoordi";
const collName1 = "maestros";
const collName2 = "alumnos";
const collName3 = "materias";
const collName4 = "horarioMaestro";
const collName5 = "horarioAlumno";
const collName6 = "info";

const url = process.env.MONGODB_URL || "mongodb://localhost:27017";

const client = new MongoClient(url);

// CONEXIÓN A DB MAESTROS
const connectToMaestros = async () => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collName1);

  console.log("Connected To Maestros");

  return {
    collection,
    db
  };
};

// CONEXIÓN A DB ALUMNOS
const connectToAlumnos = async () => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collName2);

  console.log("Connected To Alumnos");

  return {
    collection,
    db
  };
};

// CONEXIÓN A DB MATERIAS
const connectToMaterias = async () => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collName3);

  console.log("Connected To Materias");

  return {
    collection,
    db
  };
};

// CONEXIÓN A DB HORARIO MAESTROS
const connectToHorarioMaestros = async () => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collName4);

  console.log("Connected To Horario Maestros");

  return {
    collection,
    db
  };
};

// CONEXIÓN A DB HORARIO ALUMNOS
const connectToHorarioAlumno = async () => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collName5);

  console.log("Connected To Horario Alumnos");

  return {
    collection,
    db
  };
};

// CONEXIÓN A DB INFO
const connectToInfo = async () => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collName6);

  console.log("Connected To Info");

  return {
    collection,
    db
  };
};

// // CREAR NUEVO USUARIO
// const insertUser = async (user) => {
//   const { collection } = await connectToMongo();

//   const res = await collection.findOne({
//     email: user.email
//   });

//   // EN CASO DE QUE EL CORREO YA EXISTA, MANDAR ERROR
//   if (res) {
//     client.close();
//     throw false
//   }

//   await collection.insertOne(user);

//   const res2 = await collection.findOne({
//     email: user.email
//   });

//   client.close();

//   return res2
// };

// // ACTUALIZAR DE SER USUARIO "PENDIENTE" A UNO "ACTIVO"
// const updateUserState = async (id) => {
//   await client.connect();
//   const db = client.db(dbName);
//   const collection = db.collection(usersCollectionName);

//   let response = await collection.findOneAndUpdate({ _id: ObjectId(id) }, { $set: { estado: "activo" } }, { new: true })

//   if (!response) {
//     throw false
//   }
//   return response
// }

// // ACTUALIZAR CONTRASEÑA EN CASO DE OLVIDO
// const updateUserPass = async (id, contraNueva) => {
//   await client.connect();
//   const db = client.db(dbName);
//   const collection = db.collection(usersCollectionName);

//   let response = await collection.findOneAndUpdate({ _id: ObjectId(id) }, { $set: { contrasena: contraNueva } }, { new: true })

//   if (!response) {
//     throw false
//   }
//   return response
// }

// // ACTUALIZAR INFO DEL USUARIO EN PANTALLA DE AJUSTES
// const updateUserInfo = async (user) => {
//   const { collection } = await connectToMongo();

//   if (!user.contrasena) {
//     await collection.updateOne({ email: user.email },
//       {
//         $set:
//         {
//           nombres: user.nombres,
//           apellidos: user.apellidos
//         }
//       }
//     )

//     var usuarioDB1 = await collection.findOne({ email: user.email })
//     return usuarioDB1

//   } else {
//     if (user.contrasena && !user.confirmacion) {
//       throw false
//     }

//     var usuarioDB2 = await collection.findOne({ email: user.email })
//     var respuesta = await bcrypt.compare(user.contrasena, usuarioDB2.contrasena);

//     if (respuesta) {
//       console.log('contraseña similar a la antigua')
//       throw false
//     } else {
//       var hashpass = await bcrypt.hash(user.contrasena, 10);
//       await collection.updateOne({ email: user.email },
//         {
//           $set:
//           {
//             nombres: user.nombres,
//             apellidos: user.apellidos,
//             contrasena: hashpass
//           }
//         }
//       )

//       var usuarioDB3 = await collection.findOne({ email: user.email })
//       return usuarioDB3
//     }
//   }
// }

// // PAGAR PRODUCTOS
// const insertPayment = async (payment) => {
//   await client.connect();
//   const db = client.db(dbName);
//   const collection = db.collection("payments");

//   await collection.insertOne(payment);

//   client.close();
// };

// // BUSCAR USUARIOS
// const searchUser = async (email) => {
//   await client.connect();
//   const db = client.db(dbName);
//   const collection = db.collection("users");

//   let response = await collection.findOne({ email: email })

//   console.log(response)
//   console.log(email)

//   if (!response) {
//     throw false
//   }
//   return response
// }

// const searchUser2 = async (id) => {
//   await client.connect();
//   const db = client.db(dbName);
//   const collection = db.collection("users");

//   let response = await collection.findOne({ _id: ObjectId(id) })

//   if (!response) {
//     throw false
//   }
//   return response
// }

// // DESACTIVAR USUARIOS
// const deleteAccount = async (user) => {
//   const { collection } = await connectToMongo();
//   await collection.updateOne(
//     {
//       email: user.email,
//     },
//     {
//       $set: {
//         estado: "inactivo",
//       },
//     }
//   );
// };

module.exports = {
  client,
  url,
  dbName,
  collName1,
  collName2,
  collName3,
  collName4,
  collName5,
  collName6,
  connectToMaestros,
  connectToAlumnos,
  connectToMaterias,
  connectToHorarioMaestros,
  connectToHorarioAlumno,
  connectToInfo,
  // insertUser,
  // insertPayment,
  // updateUserState,
  // updateUserInfo,
  // searchUser,
  // searchUser2,
  // updateUserPass,
  // deleteAccount
};
