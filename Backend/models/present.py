from pydantic import BaseModel
from typing import Optional
from recipe import Recipe
from events import Event
class Gift(BaseModel):
    name: Optional[str] = None
    price: Optional[int] = None
    description: Optional[str] = None
    link: Optional[str] = None
    gif_type: Optional[str] = None 
    isevent: Optional[bool] = None
    isdiy: Optional[bool] = None
    recipe: Optional[Recipe] = None
    event: Optional[Event] = None