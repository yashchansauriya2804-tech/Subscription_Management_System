export default function DataTable({ columns = [], rows = [] }) {
  return (
    <div className="table-shell">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key || column.label}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id || `${row.name || 'row'}-${index}`}>
              {columns.map((column) => (
                <td key={`${column.key || column.label}-${index}`}>
                  {typeof column.render === 'function' ? column.render(row, index) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
