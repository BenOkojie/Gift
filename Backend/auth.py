from fastapi import Header, HTTPException
from jose import jwt
import os
from dotenv import load_dotenv
load_dotenv() 
SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")
print(SUPABASE_JWT_SECRET)

print("🔐 Loaded JWT Secret:", SUPABASE_JWT_SECRET[:10], "...")  # Show just part for verification


def get_current_user(authorization: str = Header(...)):
    try:
        scheme, token = authorization.split()

        if scheme.lower() != "bearer":
            raise HTTPException(status_code=401, detail="Invalid auth scheme")

        print("🔐 Raw Token Received:", token)

        payload = jwt.decode(
            token,
            SUPABASE_JWT_SECRET,
            algorithms=["HS256"],
            audience="authenticated"
        )

        print("✅ Decoded Payload:", payload)

        return payload

    except jwt.JWTError as e:
        print("❌ JWT Decode Error:", str(e))
        raise HTTPException(status_code=401, detail="Invalid or missing token")
    except Exception as e:
        print("❌ Unexpected Error:", str(e))
        raise HTTPException(status_code=500, detail="Internal server error")
