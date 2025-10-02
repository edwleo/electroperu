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

6. Diseñar la siguiente estructura de directorios 📂

**¿Cómo crear estructura de directorios?**
* _ALT + 179 ... Barra vertical_
* _ALT + 192 ... Conector en L_
* _ALT + 195 ... Barra vertical con corte_
* _ALT + 196 ... Barra horizontal_

```bash
├── 📂config
│   └── 📄db.js
├── 📂 controllers
│   └── 📄productoController.js
├── 📂 node_modules
│   └── ...
├── 📂 routes
│   └── 📄productoController.js
├── ⚙️.env
├── 🔴.gitignore
├── 📄 package-lock.json
├── 📄 package.json
├── 📄 README.md
└── 📄 server.js
```