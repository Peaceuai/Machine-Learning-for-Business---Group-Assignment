from flask import Flask, request, jsonify
import sqlite3
import joblib
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS to allow cross-origin requests

db_file = "predictions.db"  # Database file name


# Initialize the database
def init_db():
    conn = sqlite3.connect(db_file)
    cursor = conn.cursor()

    # Create table for storing predictions if it does not exist
    cursor.execute('''CREATE TABLE IF NOT EXISTS predictions (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        Pregnancies INTEGER,
                        Glucose INTEGER,
                        BMI REAL,
                        DiabetesPedigreeFunction REAL,
                        Age INTEGER,
                        Outcome INTEGER)''')

    # Create table for storing user credentials
    cursor.execute('''CREATE TABLE IF NOT EXISTS users (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        username TEXT UNIQUE,
                        password TEXT)''')

    # Insert default admin account if it does not already exist
    cursor.execute("INSERT OR IGNORE INTO users (username, password) VALUES ('admin', 'admin')")

    conn.commit()
    conn.close()


# Run database initialization
init_db()

# Load pre-trained machine learning model and scaler
rf = joblib.load("rf_model.pkl")  # Load Random Forest model
scaler = joblib.load("scaler.pkl")  # Load pre-trained scaler for feature normalization


# User login endpoint
@app.route("/login", methods=["POST"])
def login():
    data = request.json  # Parse JSON request data
    username = data.get("username")
    password = data.get("password")

    # Connect to the database and check if user exists
    conn = sqlite3.connect(db_file)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username = ? AND password = ?", (username, password))
    user = cursor.fetchone()
    conn.close()

    # Validate user credentials
    if user:
        return jsonify({"message": "Login successful"})
    else:
        return jsonify({"message": "Invalid credentials"}), 401  # Unauthorized


# Prediction endpoint
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json  # Parse JSON request data

    # Extract input features from request
    features = [[
        data["Pregnancies"],
        data["Glucose"],
        data["BMI"],
        data["DiabetesPedigreeFunction"],
        data["Age"]
    ]]

    # Apply feature scaling using pre-loaded scaler
    features_scaled = scaler.transform(features)

    # Make a prediction using the pre-trained model
    prediction = rf.predict(features_scaled)[0]

    # Store the prediction result in the database
    conn = sqlite3.connect(db_file)
    cursor = conn.cursor()
    cursor.execute('''INSERT INTO predictions (Pregnancies, Glucose, BMI, DiabetesPedigreeFunction, Age, Outcome)
                      VALUES (?, ?, ?, ?, ?, ?)''',
                   (data["Pregnancies"], data["Glucose"], data["BMI"], data["DiabetesPedigreeFunction"], data["Age"],
                    int(prediction)))
    conn.commit()
    conn.close()

    return jsonify({"Prediction": int(prediction)})


# Endpoint to retrieve all prediction records
@app.route("/records", methods=["GET"])
def get_records():
    conn = sqlite3.connect(db_file)  # Connect to database
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM predictions")
    records = cursor.fetchall()
    conn.close()

    # Format the retrieved records as JSON
    records_list = [
        {"id": r[0], "Pregnancies": r[1], "Glucose": r[2], "BMI": r[3], "DiabetesPedigreeFunction": r[4], "Age": r[5],
         "Outcome": r[6]} for r in records]

    return jsonify(records_list)


# Run the Flask application
if __name__ == "__main__":
    app.run()  # Start the Flask server
