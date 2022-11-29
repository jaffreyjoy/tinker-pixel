from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
import filters

import base64
import io
import cv2
from imageio import imread
import matplotlib.pyplot as plt

app = FastAPI()

origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/upload/{filter_name}")
async def get_file_image(filter_name: str, request: Request):
    print("*********************************")
    rjson = await request.json()

    # Decoding the img sent as base64 in the request body 
    img = imread(io.BytesIO(base64.b64decode(rjson["image"].encode("ascii"))))

    #Which filter to apply    
    if(filter_name=="spec"):
        print("type of image from decoding = ", type(img))
        # f_img=filters.cartoon2(img)
        f_img=filters.specs(img)
    elif(filter_name=="oilpaint"):
        f_img=filters.cartoon2(img)
    elif(filter_name=="pencilsketch"):
        f_img=filters.pencillight(img)
    elif(filter_name=="expertspencil"):
        f_img=filters.pencilpro(img)
    elif(filter_name=="cartoon"):
        f_img=filters.groupcolor(img,3)
    elif(filter_name=="blurredbeauty"):
        f_img=filters.groupcolor(img,1)
    elif(filter_name=="colorsoflife"):
        f_img=filters.groupcolor(img,2)
    elif(filter_name=="thanoseffect"):
        f_img=filters.shift(img)
    elif(filter_name=="lostintheworld"):
        f_img=filters.lostintheworlds(img)
    elif(filter_name=="sketchthescene"):
        f_img=filters.multieffects(img)
    

    '''Commented code below'''
    #print(type(f_img)) 
    #  f_img_base64str = base64.b64encode(cv2.imencode(".jpg",f_img)[1]).decode()#command to encode back the image
    # imgfile = cv2.imdecode(f_img,cv2.IMREAD_COLOR)


    """ENCODING THE IMAGE"""
    f_img_base64str = base64.b64encode(cv2.imencode(".jpg", f_img)[1]).decode()
    # imgdata = base64.b64decode(str(img_base64str).encode("ascii"))
    
    """ Test if the base 64 string is encoded correctly """
    # img_decoded = imread(io.BytesIO(base64.b64decode(f_img_base64str.encode("ascii"))))
    # # print(imgdata, type(imgdata))
    # # img2 = imread(io.BytesIO((base64.b64decode(str(img_base64str).encode("ascii")))))
    # plt.imshow(img_decoded)
    # plt.show()


    response={
            'msg': 'success', 
            
            
            'img': f_img_base64str
        }
	
    return response


# Test commit
