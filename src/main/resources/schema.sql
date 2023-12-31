-- A schema for the inventory management solution database --


-- WARNING: this will drop all the tables, comment out if needed
drop table if exists INVENTORY;
drop table if exists WAREHOUSES;
drop table if exists ITEMS;

-- Create the Warehouses table
CREATE TABLE WAREHOUSES (
  warehouse_id SERIAL PRIMARY KEY,
  warehouse_name VARCHAR(255) NOT NULL,
  warehouse_location VARCHAR(255) NOT NULL,
  maximum_capacity INTEGER NOT NULL
);

-- Create the Items table
CREATE TABLE ITEMS (
  item_id SERIAL PRIMARY KEY,
  item_name VARCHAR(255) NOT NULL
);

-- Create the Inventory table (junction table)
CREATE TABLE INVENTORY (
  warehouse_id INTEGER REFERENCES Warehouses (warehouse_id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES Items (item_id) ON DELETE CASCADE,
  quantity INTEGER,
  PRIMARY KEY (warehouse_id, item_id)
);