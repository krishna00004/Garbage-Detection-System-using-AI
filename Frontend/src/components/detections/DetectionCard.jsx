import { MapPin, Clock3 } from 'lucide-react';
import StatusBadge from './StatusBadge';
import FillBar from './FillBar';
import { formatDateTime } from '../../utils/date';

const DetectionCard = ({ detection }) => (
  <article className="card flex h-full flex-col overflow-hidden p-0">
    <div className="aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
      {detection.imageUrl ? (
        <img
          src={detection.imageUrl}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-sm text-slate-400">
          No image available
        </div>
      )}
    </div>
    <div className="flex flex-1 flex-col gap-3 p-2 sm:p-4">
      <div className="flex items-center justify-between gap-3">
        <StatusBadge status={detection.status} isDeleted={detection.isDeleted} />
        <span className="text-xs dark:text-slate-300 bg-brand-light p-1 px-2 rounded-full text-gray-600 dark:bg-green-950">
          #{detection.id.slice(0, 6).toUpperCase()}
        </span>
      </div>
      <div>
        <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-300">
          <MapPin size={16} />
          <span>{detection.location}</span>
        </div>
      </div>
      <FillBar percentage={detection.fillPercentage} />
      <div className="mt-auto flex items-center gap-2 text-xs text-slate-500 dark:text-slate-300">
        <Clock3 size={12} />
        <span>{formatDateTime(detection.createdAt || detection.timestamp)}</span>
      </div>
    </div>
  </article>
);

export default DetectionCard;
