CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

INSERT INTO items (name)
VALUES ('Tâche numéro 1'), ('Tâche numéro 2'), ('Tâche numéro 3');