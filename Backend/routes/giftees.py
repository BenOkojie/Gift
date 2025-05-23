from fastapi import APIRouter, Depends
from auth import get_current_user
from database.db import database
from models.tables import giftees

router = APIRouter()

@router.get("/get-giftees")
async def get_giftees(user=Depends(get_current_user)):
    query = giftees.select().where(giftees.c.user_id == user["sub"])
    result = await database.fetch_all(query)
    return result
