const express = require('express'); // like import in JS, this express is the syntax of Node JS.
const products = require('./data/products');

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...0000');
  // send to client
}); // create a route, meaning if we get a GST request to slash, we want to run the function
// get is a listener=> listen the request to the url

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(5000, console.log('Server running on port 5000')); // listen on a port 5000
