create table movie (
  id serial primary key,
  name varchar(100) not null,
  gender varchar(100) not null,
  duration numeric(3) not null,
  classification numeric(2) not null,
  releaseDate date not null,
  synopsis text not null
);