from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from routes import giftees
from database.db import database

app = FastAPI()
app.include_router(giftees.router)
@app.on_event("startup")
async def startup():
    await database.connect()
# ✅ disconnect the database when FastAPI shuts down
@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
