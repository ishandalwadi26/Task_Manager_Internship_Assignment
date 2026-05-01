/**
 * TaskStats Component
 * @param {Object} props
 * @param {Object} props.stats - Statistics object with total, completed, pending
 */
const TaskStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-white rounded-xl shadow p-4 text-center">
        <p className="text-3xl font-bold text-purple-600">{stats.total}</p>
        <p className="text-gray-600 text-sm">Total</p>
      </div>
      <div className="bg-white rounded-xl shadow p-4 text-center">
        <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
        <p className="text-gray-600 text-sm">Completed</p>
      </div>
      <div className="bg-white rounded-xl shadow p-4 text-center">
        <p className="text-3xl font-bold text-orange-600">{stats.pending}</p>
        <p className="text-gray-600 text-sm">Pending</p>
      </div>
    </div>
  );
};

export default TaskStats;
