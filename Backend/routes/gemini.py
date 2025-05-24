from fastapi import APIRouter, Depends, HTTPException
from auth import get_current_user
from database.db import database
import json
from ai.gem import generate_gifts_from_prompt

# Your Gemini API client setup here
# from gemini_client import generate_content

router = APIRouter()
def clean_gemini_json(raw_text):
    cleaned = raw_text.strip()

    # Remove wrapping ```json ... ``` if present
    if cleaned.startswith("```"):
        cleaned = cleaned.replace("```json", "").replace("```", "").strip()

    return cleaned

@router.post("/generategift")
async def generate_gift(giftee: dict, user=Depends(get_current_user)):
    try:
        name = giftee["name"]
        birthdate = giftee["birthdate"]
        hobbies = giftee.get("hobbies", [])
        relationship = giftee.get("relationship", "")
        age = calculate_age_from_birthdate(birthdate)

        prompt = f"""
        Generate 3 gift ideas for a person with:
        - Name: {name}
        - Age: {age}
        - Hobbies: {', '.join(hobbies)}
        - Relationship: {relationship}

        Each gift must be a JSON object with these fields:
        - name (string)
        - price (number)
        - description (string)
        - link (string)
        - giftype (string)
        - isdiy (boolean)
        - isevent (boolean)
        - recipe (object or null if not DIY)
        - event (object or null if not an event gift)

        If isdiy is true, recipe must include:
        - steps (list of strings)
        - totaltime (string)
        - materials (array with name, quantity, unit, price)
        - price (array of numbers)
        - time (array of strings)

        If isevent is true, include:
        - when, where, activities (array), time (array), totaltime

        Return only a valid JSON array. No extra text. No explanation. No headings. Just the array.
        """

        # Example Gemini call (replace with your method)
        gemini_response = generate_gifts_from_prompt(prompt)
        print(gemini_response)
        try:
            cleaned_text = clean_gemini_json(gemini_response)
            gift_ideas = json.loads(cleaned_text)
            return gift_ideas
        except json.JSONDecodeError:
            print("❌ Failed to parse Gemini output:\n", gemini_response)
            raise HTTPException(500, detail="Gemini returned invalid JSON.")

    except Exception as e:
        print("❌ Error:", str(e))
        raise HTTPException(status_code=500, detail="Gift generation failed")


def calculate_age_from_birthdate(birthdate: str):
    from datetime import datetime
    bdate = datetime.strptime(birthdate, "%Y-%m-%d")
    today = datetime.today()
    return today.year - bdate.year - ((today.month, today.day) < (bdate.month, bdate.day))
