-- ================================================================
-- HEALTHNET v2  —  schema.sql  LIMPIO (sin conflictos de merge)
-- Contraseña de todos los usuarios: hn1234
-- ================================================================

-- 1. HOSPITALES
CREATE TABLE IF NOT EXISTS hospitales (
    id         SERIAL PRIMARY KEY,
    nombre     VARCHAR(150) NOT NULL,
    direccion  VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO hospitales (nombre, direccion) VALUES
    ('Hospital Nacional Cayetano Heredia', 'Lima'),
    ('Hospital Nacional Arzobispo Loayza', 'Lima'),
    ('Hospital Nacional Dos de Mayo',      'Lima');

-- 2. USUARIOS
CREATE TABLE IF NOT EXISTS usuarios (
    id          SERIAL PRIMARY KEY,
    nombre      VARCHAR(150) NOT NULL,
    email       VARCHAR(150) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    rol         VARCHAR(20)  NOT NULL CHECK (rol IN ('admin','doctor','especialista')),
    hospital_id INT REFERENCES hospitales(id) ON DELETE SET NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (nombre, email, password, rol, hospital_id) VALUES
    ('Administrador',           'admin@healthnet.com',        '$2b$10$7kluPXx3doy5YspJYS5xFumso.ntPQYM.ZeAcOeiqrMRKACdLijzy', 'admin',        NULL),
    ('Hospital Cayetano Heredia','hnch@healthnet.com',        '$2b$10$7kluPXx3doy5YspJYS5xFumso.ntPQYM.ZeAcOeiqrMRKACdLijzy', 'doctor',       1),
    ('Hospital Loayza',         'hnal@healthnet.com',         '$2b$10$7kluPXx3doy5YspJYS5xFumso.ntPQYM.ZeAcOeiqrMRKACdLijzy', 'doctor',       2),
    ('Hospital Dos de Mayo',    'hndm@healthnet.com',         '$2b$10$7kluPXx3doy5YspJYS5xFumso.ntPQYM.ZeAcOeiqrMRKACdLijzy', 'doctor',       3),
    ('Cardio CH 1',             'cardio1_hnch@healthnet.com', '$2b$10$7kluPXx3doy5YspJYS5xFumso.ntPQYM.ZeAcOeiqrMRKACdLijzy', 'especialista', 1),
    ('Cardio CH 2',             'cardio2_hnch@healthnet.com', '$2b$10$7kluPXx3doy5YspJYS5xFumso.ntPQYM.ZeAcOeiqrMRKACdLijzy', 'especialista', 1),
    ('Cardio CH 3',             'cardio3_hnch@healthnet.com', '$2b$10$7kluPXx3doy5YspJYS5xFumso.ntPQYM.ZeAcOeiqrMRKACdLijzy', 'especialista', 1),
    ('Cardio Loayza 1',         'cardio1_hnal@healthnet.com', '$2b$10$7kluPXx3doy5YspJYS5xFumso.ntPQYM.ZeAcOeiqrMRKACdLijzy', 'especialista', 2),
    ('Cardio Loayza 2',         'cardio2_hnal@healthnet.com', '$2b$10$7kluPXx3doy5YspJYS5xFumso.ntPQYM.ZeAcOeiqrMRKACdLijzy', 'especialista', 2),
    ('Cardio Loayza 3',         'cardio3_hnal@healthnet.com', '$2b$10$7kluPXx3doy5YspJYS5xFumso.ntPQYM.ZeAcOeiqrMRKACdLijzy', 'especialista', 2),
    ('Cardio Dos de Mayo 1',    'cardio1_hndm@healthnet.com', '$2b$10$7kluPXx3doy5YspJYS5xFumso.ntPQYM.ZeAcOeiqrMRKACdLijzy', 'especialista', 3),
    ('Cardio Dos de Mayo 2',    'cardio2_hndm@healthnet.com', '$2b$10$7kluPXx3doy5YspJYS5xFumso.ntPQYM.ZeAcOeiqrMRKACdLijzy', 'especialista', 3),
    ('Cardio Dos de Mayo 3',    'cardio3_hndm@healthnet.com', '$2b$10$7kluPXx3doy5YspJYS5xFumso.ntPQYM.ZeAcOeiqrMRKACdLijzy', 'especialista', 3);

SELECT setval('hospitales_id_seq', (SELECT MAX(id) FROM hospitales));
SELECT setval('usuarios_id_seq',   (SELECT MAX(id) FROM usuarios));

-- 3. PACIENTES
CREATE TABLE IF NOT EXISTS pacientes (
    id           SERIAL PRIMARY KEY,
    nombre       VARCHAR(150) NOT NULL,
    dni          VARCHAR(20)  NOT NULL UNIQUE,
    edad         INT,
    sexo         VARCHAR(20),
    hospital_id  INT REFERENCES hospitales(id) ON DELETE SET NULL,
    doctor_id    INT REFERENCES usuarios(id)   ON DELETE SET NULL,
    antecedentes TEXT,
    alergias     TEXT,
    medicacion   TEXT,
    foto         VARCHAR(255) DEFAULT '../assets/images/pacientes/paciente_hombre.png',
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO pacientes (id, nombre, edad, sexo, dni, antecedentes, alergias, medicacion) VALUES
(1,  'Juan Pérez',         34, 'Masculino', '12345678', 'Hipertensión',             'Ninguna',       'Enalapril'),
(2,  'María López',        28, 'Femenino',  '23456789', 'Asma',                     'Penicilina',    'Salbutamol'),
(3,  'Carlos García',      45, 'Masculino', '34567890', 'Diabetes',                 'Ninguna',       'Metformina'),
(4,  'Ana Torres',         38, 'Femenino',  '45678901', 'Hipotiroidismo',            'Ninguna',       'Levotiroxina'),
(5,  'José Ramírez',       50, 'Masculino', '56789012', 'Colesterol alto',           'Ninguna',       'Atorvastatina'),
(6,  'Lucía Vargas',       26, 'Femenino',  '67890123', 'Anemia leve',               'Ninguna',       'Suplemento de hierro'),
(7,  'Miguel Castillo',    41, 'Masculino', '78901234', 'Obesidad grado I',          'Ninguna',       'Orlistat'),
(8,  'Patricia Rojas',     33, 'Femenino',  '89012345', 'Hipoglucemia ocasional',    'Ninguna',       'Dieta controlada'),
(9,  'Fernando Díaz',      29, 'Masculino', '90123456', 'Estrés laboral',            'Ninguna',       'Relajantes naturales'),
(10, 'Rosa Aguilar',       40, 'Femenino',  '91234567', 'Migrañas frecuentes',       'Ninguna',       'Sumatriptán'),
(11, 'Pedro Salazar',      36, 'Masculino', '11223344', 'Gastritis',                 'Ninguna',       'Omeprazol'),
(12, 'Elena Campos',       32, 'Femenino',  '22334455', 'Anemia',                    'Ninguna',       'Hierro y ácido fólico'),
(13, 'Raúl Mendoza',       47, 'Masculino', '33445566', 'Hipertensión',              'Ninguna',       'Losartán'),
(14, 'Sofía León',         25, 'Femenino',  '44556677', 'Alergias estacionales',     'Pólenes',       'Loratadina'),
(15, 'Héctor Flores',      52, 'Masculino', '55667788', 'Artritis leve',             'Ninguna',       'Ibuprofeno'),
(16, 'Adriana Vega',       27, 'Femenino',  '66778899', 'Dermatitis',                'Ninguna',       'Crema tópica'),
(17, 'Luis Romero',        31, 'Masculino', '77889900', 'Sinusitis crónica',         'Ninguna',       'Antibióticos ocasionales'),
(18, 'Gabriela Reyes',     30, 'Femenino',  '88990011', 'Cansancio general',         'Ninguna',       'Vitaminas B12'),
(19, 'Jorge Silva',        43, 'Masculino', '99001122', 'Colitis leve',              'Ninguna',       'Probióticos'),
(20, 'Laura Herrera',      37, 'Femenino',  '10111213', 'Tiroiditis autoinmune',     'Ninguna',       'Levotiroxina'),
(21, 'Elena Cordero',      47, 'Femenino',  '31245790', 'Hipertensión controlada',   'Ninguna',       'Losartán'),
(22, 'Ricardo Medina',     31, 'Masculino', '31245791', 'Colitis',                   'Ninguna',       'Mesalazina'),
(23, 'Verónica Ramos',     24, 'Femenino',  '31245792', 'Alergia estacional',        'Polvo',         'Loratadina'),
(24, 'Pedro Salas',        56, 'Masculino', '31245793', 'Diabetes tipo II',          'Ninguna',       'Metformina'),
(25, 'Roxana Torres',      39, 'Femenino',  '31245794', 'Hipotiroidismo',            'Ninguna',       'Levotiroxina'),
(26, 'Álvaro Ruiz',        27, 'Masculino', '31245795', 'Sin antecedentes',          'Ninguna',       'Ninguna'),
(27, 'Camila Pinto',       33, 'Femenino',  '31245796', 'Ansiedad leve',             'Ninguna',       'Sertralina'),
(28, 'Diego Romero',       42, 'Masculino', '31245797', 'Asma leve',                 'Polen',         'Salbutamol'),
(29, 'Mónica Vega',        46, 'Femenino',  '31245798', 'Gastritis crónica',         'Ninguna',       'Omeprazol'),
(30, 'Francisco López',    35, 'Masculino', '31245799', 'Colesterol alto',           'Ninguna',       'Simvastatina'),
(31, 'Adriana Soto',       22, 'Femenino',  '31245800', 'Sin antecedentes',          'Ninguna',       'Ninguna'),
(32, 'Javier León',        60, 'Masculino', '31245801', 'Hipertensión y diabetes',   'Ninguna',       'Metformina y Losartán'),
(33, 'Valeria Paredes',    30, 'Femenino',  '31245802', 'Anemia ferropénica',        'Ninguna',       'Hierro oral'),
(34, 'Cristian Fuentes',   37, 'Masculino', '31245803', 'Tabaquismo',                'Ninguna',       'Ninguna'),
(35, 'Gabriela Díaz',      41, 'Femenino',  '31245804', 'Migraña crónica',           'Ninguna',       'Sumatriptán'),
(36, 'Óscar Chávez',       48, 'Masculino', '31245805', 'Artritis leve',             'Ninguna',       'Ibuprofeno'),
(37, 'Liliana Castro',     55, 'Femenino',  '31245806', 'Menopausia',                'Ninguna',       'Terapia hormonal'),
(38, 'Sergio Campos',      32, 'Masculino', '31245807', 'Sin antecedentes',          'Polvo',         'Loratadina'),
(39, 'Daniela Bravo',      29, 'Femenino',  '31245808', 'Asma leve',                 'Pelos de gato', 'Inhalador'),
(40, 'Tomás Gutiérrez',    43, 'Masculino', '31245809', 'Colesterol alto',           'Ninguna',       'Atorvastatina'),
(41, 'Laura Mendoza',      36, 'Femenino',  '31245810', 'Hipotiroidismo',            'Ninguna',       'Levotiroxina'),
(42, 'Alejandro Herrera',  39, 'Masculino', '31245811', 'Sin antecedentes',          'Ninguna',       'Ninguna'),
(43, 'Melissa Ponce',      45, 'Femenino',  '31245812', 'Hipertensión',              'Ninguna',       'Enalapril'),
(44, 'Rodrigo Ibáñez',     26, 'Masculino', '31245813', 'Alergia al polvo',          'Polvo',         'Loratadina'),
(45, 'Carla Espinoza',     33, 'Femenino',  '31245814', 'Sin antecedentes',          'Ninguna',       'Ninguna'),
(46, 'Luis Guerrero',      54, 'Masculino', '31245815', 'Obesidad',                  'Ninguna',       'Orlistat'),
(47, 'Marisol Cabrera',    27, 'Femenino',  '31245816', 'Anemia',                    'Ninguna',       'Hierro oral'),
(48, 'Raúl Paredes',       49, 'Masculino', '31245817', 'Colesterol alto',           'Ninguna',       'Simvastatina'),
(49, 'Florencia Castro',   40, 'Femenino',  '31245818', 'Hipoglucemia',              'Ninguna',       'Dieta controlada'),
(50, 'Mauricio Rojas',     35, 'Masculino', '31245819', 'Ansiedad',                  'Ninguna',       'Sertralina'),
(51, 'Nadia Silva',        24, 'Femenino',  '31245820', 'Sin antecedentes',          'Ninguna',       'Ninguna'),
(52, 'Julio Campos',       57, 'Masculino', '31245821', 'Hipertensión y diabetes',   'Ninguna',       'Metformina y Enalapril'),
(53, 'Tatiana Rojas',      38, 'Femenino',  '31245822', 'Alergia estacional',        'Polen',         'Loratadina'),
(54, 'Ignacio Salazar',    43, 'Masculino', '31245823', 'Hipotiroidismo',            'Ninguna',       'Levotiroxina'),
(55, 'Fernanda Ortiz',     37, 'Femenino',  '31245824', 'Anemia',                    'Ninguna',       'Hierro oral'),
(56, 'Hugo Ponce',         51, 'Masculino', '31245825', 'Colesterol alto',           'Ninguna',       'Atorvastatina'),
(57, 'Lucero Navarro',     29, 'Femenino',  '31245826', 'Asma leve',                 'Pelo de gato',  'Inhalador'),
(58, 'Antonio Cáceres',    63, 'Masculino', '31245827', 'Hipertensión',              'Ninguna',       'Losartán'),
(59, 'Ruth Herrera',       42, 'Femenino',  '31245828', 'Colitis',                   'Ninguna',       'Mesalazina'),
(60, 'Felipe Cruz',        46, 'Masculino', '31245829', 'Estrés laboral',            'Ninguna',       'Ansiolíticos leves'),
(61, 'Rosa Delgado',       34, 'Femenino',  '31245830', 'Gastritis',                 'Ninguna',       'Omeprazol'),
(62, 'Cristóbal Molina',   50, 'Masculino', '31245831', 'Obesidad grado II',         'Ninguna',       'Orlistat'),
(63, 'Natalia Cárdenas',   28, 'Femenino',  '31245832', 'Sin antecedentes',          'Ninguna',       'Ninguna'),
(64, 'Manuel Prado',       59, 'Masculino', '31245833', 'Cardiopatía leve',          'Ninguna',       'Aspirina'),
(65, 'Isabel Cornejo',     45, 'Femenino',  '31245834', 'Hipertensión',              'Ninguna',       'Losartán'),
(66, 'Julian Ramos',       40, 'Masculino', '31245835', 'Diabetes tipo II',          'Ninguna',       'Metformina'),
(67, 'Paula Medina',       31, 'Femenino',  '31245836', 'Alergia a mariscos',        'Mariscos',      'Antihistamínicos'),
(68, 'Roberto Díaz',       36, 'Masculino', '31245837', 'Gastritis',                 'Ninguna',       'Omeprazol'),
(69, 'Patricia Blanco',    38, 'Femenino',  '31245838', 'Migrañas',                  'Ninguna',       'Sumatriptán'),
(70, 'Eduardo Vargas',     48, 'Masculino', '31245839', 'Colesterol alto',           'Ninguna',       'Atorvastatina'),
(71, 'Carolina Núñez',     27, 'Femenino',  '31245840', 'Asma leve',                 'Pólenes',       'Salbutamol'),
(72, 'Martín Aguilar',     34, 'Masculino', '31245841', 'Estrés laboral',            'Ninguna',       'Ansiolíticos leves'),
(73, 'Luciana Ortiz',      29, 'Femenino',  '31245842', 'Anemia leve',               'Ninguna',       'Suplemento de hierro'),
(74, 'Esteban Ramos',      50, 'Masculino', '31245843', 'Hipertensión',              'Ninguna',       'Losartán'),
(75, 'Fabiola Herrera',    41, 'Femenino',  '31245844', 'Tiroiditis',                'Ninguna',       'Levotiroxina'),
(76, 'Renato Medina',      32, 'Masculino', '31245845', 'Sin antecedentes',          'Ninguna',       'Ninguna'),
(77, 'Elisa Vargas',       35, 'Femenino',  '31245846', 'Colitis',                   'Ninguna',       'Mesalazina'),
(78, 'Carlos Paredes',     56, 'Masculino', '31245847', 'Diabetes tipo II',          'Ninguna',       'Metformina'),
(79, 'Vanessa Molina',     43, 'Femenino',  '31245848', 'Hipotiroidismo',            'Ninguna',       'Levotiroxina'),
(80, 'Héctor Lozano',      37, 'Masculino', '31245849', 'Obesidad',                  'Ninguna',       'Orlistat'),
(81, 'Gabriela Quispe',    39, 'Femenino',  '31245850', 'Hipertensión leve',         'Ninguna',       'Enalapril'),
(82, 'Rodrigo Castañeda',  30, 'Masculino', '31245851', 'Gastritis',                 'Ninguna',       'Omeprazol'),
(83, 'Lorena Díaz',        25, 'Femenino',  '31245852', 'Sin antecedentes',          'Ninguna',       'Ninguna'),
(84, 'Gonzalo Suárez',     45, 'Masculino', '31245853', 'Colesterol alto',           'Ninguna',       'Simvastatina'),
(85, 'Andrea Campos',      28, 'Femenino',  '31245854', 'Alergia al polvo',          'Polvo',         'Loratadina'),
(86, 'Felipe Carranza',    52, 'Masculino', '31245855', 'Cardiopatía leve',          'Ninguna',       'Aspirina'),
(87, 'Natalia Espinoza',   40, 'Femenino',  '31245856', 'Migrañas',                  'Ninguna',       'Sumatriptán'),
(88, 'Víctor Delgado',     46, 'Masculino', '31245857', 'Hipertensión controlada',   'Ninguna',       'Losartán'),
(89, 'Pamela Navarro',     32, 'Femenino',  '31245858', 'Ansiedad',                  'Ninguna',       'Sertralina'),
(90, 'Joaquín Cáceres',    38, 'Masculino', '31245859', 'Colitis',                   'Ninguna',       'Mesalazina'),
(91, 'Rocío Valdivia',     47, 'Femenino',  '31245860', 'Tiroiditis',                'Ninguna',       'Levotiroxina'),
(92, 'Daniel Prieto',      29, 'Masculino', '31245861', 'Alergia estacional',        'Polen',         'Loratadina'),
(93, 'Mariana Cornejo',    35, 'Femenino',  '31245862', 'Hipotiroidismo',            'Ninguna',       'Levotiroxina'),
(94, 'Andrés Pizarro',     44, 'Masculino', '31245863', 'Diabetes tipo II',          'Ninguna',       'Metformina'),
(95, 'Brenda Lozano',      26, 'Femenino',  '31245864', 'Sin antecedentes',          'Ninguna',       'Ninguna'),
(96, 'Alonso Rivera',      58, 'Masculino', '31245865', 'Hipertensión',              'Ninguna',       'Losartán'),
(97, 'Verónica Calderón',  33, 'Femenino',  '31245866', 'Anemia leve',               'Ninguna',       'Suplemento de hierro'),
(98, 'Mario Zamora',       42, 'Masculino', '31245867', 'Estrés laboral',            'Ninguna',       'Ansiolíticos leves'),
(99, 'Inés Cabrera',       39, 'Femenino',  '31245868', 'Alergia al polvo',          'Polvo',         'Loratadina'),
(100,'Raúl Montoya',       49, 'Masculino', '31245869', 'Colesterol alto',           'Ninguna',       'Atorvastatina');

SELECT setval('pacientes_id_seq', (SELECT MAX(id) FROM pacientes));

-- 4. DIAGNÓSTICOS
CREATE TABLE IF NOT EXISTS diagnosticos (
    id            SERIAL PRIMARY KEY,
    paciente_id   INT  NOT NULL REFERENCES pacientes(id) ON DELETE CASCADE,
    doctor_id     INT           REFERENCES usuarios(id)  ON DELETE SET NULL,
    resultado     VARCHAR(20)   CHECK (resultado IN ('alto','medio','bajo')),
    probabilidad  NUMERIC(4,2),
    tiene_fibroma BOOLEAN       DEFAULT FALSE,
    recomendacion TEXT,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. ALERTAS
CREATE TABLE IF NOT EXISTS alertas (
    id          SERIAL PRIMARY KEY,
    hospital_id INT REFERENCES hospitales(id) ON DELETE CASCADE,
    usuario_id  INT REFERENCES usuarios(id)   ON DELETE SET NULL,
    tipo        VARCHAR(50),
    mensaje     TEXT,
    leida       BOOLEAN   DEFAULT FALSE,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO alertas (hospital_id, mensaje, tipo) VALUES
    (1, 'Sistema iniciado en Hospital Cayetano Heredia', 'info'),
    (2, 'Sistema iniciado en Hospital Arzobispo Loayza', 'info'),
    (3, 'Sistema iniciado en Hospital Dos de Mayo',      'info');
