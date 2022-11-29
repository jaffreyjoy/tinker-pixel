import cv2
import numpy as np
import matplotlib.pyplot as plt



# '''test files'''
# img = plt.imread("me_and_advait.jpeg",cv2.IMREAD_UNCHANGED)
# plt.imshow(img)
# plt.show()



def specs(img):
    
    #Copy Image
    img1 = img.copy()
    try:
        #CasCade Paths
        eye_cascade_path = './resources/frontalEyes35x16.xml'
        face_cascade_path= './haarcascade-frontalface-default.xml'
        path_of_glasses_filter="./resources/filter.png"
        #Gray Image
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        #Making Classifiers
        # face_cascade = cv2.CascadeClassifier(face_cascade_path)
        eye_cascade = cv2.CascadeClassifier(eye_cascade_path)
        # faces = face_cascade.detectMultiScale(gray, 1.3, 5)#(x,y,w,h)
        eyes = eye_cascade.detectMultiScale(gray)
        
        for i in range(len(eyes)):
            #Obtain Eye Coordinate
            eye_x, eye_y, eye_w, eye_h = eyes[i]
            eye_x, eye_y, eye_w, eye_h
            #-Create a rectangle around it
            # img = cv2.rectangle(img, (eye_x, eye_y), (eye_x + eye_w, eye_y + eye_h), (0,255,255), 2)
            # plt.imshow(img)
            # plt.show()
            # print(eye_w,eye_h)
            
            #Glasses Filter
            glasses_filter =plt.imread(path_of_glasses_filter)
            sx=eye_w/glasses_filter.shape[1]
            sy=eye_h/glasses_filter.shape[0]
            w=int(1.5*eye_w)
            h=int(2*eye_h)
            glasses_filter_updated = cv2.resize(glasses_filter,(w,h))
            index_0 = glasses_filter_updated.shape[0]
            index_1 = glasses_filter_updated.shape[1]
            adjust_y=int((eye_y+(eye_h/2))-(index_0/2))
            adjust_x=int((eye_x+(eye_w/2))-(index_1/2))
            for i in range(index_0):
                for j in range(index_1):
                    if (glasses_filter_updated[i,j,3] > 0):
                        img1[i+adjust_y, j+adjust_x, :] = glasses_filter_updated[i,j,:-1]
                        
            # plt.imshow(img1)
            # plt.show()
        img1=cv2.cvtColor(img1, cv2.COLOR_RGB2BGR)
        name="specs.jpg"
        cv2.imwrite(name, img1)       
        return img1
    except Exception as e:
        print(e)
        print("Some Error Occured in specs")
        return img


def get_edges(img, line_size, blur_value):
    img1 = img.copy()
    try:
        gray = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
        gray_blur = cv2.medianBlur(gray, blur_value)
        edges = cv2.adaptiveThreshold(gray_blur, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, line_size, blur_value)
        return edges
    except:
        print("Some Error Occured in get_edges")
        return img

def multieffects(img):
    img1 = img.copy()
    try:
        def masking_edge(img, line_size_val, blur_value_val):
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            gray_blur = cv2.medianBlur(gray, blur_value)
            edges = cv2.adaptiveThreshold(gray_blur, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, line_size_val, blur_value_val)
            return edges
        line_size = 7
        blur_value = 7
        edges = masking_edge(img1, line_size, blur_value)
        filename = 'edges.jpg'
        # Using cv2.imwrite() method
        # Saving the image
        cv2.imwrite(filename, edges)
        return edges
        pass
    except:
        print("Some Error Occured in Multieeffects")
        return img


def pencilpro(img):
    img1 = img.copy()
    try:
        line_size = 7
        blur_value = 1
        gray = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
        gray_blur = cv2.medianBlur(gray, blur_value)
        edges = cv2.adaptiveThreshold(gray_blur, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, line_size, blur_value)
        cv2.imwrite("pencilpro.jpg", edges)
        return edges
    except:
        print("Some Error Occured in pencilpro")
        return img1

def pencillight(img):

    img1 = img.copy()
    try:
        line_size = 7
        blur_value = 7
        gray = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
        gray_blur = cv2.medianBlur(gray, blur_value)
        edges = cv2.adaptiveThreshold(gray_blur, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, line_size, blur_value)
        cv2.imwrite("pencillight.jpg", edges)
        return edges
    except:
        print("Some Error Occured in pencilpro")
        return img1


def groupcolor(img,i):
    img1 = img.copy()
    #colour quantization
    #k value determines the number of colours in the image
    total_color = 15
    k=total_color
    # Transform the image
    data = np.float32(img1).reshape((-1, 3))
    # Determine criteria
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 20, 0.001)
    # Implementing K-Meansalgorithm and seperating colors
    ret, label, center = cv2.kmeans(data, k, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)
    center = np.uint8(center)
    result = center[label.flatten()]
    result = result.reshape(img1.shape)
    
    if(i==1):
        result=cv2.cvtColor(result, cv2.COLOR_RGB2BGR)
        filename = 'colour.jpg'
        cv2.imwrite(filename, result)
        return result
    filename = 'colour.jpg'
    cv2.imwrite(filename, result)


    blurred = cv2.bilateralFilter(result, d=10, sigmaColor=250,sigmaSpace=250)
    if(i==2):
        blurred=cv2.cvtColor(result, cv2.COLOR_RGB2BGR)
        filename = 'blurred.jpg'
        cv2.imwrite(filename, result)
        return blurred
    #saving the image
    filename = 'blurred.jpg'
    cv2.imwrite(filename, blurred)
    
    
    #blurred and edges
    edges=get_edges(img,7,7)
    cartoon = cv2.bitwise_and(blurred, blurred, mask=edges)
    cartoon=cv2.cvtColor(cartoon, cv2.COLOR_RGB2BGR)
    filename = 'cartoon.jpg'
    cartoon=cv2.imwrite(filename, cartoon)
    return cartoon


def ColourQuantization(image, K=9):
    img1 = image.copy()
    try:
        Z = image.reshape((-1, 3)) 
        Z = np.float32(Z) 
        criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 100, 0.001)
        compactness, label, center = cv2.kmeans(Z, K, None, criteria, 1, cv2.KMEANS_RANDOM_CENTERS)
        center = np.uint8(center)
        res = center[label.flatten()]
        res2 = res.reshape((image.shape))
        # cv2.cvtColor(res2, cv2.COLOR_RGB2BGR)
        return res2
    except:
        print("Some Error Occured in ColourQuantization")
        return img1


#to get countours
def Countours(image):
    img1 = image.copy()
    try:
        contoured_image = image
        gray = cv2.cvtColor(contoured_image, cv2.COLOR_BGR2GRAY) 
        edged = cv2.Canny(gray, 200, 200)
        contours, hierarchy = cv2.findContours(edged, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)[-2:]
        cv2.drawContours(contoured_image, contours, contourIdx=-1, color=6, thickness=1)
        # cv2.cvtColor(contoured_image, cv2.COLOR_RGB2BGR)
        return contoured_image
    except:
        print("Some Error Occured in Contours")
        return img1
    

def cartoon2(image):
    # image = cv2.imread("person1.jpeg")
    img1 = image.copy()
    try:
        coloured = ColourQuantization(image)
        contoured = Countours(coloured)
        #Restored Color
        final_image = cv2.cvtColor(contoured, cv2.COLOR_RGB2BGR)
        #SavingTheFinalImage
        filename = 'cartoon_final.jpg'
        # Using cv2.imwrite() method
        # Saving the image      
        cv2.imwrite(filename, final_image)      
        return contoured
    except:
        print("Some Error Occured in Contours")
        return img1


def shift(image):
    img5 = image.copy()
    try:
        change=1
        count=0
        for i in range(int(image.shape[0])):
            count+=1;
            if(change==1):
                
                for j in range(0,image.shape[1]-100):
                    img5[i][j+random.randrange(1, 100)]=img[i][j]
                if(count>1):
                    change=-1
                    count=0

            else:
                for j in range(image.shape[1]-100,0,-1):
                    img5[i][j-random.randrange(1, 100)]=img[i][j]
                if(count>1):
                    change=1
                    count=0

        result=cv2.cvtColor(img5, cv2.COLOR_RGB2BGR)
        cv2.imwrite('Thanos_effect.jpg',result )  
        print(img5.shape)
        return img5
    except:
        return image

def lostintheworlds(image):
    img5 = image.copy()
    try:
        change=1
        count=0
        for i in range(int(image.shape[0])):
            count+=1;
            if(change==1):
                
                for j in range(0,image.shape[1]-100):
                    img5[i][j+100]=img[i][j]
                if(count>1):
                    change=-1
                    count=0

            else:
                for j in range(image.shape[1]-100,0,-1):
                    img5[i][j-100]=img[i][j]
                if(count>1):
                    change=1
                    count=0

        result=cv2.cvtColor(img5, cv2.COLOR_RGB2BGR)
        cv2.imwrite('lostintheworld.jpg', result)  
        print(img5.shape)
        
    except:
        return  image
# cartoon2(img)
# exit()
# groupcolor(img)
# exit()
# pencilpro(img)
# specs(img)
# get_edges(img)
# pencilpro(img)

