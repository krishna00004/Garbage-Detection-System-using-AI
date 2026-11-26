import { CheckCircle2, Trash2, MapPin, Camera } from 'lucide-react';
import StatusBadge from './StatusBadge';
import FillBar from './FillBar';
import { formatDateTime } from '../../utils/date';

const DetectionTable = ({ detections, onVerify, onDelete, busyId }) => (
  <div className="card overflow-hidden p-0">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 text-left dark:divide-slate-800">
        <thead className="bg-slate-50 dark:bg-slate-900">
          <tr className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
            <th className="px-4 py-4 text-center sm:px-6">Image</th>
            <th className="px-4 py-4 sm:px-6">Location</th>
            <th className="px-4 py-4 text-center sm:px-6">Fill %</th>
            <th className="px-4 py-4 text-center sm:px-6">Status</th>
            <th className="px-4 py-4 sm:px-6">Date & Time</th>
            <th className="px-4 py-4 text-center sm:px-6">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {detections.map((detection) => {
            const isBusy = busyId === detection.id;
            const isVerified = detection.status === 'VERIFIED';
            const isDeleted = detection.isDeleted || detection.status === 'DELETED';

            return (
              <tr key={detection.id} className="align-top">
                <td className="px-4 py-4 sm:px-6">
                  <div className="h-16 w-20 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                    {detection.imageUrl ? (
                      <img
                        src={detection.imageUrl}
                        alt={detection.location}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-slate-400">
                        No image
                      </div>
                    )}
                  </div>
                </td>

                <td className="px-4 py-4 sm:px-6">
                  <div className="min-w-[220px]">
                    <p className="text-medium font-semibold text-slate-900 dark:text-white">
                      {detection.location}
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-300">
                      <span>Detection ID: #{detection.id.slice(0, 6).toUpperCase()}</span>

                      {detection.cameraName ? (
                        <span className="inline-flex items-center gap-1">
                          <Camera size={12} />
                          {detection.cameraName}
                        </span>
                      ) : null}

                      {detection.cameraLocation ? (
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={12} />
                          {detection.cameraLocation}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4 sm:px-6">
                  <div className="min-w-[120px]">
                    <FillBar percentage={detection.fillPercentage} />
                  </div>
                </td>

                <td className="px-4 py-5 sm:px-6">
                  <StatusBadge status={detection.status} isDeleted={detection.isDeleted} />
                </td>

                <td className="px-4 py-6 text-xs text-slate-500 dark:text-slate-300 sm:px-6">
                  {formatDateTime(detection.createdAt || detection.timestamp)}
                </td>

                <td className="px-4 py-4 sm:px-6">
                  <div className="flex min-w-[220px] flex-col items-center justify-between gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => onVerify?.(detection.id)}
                      disabled={isBusy || isDeleted || isVerified}
                      className="btn-secondary disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <CheckCircle2 size={16} className="mr-2" />
                      {isBusy && !isDeleted ? 'Processing...' : isVerified ? 'Verified' : 'Verify'}
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete?.(detection.id)}
                      disabled={isBusy || isDeleted}
                      className="btn-danger disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Trash2 size={16} className="mr-2" />
                      {isBusy && isDeleted ? 'Deleting...' : isDeleted ? 'Deleted' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export default DetectionTable;