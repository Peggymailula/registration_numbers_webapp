CREATE TABLE towns(
id SERIAL PRIMARY KEY NOT NULL,
town_place VARCHAR(20) NOT NULL,
town_ref TEXT NOT NULL
);

CREATE TABLE regnumber (
	id SERIAL PRIMARY KEY NOT NULL,
	reg_number TEXT NOT NULL,
	town_id INT,
	FOREIGN KEY (town_id) REFERENCES towns(id)
);

INSERT INTO towns (town_place, town_ref) values ('Cape Town','CA'); 
INSERT INTO towns (town_place, town_ref) values ('Bellville','CY');
INSERT INTO towns (town_place, town_ref) values ('Stellenbosch','CL');

