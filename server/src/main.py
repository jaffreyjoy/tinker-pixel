from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request

import base64
import io
import cv2
from imageio import imread

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
    rjson = await request.json()
    print(list(rjson.keys()))
    # with open('img','w') as w:
    #     w.write(rjson["image"])
    img = imread(io.BytesIO(base64.b64decode(rjson["image"].encode("ascii"))))
    cv2_img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
    cv2.imwrite("reconstructed.jpg", cv2_img)
    return {"filter_name" : filter_name}


# Test commit
