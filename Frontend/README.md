
# ♻️ AI-Powered Garbage Detection System

A smart garbage detection and monitoring system powered by Artificial Intelligence, Computer Vision, and Deep Learning. The project uses YOLOv5 to detect normal garbage bins, overflowing garbage bins, and illegal garbage dumping, with a React-based admin dashboard for monitoring and managing detection records.

---

## 📌 About The Project

The AI-Powered Garbage Detection System is designed to automate garbage monitoring using Artificial Intelligence and Computer Vision.

Traditional garbage monitoring methods require manual inspection and regular human intervention. This project aims to make garbage monitoring smarter and more efficient through a deep learning-based object detection model.

The system uses YOLOv5 to detect garbage-related objects from video input. Detection information is processed through a Flask backend and stored in MongoDB. Administrators can access detection records through a responsive React.js dashboard.

The main objective is to improve waste monitoring, identify overflowing garbage bins, and detect illegal garbage dumping.

---

## 🎯 Project Objectives

- Automate garbage detection using Artificial Intelligence.
- Identify overflowing garbage bins.
- Detect illegal garbage dumping.
- Monitor garbage bin fill levels.
- Store detection records in MongoDB.
- Provide an interactive admin dashboard.
- Manage pending, verified, and deleted detections.
- Generate analytical reports.
- Improve garbage monitoring and waste management efficiency.

---

## ✨ Key Features

### 🤖 AI-Based Garbage Detection
- YOLOv5-based object detection.
- Normal garbage bin detection.
- Overflowing garbage bin detection.
- Illegal garbage dumping detection.
- Confidence threshold-based detection.
- Garbage fill-level monitoring.

### 📊 Admin Dashboard
- Total detections overview.
- Pending detections statistics.
- Verified detections statistics.
- Recent garbage detection records.
- Interactive analytics and charts.
- Search and filtering functionality.

### 🗂️ Detection Management
- View all detection records.
- Verify pending detections.
- Optimistic UI updates for verification and deletion.
- Soft deletion of detection records.
- View deleted detection records.
- Filter detections by status.
- Maintain detection history.

### 🔔 Notification Management
- Garbage detection notifications.
- Unread notification count.
- Notification management.
- Automatic data refresh.

### 🔐 Authentication & Authorization
- Admin login.
- User signup.
- Role-based access control.
- Protected dashboard routes.
- Public landing, login, and signup pages.
- Restricted access to admin functionalities.

### 👤 Profile Management
- Editable user profile.
- Avatar upload.
- Profile preferences.
- Local preference persistence.

### ⚙️ Settings
- Theme preferences.
- Notification preferences.
- Automatic refresh settings.
- Compact dashboard card preferences.
- Settings persistence using localStorage.

### 📱 Responsive Interface
- Mobile-first responsive design.
- Collapsible sidebar.
- Navigation bar.
- Search functionality.
- Loading states.
- Error states.
- Empty states.
- Modern user interface.

---

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, Vite |
| Programming Language | JavaScript |
| Styling | Tailwind CSS |
| Routing | React Router DOM |
| HTTP Client | Axios |
| Charts | Recharts |
| Backend | Python, Flask |
| AI Model | YOLOv5 |
| Computer Vision | OpenCV |
| Deep Learning | PyTorch |
| Database | MongoDB |
| API Communication | REST API |
| Version Control | Git & GitHub |

---

## 🏗️ System Architecture

The project follows a frontend-backend architecture integrated with an AI-based garbage detection system.

```text
                 VIDEO INPUT
                      |
                      v
               OPENCV PROCESSING
                      |
                      v
                  YOLOv5 MODEL
                      |
                      v
              GARBAGE DETECTION
                      |
                      v
              FILL LEVEL ANALYSIS
                      |
                      v
                FLASK BACKEND
                      |
                      v
                   MONGODB
                      |
                      v
                  REST API
                      |
                      v
                REACT FRONTEND
                      |
                      v
               ADMIN DASHBOARD
                      |
           -----------------------
           |          |          |
           v          v          v
        HISTORY   ANALYTICS  NOTIFICATIONS
```

---

## 🔄 Detection Workflow

1. The system receives video input from a recorded video source.
2. OpenCV processes the video frames.
3. YOLOv5 identifies garbage-related objects.
4. The model classifies the detected objects.
5. Garbage fill-level information is evaluated.
6. The system checks whether the configured alert condition is satisfied.
7. Detection information is sent to the Flask backend.
8. Flask processes the request and stores detection records in MongoDB.
9. The React dashboard retrieves detection information through REST APIs.
10. Administrators can review, verify, and manage detection records.

### 🚨 Alert Condition

The system is designed to trigger an alert when the garbage fill level reaches or exceeds 90%.

```text
          Fill Level >= 90%?
                   |
             -------------
             |           |
            YES          NO
             |           |
             v           v
         Send Alert   No Alert
             |
             v
      Store Detection
             |
             v
      Continue Monitoring
```

---

## 🧠 Detection Classes

The YOLOv5 model is configured with three garbage detection classes.

| Class ID | Class Name | Description |
|---|---|---|
| 0 | normal_bin | Normal garbage bin |
| 1 | overflow_bin | Overflowing garbage bin |
| 2 | illegal_dump | Illegal garbage dumping |

### Model Configuration

| Parameter | Value |
|---|---|
| Model | YOLOv5 |
| Model Weights | best1000.pt |
| Confidence Threshold | 0.40 |
| Normal Threshold | 10% |
| Medium Threshold | 40% |
| Alert Threshold | 90% |
| Cooldown Period | 300 Seconds |
| Video Source | Recorded Video |

---

## 📁 Project Structure

```text
garbage-detection-project-code/
│
├── Backend/
│   ├── api.py
│   ├── main.py
│   ├── requirements.txt
│   ├── model/
│   │   └── best1000.pt
│   ├── test_data/
│   │   └── garbageVideo.mp4
│   └── ...
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── charts/
│   │   │   ├── common/
│   │   │   └── detections/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── ...
│
└── README.md
```

*Note: This is a representative structure. Adjust filenames and folders to match your actual repository.*

---

## ⚙️ Installation and Setup

Follow the instructions below to run the project locally.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate to the project directory:

```bash
cd garbage-detection-project-code
```

### 2. Backend Setup

Navigate to the backend folder:

```bash
cd Backend
```

Create a Python virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment on Windows:

```powershell
.\venv\Scripts\Activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

### 3. MongoDB Configuration

Make sure MongoDB is installed and running locally, or configure your MongoDB Atlas database.

Example MongoDB connection string:

```env
MONGO_URI=mongodb://localhost:27017/
```

Create a `.env` file inside the backend directory and configure the environment variables required by your Flask application.

### 4. Run Flask Backend

Start the Flask API:

```bash
python api.py
```

Backend URL:

```text
http://127.0.0.1:5000
```

### 5. Run AI Detection System

Open another terminal and navigate to the backend directory.

Activate the virtual environment:

```powershell
.\venv\Scripts\Activate
```

Run the detection script:

```bash
python main.py
```

Make sure the YOLOv5 model weights and recorded video file are available at the configured paths.

### 6. Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd Frontend
```

Install frontend dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

For Windows PowerShell, you can also use:

```powershell
Copy-Item .env.example .env
```

Configure the backend URL in your frontend environment file if your application uses Vite environment variables:

```env
VITE_API_BASE_URL=http://127.0.0.1:5000
```

Start the React development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

---

## 🔐 Default Admin Credentials

The frontend project documentation specifies the following seeded admin credentials:

| Field | Value |
|---|---|
| Email | admin@garbagedetect.ai |
| Password | Admin@123 |

**Important:** These are development credentials. Change the default password before deployment and never expose production credentials in a public repository.

Signup creates a standard user account. Only administrators can access protected dashboard pages.

---

## 🔗 Backend API Endpoints

The Flask backend provides REST API endpoints for managing garbage detection records and analytics.

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/api/detections` | Retrieve detection records |
| POST | `/api/detections` | Create a new detection |
| PUT | `/api/detections/:id/verify` | Verify a detection |
| DELETE | `/api/detections/:id` | Soft-delete a detection |
| GET | `/api/analytics` | Retrieve dashboard analytics |

### POST Detection Request

Content-Type:

```text
multipart/form-data
```

| Field | Description |
|---|---|
| image | Detection image |
| location | Detection location |
| fill_percentage | Garbage fill percentage |
| status | Detection status |
| timestamp | Detection date and time |

### Verification Status

The verification endpoint toggles the detection status:

```text
PENDING <--> VERIFIED
```

### Delete Detection

The delete endpoint performs soft deletion instead of permanently removing the record from MongoDB.

### Analytics Response

Example response:

```json
{
  "total": 100,
  "pending": 40,
  "verified": 60
}
```

*The numbers are illustrative examples, not actual project results.*

---

## 🗄️ Database Structure

MongoDB is used to store garbage detection records.

Example detection document:

```json
{
  "_id": "example_id",
  "image": "detection_image_path",
  "location": "Area_Name-1",
  "fill_percentage": 95,
  "status": "PENDING",
  "timestamp": "2026-11-26T10:30:00",
  "is_deleted": false
}
```

### Detection Status

| Status | Description |
|---|---|
| PENDING | Detection waiting for verification |
| VERIFIED | Detection verified by administrator |
| DELETED | Detection soft-deleted from active records |

*The database document is an illustrative example. Actual fields depend on the implemented MongoDB schema.*

---

## 🖥️ Frontend Pages

The React frontend provides the following pages and functionalities.

| Page | Description |
|---|---|
| Landing | Public project introduction |
| Login | User authentication |
| Signup | New user registration |
| Dashboard | Detection statistics and overview |
| History | Detection records |
| Analysis | Detection analytics and charts |
| Notifications | Garbage detection alerts |
| Verified | Verified detection records |
| Deleted | Soft-deleted detection records |
| Profile | Editable user profile and avatar |
| Settings | Application preferences |

### Frontend Highlights

- Protected admin navigation.
- Real API integration with Flask.
- Axios-based HTTP communication.
- Optimistic verification and deletion actions.
- Recharts-based analytics.
- Avatar upload.
- localStorage-based preferences.
- Loading, error, and empty states.
- Mobile-first responsive interface.

### Local Storage

The application uses localStorage to persist supported frontend preferences.

Examples include:

- Theme preference.
- Notification preference.
- Automatic refresh preference.
- Compact card preference.
- Other user interface settings.

Profile and settings operations may fall back to localStorage when backend persistence is unavailable.

---

## 📸 Screenshots

Add your actual project screenshots in the following sections.

### 🏠 Landing Page

![Landing Page](screenshots/landing-page.png)

### 🔐 Login Page

![Login Page](screenshots/login-page.png)

### 📊 Admin Dashboard

![Admin Dashboard](screenshots/dashboard.png)

### 🗂️ Detection History

![Detection History](screenshots/history.png)

### 📈 Analytics

![Analytics](screenshots/analytics.png)

### 🔔 Notifications

![Notifications](screenshots/notifications.png)

### ⚙️ Settings

![Settings](screenshots/settings.png)

---

## 🏭 Production Build

To create an optimized frontend production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

The generated frontend build is available in the `dist/` directory.

---

## 🔮 Future Enhancements

- Integration with live CCTV cameras.
- IoT-based smart garbage bins.
- Real-time garbage monitoring.
- GPS-based detection location tracking.
- Email and SMS notifications.
- Improved AI detection accuracy.
- Advanced garbage fill-level estimation.
- Automated garbage collection scheduling.
- Cloud-based deployment.
- Mobile application integration.

---

## ⚠️ Limitations

- The current detection workflow uses recorded video for testing.
- Live CCTV/IP camera integration is planned for future development.
- Detection performance depends on model training and environmental conditions.
- Profile and settings persistence may rely on localStorage when backend support is unavailable.
- Production deployment requires additional security and performance testing.

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/YourFeature
```

3. Make your changes.
4. Commit your changes.

```bash
git commit -m "Add new feature"
```

5. Push your branch.

```bash
git push origin feature/YourFeature
```

6. Open a Pull Request.

---

## 📄 License

This project is developed for educational and learning purposes.

An open-source license can be added if the project is intended for public distribution.

---

## 👨‍💻 Author

**Project Name:** AI-Powered Garbage Detection System

**Technologies:** React.js | Vite | JavaScript | Tailwind CSS | Python | Flask | YOLOv5 | MongoDB | OpenCV

---

⭐ If you find this project interesting, don't forget to give the repository a star!

**Disclaimer:** This project is developed for academic and learning purposes. It is not intended to be used as a production-ready waste management solution without further testing, security improvements, and deployment configuration.
