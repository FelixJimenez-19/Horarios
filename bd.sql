create database horarios;
use horarios;

create table docente(
id_docente int auto_increment primary key,
nombre varhcar(60) not null,
apellido varhcar(60) not null
)ENGINE INNODB;

create table carrera(
id_carrea int auto_increment primary key,
nombre varchar (60) not null
)ENGINE INNODB;


create table  ciclo(
id_ciclo int auto_increment primary key,
nombre varchar (60) not null,
id_carrea int,
foreign key (id_carrea) references carrera(id_carrea)
)ENGINE INNODB;

create table  materia(
id_materia int auto_increment primary key,
nombre varchar (60) not null,
nhps int,
id_docente int,
id_ciclo int,
foreign key (id_docente) references docente(id_docente),
foreign key (id_ciclo) references ciclo(id_ciclo)
)ENGINE INNODB;


create table  periodo(
id_periodo int auto_increment primary key,
nombre varchar (60) not null,
horario JSON
)ENGINE INNODB;

create table modelo(
id_modelo int auto_increment primary key,
nombre varchar (60) not null,
horario JSON,
id_periodo int,
foreign key (id_periodo) references periodo (id_periodo)
)ENGINE INNODB;

INSERT INTO modelo(nombre,configuracion) VALUES('Horario A', '');

create table  paralelo(
id_paralelo int auto_increment primary key,
nombre varchar (60) not null,
id_ciclo int,
foreign key (id_ciclo) references ciclo(id_ciclo)
)ENGINE INNODB;

create table  horario(
id_horario int auto_increment primary key,
horario JSON not null,
id_periodo int,
id_paralelo int,
unique key(id_horario,id_paralelo)
)ENGINE INNODB;