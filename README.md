# Procedimientos:

0. Construir una BD y la siguiente tabla

```sql
CREATE DATABASE electroperu;
USE electroperu;

CREATE TABLE productos
(
	id int auto_increment primary key,
    descripcion varchar(100) not null,
    garantia tinyint not null,
    precio decimal(7,2) not null
)ENGINE = INNODB;
```

1. Construye el directorio "electroperu"
2. Apertura VSCode en la carpeta creada en el paso 1
3. Abre terminal y ejecutar el comando

```
npm init -y
```

4. Instalar dependencias

```
npm install express mysql2 dotenv nodemon
```

5. Agregar el archivo .env

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña_secreta
DB_DATABASE=electroperu
DB_PORT=3306
```

6. Diseñar la siguiente estructura de directorios

├── src/                  # Código fuente de la aplicación
│   ├── components/       # Componentes reutilizables (ej. botones, tarjetas)
│   ├── pages/            # Vistas principales de la aplicación
│   ├── utils/            # Funciones de ayuda y utilidades
│   └── index.js          # Punto de entrada de la aplicación
├── public/               # Archivos estáticos (imágenes, fuentes, index.html)
├── tests/                # Archivos de pruebas unitarias y de integración
├── .gitignore            # Archivos y directorios ignorados por Git
├── package.json          # Metadatos del proyecto y scripts
└── README.md             # Este archivo
