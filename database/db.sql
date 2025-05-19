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


INSERT INTO users (username, email, userpassword) VALUES
('Juan Pérez', 'juan@example.com', '1234'),
('Ana Torres', 'ana@example.com', '1234');

INSERT INTO hotel (namehotel, description, image) VALUES
('Hotel Sol Mar', 'Un hotel frente al mar con acceso directo a la playa y servicios de lujo.', 'solmar.jpg'),
('Montaña Blanca Resort', 'Resort en la montaña ideal para vacaciones de invierno y senderismo.', 'montanablanca.jpg'),
('Ciudad Central Hotel', 'Ubicación perfecta en el centro de la ciudad, cerca de los principales puntos turísticos.', 'ciudadcentral.jpg'),
('Hotel Jardín Tropical', 'Un oasis tropical con jardines exuberantes, spa y piscina.', 'jardintropical.jpg'),
('Hotel Boutique Luna', 'Hotel boutique con diseño moderno y atención personalizada.', 'luna.jpg');

INSERT INTO rooms (name, hotel_id, description, capacity, price, image) VALUES
('Suite Playa', 1, 'Suite con vistas al mar y terraza privada.', 2, 160.00, 'suite_playa.jpg'),
('Cabaña Nieve', 2, 'Cabaña con chimenea y vista a la montaña.', 4, 140.00, 'cabana_nieve.jpg'),
('Doble Centro', 3, 'Habitación doble en el centro de la ciudad.', 2, 100.00, 'doble_centro.jpg'),
('Tropical Deluxe', 4, 'Habitación con balcón al jardín tropical.', 2, 130.00, 'tropical_deluxe.jpg'),
('Luna Suite', 5, 'Suite moderna con diseño exclusivo.', 2, 180.00, 'luna_suite.jpg');

INSERT INTO reservation (user_id, room_id, check_in, check_out, total_price) VALUES
(1, 1, '2025-07-01', '2025-07-05', 640.00),
(1, 3, '2025-08-10', '2025-08-12', 200.00),
(2, 2, '2025-12-20', '2025-12-25', 700.00), 
(2, 5, '2025-06-15', '2025-06-18', 540.00), 
(1, 4, '2025-09-01', '2025-09-04', 390.00); 


/*

NEXTAUTH_SECRET=secret
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=proyectofct
MYSQL_PORT=3306
ADMINER_PORT=8080

*/



