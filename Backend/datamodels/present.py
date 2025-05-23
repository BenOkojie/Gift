from pydantic import BaseModel
from recipe import Recipe

class Gift(BaseModel):
    name:str = None
    price:int = None
    Description: str = None
    Link:str = None
    giftype: str
    isevent:bool
    isdiy:bool
    recipe:Recipe
