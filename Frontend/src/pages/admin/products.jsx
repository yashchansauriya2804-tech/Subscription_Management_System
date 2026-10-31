import { useEffect, useState } from 'react'
import DataTable from '../../components/common/DataTable'
import RequestError from '../../components/common/RequestError'
import { getProducts } from '../../services/productService'

export default function AdminProductsPage() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getProducts().then(setProducts).catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <div className="panel">
      <div className="panel-header">
        <h3>Products</h3>
      </div>
      <RequestError message={error} />
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
