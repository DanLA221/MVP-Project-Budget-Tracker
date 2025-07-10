DROP TABLE IF EXISTS expense;
DROP TABLE IF EXISTS budget;
DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL
);

CREATE TABLE project (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id INT REFERENCES users(id) NOT NULL
);

CREATE TABLE budget (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    project_id int REFERENCES project(id)
);

CREATE TABLE expense (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    budget_id int REFERENCES budget(id),
    estimate FLOAT NOT NULL,
    actual FLOAT
);

-- run the following line in the psql shell to load this file
-- \i data/projects.sql
