import { useEffect, useState } from 'react'
import DataTable from '../../components/common/DataTable'
import { getProducts } from '../../services/productService'

export default function AdminProductsPage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts().then(setProducts)
  }, [])

  return (
    <div className="panel">
      <div className="panel-header">
        <h3>Products</h3>
      </div>
      <DataTable
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'category', label: 'Category' },
          { key: 'price', label: 'Price' },
          { key: 'stock', label: 'Stock' },
        ]}
        rows={products}
      />
    </div>
  )
}
