CREATE TABLE users (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO users (first_name, last_name, username, password, email) VALUES ('John', 'User', 'john', '1234', 'john@email.com');
INSERT INTO users (first_name, last_name, username, password, email) VALUES ('John', 'Regular', 'johnr', '123', 'johnr@email.com');
