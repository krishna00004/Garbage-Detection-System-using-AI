import { STATUS_COLORS } from '../../utils/constants';

const StatusBadge = ({ status = 'Unclean', isDeleted = false }) => {
  const normalized = isDeleted ? 'DELETED' : String(status).toUpperCase();
  return (
    <span
      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold uppercase tracking-wide ring-1 ${
        STATUS_COLORS[normalized] || STATUS_COLORS.PENDING
      }`}
    >
      {normalized}
    </span>
  );
};

export default StatusBadge;
