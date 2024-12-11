INSERT INTO docente (id_docente,nombre,apellido) 
VALUES 
(1,'ALEXIS','JUMBO'),
(2,'MARIA','ZARUMA'),
(3,'EDWIN','JARA'),
(4,'LORENA','RIVADENEIRA'),
(5,'JANET','RIVERA'),
(6,'MAYRA','GUTIERREZ'),
(7,'SILVIA','AUCAY'),
(8,'ANA','CAGUANA'),
(9,'PAUL','CASTILLO'),
(10,'LUIS','ORDOÑES'),
(11,'CRISTIAN','PAGUAY'),
(12,'CRISTHIAN','ERAZO'),
(13,'PABLO','AGUILAR'),
(14,'JAIME','LLANGARI'),
(15,'FAUSTO','SUAREZ');


INSERT INTO carrera (id_carrera,nombre)
VALUES

(1,'TECNOLOGIA SUPERIOR EN CONTABILIDAD'),
(2,'TECNOLOGIA SUPERIOR EN DESARROLLO DE SOFTWARE');


INSERT INTO materia (id_materia,nombre,nhps,id_docente,id_carrera)
VALUES
(1,'R_N_AMB',2,1,1),
(2,'E_PRO_S',3,1,1),
(3,'LEG_M_S',4,1,1),
(4,'PROY_INV',4,1,1),
(5,'ET_PROF',2,1,2),
(6,'C_O_ESC',3,2,1),
(7,'ADM_FIN',3,2,1),
(8,'GEST_AUD',4,2,1),
(9,'A_FINAN',5,2,1),
(10,'CALC_D_I',4,2,2),
(11,'E_DESCRIP',4,2,2),
(12,'MET_INV.',3,2,1),
(13,'OFIMA',5,3,1),
(14,'F_PROG',7,3,2),
(15,'P_TITUL',2,3,2),
(16,'MATE_BAS',8,4,1), 
(17,'C_I_F_SEG',7,4,1),
(18,'A_FINAN',5,4,1),
(19,'CONTA_BAS',9,5,1), 
(20,'CONT_CTO',8,5,1),
(21,'PRESU',5,5,1),
(22,'ADMIN',5,6,1),
(23,'INT_ECO',3,6,1),
(24,'MICRO',4,6,1),
(25,'MACRO',4,6,1),
(26,'EMPREND',4,6,1),
(27,'LEG_COM',3,6,2),
(28,'MATE_FIN',8,7,1),
(29,'ESTADIS',5,7,1),
(30,'MARKET',4,7,1),
(31,'CONT_INT',8,8,1),
(32,'TRIBUTA',5,8,1),
(33,'CONT_SUP',7,8,1),
(34,'DIV_CULT',2,8,2),
(35,'LEG_LAB',5,9,1),
(36,'MAT_DIS',4,9,2),
(37,'DISEN_INT',5,9,2),
(38,'LEG_INFOR',4,9,2),
(39,'CAL_SOFT',6,9,2),
(40,'COMP_ORG',4,10,1),
(41,'SOFT_CONT',4,11,1),
(42,'I_D_SOFT',5,11,2),
(43,'ALG_TRIG',4,11,2),
(44,'BD_AVAN',5,11,2),
(45,'EMPREND',4,11,2),
(46,'DES_PENS',3,12,2),
(47,'M_D_SOFT',4,12,2),
(48,'P_VISUAL',7,12,2),
(49,'P_A_WEB',8,12,2),
(50,'A_D_SIST',6,13,2),
(51,'POO',7,13,2),
(52,'FUNT_ADM',3,13,2),
(53,'FUN_R_CON',7,13,2),
(54,'INGLES A15',5,14,2), 
(55,'INGLES A2',5,14,2), 
(56,'INGLES B151',5,14,2), 
(57,'INGLES B152',5,14,2), 
(58,'B_DATOS',6,15,2),
(59,'D_A_MOV',7,15,2),
(60,'T_A_PROG',9,15,2);


<--INNER JOIN  CONSULTA  DE MATERIAS POR CICLO  Y CARRERA-->
SELECT * FROM  ciclo
INNER JOIN carrera ON carrera.id_carrera = ciclo.id_carrera
INNER JOIN  materia ON  materia.id_ciclo =ciclo.id_ciclo
WHERE ciclo.nombre LIKE 'Q%' AND carrera.nombre= 'TECNOLOGIA SUPERIOR EN DESARROLLO DE SOFTWARE';





