// Dependencies
var mysql = require('mysql');
var inquirer = require('inquirer');

// Connect to database
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Bacardi13',
  database : 'bamazon'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
});

function menu() {
  inquirer.prompt( {
    name: "menu",
    type: "list",
    message: "What would you like to do?",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Logout"]
  }).then(function(answer) {
    switch (answer.menu) {
      case "View Products for Sale":
        return viewProducts();

      case "View Low Inventory":
        return viewLow();

      case "Add to Inventory":
        return addInventory();

      case "Add New Product":
        return addProduct();

      case "Logout":
        return logout();
    }
  });
};

// Define function to view available products
function viewProducts() {
  connection.query('SELECT * FROM `products`', function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    console.log("\nAll available products:\n");
    for (var i=0; i<results.length; i++) {
      console.log(
        results[i].item_id + " " + 
        results[i].product_name + " [" + 
        results[i].price + "] Qty: " + 
        results[i].stock_quantity
      );
    }
    console.log("\n--------------\n");
    menu();
  })
};

// Define function to view low inventory
function viewLow() {
  connection.query('SELECT * FROM `products` WHERE `stock_quantity` < 5', function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    console.log("\nYou will soon sell out of the following:\n");
    for (var i=0; i<results.length; i++) {
      console.log( 
        results[i].item_id + " " + 
        results[i].product_name + 
        results[i].price + " [Remaining quantity: " + 
        results[i].stock_quantity + "]"
      );
    }
    console.log("\n--------------\n");
    menu();
  })
};

// Define function to increase a product's current inventory
function addInventory() {
  inquirer.prompt( [{
    name: "itemId",
    type: "input",
    message: "Enter an item ID for which to increase inventory"
  }, {
    name: "addQty",
    type: "input",
    message: "Enter quantity of items to ADD"
  }]).then(function(answer) {
    var sql = "UPDATE `products` SET `stock_quantity` = `stock_quantity` + " + answer.addQty + " WHERE `item_id` = " + answer.itemId;
    connection.query(sql, function(err, result, fields) {
      console.log("\n" + result.affectedRows + " product updated!");
      console.log("\n--------------\n");
      menu();
    })
  })
};

// Define function to add a new product
function addProduct() {
  // Create an inquirer prompt to retreive values to create item
  inquirer.prompt([{
    name: "name",
    type: "input",
    message: "Enter the name of the product you wish to add."
  }, {
    name: "dept",
    type: "list",
    message: "Select the department in which to list your item.", 
    choices: ["Apparel", "Home & Kitchen", "Grocery", "Entertainment", "Seasonal"]
  }, {
    name: "price",
    type: "input",
    message: "Enter the unit price for your item."
  }, {
    name: "qty",
    type: "input",
    message: "Enter the available quantity for your item."
  }]).then(function(answer) {
    var sql = "INSERT INTO `products` (product_name, department_name, price, stock_quantity) VALUES ";
    var values = "('" + answer.name + "', '" + answer.dept + "', " + answer.price + ", " + answer.qty + ")";
    connection.query(sql + values, function(err, result, fields) {
      console.log("\n" + result.affectedRows + " product added!");
      console.log("\n--------------\n");
      menu();    
    })
  })
};

function logout() {
  connection.end();
}

menu();