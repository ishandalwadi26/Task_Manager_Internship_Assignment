/**
 * Alert Component
 * @param {Object} props
 * @param {string} props.type - Alert type (success, error, warning, info)
 * @param {string} props.message - Alert message
 * @param {Function} props.onClose - Close handler
 * @param {boolean} props.show - Show/hide alert
 */
const Alert = ({
  type = 'info',
  message,
  onClose,
  show = true
}) => {
  if (!show || !message) return null;

  const types = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700'
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  return (
    <div className={`${types[type]} border px-4 py-3 rounded mb-4 flex items-center justify-between`}>
      <span>
        <span className="mr-2">{icons[type]}</span>
        {message}
      </span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 font-bold hover:opacity-75"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Alert;
