from pydantic import BaseModel
from materials import Material

class Recipe(BaseModel):
    steps:list[str] = None
    materials:list[Material] = None
    Price: list[int] = None
    time: list[str]
    totaltime: str
    
