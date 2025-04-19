create table session (
  id serial primary key,
  movie_id integer not null references movie(id),
  cinema_id integer not null references cinema(id),
  day_of_week varchar(10) not null,
  date date not null
);