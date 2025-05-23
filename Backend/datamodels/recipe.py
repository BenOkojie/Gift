from pydantic import BaseModel
from materials import Material
from typing import List, Optional
class Recipe(BaseModel):
    steps: Optional[List[str]] = None
    materials: Optional[List[Material]] = None
    price: Optional[List[float]] = None 
    time: Optional[List[str]] = None
    totaltime: Optional[str] = None