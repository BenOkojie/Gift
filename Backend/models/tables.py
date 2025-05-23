import sqlalchemy
from sqlalchemy import Table, Column, Integer, String, Float, Text, Boolean, ForeignKey, MetaData, ARRAY, Date

metadata = MetaData()




giftees = Table(
    "giftees",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("user_id", String, nullable=False), 
    Column("name", String, nullable=False),
    Column("birthdate", Date),                      
    Column("hobbies", ARRAY(String)),                
    Column("relationship", String)                   
)

# Materials for DIY recipes
materials = Table(
    "materials",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String),
    Column("quantity", Integer),
    Column("unit", String),
    Column("price", Float)
)

# Recipes for DIY gifts
recipes = Table(
    "recipes",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("steps", ARRAY(Text)),        # list of steps
    Column("price", ARRAY(Integer)),     # price per material
    Column("time", ARRAY(String)),       # time per step
    Column("totaltime", String)
)

# Join table for many-to-many between recipes and materials
recipe_materials = Table(
    "recipe_materials",
    metadata,
    Column("recipe_id", Integer, ForeignKey("recipes.id", ondelete="CASCADE")),
    Column("material_id", Integer, ForeignKey("materials.id", ondelete="CASCADE")),
)

# Events associated with gift occasions
events = Table(
    "events",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("when", String),
    Column("where", String),
    Column("activities", ARRAY(String)),
    Column("time", ARRAY(String)),
    Column("totaltime", String)
)

# Gifts that belong to a giftee
gifts = Table(
    "gifts",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("giftee_id", Integer, ForeignKey("giftees.id", ondelete="CASCADE")),
    Column("name", String),
    Column("price", Integer),
    Column("description", Text),
    Column("link", String),
    Column("giftype", String),        # DIY, store-bought, etc.
    Column("isevent", Boolean),
    Column("isdiy", Boolean),
    Column("recipe_id", Integer, ForeignKey("recipes.id", ondelete="SET NULL")),
    Column("event_id", Integer, ForeignKey("events.id", ondelete="SET NULL")),
)
