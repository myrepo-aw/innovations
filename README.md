# Ejercicio de Desarrollo - README

Antes de comenzar, por favor revisa el siguiente video de YouTube que proporciona evidencia del ejercicio en caso de que no sea posible reproducir el programa y el script:

[Video de Evidencia](https://youtu.be/Mhv8EMx6YHY)

## Tecnologías Utilizadas

- **React JS**
- **Next JS**
- **SQL Server**

## Versiones

```bash
npm -v
10.7.0

node -v
v21.7.1

next -v 
v14.2.3
```


## Pasos para Reproducir el Ejercicio

- Descargar el Código:
        Clona el repositorio desde [enlace del repositorio].

- Configurar el Entorno:
        Monta la máquina virtual Docker si es necesario.
        Carga el script SQL en Azure Data Studio para SQL Server.

- Instalar Dependencias:
        Navega al directorio del proyecto y ejecuta npm install para instalar las dependencias.

- Ejecutar el Proyecto:
        Inicia el servidor de desarrollo con npm run dev.

- Probar la Aplicación:
        Accede a la aplicación en [localhost] y realiza las pruebas necesarias.

## Posibles Mejoras

- Estado Global:
        Considerar la implementación de un estado global para mejorar la comunicación entre componentes. Actualmente, las metas y tareas se comunican a través de props.

- Optimización de Componentes:
        Los componentes principales Goals.jsx y Tasks.jsx pueden ser refactorizados en subcomponentes para gestionar de manera más eficiente las llamadas a la API.