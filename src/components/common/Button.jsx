export default function Button({ children, variant = 'primary', type = 'button', onClick, className = '', ...props }) {
  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    danger: 'btn-danger',
  }[variant]

  return (
    <button type={type} className={`btn ${variantClass} ${className}`.trim()} onClick={onClick} {...props}>
      {children}
    </button>
  )
}
