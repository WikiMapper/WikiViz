CREATE DATABASE urls;

USE urls;

CREATE TABLE urls (
  url_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  url VARCHAR(140),
  created_at TIMESTAMP
);

CREATE TABLE keywords (
  keyword_id INT AUTO_INCREMENT PRIMARY KEY,
  keyword VARCHAR(40),
  concept VARCHAR(40)
);

CREATE TABLE urls_keywords (
  url_id INT NOT NULL,
  keyword_id INT NOT NULL,
  PRIMARY KEY (url_id, keyword_id)
);
