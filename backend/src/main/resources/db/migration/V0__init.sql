-- -----------------------------------------------------
-- Table USERS
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS USERS (
  id SERIAL PRIMARY KEY,
  email VARCHAR(45) NULL UNIQUE,
  username VARCHAR(45) NULL UNIQUE,
  password VARCHAR(65) NOT NULL,
  gender VARCHAR(10),
  birthdate DATE);

-- -----------------------------------------------------
-- Table SETTINGS
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS SETTINGS (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES USERS,
  weight FLOAT NOT NULL,
  height FLOAT NOT NULL,
  physical_activity FLOAT NOT NULL,
  target_weight FLOAT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL);

-- -----------------------------------------------------
-- Table INGREDIENTS
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS INGREDIENTS (
  id SERIAL PRIMARY KEY,
  name VARCHAR(45) NOT NULL,
  calories INT NOT NULL);

-- -----------------------------------------------------
-- Table DISHES
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS DISHES (
  id SERIAL PRIMARY KEY,
  name VARCHAR(45) NOT NULL,
  description VARCHAR(500) NOT NULL,
  category INT NOT NULL,
  meal_type_mask BYTEA NOT NULL,
  photo_url VARCHAR(100) NULL);

-- -----------------------------------------------------
-- Table DISH_COMPONENTS
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS DISH_COMPONENTS (
  dish_id INT NOT NULL REFERENCES DISHES,
  ingredient_id INT NULL REFERENCES INGREDIENTS,
  weight FLOAT NOT NULL,
  PRIMARY KEY (dish_id, ingredient_id));

-- -----------------------------------------------------
-- Table PREFERENCES
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS PREFERENCES (
  user_id INT NOT NULL REFERENCES USERS,
  dish_id INT NOT NULL REFERENCES DISHES,
  is_favourite BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (user_id, dish_id));

-- -----------------------------------------------------
-- Table EXCLUDED_INGREDIENTS
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS EXCLUDED_INGREDIENTS(
  user_id INT NOT NULL REFERENCES USERS,
  ingredient_id INT NOT NULL REFERENCES INGREDIENTS,
  PRIMARY KEY (user_id, ingredient_id));

-- -----------------------------------------------------
-- Table MEALS
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS MEALS (
  user_id INT NOT NULL REFERENCES USERS,
  dish_id INT NULL REFERENCES DISHES,
  date DATE NOT NULL,
  type INT NOT NULL,
  PRIMARY KEY (user_id, dish_id));