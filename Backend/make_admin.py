from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["garbage_db"]

db.users.update_one(
    {"email": "admin@garbagedetect.ai"},
    {"$set": {"role": "admin"}}
)

print("✅ Role updated to admin")