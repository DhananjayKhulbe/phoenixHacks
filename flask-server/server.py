from flask import Flask, request, jsonify
import os
import subprocess
from PIL import Image
import matplotlib.pyplot as plt
from ultralytics import YOLO
import runpy


import cv2


import ultralytics


app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def run_yolo(imgPath):
    
    png_image = Image.open(imgPath)
    #plt.imshow(png_image)


    model = YOLO("yolov8n.pt") 

    results = model([png_image]) 

    for result in results:
        #boxes = result.boxes
        #masks = result.masks
        #keypoints = result.keypoints
        #probs = result.probs
        #obb = result.obb

        #print(type(result.boxes))
        #print(len(result.boxes))
        #print(type(result))
        output_directory = 'main_app/src/components/Camera'
        if not os.path.exists(output_directory):
            os.makedirs(output_directory)

        #filename = "result.png"
        #outPath = output_directory + filename
        result.save("main_app/src/components/Camera/result.png")

        
        #tempImage = Image.open("result.png")
        #plt.imshow(tempImage)

        #annotated_frame = result.plot(conf = False,
            #pil=True, line_width=4, font_size=10, probs = False)
        #cv2.imshow("Pic", annotated_frame)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file:
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)
        print("File saved at:", filepath)
        
        
        #run_yolo(filepath)
        #run_yolo()
        #run_yolo()
        run_yolo(filepath)
        return jsonify({'message': 'File uploaded and processed successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
    #run_yolo()
    
