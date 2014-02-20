DROP DATABASE IF EXISTS test_urls;

CREATE DATABASE test_urls;

USE test_urls;

CREATE TABLE urls (
  url_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  url VARCHAR(140),
  child_count INT,
  parent_count INT,
  created_at TIMESTAMP
);

INSERT INTO urls (title, url, child_count, parent_count, created_at) 
  VALUES('Javascript','http://foowiki.com/Javascript', 0, 0, NOW());

INSERT INTO urls (title, url, child_count, parent_count, created_at) 
  VALUES('Dynamic Programming Lang','http://foowiki.com/DynamicProgLang', 0, 0, NOW());

INSERT INTO urls (title, url, child_count, parent_count, created_at) 
  VALUES('Client-Side Scripts','http://foowiki.com/ClientSideScripts', 0, 0, NOW());

INSERT INTO urls (title, url, child_count, parent_count, created_at) 
  VALUES('CoffeeScript','http://foowiki.com/CoffeeScript', 0, 0, NOW());

INSERT INTO urls (title, url, child_count, parent_count, created_at) 
  VALUES('Hack Reactor','http://foowiki.com/HackReactor', 0, 0, NOW());

INSERT INTO urls (title, url, child_count, parent_count, created_at) 
  VALUES('Backbone','http://foowiki.com/Backbone', 0, 0, NOW());

INSERT INTO urls (title, url, child_count, parent_count, created_at) 
  VALUES('Angular','http://foowiki.com/Angular', 0, 0, NOW());

CREATE TABLE url_to_url (
  url_id INT NOT NULL,
  child_id INT NOT NULL,
  PRIMARY KEY (url_id, child_id)
);

INSERT INTO url_to_url (url_id, child_id) VALUES
  (1, 2),
  (1, 3),
  (4, 1),
  (5, 1),
  (6, 1),
  (7, 1);