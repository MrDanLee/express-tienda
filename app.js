const express = require('express')
const app = express()
const PORT = 3000;
const productsData = require('./data.js')
const renderProducts = require('./template.js')

const categoryFilter = (category) => productsData.filter(product => product.category === category) 
const expensiveFilter = () => productsData.filter(product => product.price >= 100)
const cheapFilter = () => productsData.filter(product => product.price < 100)

app.get('/', (req, res) => {
  res.send('<h1>Bienvenido a mi página</h1><a href = "/">Home</a><a href = "/electronica">Electronica</a><a href="/ropa">Ropa</a><a href="/hogar">Hogar</a><a href="/productos">Productos</a><a href="/productos/baratos">Productos baratos</a><a href="/productos/caros">Productos caros</a>')
})


app.get('/electronica', (req, res) => {
  const category = 'Electrónica'
  const products = categoryFilter('electrónica')
  res.send(renderProducts(category, products))
})

app.get('/ropa', (req, res) => {
  const category = 'Ropa'
  const products = categoryFilter('ropa')
  res.send(renderProducts(category, products))
})

app.get('/hogar', (req, res) => {
  const category = 'Hogar'
  const products = categoryFilter('hogar')
  res.send(renderProducts(category, products))
})

app.get('/productos', (req, res) => {
  const category = 'Todos los productos'
  const products = productsData
  res.send(renderProducts(category, products))
})

app.get('/productos/baratos', (req, res) => {
  const category = 'Productos baratos'
  const products = cheapFilter()
  res.send(renderProducts(category, products))
})

app.get('/productos/caros', (req, res) => {
  const category = 'Productos caros'
  const products = expensiveFilter()
  res.send(renderProducts(category, products))
})

app.use((req, res) => {
  res
  .status(404)
  .send('<h1>Página no encontrada</h1><a href = "/">Home</a>')
})

app.listen(PORT, () => {
  console.log(`El servidor está escuchando en la URl http://localhost:${PORT}`)
})