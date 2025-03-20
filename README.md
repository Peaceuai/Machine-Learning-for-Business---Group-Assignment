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

Download the folder System front-end code, open it and enter python -m http.server {port} in the command line of the folder to successfully start the system front-end project.
```python
helloworld
```


## Results

 The below picture is about the CNN network
 
![image16](https://github.com/user-attachments/assets/ced89a80-0b36-4ef8-80af-797c23939db1)

 The below picture is about the train line
 
 ![image13](https://github.com/user-attachments/assets/64f10423-7588-4ec1-bf60-ec9a860bfdd9)

 The below picture is about the predict result
 
 ![image15](https://github.com/user-attachments/assets/bc2a4087-d63b-47f2-ac1f-ae05b787e9c7)

## Reference

https://learn.microsoft.com/zh-cn/windows/ai/windows-ml/tutorials/pytorch-data
