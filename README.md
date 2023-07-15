# Carshop Bootcamp 

## Descripción

El proyecto consiste en una página para reservar servicios dentro de un taller mecánicos, donde los usuarios puede llenar sus datos, los datos
del vehículo y los servicios que desean obtener, finalmente que estos datos sean correctos para poder reservar la cita. 

## Desarrollo
Para el desarrollo de este proyecto se utilizó React como framework para el FrontEnd y Node-Express para el backend, así como también MongoDB como base de datos
para el almacenamiento y manejo de toda la data.

## Funcionalidades
Carshop presenta una interfaz tanto para el cliente como para los trabajadores, administradores y operarios, así como una api para una aplicación móvil mediante la cuál se puede interactuar con el servidor.
![image](https://github.com/sofia604/carshop_Node/assets/51239054/c0f1d9c3-fec2-4f50-9dda-9fe09edabb80)
### Vista - Cliente 
Como cliente es posible tener una vista del landing page y de información general del sitio sin necesidad de iniciar sesión.
También es posible crear una cuenta e iniciar sesión con la misma, al hacer esto se tiene acceso a las principales funcionalidades de la página como:
- Crear Tickets
- Visualizar mis tickets
![image](https://github.com/sofia604/carshop_Node/assets/51239054/38c544d1-3425-45b8-bbee-093da286390c)
### Vista - Administrador
Como aministrador se debe estar previamente registrado en la base de datos, aunque el api cuenta con la funcionalidad de registro para ingresar nuevos colaboradores
especificando si su rol es de administrador u operario.
La página permite visualizar todos los tickets que existen en la base, agendarlos modificando la fecha y hora de la cita.
Como aministrador se puede cancelar un ticket y eliminar un ticket, así mismo se cuenta con una ventana de estadísticas para visualizar gráficas en función de los
tickets creados por mes. 
![image](https://github.com/sofia604/carshop_Node/assets/51239054/4d38c99c-ef3d-49cf-802b-17318ebe4bba)
### Autenticación
El sitio cuenta con una autenticación mediante tokens JWT los cuales permiten tanto a los usuarios como a los administradores y operarios acceder a las funcionalidades, en caso de que este no exista o no sea valido, el sitio automáticamente lo redirigirá a la opción de Login. 

## Despliegue
### Local
Para desplegar el proyecto de manera local se debe clonar el mismo.

```git clone https://github.com/sofia604/carshop_Node.git```

Luego se debe ingresar a la carpeta clonada desde la terminal

```cd carshop```

Se debe correr los siguientes comandos

```npm install```
```npm start```

Luego automáticamente se abirá una pestaña en el navegadore dentro del localhost:4000


