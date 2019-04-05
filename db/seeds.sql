
-- DO NOT RUN THIS FILE IF USING SEQUELIZE
-- USE THIS FILE FOR TESTING ONLY

-- ======================================================

CREATE TABLE IF NOT EXISTS food (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO food (name)
VALUES("pizza"),("hamburger"),("tacos");

SELECT * FROM food;

-- ======================================================

-- DROP TABLE ingredients; -- <- how to delete a table

CREATE TABLE IF NOT EXISTS ingredients (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    shop BOOLEAN default false, -- <- don't actually DELETE data, instead set a 'flag'. most real world situation require data audits and/or records retention.
    PRIMARY KEY (id)
);

INSERT INTO ingredients (name)
VALUES("cheese"),("lettuce"),("tomatoes"),("beef"),("pepperoni"),("pickles"),("tortillas");

SELECT * FROM ingredients;

-- ======================================================

CREATE TABLE IF NOT EXISTS food_ingredients (
    id INT AUTO_INCREMENT NOT NULL,
    food_id INT,
    ingredients_id INT,
    PRIMARY KEY (id)
);

INSERT INTO food_ingredients (food_id, ingredients_id)
VALUES(1,1),(1,5),(2,8),(2,4),(3,9),(3,4),(3,1);

SELECT * FROM food_ingredients;

-- ======================================================

SELECT * FROM food ORDER BY name ASC;
SELECT * FROM ingredients ORDER BY name ASC;
SELECT * FROM food_ingredients ORDER BY id ASC;

-- ======================================================

-- Show only "Tacos"...
SELECT * FROM food WHERE id = 3;

-- ======================================================

-- Many 2 Many Join...
SELECT 
	food_ingredients.id AS "food_ingredients:id", 
    food.id AS "food:id", food.name, 
    ingredients.id AS "ingredients:id", ingredients.name 
FROM food, ingredients, food_ingredients
WHERE food.id = food_ingredients.food_id
AND ingredients.id = food_ingredients.ingredients_id;
-- AND food.id = 3; -- <- comment in/out for "tacos"

-- Show only "Tacos" ingredients...
SELECT 
	food_ingredients.id, 
    food.id ,food.name, 
    ingredients.id, ingredients.name 
FROM food, ingredients, food_ingredients
WHERE food.id = 3 -- <- tacos
AND food.id = food_ingredients.food_id
AND ingredients.id = food_ingredients.ingredients_id;

-- Show only "Tacos" ingredients (id and name only)
SELECT ingredients.id, ingredients.name 
FROM food, ingredients, food_ingredients
WHERE food.id = 3 -- <- tacos
AND food.id = food_ingredients.food_id
AND ingredients.id = food_ingredients.ingredients_id;

-- ======================================================

SELECT * FROM ingredients WHERE id IN (4,1) ORDER BY name ASC;

UPDATE ingredients SET shop = true WHERE id IN (4,1) ORDER BY name ASC;
UPDATE ingredients SET shop = false WHERE id IN (4,1) ORDER BY name ASC;