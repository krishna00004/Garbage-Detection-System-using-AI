# import os
# import cv2
# import time
# import torch
# import requests
# from datetime import datetime
# from threading import Thread

# # =========================
# # CONFIG
# # =========================
# MODEL_PATH = "model/best1000.pt"
# SOURCE = "test_data/v2.mp4"

# BACKEND_URL = "http://127.0.0.1:5000/api/detections"

# CONF_THRESHOLD = 0.40
# NORMAL_THRESHOLD = 8.0
# MEDIUM_THRESHOLD = 20.0
# FULL_THRESHOLD = 35.0

# COOLDOWN_SECONDS = 300
# LOCATION_NAME = "Area_Name-1"

# SAVE_DIR = "temp"
# os.makedirs(SAVE_DIR, exist_ok=True)

# # =========================
# # GLOBAL CONTROL
# # =========================
# camera_running = False
# video_frame = None

# # =========================
# # LOAD MODEL
# # =========================
# model = torch.hub.load(
#     "yolov5",
#     "custom",
#     path=MODEL_PATH,
#     source="local"
# )
# model.conf = CONF_THRESHOLD

# last_alert_time = 0


# # =========================
# # HELPERS
# # =========================
# def classify(fill):
#     if fill < NORMAL_THRESHOLD:
#         return "NORMAL"
#     elif fill < MEDIUM_THRESHOLD:
#         return "MEDIUM"
#     elif fill < FULL_THRESHOLD:
#         return "HIGH"
#     return "FULL"


# def send_to_backend(image_path, fill, status):
#     try:
#         with open(image_path, "rb") as img:
#             files = {
#                 "image": (os.path.basename(image_path), img, "image/jpeg")
#             }

#             data = {
#                 "location": LOCATION_NAME,
#                 "fill_percentage": f"{fill:.2f}",
#                 "status": status,
#                 "timestamp": datetime.utcnow().isoformat()
#             }

#             requests.post(BACKEND_URL, files=files, data=data)

#     except Exception as e:
#         print("❌ Error:", e)


# # =========================
# # DETECTION FUNCTION
# # =========================
# def run_detection():
#     global camera_running, video_frame, last_alert_time

#     cap = cv2.VideoCapture(SOURCE)

#     if not cap.isOpened():
#         print("❌ Camera not working")
#         return

#     print("🚀 Detection Started")

#     while camera_running:
#         ret, frame = cap.read()
#         if not ret:
#             break

#         height, width = frame.shape[:2]
#         frame_area = height * width

#         results = model(frame)
#         detections = results.pandas().xyxy[0]

#         garbage_area = 0

#         for _, row in detections.iterrows():
#             conf = float(row["confidence"])
#             if conf < CONF_THRESHOLD:
#                 continue

#             x1, y1 = int(row["xmin"]), int(row["ymin"])
#             x2, y2 = int(row["xmax"]), int(row["ymax"])

#             box_area = (x2 - x1) * (y2 - y1)
#             garbage_area += box_area

#             cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 255), 2)
#         # changesssss
#         fill_percentage = min((garbage_area / frame_area) * 200, 100)
#         status = classify(fill_percentage)

#         color = (0, 255, 0) if status == "NORMAL" else (0, 255, 255) if status == "MEDIUM" else (0, 0, 255)

#         cv2.putText(frame, f"Fill: {fill_percentage:.2f}%", (20, 40),
#                     cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2)

#         cv2.putText(frame, f"Status: {status}", (20, 80),
#                     cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2)

#         # ALERT
#         current_time = time.time()

#         if status == "FULL" and (current_time - last_alert_time) > COOLDOWN_SECONDS:
#             filename = f"{SAVE_DIR}/img_{int(current_time)}.jpg"
#             cv2.imwrite(filename, frame)

#             send_to_backend(filename, fill_percentage, "PENDING")

#             last_alert_time = current_time

#         video_frame = frame

#     cap.release()
#     print("🛑 Detection Stopped")


# # =========================
# # CONTROL FUNCTIONS (API USE)
# # =========================
# def start_camera():
#     global camera_running
#     if not camera_running:
#         camera_running = True
#         Thread(target=run_detection).start()


# def stop_camera():
#     global camera_running
#     camera_running = False


# def get_frame():
#     global video_frame
#     return video_frame






import os
import cv2
import time
import torch
import requests
from datetime import datetime
from threading import Thread

# =========================
# CONFIG
# =========================
MODEL_PATH = "model/best1000.pt"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# This is a video file, not a live camera.
SOURCE = os.path.join(BASE_DIR, "test_data", "v2.mp4")

#Option 1: Laptop Webcam
#SOURCE = 0

#Option 2: USB Camera
#SOURCE = 1 or 2

#CCTV / IP Camera (BEST for your project)
#SOURCE = "rtsp://username:password@192.168.1.100:554/stream"
#or
#SOURCE = "http://192.168.1.100:8080/video"

# You MUST ensure:
# Camera is top-down or angled view
# Full garbage area is visible
# No unnecessary background
# Stable mount (no shaking)
#Slight top angle (45°)

print("SOURCE PATH:", os.path.abspath(SOURCE))
print("FILE EXISTS:", os.path.exists(SOURCE))

BACKEND_URL = "http://127.0.0.1:5000/api/detections"

CONF_THRESHOLD = 0.40

# UI thresholds
NORMAL_THRESHOLD = 15.0
MEDIUM_THRESHOLD = 55.0
FULL_THRESHOLD = 65.0

# FULL state hold / clear thresholds
#Alert only when Fill ≥ 90% -------------------------->

FULL_ENTER_THRESHOLD = 92
FULL_EXIT_THRESHOLD = 55.0

COOLDOWN_SECONDS = 2000
LOCATION_NAME = "Area_Name-1"

SAVE_DIR = "temp"
os.makedirs(SAVE_DIR, exist_ok=True)

# =========================
# GLOBAL CONTROL
# =========================
camera_running = False
video_frame = None

# smoothing / state
last_alert_time = 0
smoothed_fill = 0.0
full_latched = False

# =========================
# LOAD MODEL
# =========================
model = torch.hub.load(
    "yolov5",
    "custom",
    path=MODEL_PATH,
    source="local"
)
model.conf = CONF_THRESHOLD


# =========================
# HELPERS
# =========================
def classify(fill, is_full_latched):
    if is_full_latched:
        return "FULL"
    if fill < NORMAL_THRESHOLD:
        return "NORMAL"
    elif fill < MEDIUM_THRESHOLD:
        return "MEDIUM"
    elif fill < FULL_THRESHOLD:
        return "HIGH"
    return "FULL"


def send_to_backend(image_path, fill, status):
    try:
        with open(image_path, "rb") as img:
            files = {
                "image": (os.path.basename(image_path), img, "image/jpeg")
            }

            data = {
                "location": LOCATION_NAME,
                "fill_percentage": f"{fill:.2f}",
                "status": status,
                "timestamp": datetime.utcnow().isoformat()
            }

            res = requests.post(BACKEND_URL, files=files, data=data, timeout=15)
            print(f"✅ Alert sent: {res.status_code} | Area: {LOCATION_NAME} | Fill: {fill:.2f}%")

    except Exception as e:
        print("❌ Error:", e)


def calculate_display_fill(garbage_area, frame_area):
    """
    Stable UI fill calculation:
    - small garbage gives visible non-zero value
    - medium is reachable
    - full requires heavy garbage
    """
    if frame_area <= 0:
        return 0.0

    raw_ratio = garbage_area / frame_area

    # better scaling than *200
    scaled_fill = raw_ratio * 1400

    # clamp
    scaled_fill = max(0.0, min(scaled_fill, 100.0))

    # if some garbage exists, avoid showing 0.00%
    if garbage_area > 0 and scaled_fill < 3:
        scaled_fill = 3.0

    return scaled_fill


# =========================
# DETECTION FUNCTION
# =========================
def run_detection():
    global camera_running, video_frame, last_alert_time, smoothed_fill, full_latched


#Add this after VideoCapture:
# cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
# cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

# 👉 Why?
# Faster processing
# Stable performance

#For IP Camera Stability
# cap = cv2.VideoCapture(SOURCE)
# cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)

    cap = cv2.VideoCapture(SOURCE)

    if not cap.isOpened():
        print("❌ Camera/video source not working")
        camera_running = False
        return

    print("🚀 Detection Started")

    while camera_running:
        ret, frame = cap.read()

        # if video file ends, restart from beginning
        if not ret:
            cap.release()
            cap = cv2.VideoCapture(SOURCE)
            time.sleep(0.1)
            continue

        height, width = frame.shape[:2]
        frame_area = height * width

        results = model(frame)
        detections = results.pandas().xyxy[0]

        garbage_area = 0

        for _, row in detections.iterrows():
            conf = float(row["confidence"])
            if conf < CONF_THRESHOLD:
                continue

            x1, y1 = int(row["xmin"]), int(row["ymin"])
            x2, y2 = int(row["xmax"]), int(row["ymax"])

            box_area = max((x2 - x1), 0) * max((y2 - y1), 0)
            garbage_area += box_area

            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 255), 2)

        instant_fill = calculate_display_fill(garbage_area, frame_area)
        smoothed_fill = (0.75 * smoothed_fill) + (0.25 * instant_fill)

        if not full_latched and smoothed_fill >= FULL_ENTER_THRESHOLD:
            full_latched = True
        elif full_latched and smoothed_fill <= FULL_EXIT_THRESHOLD:
            full_latched = False

        status = classify(smoothed_fill, full_latched)

        current_time = time.time()
        if full_latched and (current_time - last_alert_time) > COOLDOWN_SECONDS:
            filename = f"{SAVE_DIR}/img_{int(current_time)}.jpg"
            cv2.imwrite(filename, frame)
            send_to_backend(filename, smoothed_fill, "PENDING")
            last_alert_time = current_time

        # always keep latest frame for streaming
        video_frame = frame.copy()

        # small delay for smoother streaming
        time.sleep(0.03)

    cap.release()
    camera_running = False
    video_frame = None
    print("🛑 Detection Stopped")


# =========================
# CONTROL FUNCTIONS (API USE)
# =========================
def start_camera():
    global camera_running
    if not camera_running:
        camera_running = True
        Thread(target=run_detection, daemon=True).start()


def stop_camera():
    global camera_running
    camera_running = False


def get_frame():
    global video_frame
    return video_frame
