from pydantic import BaseModel

from typing import List, Optional

class Event(BaseModel):
    when: Optional[str] = None
    where: Optional[str] = None
    activities: Optional[List[str]] = None
    time: Optional[List[str]] = None  # individual times for each activity
    totaltime: Optional[str] = None