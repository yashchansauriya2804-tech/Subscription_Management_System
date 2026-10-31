import { useEffect, useState } from 'react'
import RequestError from '../../components/common/RequestError'
import { getStaff } from '../../services/staffService'

export default function AdminStaffPage() {
  const [staff, setStaff] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getStaff().then(setStaff).catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <>
      <RequestError message={error} />
      {staff.length > 0 ? (
        <div className="card-grid">
          {staff.map((member) => (
            <div key={member.id} className="feature-card">
              <p className="eyebrow">{member.role}</p>
              <h3>{member.name}</h3>
              <p>{member.email}</p>
            </div>
          ))}
        </div>
      ) : !error ? <p>No staff accounts have been configured yet.</p> : null}
    </>
  )
}
