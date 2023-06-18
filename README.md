# Backend Connect-Arte #

- **Autor**: Héctor Ginory

Este es el back-end del sistema basado en la gestión de una aplicación de búsqueda de empleo para artistas

## Contenido ##
El proyecto Back-End con el controlador de usuario y citas está realizado en:

- Node.js
- express.js
- MongoDB

## Cómo se hizo ##

Para esta aplicación he creado dos modelos para poder trabajar con ellos.

    - USERS
    - JOBVANCANCIES

Cada uno tiene su modelo, router y controlador.

Pero antes de explicar sus endpoint, les explicaré los middlewares que creé.


### MDW ###

- Auth: Esta función lee la autorización enviada por el header, extrae el token recibido y verifica si es correcto.

- SameUser: Esta función es para ver si el token es del mismo usuario en el que vayamos a hacer cambios.

- CheckNoInfoEmpty: Es una función para detectar que ninguno de los campos está vacío.

- ItsUser: Es una funcion para verificar el que el token pertenezca a un usuario.

- ItsCompany: Es una funcion para verificar el que el token pertenezca a una empresa.

- AllVancancieInfo: Es una función para verificar que toda la información de la vacante está siendo enviada.


## Users EndPoints ##

A continuación les dejaré todos los endpoints creados para la aplicación todos ellos deben empezar con '/user/...'

 - POST - '/' 
    - Este endpoint es para el registro de usuarios, no tiene ningún mdw.

 - POST - '/login' 
    - Este endpoint es para el inicio de sesion de usuarios, no tiene ningún mdw.

 - GET - '/byKeyWords' 
    - Este endpoint es para recibir usuarios cuyas keyWords coincidan con las palabras de interés del usuario que hace la petición. Usa el mdw de _Auth_

 - POST - '/follow/:username' 
    - Este endpoint es para añadirse a la lista de seguidores del usuario cuyo nombre de usuario coincida con :username, y a su vez añadir a dicho usuario a nuestra lista de seguidos. Usa el mdw de _Auth_.

 - POST - '/unfollow/:username' 
    - Este endpoint es para quitarse de la lista de seguidores del usuario cuyo nombre de usuario coincida con :username, y a su vez quitar a dicho usuario de nuestra lista de seguidos. Usa el mdw de _Auth_.

 - GET - '/regExp/:regExpUsername' 
    - Este endpoint es para buscar a todos los usuarios que coincidan con el regExp :regExpUsername. Usa el mdw de _Auth_.

- PUT - '/info/:username'
    - Este endpoint es para modificar la información principal del usuario. Usa los mdw de _Auth_ y _SameUser_.

- PUT - '/education/:username'
    - Este endpoint es para añadir la educación al usuario. Usa los mdw de _Auth_, _SameUser_ y _CheckNoInfoEmpty_.

- PUT - '/experience/:username'
    - Este endpoint es para añadir la experiencia al usuario. Usa los mdw de _Auth_, _SameUser_ y _CheckNoInfoEmpty_.

- POST - '/educationDelete/:username'
    - Este endpoint es para eliminar del usuario la educación enviada en el body. Usa los mdw de _Auth_ y _SameUser_.

- POST - '/experienceDelete/:username'
    - Este endpoint es para eliminar del usuario la experiencia enviada en el body. Usa los mdw de _Auth_ y _SameUser_.

- GET - ':username'
    - Este endpoint es para recibir el usuario que tenga de nombre de usuario :username. Usa el mdw de _Auth_.



## JobVacancies EndPoints ##

A continuación les dejaré todos los endpoints creados para la aplicación todos ellos deben empezar con '/vacancies/...'

 - POST - '/' 
    - Este endpoint es para la creación de ofertas de empleo, utiliza los mdw _Auth_, _ItsCompany_ y _AllVacancieInfo_.

 - GET - '/' 
    - Este endpoint es para recibir todas las ofertas que cumplan con el regExp pasado por query params, no usa ningún mdw.

 - GET - '/:id' 
    - Este endpoint es para recibir la oferta que tenga como id el parametro :id, utiliza el mdw _Auth_.

 - GET - '/user/:id' 
    - Este endpoint es para recibir todas las vacantes que le pertenezcan al usuario cuyo id sea igual a :id, utiliza el mdw _Auth_.

 - POST - '/apply/:id' 
    - Este endpoint es para aplicar a las ofertas de empleo, utiliza los mdw _Auth_ e _ItsUser_.

 - POST - '/delete/:id' 
    - Este endpoint es para eliminar una oferta de empleo, utiliza los mdw _Auth_ e _ItsCompany_.

## Implementar a futuro ##

A futuro me gustaría poder añadir más modelos y modifiar estos modelos para:

    - Sistema de mensajeria con sockets entre usuarios.
    - Poder guardar imagenes en base64
    - Modelo para que los usuarios puedan subir publicaciones.
    - Sistema de notificacions con sockets en los modelos de usuarios.
