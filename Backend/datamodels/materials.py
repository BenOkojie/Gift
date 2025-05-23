from pydantic import BaseModel


class Material(BaseModel):
    name:str = None
    quantity:int = None
    unit: str = None
    price: int

    
