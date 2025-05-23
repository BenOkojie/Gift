from databases import Database
from dotenv import load_dotenv
import os

load_dotenv()  # 👈 this must come BEFORE os.getenv

DATABASE_URL = os.getenv("DATABASE_URL")
print(DATABASE_URL)
if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set. Check your .env file.")

database = Database(DATABASE_URL)
