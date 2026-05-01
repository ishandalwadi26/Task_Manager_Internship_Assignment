/**
 * Input Component
 * @param {Object} props
 * @param {string} props.type - Input type
 * @param {string} props.label - Label text
 * @param {string} props.value - Input value
 * @param {string} props.placeholder - Placeholder text
 * @param {boolean} props.required - Required field
 * @param {Function} props.onChange - Change handler
 * @param {string} props.error - Error message
 * @param {string} props.className - Additional CSS classes
 */
const Input = ({
  type = 'text',
  label,
  value,
  placeholder,
  required = false,
  onChange,
  error,
  className = '',
  ...props
}) => {
  const baseStyles = 'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors';
  const errorStyles = error ? 'border-red-500' : 'border-gray-300';

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`${baseStyles} ${errorStyles}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;
