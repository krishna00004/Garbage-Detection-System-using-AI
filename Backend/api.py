import os
from flask import Flask, request, jsonify, send_from_directory, Response
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.utils import secure_filename
from datetime import datetime
from bson import ObjectId
import bcrypt
import cv2
import cv2
from flask import Response

# IMPORT detection control
from main import start_camera, stop_camera, get_frame

# =========================
# APP CONFIG
# =========================
app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# =========================
# MONGODB
# =========================
client = MongoClient("mongodb://localhost:27017/")
db = client["garbage_db"]

detections = db["detections"]
users = db["users"]
notifications = db["notifications"]
cameras = db["cameras"]

print("✅ MongoDB Connected")

# =========================
# SERVE IMAGES
# =========================
@app.route('/uploads/<filename>')
def serve_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

# =========================
# DETECTIONS
# =========================
@app.route("/api/detections", methods=["POST"])
def add_detection():
    try:
        image = request.files.get("image")
        location = request.form.get("location")
        fill = request.form.get("fill_percentage")
        status = request.form.get("status")

        filename = f"{int(datetime.now().timestamp())}_{secure_filename(image.filename)}"
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        image.save(filepath)

        data = {
            "image_url": f"http://localhost:5000/uploads/{filename}",
            "location": location,
            "fill_percentage": float(fill),
            "status": status,
            "created_at": datetime.utcnow(),
            "is_deleted": False
        }

        result = detections.insert_one(data)

        # 🔔 CREATE NOTIFICATION
        if status == "PENDING":
            notifications.insert_one({
                "message": f"Garbage FULL at {location}",
                "location": location,
                "read": False,
                "created_at": datetime.utcnow()
            })

        return jsonify({"message": "Saved", "id": str(result.inserted_id)})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/detections", methods=["GET"])
def get_detections():
    data = []
    for item in detections.find({"is_deleted": False}).sort("created_at", -1):
        item["_id"] = str(item["_id"])
        data.append(item)
    return jsonify(data)


# =========================
# VERIFY
# =========================
@app.route("/api/detections/<id>/verify", methods=["PUT"])
def verify(id):
    obj_id = ObjectId(id)

    detections.update_one(
        {"_id": obj_id},
        {"$set": {"status": "VERIFIED"}}
    )

    return jsonify({"message": "Verified"})


# =========================
# DELETE
# =========================
@app.route("/api/detections/<id>", methods=["DELETE"])
def delete(id):
    obj_id = ObjectId(id)

    detections.update_one(
        {"_id": obj_id},
        {"$set": {"is_deleted": True, "status": "DELETED"}}
    )

    return jsonify({"message": "Deleted"})


# =========================
# NOTIFICATIONS
# =========================
@app.route("/api/notifications", methods=["GET"])
def get_notifications():
    data = []
    for n in notifications.find().sort("created_at", -1):
        n["_id"] = str(n["_id"])
        data.append(n)
    return jsonify(data)


@app.route("/api/notifications/unread-count", methods=["GET"])
def unread_count():
    count = notifications.count_documents({"read": False})
    return jsonify({"count": count})


@app.route("/api/notifications/mark-read", methods=["POST"])
def mark_read():
    notifications.update_many({"read": False}, {"$set": {"read": True}})
    return jsonify({"message": "Marked as read"})


# =========================
# CAMERA CONTROL
# =========================
@app.route("/api/start-camera")
def start_cam():
    start_camera()
    return jsonify({"message": "Camera Started"})


@app.route("/api/stop-camera")
def stop_cam():
    stop_camera()
    return jsonify({"message": "Camera Stopped"})


def generate_frames():
    while True:
        frame = get_frame()
        if frame is None:
            continue
        # edit recently
        # _, buffer = cv2.imencode('.jpg', frame)
        # frame = buffer.tobytes()

        ok, buffer = cv2.imencode(".jpg", frame)
        if not ok:
            continue

        frame_bytes = buffer.tobytes()


        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')


@app.route('/api/video-feed')
def video_feed():
    return Response(generate_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


# =========================
# CAMERAS (NEW)
# =========================
@app.route("/api/cameras", methods=["POST"])
def add_camera():
    data = request.json

    cameras.insert_one({
        "name": data["name"],
        "type": data["type"],
        "ip": data["ip"],
        "location": data["location"],
        "description": data["description"]
    })

    return jsonify({"message": "Camera added"})


# =========================
# AUTH
# =========================
@app.route("/api/register", methods=["POST"])
def register():
    try:
        data = request.json
        username = data["username"]
        email = data["email"]
        password = data["password"]

        existing_user = users.find_one({
            "$or": [
                {"username": username},
                {"email": email}
            ]
        })

        if existing_user:
            return jsonify({"error": "Username or email already exists"}), 400

        hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())

        users.insert_one({
            "username": username,
            "name": data.get("name", username),
            "email": email,
            "password": hashed,
            "role": "user",
            "avatar": "",
            "phone": ""
        })

        return jsonify({"message": "User created"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/login", methods=["POST"])
def login():
    try:
        data = request.json
        username = data["username"]
        password = data["password"]

        user = users.find_one({
            "$or": [
                {"username": username},
                {"email": username}
            ]
        })

        if not user:
            return jsonify({"error": "User not found"}), 404

        if not bcrypt.checkpw(password.encode(), user["password"]):
            return jsonify({"error": "Wrong password"}), 401

        return jsonify({
            "message": "Login success",
            "user": {
                "_id": str(user["_id"]),
                "username": user.get("username", ""),
                "name": user.get("name", user.get("username", "")),
                "email": user.get("email", ""),
                "role": user.get("role", "user"),
                "avatar": user.get("avatar", ""),
                "phone": user.get("phone", "")
            }
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# =========================
# ANALYTICS
# =========================
@app.route("/api/analytics", methods=["GET"])
def analytics():
    try:
        return jsonify({
            "total": detections.count_documents({"is_deleted": False}),
            "pending": detections.count_documents({"status": "PENDING", "is_deleted": False}),
            "verified": detections.count_documents({"status": "VERIFIED", "is_deleted": False})
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# =========================
# RUN
# =========================
print("REGISTERED ROUTES:")
for rule in app.url_map.iter_rules():
    print(rule, rule.methods)
    
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)