# Machine-Learning-for-Business---Group-Assignment
# README
We trained 7 models based on the diabetes dataset, namely Logistic Regression, XGBoost, MLP, XGBoost + optimizer, and random forest, as well as two integrated models, voting classifier and stacking model. Through evaluation, we determined the model with the highest accuracy and combined it with the medical system we developed to provide medical staff with simple diabetes detection functions.

## Requirements

- Colab
- Python3.11

## Dataset preprocessing

Download the preprocessing.ipynb file and the diabetes.csv file, open preprocessing.ipynb with colab, and import the dataset file into colab to perform data preprocessing.
![image](https://github.com/user-attachments/assets/fb6757ce-cd0f-45bb-8191-4d1ba46637fd)

## Model Training

Download the training.ipynb file and the output.csv file in the System backend code folder, open the training.ipynb file with colab, and import the dataset file into colab, then you can start model training.
![image](https://github.com/user-attachments/assets/c3e57b44-a69e-41bc-80ad-26d54e4a2c17)

## Model Evaluation

Download the evaluation.ipynb file and the output.csv file in the System backend code folder, open the evaluation.ipynb file with colab, and import the dataset file into colab to start model evaluation.
![image](https://github.com/user-attachments/assets/1c23af63-03f5-4ebd-93a7-5eaa43c52d86)

## System front-end startup

Download the folder System front-end code, open it and enter  
```
python -m http.server {port}
```

## System backend startup

Download the folder System backend code, install all dependencies, and run the export_model_and_scaler.py file to generate the model, and then start the flask_app.py file to start the backend service.

## Results

The following figure shows the performance of each model
 
![image](https://github.com/user-attachments/assets/0cabc6b3-e8bc-42f5-b2fe-2c30f1537c19)

![image](https://github.com/user-attachments/assets/1597ed62-7852-4b4f-8ed1-0ed5d0b95eba)

The following figure shows the system we developed

![image](https://github.com/user-attachments/assets/6dfcf064-ce15-474c-b79f-68d6d5df62ed)

![image](https://github.com/user-attachments/assets/e1c994f0-f40c-40c2-b998-c9914cc83d7d)

![image](https://github.com/user-attachments/assets/47e291aa-18cc-458f-82dd-c6d557fe4cfa)

## Reference

https://www.kaggle.com/datasets/uciml/pima-indians-diabetes-database?resource=download
