CREATE TABLE usuarios (
	id SERIAL PRIMARY KEY,
	email VARCHAR(100) NOT NULL UNIQUE,
	password VARCHAR(100) NOT NULL,
	url_imagen VARCHAR(200),
	nombre VARCHAR(50) DEFAULT 'userName',
	prefijo_telefonico VARCHAR(5) DEFAULT '56',
	telefono INTEGER DEFAULT 11111111,
	birthdate DATE DEFAULT '1900-01-01'
);

CREATE TABLE productos (
	id SERIAL PRIMARY KEY,
	id_usuario INT REFERENCES usuarios(id) ON DELETE CASCADE,
	categoria VARCHAR(30) REFERENCES categorias(categoria),
	nombre VARCHAR(100) NOT NULL,
	url_imagen VARCHAR(200) NOT NULL,
	descripcion VARCHAR(200) NOT NULL,
	precio INT NOT NULL CHECK(precio>0),
	cantidad INT NOT NULL CHECK(cantidad>0)
);

CREATE TABLE misCompras (
	id SERIAL PRIMARY KEY,
	id_usuario INT REFERENCES usuarios(id) ON DELETE CASCADE,
	id_producto INT REFERENCES productos(id) ON DELETE CASCADE,
	nombre VARCHAR(100) NOT NULL,
	url_imagen VARCHAR(200) NOT NULL,
	cantidad INTEGER NOT NULL,
	fecha TIMESTAMP DEFAULT NOW()
);

CREATE TABLE likes (
	id VARCHAR(20) UNIQUE NOT NULL,
	id_usuario INT REFERENCES usuarios(id) ON DELETE CASCADE,
	id_producto INT REFERENCES productos(id) ON DELETE CASCADE
);

CREATE TABLE categorias (
	id SERIAL PRIMARY KEY,
	categoria VARCHAR(30) NOT NULL UNIQUE
);

INSERT INTO categorias (categoria) VALUES
('procesador'),('placa madre'),('tarjeta de video'),('ram'),('disco duro'), ('fuente de poder'), ('gabinete'),
('teclado'),('mouse'),('pantalla'),('audifono');

INSERT INTO productos (id_usuario, categoria, nombre, url_imagen, descripcion, precio, cantidad) VALUES
(1, 'placa madre', 'ASRock H470M-HVS', 'https://media.solotodo.com/media/products/1409842_picture_1624011307.jpg', 
'Socket LGA 1200 Chipset Intel H470 (LGA 1200) Slots memorias 2x DDR4', 59990, 100),
(1, 'placa madre', 'MSI PRO H510M-B', 'https://media.solotodo.com/media/products/1774272_picture_1687600818.jpg', 
'Socket LGA 1200 Chipset Intel H470 (LGA 1200) Slots memorias 2x DDR4', 58900, 190),
(1, 'placa madre', 'ASRock H510M-HDV/M.2 SE', 'https://media.solotodo.com/media/products/1841159_picture_1699877010.png', 
'Socket LGA 1200 Chipset Intel H510 (LGA 1200) Slots memorias 2x DDR4', 69000, 90),
(1, 'placa madre', 'ASUS PRIME H510M-K R2.0', 'https://media.solotodo.com/media/products/1883099_picture_1708231011.jpg', 
'Socket LGA 1200 Chipset Intel H510 (LGA 1200) Slots memorias 2x DDR4', 73000, 70),
(1, 'placa madre', 'Gigabyte H510M S2H V2', 'https://media.solotodo.com/media/products/1511507_picture_1639742279.png', 
'Socket LGA 1200 Chipset Intel H510 (LGA 1200) Slots memorias 2x DDR4', 87000, 66),
(1, 'placa madre', 'Biostar Z490A-SILVER', 'https://media.solotodo.com/media/products/1299637_picture_1610437493.png', 
'Socket LGA 1200 Chipset Intel Z490 (LGA 1200) Slots memorias 2x DDR4', 170000, 55),

(1, 'procesador', 'Intel Core i3-10100F [BX8070110100F]', 'https://media.solotodo.com/media/products/1274154_picture_1605954761.png', 
'Frecuencia 3600 MHZ Frecuencia turbo máxima 4300 MHz Núcleos / hilos 4 núcleos / 8 hilos Caché 4 x 256KB L2 / 6MB L3 LGA 1200', 76000, 60),
(1, 'procesador', 'Intel Pentium Gold G6405 [BX80701G6405]', 'https://media.solotodo.com/media/products/1435998_picture_1628520810.jpg', 
'Frecuencia 4100 MHZ Frecuencia turbo máxima 4100 MHz Núcleos / hilos 2 núcleos / 4 hilos Caché 4 x 256KB L2 / 3MB L3 LGA 1200', 80000, 55),
(1, 'procesador', 'Intel Core i3-3250 [BX80637I33250]', 'https://media.solotodo.com/media/products/intel-core-i3-ivy-bridge-desktop.jpg', 
'Frecuencia 3500 MHZ Frecuencia turbo máxima 3500 MHz Núcleos / hilos 2 núcleos / 4 hilos Caché 4 x 256KB L2 / 3MB L3 LGA 1155', 103000, 40),
(1, 'procesador', 'Intel Core i3-12100 [BX8071512100]', 'https://media.solotodo.com/media/products/1606262_picture_1653721520.jpg', 
'Frecuencia 3300 MHZ Frecuencia turbo máxima 4300 MHz Núcleos / hilos 4 núcleos / 8 hilos Caché 4 x 1280KB L2 / 12MB L3 LGA 1700', 126000, 32),
(1, 'procesador', 'Intel Core i5-11600KF [BX8070811600KF]', 'https://media.solotodo.com/media/products/1359031_picture_1617309776.jpg', 
'Frecuencia 3900 MHZ Frecuencia turbo máxima 4900 MHz Núcleos / hilos 6 núcleos / 12 hilos Caché 6 x 256KB L2 / 12MB L3 LGA 1200', 160000, 33),
(1, 'procesador', 'Intel Core i7-7700 [BX80677I77700]', 'https://media.solotodo.com/media/products/566247_picture_1484061534.png', 
'Frecuencia 3600 MHZ Frecuencia turbo máxima 4200 MHz Núcleos / hilos 4 núcleos / 8 hilos Caché 4 x 256KB L2 / 8MB L3 LGA 1151', 171000, 55),

(1, 'tarjeta de video', 'ASUS DUAL-GTX1650-O4GD6-P-EVO', 'https://media.solotodo.com/media/products/1849162_picture_1701483199.webp', 
'NVIDIA GeForce GTX 1650 (GDDR5) 4 GB GDDR6 (128 bit) PCI Express 3.0 x16', 156000, 20),
(1, 'tarjeta de video', 'Palit GeForce RTX 3050[NE63050018JE-1070F]', 'https://media.solotodo.com/media/products/1932246_picture_1720505717.jpg', 
'NVIDIA GeForce GTX 3050 (GDDR5) 6 GB GDDR6 (96 bit) PCI Express 4.0 x16', 197000, 55),
(1, 'tarjeta de video', 'PNY GeForce GTX 1660 [VCG16606SSFPPB-O]', 'https://media.solotodo.com/media/products/1231524_picture_1600345849.png', 
'NVIDIA GeForce GTX 1660 (GDDR5) 6 GB GDDR6 (192 bit) PCI Express 3.0 x16', 1200000, 33),
(1, 'tarjeta de video', 'Zotac GAMING GeForce GTX 1660 [ZT-T16620D-10M]', 'https://media.solotodo.com/media/products/1036832_picture_1577554897.jpg', 
'NVIDIA GeForce GTX 1660 (GDDR5) 6 GB GDDR6 (192 bit) PCI Express 3.0 x16', 260000, 44),
(1, 'tarjeta de video', 'PNY GeForce RTX 4060 8GB [VCG40608TFXXPB1]', 'https://media.solotodo.com/media/products/1921329_picture_1717317067.webp', 
'NVIDIA GeForce GTX 4060 (GDDR5) 8 GB GDDR6 (128 bit) PCI Express 4.0 x16', 392000, 24),
(1, 'tarjeta de video', 'Axle GeForce RTX 3070 Classic Edition', 'https://media.solotodo.com/media/products/1897578_picture_1711366416.webp', 
'NVIDIA GeForce GTX 3070 (GDDR5) 8 GB GDDR6 (256 bit) PCI Express 4.0 x16', 513000, 22),

(1, 'ram', 'Crucial CT8G4DFRA32A', 'https://media.solotodo.com/media/products/1209054_picture_1596261026.png', 
'Capacidad 1 x 8 GB Tipo DDR4 Velocidad 3200 MT/s Formato DIMM ', 18900, 20),
(1, 'ram', 'A-DATA Gold GD4U320038GSSS', 'https://media.solotodo.com/media/products/1901045_picture_1712312097.png', 
'Capacidad 1 x 8 GB Tipo DDR4 Velocidad 3200 MT/s Formato DIMM ', 19000, 30),
(1, 'ram', 'Hikvision Urien HKED4081CBA1D0ZA1', 'https://media.solotodo.com/media/products/1382451_picture_1619795290.jpeg', 
'Capacidad 1 x 8 GB Tipo DDR4 Velocidad 2666 MT/s Formato DIMM ', 19500, 40),
(1, 'ram', 'Kingston KVR32N22S6', 'https://media.solotodo.com/media/products/732660_picture_1523339830.jpg', 
'Capacidad 1 x 8 GB Tipo DDR4 Velocidad 3200 MT/s Formato DIMM ', 19000, 50),

(1, 'disco duro', 'Kingston SSDNow A400', 'https://media.solotodo.com/media/products/596745_picture_1490303275.jpg', 
'Capacidad 120 GB Formato 2.5" Bus SATA 3 (6.0 Gb/s)', 20000, 50),
(1, 'disco duro', 'Hiksemi Neo C100', 'https://media.solotodo.com/media/products/1906062_picture_1713687136.png', 
'Capacidad 120 GB Formato 2.5" Bus SATA 3 (6.0 Gb/s)', 20500, 55),
(1, 'disco duro', 'Hikvision Minder HS-SSD-MINDER', 'https://media.solotodo.com/media/products/1347605_picture_1616072339.jpg', 
'Capacidad 120 GB Formato 2.5" Bus SATA 3 (6.0 Gb/s)', 21000, 40),
(1, 'disco duro', 'HS-SSD-Minder(P)/128G', 'https://media.solotodo.com/media/products/1433486_picture_1628090684.jpg', 
'Capacidad 128 GB Formato M.2 (2280)', 22000, 37),
(1, 'disco duro', 'HS-SSD-C100/240G', 'https://media.solotodo.com/media/products/1252187_picture_1675192627.png', 
'Capacidad 240 GB Formato 2.5" Bus SATA 3 (6.0 Gb/s)', 29000, 37),

(1, 'teclado', 'Krom Kasic TKL', 'https://media.solotodo.com/media/products/1831616_picture_1698235683.jpg', 
'Tipo Mecánico Tipo switch Outemu Red', 32500, 35),
(1, 'teclado', 'HP GK500 Mechanical Gaming', 'https://media.solotodo.com/media/products/1229952_picture_1599931722.jpg', 
'Tipo Mecánico Tipo Blue Switch', 21000, 25),
(1, 'teclado', 'GAMEMAX Rampage X1', 'https://media.solotodo.com/media/products/1892899_picture_1709958266.webp', 
'Tipo Mecánico Tipo Mecánico', 35000, 45),
(1, 'teclado', 'Krom Kasic', 'https://media.solotodo.com/media/products/1831630_picture_1697688551.png', 
'Tipo Mecánico Tipo switch Outemu Red', 32500, 15),

(1, 'mouse', 'Redragon Dagger M715', 'https://media.solotodo.com/media/products/785929_picture_1532501893.png', 
'DPI máximo 10000 Cantidad de botones 8', 13000, 66),
(1, 'mouse', 'Redragon M908 Impact', 'https://media.solotodo.com/media/products/895174_picture_1552163182.jpg', 
'DPI máximo 12400 Cantidad de botones 19', 25000, 76),

(1, 'audifono', 'Thermaltake Ttesports Shock Pro', 'https://media.solotodo.com/media/products/1397357_picture_1622014999.jpg', 
'Tipo Over-Ear / Headset Respuesta en frecuencia 20 - 20000 Hz.', 21000, 30),
(1, 'audifono', 'HP H500S', 'https://media.solotodo.com/media/products/1346610_picture_1615922067.webp', 
'Tipo Over-Ear / Headset Respuesta en frecuencia 20 - 20000 Hz.', 21000, 30),

(1, 'pantalla', 'LG UltraGear 24GN60R-B', 'https://media.solotodo.com/media/products/1656260_picture_1666538304.jpg', 
'Tipo LED Tamaño 23.8" Resolución Full HD (1920x1080) Tiempo de respuesta (GTG) 1 ms Tasa de refresco 144 Hz', 99900, 20),
(1, 'pantalla', 'Gigabyte G24F 2', 'https://media.solotodo.com/media/products/1673500_picture_1669384199.webp', 
'Tipo LED Tamaño 23.8" Resolución Full HD (1920x1080) Tiempo de respuesta (GTG) 1 ms Tasa de refresco 165 Hz', 99900, 20),

(1, 'fuente de poder', 'EVGA 500 BQ (110-BQ-0500-K1)', 'https://media.solotodo.com/media/products/1080128_picture_1581503707.png', 
'Potencia 500 W Certificación 80PLUS Bronze Tamaño Estandar ATX', 62000, 18),
(1, 'fuente de poder', 'Corsair CX-M Series CX550M', 'https://media.solotodo.com/media/products/1931010_picture_1720073574.jpg', 
'Potencia 650 W Certificación 80PLUS Bronze Tamaño Estandar ATX', 62000, 18),

(1, 'gabinete', 'MSI MAG SHIELD M301', 'https://media.solotodo.com/media/products/1792737_picture_1691416693.png', 
'Tamaño máximo de placa madre Micro ATX Tamaño 352 x 345 x 206 mm.', 25000, 18),
(1, 'gabinete', 'Cooler Master CMP 320 ARGB', 'https://media.solotodo.com/media/products/1821561_picture_1695889317.png', 
'Tamaño máximo de placa madre Micro ATX Tamaño 445 x 425 x 204 mm.', 65000, 22);