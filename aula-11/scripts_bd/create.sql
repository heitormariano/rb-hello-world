-- criacao banco de dados
create database financas_pessoais;

-- criacao tabela lancamento
create table financas_pessoais.lancamento (
	id_lancamento int not null auto_increment,
    mes tinytext,
    categoria tinytext,
    tipo tinytext,
    valor decimal(10,2),
    primary key (id_lancamento)
);