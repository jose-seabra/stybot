CREATE TABLE IF NOT EXISTS channels(
    id serial PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS commands(
    id serial PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
