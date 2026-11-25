const express = require('express');

const mysql = require("mysql");
const app = express()
app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));
app.use("/img", express.static(__dirname + "/img"));

let conexion = mysql.createConnection({
    host: "localhost",
    database: "base_portafolio",
    user: "root",
    password: ""
})

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/validar", function (req, res) {
    const datos = req.body;
    console.log(datos);

    let Nombre = datos.Nombre;
    let Apellido = datos.Apellido;
    let Correo = datos.Correo;
    let Celular = datos.Celular;
    let Descripción = datos.Descripción;

    let registrar = "INSERT INTO registro_contactadores(Nombre, Apellido, Correo, Celular, Descripción) VALUES ('" + Nombre + "','" + Apellido + "','" + Correo + "','" + Celular + "','"+ Descripción +"')"
    conexion.query(registrar, function (error) {
        if (error) {
            throw error;
        } else {
            //console.log("Datos enviados correctamente");
            res.send(`
        <script>
          alert("Datos enviados correctamente");
          window.location.href="/";
        </script> 
        `);
        }
    });
});

app.listen(3000, () => {
    console.log("Servidor creado en Localhost")
})