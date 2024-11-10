# APP de Producto

Esta es una aplicación de producto sencilla creada con Docker, que le permite administrar sus tareas de una manera conveniente. La aplicación está en contenedores mediante Docker, lo que facilita su implementación y ejecución en cualquier entorno que admita Docker.

## Prerequisitos

Para ejecutar la aplicación de este producto con Docker, necesitará tener instalado el siguiente software en su máquina local: Docker Desktop

## Empezando

Para comenzar con la aplicación de este producto, siga los pasos a continuación:

1. Clonar el repositorio:

        git clone https://github.com/JonathanCalvo95/CRUD-DOCKER.git

2. Crear la imagen:
 
        docker build -t nombre-de-mi-imagen .
        
3. Cargar el contenedor Docker:
 
        docker run -p puerto:puerto --name nombre-de-mi-container nombre-de-mi-imagen

4. Pausar los contenedores, ubicarse en el path del archivo docker-compose y ejecutar:
 
        docker-compose up --build.

Esto iniciará el contenedor de la aplicación del producto y lo expondrá en el puerto configurado de su máquina local.

Acceda a la aplicación del producto en su navegador web:
    Abra un navegador web y vaya a http://localhost:puerto para acceder a la aplicación del producto.