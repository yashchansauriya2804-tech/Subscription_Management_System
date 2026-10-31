import Product from '../models/Product.js'

function serializeProduct(product) {
  return {
    id: product._id.toString(),
    name: product.name,
    category: product.category,
    price: product.price,
    stock: product.stock,
  }
}

export async function getProducts(request, response) {
  const products = await Product.find({ active: true }).sort({ createdAt: -1 }).lean()
  return response.json(products.map(serializeProduct))
}

export async function createProduct(request, response) {
  const { name, category = 'General', price, stock = 0 } = request.body
  if (typeof name !== 'string' || !name.trim() || !Number.isFinite(price) || price < 0) {
    return response.status(400).json({ message: 'A product name and non-negative numeric price are required.' })
  }
  const product = await Product.create({ name, category, price, stock })
  return response.status(201).json(serializeProduct(product))
}

export async function updateProduct(request, response) {
  const fields = ['name', 'category', 'price', 'stock', 'active']
  const updates = Object.fromEntries(Object.entries(request.body).filter(([key]) => fields.includes(key)))
  if (Object.keys(updates).length === 0) {
    return response.status(400).json({ message: 'Provide at least one valid product field to update.' })
  }
  if (updates.price !== undefined && (!Number.isFinite(updates.price) || updates.price < 0)) {
    return response.status(400).json({ message: 'Product price must be a non-negative number.' })
  }
  if (updates.stock !== undefined && (!Number.isInteger(updates.stock) || updates.stock < 0)) {
    return response.status(400).json({ message: 'Product stock must be a non-negative whole number.' })
  }
  const product = await Product.findByIdAndUpdate(
    request.params.id,
    updates,
    { new: true, runValidators: true },
  )
  if (!product) return response.status(404).json({ message: 'Product not found.' })
  return response.json(serializeProduct(product))
}

export async function deleteProduct(request, response) {
  const product = await Product.findByIdAndUpdate(request.params.id, { active: false }, { new: true })
  if (!product) return response.status(404).json({ message: 'Product not found.' })
  return response.status(204).end()
}