"""This code is a simple Flask application that provides user registration, login, and progress tracking functionality"""
# It uses SQLite as the database to store user information and progress data.
# It also includes CORS support to allow cross-origin requests.
# It defines models for user registration and progress tracking, and provides routes for user signup, login, saving progress, and fetching progress.
# It uses Flask-SQLAlchemy for database interactions and Flask-CORS for handling CORS.
# Import necessary libraries
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

# --- Database Configuration ---
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
""" This code sets up the Flask application and configures the database URI to use SQLite"""


# --- Models ---

# this code defines model for user registration authentication
class User(db.Model):
    """this code defines model for user registration authentication"""
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    """this code defines username field"""
    password = db.Column(db.String(120), nullable=False)



# this code  defines model for user progres
class UserProgress(db.Model):
    """this code defines model for user progress"""
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    language = db.Column(db.String(50), nullable=False)
    lesson = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(20), nullable=False)

# --- Create Tables Once ---
with app.app_context():
    db.create_all()



# --- Routes ---

# this code defines route for user registration and authentication
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "Missing username or password"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"message": "User already exists"}), 400

    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201


# this code defines route for user login authentication
@app.route("/login", methods=["POST"])
def login():
    """this code defines route for user login authentication"""
    data = request.json
    username = data.get("username")
    password = data.get("password")

# this code checks if username and password are provided
    if not username or not password:
        return jsonify({"message": "Missing username or password"}), 400

    user = User.query.filter_by(username=username, password=password).first()
    if not user:
        return jsonify({"message": "Invalid credentials"}), 401

    return jsonify({"message": "Login successful", "user": username}), 200


# this line of  code defines route for user progress saving and fetching

@app.route("/progress", methods=["POST"])
def save_progress():
    data = request.json
    print("📥 Incoming progress data:", data)

    #this code checks if data is provided in the request
    username = data.get("username")  #this code checks if username is provided
    language = data.get("language")  #this code gets the language from the request
    lesson = data.get("lesson")  #this code gets the lesson from the request
    status = data.get("status") #this code gets the status from the request

    if not all([username, language, lesson, status]):  #this code checks if all fields are provided
        return jsonify({"message": "Missing fields"}), 400   #this code returns error if any field is missing

    # Check if progress exists for that lesson
    existing = UserProgress.query.filter_by(
        username=username,
        language=language,
        lesson=lesson
    ).first()

    if existing:
        existing.status = status #this code updates the status if progress already exists
    else:
        new_progress = UserProgress(
            username=username,
            language=language,
            lesson=lesson,
            status=status
        )
        db.session.add(new_progress) #this code adds new progress to the database

    db.session.commit() #this code commits the changes to the database
    return jsonify({"message": "Progress saved successfully"}), 200


# this code defines route for fetching user progress
@app.route("/progress/<username>", methods=["GET"])
def get_progress(username):  #it fetches user progress based on username
    user_progress = UserProgress.query.filter_by(username=username).all() #this code gets all progress records for the user
    result = {}
    for record in user_progress:
        result.setdefault(record.language, {})[record.lesson] = record.status  #this code organizes the progress records by language and lesson

    return jsonify(result), 200



@app.route('/quiz-score', methods=['POST'])
def save_quiz_score():
    data = request.json
    username = data.get("username")
    language = data.get("language")
    score = data.get("score")

    # Example structure: save to a dictionary or database
    # Here we simulate with a file or in-memory store
    if username and language:
        # Simulate saving to database
        user_scores = db.get(username, {}).get("quiz_scores", {})
        user_scores[language] = score
        db[username]["quiz_scores"] = user_scores
        return jsonify({"message": "Score saved"}), 200

    return jsonify({"error": "Missing data"}), 400
# --- Start Server ---
if __name__ == "__main__":
    app.run(debug=True)
