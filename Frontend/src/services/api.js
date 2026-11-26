import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { normalizeAnalytics, normalizeDetection } from '../utils/apiHelpers';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000
});

// =========================
// DETECTIONS
// =========================
export const apiService = {

  async getDetections() {
    const { data } = await api.get('/api/detections');
    const items = Array.isArray(data) ? data : data?.data || [];
    return items.map(normalizeDetection);
  },

  async getAnalytics(detections = []) {
    const { data } = await api.get('/api/analytics');
    return normalizeAnalytics(data, detections);
  },

  async verifyDetection(id) {
    await api.put(`/api/detections/${id}/verify`);
    return { _id: id, status: "VERIFIED" }; // optimistic support
  },

  async deleteDetection(id) {
    return await api.delete(`/api/detections/${id}`);
  },

  async createDetection(formData) {
    const { data } = await api.post('/api/detections', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return normalizeDetection(data);
  },

  // =========================
  // NOTIFICATIONS
  // =========================
  async getNotifications() {
    const { data } = await api.get('/api/notifications');
    return data;
  },

  async getUnreadCount() {
    const { data } = await api.get('/api/notifications/unread-count');
    return data.count;
  },

  async markNotificationsRead() {
    return await api.post('/api/notifications/mark-read');
  },

  // =========================
  // CAMERA CONTROL
  // =========================
  async startCamera() {
    return await api.get('/api/start-camera');
  },

  async stopCamera() {
    return await api.get('/api/stop-camera');
  },

  getVideoFeedUrl() {
    return `${API_BASE_URL}/api/video-feed`;
  },

  // =========================
  // CAMERA FORM
  // =========================
  async addCamera(data) {
    return await api.post('/api/cameras', data);
  },

  // =========================
  // AUTH
  // =========================
  async register(data) {
    return await api.post('/api/register', data);
  },

  async login(data) {
    return await api.post('/api/login', data);
  }

};

export default api;