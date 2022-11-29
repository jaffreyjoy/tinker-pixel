import cv2
import numpy as np
import matplotlib.pyplot as plt

path = './input01/'
img = plt.imread("abhay.jpeg")
plt.imshow(img)
plt.show()


def specs(img):
    img1 = img.copy()
    ###---Loading Cascades---
    #cascade_path = '../input/images/haarcascade_eye.xml'
    cascade_path = './frontalEyes35x16.xml'
    eye_cascade = cv2.CascadeClassifier(cascade_path)

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # face_cascade = cv2.CascadeClassifier('../input/harcasscade-files/haarcascades/haarcascade_frontalface_default.xml')
    # faces = face_cascade.detectMultiScale(gray, 1.3, 5)#(x,y,w,h)
    # sub_face = gray[faces[0][1]:faces[0][1]+faces[0][3], faces[0][0]:faces[0][0]+faces[0][2]]
    eye = eye_cascade.detectMultiScale(gray)
    print(eye)

    ###---obtained eye co-ordinates---
    eye_x, eye_y, eye_w, eye_h = eye[0]
    eye_x, eye_y, eye_w, eye_h
    #------------------------------------------------------------
    img = cv2.rectangle(img, (eye_x, eye_y), (eye_x + eye_w, eye_y + eye_h), (0,255,255), 2)
    plt.imshow(img)
    plt.show()
    print(eye_w,eye_h)

    #-------------------------------------------------------------
    ###---Reading filter iamge i.e. of glass--
    glasses_filter =plt.imread("filter.png")

    plt.imshow(glasses_filter)
    plt.show
    print(glasses_filter.shape)

    #-------------------------------------------------------------
    ###---new updated cordinates of filter based on image---
    sx=eye_w/glasses_filter.shape[1]
    sy=eye_h/glasses_filter.shape[0]
    w=int(1.5*eye_w)
    h=int(2*eye_h)
    glasses_filter_updated = cv2.resize(glasses_filter,(w,h))
    #glasses_filter_updated = glasses_filter

    plt.imshow(glasses_filter_updated)
    plt.show
    glasses_filter_updated.shape

    #------------------------------------------------------------------
    index_0 = glasses_filter_updated.shape[0]
    index_1 = glasses_filter_updated.shape[1]
    adjust_y=int((eye_y+(eye_h/2))-(index_0/2))
    adjust_x=int((eye_x+(eye_w/2))-(index_1/2))

    for i in range(index_0):
        for j in range(index_1):
            if (glasses_filter_updated[i,j,3] > 0):
                img1[i+adjust_y, j+adjust_x, :] = glasses_filter_updated[i,j,:-1]
                
    plt.imshow(img1)
    plt.show()

def get_edges(img, line_size, blur_value):
# def edge_mask(img, line_size, blur_value):
  gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
  gray_blur = cv2.medianBlur(gray, blur_value)
  edges = cv2.adaptiveThreshold(gray_blur, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, line_size, blur_value)
  return edges

def multieffects(img,):
    img1 = img.copy()
    def edge_mask(img, line_size, blur_value):
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        gray_blur = cv2.medianBlur(gray, blur_value)
        edges = cv2.adaptiveThreshold(gray_blur, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, line_size, blur_value)
        return edges
    line_size = 7
    blur_value = 7
    edges = edge_mask(img, line_size, blur_value)
    
    filename = 'edges.jpg'
    # Using cv2.imwrite() method
    # Saving the image
    cv2.imwrite(filename, edges)
    pass

def pencilpro(img):
    img1 = img.copy()
    line_size = 7
    blur_value = 1
    gray = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
    gray_blur = cv2.medianBlur(gray, blur_value)
    edges = cv2.adaptiveThreshold(gray_blur, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, line_size, blur_value)
    cv2.imwrite("pencilpro.jpg", edges)

def pencillight(img):
    img1 = img.copy()
    line_size = 7
    blur_value = 7
    gray = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
    gray_blur = cv2.medianBlur(gray, blur_value)
    edges = cv2.adaptiveThreshold(gray_blur, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, line_size, blur_value)
    cv2.imwrite("pencillight.jpg", edges)

# def groupcolor(img):
#     img1 = img.copy()
#     #colour quantization
#     #k value determines the number of colours in the image
#     total_color = 8
#     k=total_color
#     # Transform the image
#     data = np.float32(img1).reshape((-1, 3))
#     # Determine criteria
#     criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 20, 0.001)
#     # Implementing K-Means
#     ret, label, center = cv2.kmeans(data, k, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)
#     center = np.uint8(center)
#     result = center[label.flatten()]
#     result = result.reshape(img1.shape)
#     filename = 'colour.jpg'
#     # Using cv2.imwrite() method
#     # Saving the image
#     cv2.imwrite(filename, result)
#     # blurred = cv2.bilateralFilter(result, d=10, sigmaColor=250,sigmaSpace=250)

def groupcolor(img):
    img1 = img.copy()
    #colour quantization
    #k value determines the number of colours in the image
    total_color = 15
    k=total_color
    # Transform the image
    data = np.float32(img1).reshape((-1, 3))
    # Determine criteria
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 20, 0.001)
    # Implementing K-Means
    ret, label, center = cv2.kmeans(data, k, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)
    center = np.uint8(center)
    result = center[label.flatten()]
    result = result.reshape(img1.shape)
    filename = 'colour.jpg'
    # Using cv2.imwrite() method
    # Saving the image
    cv2.imwrite(filename, result)
    blurred = cv2.bilateralFilter(result, d=10, sigmaColor=250,sigmaSpace=250)
    #saving the image
    filename = 'blurred.jpg'
    # Using cv2.imwrite() method
    # Saving the image
    cv2.imwrite(filename, blurred)
    #blurred and edges
    edges=get_edges(img,7,7)
    cartoon = cv2.bitwise_and(blurred, blurred, mask=edges)
    filename = 'cartoon.jpg'
    # Using cv2.imwrite() method
    # Saving the image
    cv2.imwrite(filename, cartoon)

###########################################################################################################
#Colour Quantization
def ColourQuantization(image, K=9):
    Z = image.reshape((-1, 3)) 
    Z = np.float32(Z) 
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 100, 0.001)
    compactness, label, center = cv2.kmeans(Z, K, None, criteria, 1, cv2.KMEANS_RANDOM_CENTERS)
    center = np.uint8(center)
    res = center[label.flatten()]
    res2 = res.reshape((image.shape))
    return res2

#to get countours
def Countours(image):
    contoured_image = image
    gray = cv2.cvtColor(contoured_image, cv2.COLOR_BGR2GRAY) 
    edged = cv2.Canny(gray, 200, 200)
    contours, hierarchy = cv2.findContours(edged, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)[-2:]
    cv2.drawContours(contoured_image, contours, contourIdx=-1, color=6, thickness=1)
    return contoured_image

def cartoon2(image):
    # image = cv2.imread("person1.jpeg")
    coloured = ColourQuantization(image)
    contoured = Countours(coloured)
    final_image = contoured

    filename = 'cartoon_final.jpg'
    # Using cv2.imwrite() method
    # Saving the image
    cv2.imwrite(filename, final_image)


# cartoon2(img)
# exit()
groupcolor(img)
exit()
specs(img)
pencilpro(img)