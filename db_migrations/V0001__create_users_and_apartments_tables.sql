-- Таблица пользователей
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица квартир
CREATE TABLE IF NOT EXISTS apartments (
    id SERIAL PRIMARY KEY,
    rooms INTEGER NOT NULL,
    area DECIMAL(10,2) NOT NULL,
    floor INTEGER NOT NULL,
    price BIGINT NOT NULL,
    image_url TEXT,
    status VARCHAR(50) DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица бронирований
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    apartment_id INTEGER REFERENCES apartments(id),
    status VARCHAR(50) DEFAULT 'pending',
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставка данных квартир
INSERT INTO apartments (rooms, area, floor, price, image_url) VALUES
(1, 38, 5, 4200000, 'https://cdn.poehali.dev/projects/db055318-b76f-41d8-8795-d71780223041/files/ba087084-4722-4833-9db9-b62f689d41e6.jpg'),
(2, 52, 8, 5800000, 'https://cdn.poehali.dev/projects/db055318-b76f-41d8-8795-d71780223041/files/ba087084-4722-4833-9db9-b62f689d41e6.jpg'),
(2, 58, 12, 6400000, 'https://cdn.poehali.dev/projects/db055318-b76f-41d8-8795-d71780223041/files/ba087084-4722-4833-9db9-b62f689d41e6.jpg'),
(3, 72, 10, 7900000, 'https://cdn.poehali.dev/projects/db055318-b76f-41d8-8795-d71780223041/files/ba087084-4722-4833-9db9-b62f689d41e6.jpg'),
(3, 85, 15, 9200000, 'https://cdn.poehali.dev/projects/db055318-b76f-41d8-8795-d71780223041/files/ba087084-4722-4833-9db9-b62f689d41e6.jpg'),
(4, 105, 18, 11500000, 'https://cdn.poehali.dev/projects/db055318-b76f-41d8-8795-d71780223041/files/ba087084-4722-4833-9db9-b62f689d41e6.jpg');