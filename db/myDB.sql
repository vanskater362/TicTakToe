CREATE TABLE players
(
   id SERIAL NOT NULL PRIMARY KEY,
   username VARCHAR(100) NOT NULL UNIQUE,
   password VARCHAR(100) NOT NULL
);

CREATE TABLE record
(
   id SERIAL NOT NULL PRIMARY KEY,
   wins INT,
   losses INT,
   draws INT,
   points INT,
   playerID INT REFERENCES players(id)
);

INSERT INTO players (username, password) VALUES('Test1','Test1'), ('Test2','Test2');
INSERT INTO record (wins, losses, draws, points, playerID) VALUES (0,0,0,0,1), (0,0,0,0,2);