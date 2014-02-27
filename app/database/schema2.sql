DROP DATABASE IF EXISTS wikiviz;
CREATE DATABASE wikiviz;

DROP TABLE IF EXISTS urlLinks;

CREATE SEQUENCE urlLinks_id_seq;

CREATE TABLE urlLinks (
  id INTEGER NOT NULL default nextval('urlLinks_id_seq'),
  url VARCHAR(100) NOT NULL,
  title VARCHAR(100) DEFAULT NULL,
  outgoing VARCHAR(10) DEFAULT NULL,
  incoming VARCHAR(10) DEFAULT NULL,
  PRIMARY KEY (id)
);
