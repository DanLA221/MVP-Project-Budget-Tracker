DROP TABLE IF EXISTS expense;
DROP TABLE IF EXISTS budget;
DROP TABLE IF EXISTS project;


CREATE TABLE project (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
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

INSERT INTO project(id, name)
VALUES
    (1, 'Project 1'),
    (2, 'Project 2');

-- run the following line in the psql shell to load this file
-- \i data/projects.sql
