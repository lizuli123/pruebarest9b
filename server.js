const app= require('./app/app')
const config = require('./app/config/configuracion')
const conexion = require('./app/config/conexion')
conexion.connect();

app.listen(config.PORT,()=>{
    console.log('aplicacion corriendo en puerto', config.PORT);
     config.PORT
})