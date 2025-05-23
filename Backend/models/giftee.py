from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class Giftee(BaseModel):
    name: str
    birthdate: date
    hobbies: List[str]
    relationship: str