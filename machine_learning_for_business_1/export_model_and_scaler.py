import pandas as pd
import joblib  # Used for saving and loading models
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, roc_auc_score

# 1. Load dataset
df = pd.read_csv("output.csv")  # Load data from CSV file

# 2. Data Preprocessing
X = df.drop(columns=["Outcome"])  # Extract features
y = df["Outcome"]  # Extract target variable

# Standardize feature values to have zero mean and unit variance
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# 3. Split dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42, stratify=y
)

# 4. Train Random Forest model
rf = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
rf.fit(X_train, y_train)

# 5. Model Evaluation
def evaluate_model(name, y_true, y_pred):
    """Evaluate the model performance using accuracy, ROC AUC, and classification report."""
    print(f"{name} Model Performance:")
    print(f"Accuracy: {accuracy_score(y_true, y_pred):.4f}")
    print(f"ROC AUC: {roc_auc_score(y_true, y_pred):.4f}")
    print("Classification Report:")
    print(classification_report(y_true, y_pred))
    print("-" * 50)

# Make predictions using the trained Random Forest model
rf_preds = rf.predict(X_test)
evaluate_model("Random Forest", y_test, rf_preds)

# 6. Save trained model and scaler
joblib.dump(rf, "rf_model.pkl")  # Save Random Forest model
joblib.dump(scaler, "scaler.pkl")  # Save feature scaler
print("Model and scaler have been saved!")
