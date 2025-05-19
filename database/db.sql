CREATE DATABASE proyectofct;

USE proyectofct;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    userpassword VARCHAR(255) NOT NULL
);

CREATE TABLE hotel (
    id INT PRIMARY KEY AUTO_INCREMENT,
    namehotel VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255)
);

CREATE TABLE rooms (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    hotel_id INT NOT NULL,
    description TEXT,
    capacity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255),
    FOREIGN KEY (hotel_id) REFERENCES hotel(id)
);

CREATE TABLE reservation (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    room_id INT NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);
