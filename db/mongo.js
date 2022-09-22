const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const validateStudent = require('../lib/validateStudent');
const validateMto = require('../lib/validateTeacher');
// var ObjectId = require('mongodb').ObjectId

const dbName = "horariosCoordi";
const collName1 = "cuentas";
const collName2 = "materias";
const collName3 = "horarioMaestro";
const collName4 = "horarioAlumno";
const collName5 = "info";

const url = process.env.MONGODB_URL || "mongodb://localhost:27017";

const client = new MongoClient(url);

// CONEXIÓN A DB CUENTAS
const connectToAcc = async () => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collName1);

  console.log("Connected to Cuentas");

  return {
    collection,
    db
  };
};

// CONEXIÓN A DB MATERIAS
const connectToMaterias = async () => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collName2);

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
  const collection = db.collection(collName3);

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
  const collection = db.collection(collName4);

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
  const collection = db.collection(collName5);

  console.log("Connected To Info");

  return {
    collection,
    db
  };
};

// // BUSCAR USUARIOS
const checaUsuario = async (matricula) => {
  let { collection } = await connectToAcc()

  let response = await collection.findOne({ matricula: matricula })

  if (!response) {
    throw false
  }
  return response
}

// // CREAR NUEVO USUARIO DE TIPO ALUMNO
const nuevoAl = async (user) => {
  const { collection } = await connectToAcc();

  const res = await collection.findOne({
    matricula: user.matricula
  });

  // EN CASO DE QUE EL CORREO YA EXISTA, MANDAR ERROR
  if (res) {
    throw 'Ya existe una cuenta con esa matricula'
  }

  const validaAl = validateStudent(user);

  // REDIRECCIONAR EN CASO DE QUE EL FORMATO DE LA DATA SEA INVALIDA
  if (validaAl.error) {
    // TODO:
    // res.redirect("/login/signup?errSU=1");
    throw `Error en los inputs ${validaAl.error}`
  }

  // ENCRIPTAR LA CONTRASEÑA Y GUARDARLA EN LA BASE DE DATOS
  let hash = await bcrypt.hash(user.password, 10);

  await collection.insertOne({
    nombres: user.firstName,
    apellidos: user.lastName,
    matricula: user.matricula,
    password: hash,
    carrera: user.ing,
    semestre: user.semestre,
    tipo: 'alumno',
    estado: 'activo'
  });
};

// // CREAR NUEVO USUARIO DE TIPO MAESTRO
const nuevoMto = async (user) => {
  const { collection } = await connectToAcc();

  const res = await collection.findOne({
    matricula: user.matricula
  });

  // EN CASO DE QUE EL CORREO YA EXISTA, MANDAR ERROR
  if (res) {
    throw 'Ya existe una cuenta con esa matricula'
  }

  const validaMto = validateMto(user);

  // REDIRECCIONAR EN CASO DE QUE EL FORMATO DE LA DATA SEA INVALIDA
  if (validaMto.error) {
    // TODO:
    // res.redirect("/login/signup?errSU=1");
    throw `Error en los inputs ${validaMto.error}`
  }

  // ENCRIPTAR LA CONTRASEÑA Y GUARDARLA EN LA BASE DE DATOS
  let hash = await bcrypt.hash(user.password, 10);

  await collection.insertOne({
    nombres: user.firstName,
    apellidos: user.lastName,
    matricula: user.matricula,
    password: hash,
    especialidad: user.especialidad,
    tipo: 'maestro',
    estado: 'activo'
  });
};

// // CREAR NUEVA MATERIA
const nuevaMateria = async (user) => {
  const { collection } = await connectToMaterias();

  const res = await collection.findOne({
    materia: user.materia,
    carrera: user.ing,
    semestre: user.semestre
  });

  // EN CASO DE QUE YA EXISTA, MANDAR ERROR
  if (res) {
    throw 'Ya existe esa materia'
  }

  await collection.insertOne({
    materia: user.materia,
    horas: user.horas,
    carrera: user.ing,
    semestre: user.semestre
  });

  //   await collection.insertMany([{
  //     materia: 'Habilidades Intelectuales 1',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '1'
  //   },
  //   {
  //     materia: 'Destrezas para el Aprendizaje',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '1'
  //   },
  //   {
  //     materia: 'Matemáticas 1',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '1'
  //   },
  //   {
  //     materia: 'Desarrollo de entornos para Videojuegos',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '1'
  //   },
  //   {
  //     materia: 'Electricidad y Magnetismo',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '1'
  //   },
  //   {
  //     materia: 'Introduccion a la Ingenieria en Sistemas Computacionales',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '1'
  //   },
  //   {
  //     materia: 'Fundamentos de Programación',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '1'
  //   },
  //   {
  //     materia: 'Idioma Extranjero 2',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '2'
  //   },
  //   {
  //     materia: 'Construcción de la Persona Humana',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '2'
  //   },
  //   {
  //     materia: 'Matemáticas 2',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '2'
  //   },
  //   {
  //     materia: 'Animación de Personajes para Videojuegos',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '2'
  //   },
  //   {
  //     materia: 'Álgebra Lineal',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '2'
  //   },
  //   {
  //     materia: 'Diseño de Interfaces Web',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '2'
  //   },
  //   {
  //     materia: 'Circuitos Eléctricos y Electrónicos',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '2'
  //   },
  //   {
  //     materia: 'Programación 1',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '2'
  //   },
  //   {
  //     materia: 'Diseño de Interfaces Móviles',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '2'
  //   },
  //   {
  //     materia: 'Idioma Extranjero 3',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '3'
  //   },
  //   {
  //     materia: 'Matemáticas 3',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '3'
  //   },
  //   {
  //     materia: 'Integración y Programación de Videojuegos',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '3'
  //   },
  //   {
  //     materia: 'Electrónica Digital',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '3'
  //   },
  //   {
  //     materia: 'Introducción a Bases de Datos',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '3'
  //   },
  //   {
  //     materia: 'Programación 2',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '3'
  //   },
  //   {
  //     materia: 'Redes 1',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '3'
  //   },
  //   {
  //     materia: 'Idioma Extranjero 4',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '4'
  //   },
  //   {
  //     materia: 'Programación 3 ',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '3'
  //   },
  //   {
  //     materia: 'Manejo de bases de datos',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '4'
  //   },
  //   {
  //     materia: 'Estructura de datos',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '4'
  //   },
  //   {
  //     materia: 'Probabilidad y Estadística',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '4'
  //   },
  //   {
  //     materia: 'Laboratorio de Hardware y Fundamentos de S.O.',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '4'
  //   },
  //   {
  //     materia: 'Estrategias del Trabajo Colaborativo',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '4'
  //   },
  //   {
  //     materia: 'Redes 2',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '4'
  //   },
  //   {
  //     materia: 'Prácticas de Integración Profesional 1',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '4'
  //   },
  //   {
  //     materia: 'Idioma extranjero 5',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '5'
  //   },
  //   {
  //     materia: 'Comunicación',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '5'
  //   },
  //   {
  //     materia: 'Administración de Servicios Web',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '5'
  //   },
  //   {
  //     materia: 'Integración de Bases de Datos a Aplicaciones',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '5'
  //   },
  //   {
  //     materia: 'Configuración de Servidores',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '5'
  //   },
  //   {
  //     materia: 'Inteligencia de Negocios',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '5'
  //   },
  //   {
  //     materia: 'Integración de Tecnologias Avanzadas 1',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '5'
  //   },
  //   {
  //     materia: 'Idioma extranjero 6',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '6'
  //   },
  //   {
  //     materia: 'Habilidades para el Trabajo Profesional',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '6'
  //   },
  //   {
  //     materia: 'Servicios de Computación en Internet',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '6'
  //   },
  //   {
  //     materia: 'Interfaces Gráficas y Reportes',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '6'
  //   },
  //   {
  //     materia: 'Automatización Domótica',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '6'
  //   },
  //   {
  //     materia: 'Integración de Tecnologias Avanzadas 2',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '6'
  //   },
  //   {
  //     materia: 'Cyberseguridad',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '6'
  //   },
  //   {
  //     materia: 'Calidad del Software',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '6'
  //   },
  //   {
  //     materia: 'Prácticas de Integración Profesional 2',
  //     horas: 50,
  //     carrera: 'ISC',
  //     semestre: '6'
  //   },
  //   {
  //     materia: 'Gestión de Proyectos',
  //     horas: 60,
  //     carrera: 'ISC',
  //     semestre: '7'
  //   },
  //   {
  //     materia: 'Comercio Electrónico',
  //     horas: 40,
  //     carrera: 'ISC',
  //     semestre: '7'
  //   },
  //   {
  //     materia: 'Laboratorio de Telecomunicaciones',
  //     horas: 60,
  //     carrera: 'ISC',
  //     semestre: '7'
  //   },
  //   {
  //     materia: 'Seguridad en Aplicaciones de Servidores',
  //     horas: 60,
  //     carrera: 'ISC',
  //     semestre: '7'
  //   },
  //   {
  //     materia: 'Software Empresarial 2',
  //     horas: 60,
  //     carrera: 'ISC',
  //     semestre: '7'
  //   },
  //   {
  //     materia: 'Graficación por Computadora',
  //     horas: 60,
  //     carrera: 'ISC',
  //     semestre: '7'
  //   },
  //   {
  //     materia: 'Calidad del Software',
  //     horas: 40,
  //     carrera: 'ISC',
  //     semestre: '7'
  //   },
  //   {
  //     materia: 'Habilidades Gerenciales',
  //     horas: 40,
  //     carrera: 'ISC',
  //     semestre: '8'
  //   },
  //   {
  //     materia: 'Administración de Proyectos',
  //     horas: 60,
  //     carrera: 'ISC',
  //     semestre: '8'
  //   },
  //   {
  //     materia: 'Tópicos Avanzados de Tecnologías de la Información',
  //     horas: 60,
  //     carrera: 'ISC',
  //     semestre: '8'
  //   },
  //   {
  //     materia: 'Seguridad en Redes',
  //     horas: 60,
  //     carrera: 'ISC',
  //     semestre: '8'
  //   },
  //   {
  //     materia: 'Legislación Informática y Piratería',
  //     horas: 40,
  //     carrera: 'ISC',
  //     semestre: '8'
  //   },
  //   {
  //     materia: 'Evaluación de Proyectos',
  //     horas: 60,
  //     carrera: 'ISC',
  //     semestre: '8'
  //   },
  //   {
  //     materia: 'Automatización',
  //     horas: 60,
  //     carrera: 'ISC',
  //     semestre: '8'
  //   }]);
};

const estableceFechas = async (fechas, anio) => {
  const { collection } = await connectToInfo();

  let fechaIni = `${fechas.mesI} ${fechas.diaI}`
  let fechaTer = `${fechas.mesT} ${fechas.diaT}`

  await collection.updateOne({ cosa: 'fechas', anio: anio }, { $set: { fecIni: fechaIni, fecTer: fechaTer } }, { upsert: true })
}

const dameFechas = async () => {
  const { collection } = await connectToInfo();
  let fechas = await collection.findOne({ cosa: 'fechas' })
  return fechas
}

const dameClases = async (sem, carr) => {
  const { collection } = await connectToMaterias()
  let clases = await collection.find({ semestre: sem, carrera: carr }).toArray()
  return clases
}

const dameProfes = async () => {
  const { collection } = await connectToAcc()
  let profes = await collection.find({ tipo: 'maestro' }, { _id: 0, nombres: 1, apellidos: 1 }).toArray()
  let profes2 = []
  profes.forEach(cosa => {
    let nombreComp = `${cosa.nombres} ${cosa.apellidos}`
    profes2.push(nombreComp)
  });
  return profes2
}

const creaHorarioAl = async (datos, anio) => {
  const { collection } = await connectToHorarioAlumno()
  let x
  let numMes = new Date().getMonth()
  if (numMes < 6) x = 1
  else x = 0
  let resp = await collection.findOne({ carrera: datos.carrera, semestre: datos.semestre, mitadAnio: x })

  if (resp) {
    throw "Horario ya existente"
  }

  await collection.insertOne({
    carrera: datos.carrera,
    semestre: datos.semestre,
    f1: datos.f1,
    f2: datos.f2,
    f3: datos.f3,
    f4: datos.f4,
    f5: datos.f5,
    f6: datos.f6,
    f7: datos.f7,
    f8: datos.f8,
    f9: datos.f9,
    aula: datos.aula,
    mitadAnio: x
  })
}

const dameHrAl = async (carr, sem) => {
  const { collection } = await connectToHorarioAlumno()
  let resp = collection.findOne({ carrera: carr, semestre: sem })
  return resp
}

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
  connectToAcc,
  connectToMaterias,
  connectToHorarioMaestros,
  connectToHorarioAlumno,
  connectToInfo,
  checaUsuario,
  nuevoAl,
  nuevoMto,
  nuevaMateria,
  estableceFechas,
  dameFechas,
  dameClases,
  dameProfes,
  creaHorarioAl,
  dameHrAl,
  // insertUser,
  // insertPayment,
  // updateUserState,
  // updateUserInfo,
  // searchUser,
  // searchUser2,
  // updateUserPass,
  // deleteAccount
};
