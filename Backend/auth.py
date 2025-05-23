from fastapi import Header, HTTPException, Depends
from jose import jwt
import os

SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")

def get_current_user(authorization: str = Header(...)):
    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            raise HTTPException(status_code=401, detail="Invalid auth scheme")

        decoded = jwt.decode(token, SUPABASE_JWT_SECRET, algorithms=["HS256"])
        return decoded  # Contains user ID, email, etc.

    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or missing token")
