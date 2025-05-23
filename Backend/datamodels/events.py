from pydantic import BaseModel


class Event(BaseModel):
    when:str = None
    where:str = None
    activities:list[str] = None
    time: list[str] = None
    totaltime: str = None
    
