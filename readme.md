#DADOS GAME V2<br>
####PASOS PARA UTILIZAR LA APP<br>

Use el comando `npm install` para instalar todos los modulos necesarios para correr la aplicación.<br> 
crear archivo .env en la raíz del proyecto con los siguientes datos:<br><br>
JWTSECRET=Maradona
<br><br>
`npm run dev`
<br><br>
Registrar un administrador:<br>
POST localhost:4000/signup
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
POST localhost:4000/login
{
"email": "admin@dadosv2.com",
"password": “dieguitoarmando"
}

CREAR JUGADOR
POST localhost:4000/players 
{
“username”: “algo"
}

o sin enviar JSON crea un jugador “ANONIMO"
También se crea jugador anónimo enviando un JSON con el username vacío:
{
“username”: “”
}

VER TODOS LOS JUGADORES
GET localhost:4000/players

MODIFICAR USERNAME DE UN JUGADOR
PUT localhost:4000/players/ID
{
“username”: “otro nombre”
}

VER UN JUGADOR POR SU ID
GET localhost:4000/player/ID

BORRAR UN JUGADOR POR ID
DELETE localhost:4000/player/ID

JUGAR AL JUEGO
POST localhost:4000/games/ID

BORRAR HISTORIAL DE JUGADAS DE UN JUGADOR
DELETE localhost:4000/games/ID

VER HISTORIAL DE JUGADAS DE UN JUGADOR
GET localhost:4000/games/ID

VER RANKING
GET localhost:4000/ranking

VER MEJOR JUGADOR
GET localhost:4000/better-player

VER PEOR JUGADOR
GET localhost:4000/worst-player
