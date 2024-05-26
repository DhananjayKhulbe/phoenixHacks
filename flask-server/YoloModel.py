from PIL import Image

from matplotlib import pyplot as plt
import ultralytics


imgPath = 'flask-server/uploads/captured_image.png'
png_image = Image.open(imgPath)
plt.imshow(png_image)

from ultralytics import YOLO
import cv2
model = YOLO("yolov8n.pt") 

results = model([png_image]) 

for result in results:
    #boxes = result.boxes
    #masks = result.masks
    #keypoints = result.keypoints
    #probs = result.probs
    #obb = result.obb
    print(type(result.boxes))
    print(len(result.boxes))
    print(type(result))
    output_directory = './main_app/src/components/Camera/'
    filename = "result.png"
    outPath = output_directory + filename
    result.save(outPath)
    #tempImage = Image.open("result.png")
    #plt.imshow(tempImage)

    #annotated_frame = result.plot(conf = False,
        #pil=True, line_width=4, font_size=10, probs = False)
    #cv2.imshow("Pic", annotated_frame)