DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT auto_increment,
  product_name VARCHAR(200),
  department_name VARCHAR(50),
  price DECIMAL(10, 2),
  stock_quantity INT(10),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES 
	("Harry Potter T-Shirt", "Apparel", 12.95, 40), 
    ("Stainless Steel Toaster", "Home & Kitchen", 39.99, 200), 
    ("Doctor Who T.A.R.D.I.S. Coffee Mug", "Home & Kitchen", 9.25, 350),
    ("Day of the Dead Leggings", "Apparel", 19.90, 400), 
    ("Organic Matcha Green Tea Powder", "Grocery", 21.05, 1000),
    ("Monster House DVD", "Entertainment", 24.99, 2500),
    ("Graveyard Halloween Decoration Set", "Seasonal", 18.49, 456),
    ("Sweeney Todd Soundtrack CD", "Entertainment", 12.95, 752),
    ("Limited Edition 4th Doctor Scarf", "Apparel", 15.57, 8),
    ("Inflatable 6ft Spider", "Seasonal", 18.83, 204);
    
    SELECT * FROM products;
    
    UPDATE products SET stock_quantity = stock_quantity + 10 WHERE item_id = 1;