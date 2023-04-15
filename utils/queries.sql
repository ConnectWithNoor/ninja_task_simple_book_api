CREATE TABLE books (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    author VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL
);


CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    is_token_issued BOOLEAN NOT NULL DEFAULT false
);


CREATE TABLE orders (
    id SERIAL NOT NULL PRIMARY KEY,
    timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
    createdBy SERIAL REFERENCES user (id),
    bookId SERIAL REFERENCES book (id),
    customer_name VARCHAR(50),
    quantity INTEGER
);

-- INSERT INTO order table

INSERT INTO orders (id, type, name, author)
VALUES
  (1, 'Fiction', 'The Great Gatsby', 'Daniel Defoe'),
  (2, 'Fiction', 'To Kill a Mockingbird', 'Dr. A.P.J Abdul Kalam'),
  (3, 'Fiction', 'Pride and Prejudice', 'John Miton'),
  (4, 'Fiction', 'The Catcher in the Rye', 'Ernest Hemingway'),
  (5, 'Fantasy', 'The Hobbit', 'Bankim Chandra Chatterjee'),
  (6, 'Fantasy', 'The Lord of the Rings', 'Michael Crichton'),
  (7, 'Mystery', 'The Da Vinci Code', 'George Bernard Shaw'),
  (8, 'Mystery', 'Angels and Demons', 'Leo Tolstoy'),
  (9, 'Mystery', 'The Girl with the Dragon Tattoo', 'Charles Darwin'),
  (10, 'Fantasy', 'Alice in Wonderland', 'Lewis Carrol');