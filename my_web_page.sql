CREATE TABLE usuarios (
	id SERIAL PRIMARY KEY,
	email VARCHAR(100) NOT NULL UNIQUE,
	password VARCHAR(100) NOT NULL,
	url_imagen VARCHAR(200)
);

CREATE TABLE productos (
	id SERIAL PRIMARY KEY,
	id_usuario INT REFERENCES usuarios(id),
	categoria VARCHAR(30) REFERENCES categorias(categoria),
	nombre VARCHAR(100) NOT NULL,
	url_imagen VARCHAR(200) NOT NULL,
	descripcion VARCHAR(200) NOT NULL,
	precio INT NOT NULL CHECK(precio>0),
	cantidad INT NOT NULL CHECK(cantidad>0),
);

-- CREATE TABLE misPedidos (
-- 	id SERIAL PRIMARY KEY,
-- 	id_usuario INT REFERENCES usuarios(id),
-- 	id_producto INT REFERENCES productos(id),
-- 	es_un_pedido BOOLEAN DEFAULT false
-- );

CREATE TABLE likes (
	id VARCHAR(20) UNIQUE NOT NULL,
	id_usuario INT REFERENCES usuarios(id),
	id_producto INT REFERENCES productos(id)
);

CREATE TABLE categorias (
	id SERIAL PRIMARY KEY,
	categoria VARCHAR(30) NOT NULL UNIQUE
);

INSERT INTO categorias (categoria) VALUES
('procesador'),('placa madre'),('tarjeta de video'),('ram'),('disco duro'), ('fuente de poder'), ('gabinete'),
('teclado'),('mouse'),('pantalla'),('audifono');

INSERT INTO usuarios (email, password) VALUES
('elefante@gmail.com','1234'),('cocodrilo@gmail.com','1234'),('hipopotamo@gmail.com','1234'),('leon@gmail.com','1234'),
('macaco@gmail.com','1234'),('tigre@gmail.com','1234'),('jirafa@gmail.com','1234'),('calamar@gmail.com','1234'),
('perro@gmail.com','1234'),('gato@gmail.com','1234'),('pulpo@gmail.com','1234'),('ballena@gmail.com','1234');

INSERT INTO productos (id_usuario, categoria, nombre, url_imagen, descripcion, precio, cantidad) VALUES
(1, 'placa madre', 'MSI PRO H510M-B', 'https://media.solotodo.com/media/products/1774272_picture_1687600818.jpg', 
'Socket LGA 1200 Chipset	Intel H470 (LGA 1200) Slots memorias	 2x DDR4', 59000, 100),
(1, 'placa madre', 'GIGABYTES PRO H510M-B', 'https://media.solotodo.com/media/products/1409842_picture_1624011307.jpg', 
'Socket LGA 1200 Chipset	Intel H470 (LGA 1200) Slots memorias	 2x DDR4', 59000, 190),
(1, 'placa madre', 'ASUS H510M H V2', 'https://media.solotodo.com/media/products/1841159_picture_1699877010.png', 
'Socket LGA 1200 Chipset	Intel H470 (LGA 1200) Slots memorias	 2x DDR4', 59000, 90),
(1, 'placa madre', 'Gigabyte H510M H V2', 'https://media.solotodo.com/media/products/1883099_picture_1708231011.jpg', 
'Socket LGA 1200 Chipset	Intel H470 (LGA 1200) Slots memorias	 2x DDR4', 59000, 70),
(1, 'placa madre', 'ASROCK PRO H510M-B', 'https://media.solotodo.com/media/products/1506697_picture_1639061161.png', 
'Socket LGA 1200 Chipset	Intel H470 (LGA 1200) Slots memorias	 2x DDR4', 59000, 66),
(1, 'placa madre', 'Gigabyte H510M H V2', 'https://media.solotodo.com/media/products/1810842_picture_1693481594.webp', 
'Socket LGA 1200 Chipset	Intel H470 (LGA 1200) Slots memorias	 2x DDR4', 59000, 55),
(1, 'procesador', 'Intel Core i5-14600K [BX8071514600K]', 'https://media.solotodo.com/media/products/1833267_picture_1707949193.jpg', 
'Frecuencia 3500 MHZ Frecuencia turbo máxima 5300 MHz Núcleos / hilos 6 P-cores / 8 E-cores / 20 hilos Caché 14 x 2MB L2 / 24MB L3 
Socket LGA 1700', 59000, 60),
(1, 'procesador', 'Intel Core i7-14600K [BX8071514600K]', 'https://media.solotodo.com/media/products/1648757_picture_1664520661.jpg', 
'Frecuencia 3500 MHZ Frecuencia turbo máxima 5300 MHz Núcleos / hilos 6 P-cores / 8 E-cores / 20 hilos Caché 14 x 2MB L2 / 24MB L3 
Socket LGA 1700', 159000, 55),
(1, 'procesador', 'Intel Core i3-14600K [BX8071514600K]', 'https://media.solotodo.com/media/products/1721105_picture_1676012811.jpg', 
'Frecuencia 3500 MHZ Frecuencia turbo máxima 5300 MHz Núcleos / hilos 6 P-cores / 8 E-cores / 20 hilos Caché 14 x 2MB L2 / 24MB L3 
Socket LGA 1700', 259000, 40),
(1, 'procesador', 'Intel Core i5-14600K [BX8071514600K]', 'https://media.solotodo.com/media/products/1875800_picture_1707949369.jpg', 
'Frecuencia 3500 MHZ Frecuencia turbo máxima 5300 MHz Núcleos / hilos 6 P-cores / 8 E-cores / 20 hilos Caché 14 x 2MB L2 / 24MB L3 
Socket LGA 1700', 359000, 32),
(1, 'procesador', 'Intel Core i9-14600K [BX8071514600K]', 'https://media.solotodo.com/media/products/1498180_picture_1637592613.jpg', 
'Frecuencia 3500 MHZ Frecuencia turbo máxima 5300 MHz Núcleos / hilos 6 P-cores / 8 E-cores / 20 hilos Caché 14 x 2MB L2 / 24MB L3 
Socket LGA 1700', 459000, 33),
(1, 'procesador', 'Intel Core i3-14600K [BX8071514600K]', 'https://media.solotodo.com/media/products/829937_picture_1540686756.jpg', 
'Frecuencia 3500 MHZ Frecuencia turbo máxima 5300 MHz Núcleos / hilos 6 P-cores / 8 E-cores / 20 hilos Caché 14 x 2MB L2 / 24MB L3 
Socket LGA 1700', 559000, 55),
(1, 'tarjeta de video', 'PNY GeForce RTX 4070 16GB]', 'https://media.solotodo.com/media/products/1786875_picture_1690426780.jpg', 
'Fabricante	PNY GPU	NVIDIA GeForce RTX 4090 Memoria	16 GB GDDR6X (256 bit)', 1100000, 20),
(1, 'tarjeta de video', 'PNY GeForce RTX 4080 16GB]', 'https://media.solotodo.com/media/products/1903740_picture_1713032355.png', 
'Fabricante	PNY GPU	NVIDIA GeForce RTX 4080 Memoria	16 GB GDDR6X (256 bit)', 1300000, 55),
(1, 'tarjeta de video', 'PNY GeForce RTX 4060 16GB]', 'https://media.solotodo.com/media/products/1550469_picture_1646084574.jpg', 
'Fabricante	PNY GPU	NVIDIA GeForce RTX 4050 Memoria	16 GB GDDR6X (256 bit)', 1200000, 33),
(1, 'tarjeta de video', 'PNY GeForce RTX 4080 16GB]', 'https://media.solotodo.com/media/products/1803130_picture_1692520138.jpg', 
'Fabricante	PNY GPU	NVIDIA GeForce RTX 4040 Memoria	16 GB GDDR6X (256 bit)', 1400000, 44),
(1, 'tarjeta de video', 'PNY GeForce RTX 3080 16GB]', 'https://media.solotodo.com/media/products/1652371_picture_1665672789.png', 
'Fabricante	PNY GPU	NVIDIA GeForce RTX 3070 Memoria	16 GB GDDR6X (256 bit)', 1500000, 24),
(1, 'tarjeta de video', 'PNY GeForce RTX 3050 16GB]', 'https://media.solotodo.com/media/products/1717351_picture_1675577924.jpg', 
'Fabricante	PNY GPU	NVIDIA GeForce RTX 3040 Memoria	16 GB GDDR6X (256 bit)', 1600000, 22);


SELECT * FROM productos WHERE productos.nombre ILIKE '%intel%' OR productos.descripcion ILIKE '%intel%';