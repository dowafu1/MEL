from pydantic import BaseModel, HttpUrl, validator
from typing import List, Optional
from datetime import datetime

class ImageCreate(BaseModel):
    description: Optional[str] = None
    defect_types: List[str]

class ImageResponse(BaseModel):
    id: str
    url: HttpUrl
    description: Optional[str]
    created_at: str
    defect_types: List[str]

    @validator("created_at", pre=True)
    def format_datetime(cls, value):
        if isinstance(value, datetime):
            return value.isoformat()
        return value