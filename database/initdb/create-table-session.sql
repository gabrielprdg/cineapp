CREATE TABLE session (
  id SERIAL PRIMARY KEY,
  movie_id INTEGER NOT NULL REFERENCES movie(id),
  cinema_id INTEGER NOT NULL REFERENCES cinema(id),
  day_of_week VARCHAR(10) NOT NULL,
  date TIMESTAMP NOT NULL
);
