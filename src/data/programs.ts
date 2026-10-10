export interface Program {
  id: number;
  title: string;
  language: string;
  filename: string;
  description: string;
  categories: string[];
  code: string;
}

export const programs: Program[] = [
  {
    id: 1,
    title: "Healthcare Data Preprocessing",
    language: "Python",
    filename: "program_1.py",
    description:
      "Data preprocessing on the Pima Indians Diabetes Dataset — handling missing values, normalization, and visual analysis using histograms, box plots, and scatter plots.",
    categories: ["Data Preprocessing"],
    code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

df = pd.read_csv("diabetes.csv")
cols = ['Glucose','BloodPressure','SkinThickness','Insulin','BMI']
df[cols] = df[cols].replace(0, np.nan)
for c in cols: df[c] = df[c].fillna(df[c].median())
n = df.columns[:-1]
df[n] = (df[n]-df[n].min())/(df[n].max()-df[n].min())

print(df.describe())
print(df.corr())
df.hist(figsize=(12,10)); plt.suptitle("Histograms of Features"); plt.show()
plt.figure(figsize=(10,6)); df.boxplot(rot=45); plt.title("Box Plot of Features"); plt.show()
plt.figure(figsize=(6,5)); plt.scatter(df.Glucose,df.BMI); plt.xlabel("Glucose"); plt.ylabel("BMI"); plt.title("Glucose vs BMI"); plt.show()
count = df.Outcome.value_counts()
plt.figure(figsize=(6,5)); plt.bar(['Non-Diabetic','Diabetic'],count); plt.title("Diabetes Distribution"); plt.ylabel("Number of Patients"); plt.show()`,
  },
  {
    id: 2,
    title: "Linear Regression (Auto MPG)",
    language: "Python",
    filename: "program_2.py",
    description:
      "Linear Regression model to predict automobile fuel efficiency (MPG) using the Auto MPG dataset, evaluated with MSE and R² score.",
    categories: ["Regression", "Machine Learning Fundamentals"],
    code: `import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

cols = ['mpg','cylinders','displacement','horsepower','weight','acceleration','model_year','origin','car_name']
df = pd.read_csv("auto-mpg.data", names=cols, na_values='?', comment='\\t', sep='\\s+', skipinitialspace=True)
print(df.head())
df['horsepower'] = df['horsepower'].fillna(df['horsepower'].mean())
df = df.drop('car_name', axis=1)
X, y = df.drop('mpg',axis=1), df['mpg']
X_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.2,random_state=42)
model = LinearRegression().fit(X_train,y_train)
y_pred = model.predict(X_test)
print("Mean Squared Error (MSE):", mean_squared_error(y_test,y_pred))
print("R2 Score:", r2_score(y_test,y_pred))
print(pd.DataFrame({"Feature":X.columns,"Coefficient":model.coef_}))
plt.figure(figsize=(8,6)); plt.scatter(y_test,y_pred); plt.xlabel("Actual MPG"); plt.ylabel("Predicted MPG"); plt.title("Actual vs Predicted MPG"); plt.plot([y.min(),y.max()],[y.min(),y.max()],'r--'); plt.show()`,
  },
  {
    id: 3,
    title: "Logistic Regression (Breast Cancer)",
    language: "Python",
    filename: "program_3.py",
    description:
      "Logistic Regression classifier for the Breast Cancer Wisconsin dataset — predicts malignant vs benign tumors, evaluated with accuracy and confusion matrix.",
    categories: ["Classification", "Machine Learning Fundamentals"],
    code: `import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, ConfusionMatrixDisplay

df = pd.read_csv("data.csv")
print(df.columns)
with open("breast cancer names.csv") as f: names = f.read()
print(names)
print(df.head())
for c in ['id','Unnamed: 32']:
    if c in df.columns: df.drop(c,axis=1,inplace=True)
df['diagnosis'] = LabelEncoder().fit_transform(df['diagnosis'])
X, y = df.drop('diagnosis',axis=1), df['diagnosis']
X = StandardScaler().fit_transform(X)
X_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.2,random_state=42)
model = LogisticRegression(random_state=42).fit(X_train,y_train)
y_pred = model.predict(X_test)
accuracy, cm = accuracy_score(y_test,y_pred), confusion_matrix(y_test,y_pred)
print("Accuracy Score:",accuracy)
print("\\nConfusion Matrix:")
print(cm)
ConfusionMatrixDisplay(confusion_matrix=cm,display_labels=["Benign","Malignant"]).plot(cmap="Blues")
plt.title("Confusion Matrix"); plt.show()`,
  },
  {
    id: 4,
    title: "KNN (Glass Identification)",
    language: "Python",
    filename: "program_4.py",
    description:
      "K-Nearest Neighbors classifier on the Glass Identification dataset — tests K values from 1 to 15 and selects the best K for classification.",
    categories: ["Classification", "Machine Learning Fundamentals"],
    code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

data = pd.read_csv("glass.csv")
print(data.head())
X, y = data.iloc[:,:-1], data.iloc[:,-1]
X_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.2,random_state=42,stratify=y)
scaler = StandardScaler()
X_train,X_test = scaler.fit_transform(X_train),scaler.transform(X_test)
k_values, accuracy_list = range(1,16), []
for k in k_values:
    knn = KNeighborsClassifier(n_neighbors=k).fit(X_train,y_train)
    acc = accuracy_score(y_test,knn.predict(X_test))
    accuracy_list.append(acc)
    print(f"K = {k}, Accuracy = {acc:.4f}")
best_k = k_values[np.argmax(accuracy_list)]
print("\\nBest K:",best_k)
model = KNeighborsClassifier(n_neighbors=best_k).fit(X_train,y_train)
y_pred = model.predict(X_test)
print("\\nAccuracy:",accuracy_score(y_test,y_pred))
print("\\nConfusion Matrix")
print(confusion_matrix(y_test,y_pred))
print("\\nClassification Report")
print(classification_report(y_test,y_pred))
plt.figure(figsize=(8,5)); plt.plot(k_values,accuracy_list,marker='o'); plt.xlabel("K Value"); plt.ylabel("Accuracy"); plt.title("K Value vs Accuracy"); plt.grid(True); plt.show()`,
  },
  {
    id: 5,
    title: "Decision Tree (Bank Marketing)",
    language: "Python",
    filename: "program_5.py",
    description:
      "Decision Tree classifier on the Bank Marketing dataset — predicts term deposit subscription, evaluated with accuracy, precision, and a tree visualization.",
    categories: ["Classification", "Machine Learning Fundamentals"],
    code: `import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.metrics import accuracy_score, precision_score, confusion_matrix, classification_report

data = pd.read_csv("bank.csv",sep=';')
print(data.head())
enc = LabelEncoder()
for c in data.columns:
    if data[c].dtype == 'object': data[c] = enc.fit_transform(data[c])
X, y = data.drop("y",axis=1), data["y"]
X_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.2,random_state=42)
model = DecisionTreeClassifier(criterion='gini',random_state=42).fit(X_train,y_train)
y_pred = model.predict(X_test)
print("Accuracy :",accuracy_score(y_test,y_pred))
print("Precision:",precision_score(y_test,y_pred))
print("\\nConfusion Matrix")
print(confusion_matrix(y_test,y_pred))
print("\\nClassification Report")
print(classification_report(y_test,y_pred))
plt.figure(figsize=(18,10))
plot_tree(model,filled=True,feature_names=X.columns,class_names=["No","Yes"],max_depth=3,fontsize=8)
plt.title("Decision Tree"); plt.show()`,
  },
  {
    id: 6,
    title: "Perceptron (AND, OR and Breast Cancer)",
    language: "Python",
    filename: "program_6.py",
    description:
      "Perceptron model demonstrating AND/OR logic gate learning and binary classification on the Breast Cancer Wisconsin dataset with confusion matrix visualization.",
    categories: ["Neural Networks", "Classification"],
    code: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Perceptron
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

X_AND = np.array([[0,0],[0,1],[1,0],[1,1]])
Y_AND = np.array([0,0,0,1])
and_model = Perceptron(max_iter=1000,eta0=0.1,random_state=42).fit(X_AND,Y_AND)
and_output = and_model.predict(X_AND)
print("AND FUNCTION"); print("Input:"); print(X_AND); print("Actual Output:",Y_AND); print("Predicted Output:",and_output)

X_OR = np.array([[0,0],[0,1],[1,0],[1,1]])
Y_OR = np.array([0,1,1,1])
or_model = Perceptron(max_iter=1000,eta0=0.1,random_state=42).fit(X_OR,Y_OR)
or_output = or_model.predict(X_OR)
print("\\nOR FUNCTION"); print("Input:"); print(X_OR); print("Actual Output:",Y_OR); print("Predicted Output:",or_output)

data = load_breast_cancer()
X, y = data.data, data.target
print("\\nBREAST CANCER DATASET"); print("---------------------")
print("Number of samples:",X.shape[0]); print("Number of features:",X.shape[1])
X_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.20,random_state=42,stratify=y)
scaler = StandardScaler()
X_train,X_test = scaler.fit_transform(X_train),scaler.transform(X_test)
model = Perceptron(max_iter=1000,eta0=0.01,random_state=42).fit(X_train,y_train)
y_pred = model.predict(X_test)
print("\\nPERCEPTRON RESULTS"); print("------------------"); print("Accuracy:",accuracy_score(y_test,y_pred))
cm = confusion_matrix(y_test,y_pred)
print("\\nConfusion Matrix:"); print(cm)
print("\\nClassification Report:")
print(classification_report(y_test,y_pred,target_names=data.target_names))
plt.figure(figsize=(6,5)); plt.imshow(cm); plt.title("Perceptron Confusion Matrix"); plt.xlabel("Predicted Class"); plt.ylabel("Actual Class")
plt.xticks([0,1],data.target_names); plt.yticks([0,1],data.target_names)
for i in range(2):
    for j in range(2): plt.text(j,i,cm[i,j],ha="center",va="center")
plt.colorbar(); plt.show()`,
  },
  {
    id: 7,
    title: "Activation Functions",
    language: "Python",
    filename: "program_7.py",
    description:
      "Visualization of four neural network activation functions — Step, Sigmoid, Tanh, and ReLU — plotted as subplots for comparison.",
    categories: ["Neural Networks"],
    code: `import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-10,10,400)
def step(x): return np.where(x>=0,1,0)
def sigmoid(x): return 1/(1+np.exp(-x))
def tanh(x): return np.tanh(x)
def relu(x): return np.maximum(0,x)

plt.figure(figsize=(10,8))
for i,(f,title,color) in enumerate([(step,"Step Function","blue"),(sigmoid,"Sigmoid Function","green"),(tanh,"Tanh Function","red"),(relu,"ReLU Function","purple")],1):
    plt.subplot(2,2,i); plt.plot(x,f(x),color=color); plt.title(title); plt.xlabel("x"); plt.ylabel("f(x)"); plt.grid(True)
plt.tight_layout(); plt.show()`,
  },
  {
    id: 8,
    title: "Single-Layer Perceptron (Iris)",
    language: "Python",
    filename: "program_8.py",
    description:
      "Single-layer Perceptron classifying Iris-setosa vs Iris-versicolor from the Iris dataset using sepal features, with accuracy, confusion matrix, and classification report.",
    categories: ["Neural Networks", "Classification"],
    code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Perceptron
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

data = pd.read_csv("Iris.csv")
data = data[data["Species"].isin(["Iris-setosa","Iris-versicolor"])]
X = data[["SepalLengthCm","SepalWidthCm"]]
y = data["Species"].map({"Iris-setosa":0,"Iris-versicolor":1})
X_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.2,random_state=42)
scaler = StandardScaler()
X_train,X_test = scaler.fit_transform(X_train),scaler.transform(X_test)
model = Perceptron(max_iter=1000,eta0=0.1,random_state=42).fit(X_train,y_train)
y_pred = model.predict(X_test)
print("Accuracy:",accuracy_score(y_test,y_pred))
print("\\nConfusion Matrix:")
print(confusion_matrix(y_test,y_pred))
print("\\nClassification Report:")
print(classification_report(y_test,y_pred))`,
  },
];

export const categories = [
  "All Programs",
  "Data Preprocessing",
  "Regression",
  "Classification",
  "Machine Learning Fundamentals",
  "Neural Networks",
];

export const ACCESS_CODE = "456789";
