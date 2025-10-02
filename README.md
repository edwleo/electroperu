# Procedimientos

1. Clonar repositorio
git clone https://...

2. Restaurar la BD
```sql
CREATE DATABASE electroperu;
USE electroperu;

CREATE TABLE productos
(
	id          INT AUTO_INCREMENT PRIMARY KEY,
  descripcion VARCHAR(50) 	NOT NULL,
  garantia    TINYINT 		  NOT NULL,
	precio      DECIMAL(7,2)	NOT NULL
)ENGINE = INNODB;
```

3. Abrir proyecto _electroperu_ en VSCode

4. Abrir la terminal **CTRL + Ñ** escribir:
```
npm install
```
Se ejecutará la instalación de todas las dependecias definidas en **package.json**

5. Crear e ingresar los parámetros en el archivo **.env**

6. Ejecutar el servidor (_nodemon_)
```
nodemon server
```

7. Verificar cada verbo (GET/POST/PUT/DELETE) utilizando PostMan, ThunderClient