from fastapi import APIRouter, Depends
from auth import get_current_user
from database.db import database
from models.tables import giftees
from models.giftee import Giftee
router = APIRouter()

@router.get("/get-giftees")
async def get_giftees(user=Depends(get_current_user)):
    query = giftees.select().where(giftees.c.user_id == user["sub"])
    result = await database.fetch_all(query)
    return result
@router.post("/add-giftee")
async def add_giftee(data: Giftee, user=Depends(get_current_user)):
    query = giftees.insert().values(
        user_id=user["sub"],
        name=data.name,
        birthdate=data.birthdate,
        hobbies=data.hobbies,
        relationship=data.relationship
    )
    await database.execute(query)
    return {"message": "Giftee added successfully"}
