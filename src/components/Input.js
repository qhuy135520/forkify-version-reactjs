export default function Input({ title, value, name, type, handleChange }) {
  return (
    <>
      <label>{title}</label>
      <input
        value={value}
        required
        name={name}
        type={type}
        onChange={handleChange}
      />
    </>
  )
}
