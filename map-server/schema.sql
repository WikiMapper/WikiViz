CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
 user_id INT AUTO_INCREMENT PRIMARY KEY,
 username VARCHAR(100),
 created_at TIMESTAMP
);


CREATE TABLE friends (
 user_id INT, 
 friend_id INT,
 FOREIGN KEY (user_id) REFERENCES users(user_id),
 FOREIGN KEY (friend_id) REFERENCES users(user_id) 
);

CREATE TABLE rooms (
 room_id INT AUTO_INCREMENT PRIMARY KEY,
 room_name VARCHAR(100)
);

CREATE TABLE messages (
 message_id INT AUTO_INCREMENT PRIMARY KEY,
 user_id INT,
 username VARCHAR(100),
 room_id INT,
 message_text VARCHAR(140),
 created_at TIMESTAMP,
 FOREIGN KEY (user_id) REFERENCES users(user_id),
 FOREIGN KEY (room_id) REFERENCES rooms(room_id)
);
