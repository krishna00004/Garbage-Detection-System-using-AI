import { API_BASE_URL } from './constants';

const normalizeMongoId = (value) => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && '$oid' in value) return value.$oid;
  return String(value);
};

const normalizeDate = (value) => {
  if (!value) return null;
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && '$date' in value) return value.$date;
  return value;
};

export function resolveMediaUrl(url) {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  return `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

export const normalizeDetection = (item, index = 0) => {
  const id = normalizeMongoId(item?._id || item?.id || `${index}`);
  const createdAt = normalizeDate(item?.created_at || item?.timestamp);
  const rawFill = Number(item?.fill_percentage ?? item?.fillPercentage ?? 0);

  return {
    id,
    imageUrl: resolveMediaUrl(item?.image_url || item?.imageUrl),
    location: item?.location || 'Unknown location',
    fillPercentage: Number.isFinite(rawFill) ? rawFill : 0,
    status: String(item?.status || 'PENDING').toUpperCase(),
    createdAt,
    timestamp: item?.timestamp || createdAt,
    isDeleted: Boolean(item?.is_deleted ?? item?.isDeleted),
    cameraName: item?.camera_name || item?.cameraName || '',
    cameraLocation: item?.camera_location || item?.cameraLocation || item?.location || ''
  };
};

export const normalizeAnalytics = (payload = {}, detections = []) => {
  const activeDetections = detections.filter((item) => !item.isDeleted);

  const total = Number(payload.total ?? activeDetections.length);
  const pending = Number(
    payload.pending ?? activeDetections.filter((item) => item.status === 'PENDING').length
  );
  const verified = Number(
    payload.verified ?? activeDetections.filter((item) => item.status === 'VERIFIED').length
  );

  return {
    total: Number.isFinite(total) ? total : 0,
    pending: Number.isFinite(pending) ? pending : 0,
    verified: Number.isFinite(verified) ? verified : 0
  };
};