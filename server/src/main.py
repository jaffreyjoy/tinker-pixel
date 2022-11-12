from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/upload/{filter_name}")
async def get_file_image(filter_name: str):
    return {"filter_name" : filter_name}


# Test commit
