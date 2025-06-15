CREATE DATABASE IF NOT EXISTS proyectofct
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE proyectofct;

SET NAMES utf8mb4;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    userpassword VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    role ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER'
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

CREATE TABLE airports (
    id INT PRIMARY KEY AUTO_INCREMENT,
    iata_code VARCHAR(3) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL
);

CREATE TABLE airlines (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    iata_code VARCHAR(2) NOT NULL UNIQUE,
    logo_url VARCHAR(255)
);

CREATE TABLE aircrafts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    model VARCHAR(255) NOT NULL,
    airline_id INT NOT NULL,
    total_seats INT NOT NULL,
    FOREIGN KEY (airline_id) REFERENCES airlines(id)
);

CREATE TABLE flights (
    id INT PRIMARY KEY AUTO_INCREMENT,
    flight_number VARCHAR(10) NOT NULL,
    airline_id INT NOT NULL,
    aircraft_id INT NOT NULL,
    departure_airport_id INT NOT NULL,
    arrival_airport_id INT NOT NULL,
    departure_time DATETIME NOT NULL,
    arrival_time DATETIME NOT NULL,
    base_price DECIMAL(10, 2) NOT NULL,
    available_seats INT NOT NULL,
    FOREIGN KEY (airline_id) REFERENCES airlines(id),
    FOREIGN KEY (aircraft_id) REFERENCES aircrafts(id),
    FOREIGN KEY (departure_airport_id) REFERENCES airports(id),
    FOREIGN KEY (arrival_airport_id) REFERENCES airports(id)
);

CREATE TABLE flight_seats (
    id INT PRIMARY KEY AUTO_INCREMENT,
    flight_id INT NOT NULL,
    seat_number VARCHAR(10) NOT NULL,
    class ENUM('economy', 'premium_economy', 'business', 'first') NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    price_modifier DECIMAL(10, 2) DEFAULT 1.0,
    FOREIGN KEY (flight_id) REFERENCES flights(id),
    UNIQUE (flight_id, seat_number)
);

CREATE TABLE flight_reservations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    flight_id INT NOT NULL,
    seat_id INT NOT NULL,
    reservation_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (flight_id) REFERENCES flights(id),
    FOREIGN KEY (seat_id) REFERENCES flight_seats(id)
);

CREATE TABLE activities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    types ENUM('RENTING', 'RESERVATION') NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    available BOOLEAN NOT NULL
);

CREATE TABLE activity_reservations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    activity_id INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    initial_date DATE NOT NULL,
    final_date DATE DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (activity_id) REFERENCES activities(id)
);

CREATE TABLE travels (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(255),
    description TEXT,
    outbound_flight_reservation_id INT,
    return_flight_reservation_id INT,
    hotel_reservation_id INT,
    total_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (outbound_flight_reservation_id) REFERENCES flight_reservations(id),
    FOREIGN KEY (return_flight_reservation_id) REFERENCES flight_reservations(id),
    FOREIGN KEY (hotel_reservation_id) REFERENCES reservation(id)
);

CREATE TABLE travel_activities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    travel_id INT NOT NULL,
    activity_reservation_id INT NOT NULL,
    FOREIGN KEY (travel_id) REFERENCES travels(id),
    FOREIGN KEY (activity_reservation_id) REFERENCES activity_reservations(id)
);


INSERT INTO users (username, email, userpassword, role) VALUES
('Juan Pérez', 'juan@example.com', '1234', 'USER'),
('Ana Torres', 'ana@example.com', '1234', 'USER'),
('Oscar', 'oscar@example.com', '$2a$10$XQADhmXtqQifIt8JzCDw0u/EZwFgJ1YSgE2QIS7ZktK4TaLLloxSS', 'ADMIN'),
('Javier', 'javier@example.com', '$2a$10$XQADhmXtqQifIt8JzCDw0u/EZwFgJ1YSgE2QIS7ZktK4TaLLloxSS', 'ADMIN');

INSERT INTO hotel (namehotel, description, image) VALUES
('Hotel Sol Mar', 'Un hotel frente al mar con acceso directo a la playa y servicios de lujo.', 'solmar.jpg'),
('Montaña Blanca Resort', 'Resort en la montaña ideal para vacaciones de invierno y senderismo.', 'montanablanca.jpg'),
('Ciudad Central Hotel', 'Ubicación perfecta en el centro de la ciudad, cerca de los principales puntos turísticos.', 'ciudadcentral.jpg'),
('Hotel Jardín Tropical', 'Un oasis tropical con jardines exuberantes, spa y piscina.', 'jardintropical.jpg'),
('Hotel Boutique Luna', 'Hotel boutique con diseño moderno y atención personalizada.', 'luna.jpg'),
('EcoLodge Verde', 'Hotel ecológico en plena naturaleza, ideal para desconectar y reconectar con el entorno.', 'ecolodge.jpg'),
('Skyline Hotel', 'Hotel moderno en rascacielos con vistas panorámicas de la ciudad.', 'skyline.jpg'),
('Hotel Plaza Real', 'Hotel clásico con encanto histórico en el corazón de la ciudad.', 'plazareal.jpg'),
('Resort Oasis del Desierto', 'Un refugio de lujo en el desierto con spa y piscina infinity.', 'oasisdesierto.jpg'),
('Hotel Montaña Azul', 'Perfecto para escapadas de montaña con senderos y actividades al aire libre.', 'montanaazul.jpg');

INSERT INTO rooms (name, hotel_id, description, capacity, price, image) VALUES
('Habitación Familiar', 1, 'Espaciosa habitación con dos camas dobles y vista al mar.', 4, 200.00, 'familiar_solana.jpg'),
('Suite Jacuzzi', 1, 'Suite con jacuzzi privado y balcón con vistas al océano.', 2, 220.00, 'suite_jacuzzi.jpg'),

('Cabaña Familiar', 2, 'Cabaña rústica para familias, con sala de estar y chimenea.', 6, 180.00, 'cabana_familiar.jpg'),
('Habitación Doble Nieve', 2, 'Habitación doble con vista a la montaña y calefacción.', 2, 120.00, 'doble_nieve.jpg'),

('Habitación Individual Centro', 3, 'Habitación individual cómoda en pleno centro.', 1, 75.00, 'individual_centro.jpg'),
('Suite Ejecutiva', 3, 'Suite con escritorio y sala de reuniones pequeña.', 2, 150.00, 'suite_ejecutiva.jpg'),

('Habitación Jardinera', 4, 'Habitación con balcón y vista al jardín tropical.', 2, 115.00, 'habitacion_jardinera.jpg'),
('Suite Spa', 4, 'Suite con acceso directo al spa y jacuzzi privado.', 2, 210.00, 'suite_spa.jpg'),

('Habitación Deluxe Luna', 5, 'Habitación deluxe con cama king size y diseño exclusivo.', 2, 160.00, 'deluxe_luna.jpg'),
('Habitación Doble Luna', 5, 'Habitación doble moderna con balcón.', 2, 130.00, 'doble_luna.jpg'),

('Habitación Eco Simple', 6, 'Habitación sencilla con muebles ecológicos.', 1, 80.00, 'eco_simple.jpg'),
('Suite Bosque', 6, 'Suite con vista panorámica al bosque y terraza privada.', 2, 180.00, 'suite_bosque.jpg'),

('Habitación Skyline Doble', 7, 'Habitación doble con vistas a la ciudad y decoración moderna.', 2, 140.00, 'doble_skyline.jpg'),
('Suite Presidencial', 7, 'Amplia suite con sala de estar, cocina y terraza panorámica.', 4, 350.00, 'suite_presidencial.jpg'),

('Habitación Plaza Superior', 8, 'Habitación con muebles clásicos y balcón a la plaza.', 2, 120.00, 'plaza_superior.jpg'),
('Suite Plaza', 8, 'Suite con sala de estar y vistas a la plaza.', 3, 180.00, 'suite_plaza.jpg'),

('Habitación Oasis Standard', 9, 'Habitación estándar con decoración árabe y vistas al desierto.', 2, 140.00, 'oasis_standard.jpg'),
('Suite Infinity', 9, 'Suite con piscina privada y vistas al desierto.', 2, 300.00, 'suite_infinity.jpg'),

('Habitación Montaña Standard', 10, 'Habitación acogedora con balcón a la montaña.', 2, 130.00, 'montana_standard.jpg'),
('Habitación Familiar Montaña', 10, 'Habitación familiar con dos camas dobles y chimenea.', 4, 210.00, 'montana_familiar.jpg');


INSERT INTO reservation (user_id, room_id, check_in, check_out, total_price) VALUES
(1, 1, '2025-07-01', '2025-07-05', 640.00),
(1, 3, '2025-08-10', '2025-08-12', 200.00),
(2, 2, '2025-12-20', '2025-12-25', 700.00), 
(2, 5, '2025-06-15', '2025-06-18', 540.00), 
(1, 4, '2025-09-01', '2025-09-04', 390.00); 

INSERT INTO airports (iata_code, name, city, country) VALUES
('MAD', 'Adolfo Suárez Madrid-Barajas', 'Madrid', 'España'),
('BCN', 'Barcelona-El Prat', 'Barcelona', 'España'),
('PMI', 'Palma de Mallorca', 'Palma', 'España'),
('LIS', 'Aeroporto de Lisboa', 'Lisboa', 'Portugal'),
('CDG', 'Charles de Gaulle', 'París', 'Francia');

INSERT INTO airlines (name, iata_code, logo_url) VALUES
('Iberia', 'IB', 'iberia.jpg'),
('Vueling', 'VY', 'vueling.jpg'),
('Air Europa', 'UX', 'air_europa.jpg'),
('Ryanair', 'FR', 'ryanair.jpg'),
('KLM', 'KL', 'klm.jpg');

INSERT INTO aircrafts (model, airline_id, total_seats) VALUES
('Airbus A320', 1, 180),
('Boeing 737-800', 2, 189),
('Embraer 195', 3, 120),
('Boeing 737 MAX', 4, 197),
('Airbus A330', 5, 293);

INSERT INTO flights (flight_number, airline_id, aircraft_id, departure_airport_id, arrival_airport_id, departure_time, arrival_time, base_price, available_seats) VALUES
('IB1234', 1, 1, 1, 2, '2025-07-01 08:00:00', '2025-07-01 09:15:00', 120.00, 180),
('VY5678', 2, 2, 2, 3, '2025-07-02 12:30:00', '2025-07-02 13:45:00', 80.00, 189),
('UX9012', 3, 3, 1, 4, '2025-07-03 16:45:00', '2025-07-03 17:30:00', 150.00, 120),
('FR3456', 4, 4, 3, 5, '2025-07-04 10:15:00', '2025-07-04 12:30:00', 65.00, 197),
('KL7890', 5, 5, 5, 1, '2025-07-05 14:00:00', '2025-07-05 16:45:00', 210.00, 293);

-- Insertar algunos asientos de ejemplo
INSERT INTO flight_seats (flight_id, seat_number, class, is_available, price_modifier) VALUES
(1, '12A', 'economy', TRUE, 1.0),
(1, '12B', 'economy', TRUE, 1.0),
(1, '1A', 'business', TRUE, 2.5),
(2, '15C', 'economy', TRUE, 1.0),
(2, '2A', 'premium_economy', TRUE, 1.8),
(3, '8D', 'economy', TRUE, 1.0),
(3, '3B', 'business', TRUE, 2.5),
(4, '10F', 'economy', TRUE, 1.0),
(4, '1C', 'first', TRUE, 4.0),
(5, '20A', 'economy', TRUE, 1.0);

INSERT INTO activities (types, name, description, image, price, available) VALUES
('RENTING', 'Alquiler de bicicleta de montaña', 'Recorre rutas naturales con nuestras bicicletas de alta gama.', 'bike_mountain.jpg', 15.00, TRUE),
('RESERVATION', 'Tour en barco al atardecer', 'Disfruta de un paseo en barco mientras cae el sol.', 'sunset_boat.jpg', 60.00, TRUE),
('RESERVATION', 'Clases de cocina mediterránea', 'Aprende a cocinar platos típicos con chefs locales.', 'cooking_class.jpg', 45.00, TRUE),
('RENTING', 'Alquiler de kayak individual', 'Explora el río a tu ritmo con nuestros kayaks.', 'kayak.jpg', 20.00, FALSE),
('RESERVATION', 'Excursión a la montaña', 'Una caminata guiada por senderos naturales.', 'mountain_hike.jpg', 30.00, TRUE);

INSERT INTO activity_reservations (user_id, activity_id, total_price, initial_date, final_date) VALUES
(1, 1, 45.00, '2025-06-20', '2025-06-22'),  -- 3 días de bicicleta
(2, 2, 60.00, '2025-07-01', '2025-07-01'),  -- Tour en barco
(1, 3, 45.00, '2025-06-25', '2025-06-25'),  -- Clases de cocina
(3, 5, 30.00, '2025-07-10', '2025-07-10'),  -- Excursión montaña
(2, 4, 40.00, '2025-06-28', '2025-06-29');  -- Kayak 2 días


/*

NEXTAUTH_SECRET=secret
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=proyectofct
MYSQL_PORT=3306
ADMINER_PORT=8080

*/