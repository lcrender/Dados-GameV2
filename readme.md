# DADOS GAME V2<br>
#### PASOS PARA UTILIZAR LA APP<br>

Use el comando `npm install` para instalar todos los modulos necesarios para correr la aplicación.<br> 
Crear archivo .env en la raíz del proyecto con los siguientes datos:<br><br>
DATABASE_LOCAL=localhost:27017/game<br>
JWTSECRET=Maradona
<br><br>
`npm run dev`
<br><br>

- REGISTRAR UN ADMINISTRADOR:<br>
`POST localhost:4000/signup`
{
"email": "admin@dadosv2.com",
"password": “dieguitoarmando"
}
<br>
La app debe devolver un token , copiado y agrégalo en el header:<br>

KEY: x-access-token<br>
VALUE: el valor del token generado<br>
<br>
Si ya registraste un administrador puedes iniciar sesión también te devolverá el token para agregar en el header:<br>
`POST localhost:4000/login`
{
"email": "admin@dadosv2.com",
"password": “dieguitoarmando"
}

- CREAR JUGADOR:<br>
`POST localhost:4000/players`
{
“username”: “algo"
}

Si envias una peticion POST a la URL sin un JSON, la app creara un jugador “ANONIMO".<br>
También se crea jugador anónimo enviando un JSON con el username vacío: 
{
“username”: “”
}

- VER TODOS LOS JUGADORES:<br>
`GET localhost:4000/players`
<br><br>
- MODIFICAR USERNAME DE UN JUGADOR:<br>
`PUT localhost:4000/players/ID`
{
“username”: “otro nombre”
}
<br><br>
- VER UN JUGADOR POR SU ID:<br>
`GET localhost:4000/player/ID`
<br><br>
- BORRAR UN JUGADOR POR ID:<br>
`DELETE localhost:4000/player/ID`
<br><br>
- JUGAR AL JUEGO:<br>
`POST localhost:4000/games/ID`
<br><br>
- BORRAR HISTORIAL DE JUGADAS DE UN JUGADOR: <br>
`DELETE localhost:4000/games/ID`
<br><br>
- VER HISTORIAL DE JUGADAS DE UN JUGADOR:<br>
`GET localhost:4000/games/ID`
<br><br>
- VER RANKING: <br>
`GET localhost:4000/ranking`
<br><br>
- VER MEJOR JUGADOR:<br>
`GET localhost:4000/better-player`
<br><br>
- VER PEOR JUGADOR:<br>
`GET localhost:4000/worst-player`
<br><br><br>