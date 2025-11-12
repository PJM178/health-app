CREATE TYPE unit_category AS ENUM ('mass', 'length', 'volume', 'time', 'energy');
CREATE TABLE users (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  created_by INT REFERENCES users(id),
  updated_by INT REFERENCES users(id)
);
CREATE TABLE units (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  symbol TEXT NOT NULL,
  category unit_category NOT NULL,
  conversion_factor NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  created_by INT REFERENCES users(id),
  updated_by INT REFERENCES users(id)
);
CREATE TABLE user_metrics (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  unit_id INT REFERENCES units(id) NOT NULL,
  value NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  created_by INT REFERENCES users(id),
  updated_by INT REFERENCES users(id)
);
INSERT INTO users (first_name, last_name, username, password, email)
VALUES ('John', 'User', 'john', '1234', 'john@email.com');
INSERT INTO users (first_name, last_name, username, password, email)
VALUES (
    'John',
    'Regular',
    'johnr',
    '123',
    'johnr@email.com'
  );
INSERT INTO units (name, symbol, category, conversion_factor)
VALUES ('kilogram', 'kg', 'mass', 1);
INSERT INTO units (name, symbol, category, conversion_factor)
VALUES ('centimeter', 'cm', 'length', 0.01);
INSERT INTO user_metrics (user_id, unit_id, value)
VALUES (
    (
      SELECT id
      FROM users
      WHERE username = 'john'
    ),
    (
      SELECT id
      FROM units
      WHERE symbol = 'kg'
    ),
    71.5
  ),
  (
    (
      SELECT id
      FROM users
      WHERE username = 'john'
    ),
    (
      SELECT id
      FROM units
      WHERE symbol = 'cm'
    ),
    180
  );