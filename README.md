## ***Proyecto API Rest con NodeJS***

### **Descripción**

Este proyecto es un entregable para la materia de procesos y desarrollo de software. Tiene un propósito totalmente educativo y las funcionalidades se encuentran en desarrollo.
Para este proyecto, decidimos aplicar una arquitectura MVC. (No fue aplicado en su totalidad).

### MER

![service_system drawio](https://github.com/SebastianH03/service-university-system/assets/85850681/23a85eff-ff76-41b9-aa4e-483e6f987089)

### **Dependencias**

Para la implementación del proyecto y colaboradores, es necesario instalar los siguientes servicios:

1. MongoDB community Server, es necesario para activar el servicio de mongoDB, es decir el demonio mongod.exe. Link: [MongoDB community Server](https://www.mongodb.com/try/download/community)
2. Mongo Compass, es la interfaz visual de MongoDB (opcional pero facilita el trabajo). Link: [MongoDB compass](https://www.mongodb.com/products/tools/compass)
3. Postman, es la herramienta que usaremos para las pruebas en la API rest. Link: [Postman](https://www.postman.com/downloads/)
4. NodeJS, es el entorno de ejecución para la capa de servidor. Link: [NodeJS](https://nodejs.org/en)

El resto de dependencias ya se encuentran incluídas en el proyecto de git, se pueden consultar en el archivo package.json.

* Al ingresar al código (Visual Studio Code), en caso de ser necesario utilizar npm install para descargar dependencias faltantes.
* Adicionalmente, ingresar a la carpeta Client (front-end), y realizar nuevamente npm install, para descargar dependencias que pueden estar faltantes.

#### Activar el servidor (Demonio -> mongod.exe)

1. Crear una carpeta llamada "data" en el disco C
2. viajar a la siguiente ruta: C:\Program Files\MongoDB\Server\7.0\bin
3. ejecutar mongod.exe

Si se desea facilitar la ejecución del servidor, se puede agregar la ruta del ejecutable a las variables de entorno del sistema.

En caso de presentarse algún tipo de error, como una suspención repentina del servicio de mongod.exe, se debe hacer lo siguiente:
Ejecutar mongod.exe especificando la ruta de la carpeta data: mongod.exe -dbpath C:/data (data debe ser una carpeta creada en el disco C).

#### Ejecutar la API.

1. Debe estar activo el servidor.
2. comando para ejecutar el servicio back-ed: npm start
3. comando para ejectura el servicio front-end npm run dev

Se comprobará un correcto funcionamiento, si la terminal se presenta un mensaje que indique: "Conectado correctamente a la base de datos".

#### Funcionalidades

##### CRUD

Todas las colecciones, menos la colección history, cuentan con sus métodos CRUD.
A continuación, se va a presentar la forma correcta realizar las solicitudes desde postman:

##### Rutas

1. Customer: http://localhost:3900/Customer/ (tanto, POST, DEL, PUT y GET, cuentan con la misma dirección, si se desea una búsqueda por ID, agregar el ID a la ruta: http://localhost:3900/Customer/<id>
2. Sales: http://localhost:3900/sales/
3. Stock: http://localhost:3900/Stock/
4. Suppliers: http://localhost:3900/Suppliers/
5. Users: http://localhost:3900/Users/ (Para aplicar la generación de un informe de vendedor, utilizar la ruta http://localhost:3900/Users/name/<nombreDelVendedor>)

##### Método POST y PUT

Los métodos post y put, utilizados para crear y editar documentos en la base de datos, tienen su propia forma de creación desde POSTMAN. Para utilizarlo, se recomienda utilizar el body, con x-www-form-urlencoded.

###### Colección Services

![image](https://github.com/SebastianH03/service-university-system/assets/85850681/b1021d59-1154-46cf-b072-097364e9dcea)


###### Colección Stock

![image](https://github.com/SebastianH03/service-university-system/assets/85850681/1ddb3907-bdf6-4f27-b148-1223703800ce)


###### Colección Admins

Esta colección puede obtener información a partir de las solicitudes hechas desde el frontend, específicamente en el registro.

![image](https://github.com/SebastianH03/service-university-system/assets/85850681/3a8c8601-f8bc-4f55-b188-ac6851fd85a4)












