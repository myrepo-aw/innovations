# Ejercicio de Desarrollo - README

## Descripción

Este documento detalla las instrucciones para reproducir y evaluar el ejercicio de desarrollo presentado. En caso de que no sea posible ejecutar el programa o el script, se ha incluido un enlace a un video de YouTube que demuestra la funcionalidad del ejercicio.

[Video de Evidencia](https://youtu.be/Mhv8EMx6YHY)

## Tecnologías Utilizadas

- **React JS**
- **Bootstrap**
- **Next JS**
- **SQL Server**

## Versiones Utilizadas

- **npm:** 10.7.0
- **node:**v21.7.1
- **next:**v14.2.3


## Instrucciones para Reproducir el Ejercicio

1. Clona el repositorio en tu máquina local utilizando el siguiente comando:

```Bash
git clone <URL_DEL_REPOSITORIO>
```

2. Configuración del Entorno:
- Si es necesario, monta la máquina virtual utilizando Docker.
- Descarga el archivo innovations/Innovations.bak y carga el script SQL correspondiente en Azure Data Studio para configurar la base de datos en SQL Server.

3. Instalación de Dependencias:

- Navega al directorio del proyecto y ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```Bash
npm install
```

4. Ejecución del Proyecto:
- Inicia el servidor de desarrollo con el siguiente comando:
```Bash
npm run dev
```
## Posibles Mejoras

1. Estado Global:
        Implementar un estado global para optimizar la comunicación entre componentes. Actualmente, la comunicación entre las metas y tareas se realiza a través de props, lo cual podría ser mejorado.

2. Refactorización de Componentes:
        Dividir los componentes principales (Goals.jsx y Tasks.jsx) en subcomponentes más pequeños para gestionar de manera más eficiente las llamadas a la API y mejorar la legibilidad del código.

3. Optimización de las Llamadas a la API:
        Refactorizar los fallbacks para hacerlos reutilizables entre diferentes componentes, evitando la repetición de código.

## Comentarios Finales

Al ejercicio le faltaron algunas funcionalidades, incluyendo:

- Asignación de prioridad a través de estrellas.
- Edición del nombre de las tareas.
- Validación para evitar la repetición en nombres.

Debido a otras responsabilidades durante el plazo de 24 horas proporcionado, no fue posible completar estas funcionalidades. Agradezco la comprensión.

GRACIAS :)