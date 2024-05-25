from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np

app = Flask(__name__)
model = load_model('path/to/your/model.h5')

def preprocess_image(img):
    img = img.resize((224, 224))  # Resize to the input shape expected by your model
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img = img / 255.0  # Normalize to [0, 1]
    return img

@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['file']
    img = image.load_img(file, target_size=(224, 224))
    img = preprocess_image(img)
    predictions = model.predict(img)
    # Assuming your model returns a list of class probabilities
    result = {'predictions': predictions.tolist()}
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
