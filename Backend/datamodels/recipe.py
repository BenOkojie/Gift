from pydantic import BaseModel


class Recipe(BaseModel):
    steps:list[str] = None
    materials:list[str] = None
    Price: list[int] = None
    time: list[str]
    totaltime: str
    
