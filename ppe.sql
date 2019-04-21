CREATE DATABASE iomt;

CREATE TABLE utilisateur
(
    id int AUTO_INCREMENT PRIMARY KEY ,
    nom varchar(40) ,
    prenom varchar(40) ,
    role int ,
    email varchar(40) UNIQUE ,
    password varchar(40)
);

CREATE TABLE notification 
(
    id int AUTO_INCREMENT PRIMARY KEY ,
    titre varchar(40) ,
    contenu varchar (80) ,
	idu int ,
    ido int 
);

CREATE TABLE objet 
(
    id int AUTO_INCREMENT PRIMARY KEY ,
    libelle varchar(40) ,
    etat int ,
    latitude double ,
    longitude double 
);

alter table notification add CONSTRAINT fk2 PRIMARY key(idu,ido);

alter table notification add CONSTRAINT fk3 FOREIGN key(idu) REFERENCES utilisateur(id);

alter table notification add CONSTRAINT fk4 FOREIGN key(ido) REFERENCES objet(id);

ALTER TABLE utilisateur
ADD CONSTRAINT constraint_name
CHECK (role BETWEEN 0 AND 1);