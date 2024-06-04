from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel, EmailStr, ValidationError
from pymongo import MongoClient
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from passlib.context import CryptContext
from bson import ObjectId  # Importar ObjectId

app = FastAPI()

# Conectar a MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["saas"]
users_collection = db["users"]
profiles_collection = db["profiles"]

# Configurar CORS
origins = [
    "http://localhost:3000",  # React frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Crear contexto de cifrado solo con argon2
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

class User(BaseModel):
    first_name: str
    paternal_last_name: str
    maternal_last_name: str
    email: EmailStr
    birth_date: datetime
    status: str = "active"
    profiles: list[str]
    created_at: datetime = datetime.utcnow()

class Login(BaseModel):
    email: EmailStr
    password: str

class Profile(BaseModel):
    name: str
    status: str

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

@app.post("/register")
async def register_user(user: User, request: Request):
    try:
        # Imprime la solicitud completa para depuración
        print(await request.json())

        existing_user = users_collection.find_one({"email": user.email})
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")

        # Encriptar la contraseña
        user_data = user.dict()
        user_data["password"] = get_password_hash(user.password)

        # Guardar el usuario en la base de datos
        user_id = users_collection.insert_one(user_data).inserted_id
        return {"id": str(user_id), "email": user.email}
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=e.errors())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/login")
async def login_user(login: Login):
    user = users_collection.find_one({"email": login.email})
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    if not verify_password(login.password, user["password"]):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    # Rehash the password with the new scheme if necessary
    if pwd_context.needs_update(user["password"]):
        new_hash = get_password_hash(login.password)
        users_collection.update_one({"_id": user["_id"]}, {"$set": {"password": new_hash}})
    
    user_data = {
        "id": str(user["_id"]),
        "first_name": user["first_name"],
        "paternal_last_name": user["paternal_last_name"],
        "maternal_last_name": user["maternal_last_name"],
        "email": user["email"]
    }
    return {"token": "dummy_token", "user": user_data}

@app.get("/users")
async def get_users():
    users = list(users_collection.find({}, {"password": 0}))  # Excluir el campo de la contraseña
    for user in users:
        user["_id"] = str(user["_id"])
    return users

@app.post("/users")
async def create_user(user: User):
    user_data = user.dict()
    user_data["created_at"] = datetime.utcnow()
    user_id = users_collection.insert_one(user_data).inserted_id
    return {"id": str(user_id), **user_data}

@app.put("/users/{user_id}")
async def update_user(user_id: str, user: User):
    update_result = users_collection.update_one({"_id": ObjectId(user_id)}, {"$set": user.dict()})
    if update_result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"id": user_id, **user.dict()}

@app.delete("/users/{user_id}")
async def delete_user(user_id: str):
    delete_result = users_collection.delete_one({"_id": ObjectId(user_id)})
    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"}

@app.get("/profiles")
async def get_profiles():
    profiles = list(profiles_collection.find({}))
    for profile in profiles:
        profile["_id"] = str(profile["_id"])
    return profiles

@app.post("/profiles")
async def create_profile(profile: Profile):
    profile_data = profile.dict()
    profile_id = profiles_collection.insert_one(profile_data).inserted_id
    return {"id": str(profile_id), "name": profile.name, "status": profile.status}

@app.put("/profiles/{profile_id}")
async def update_profile(profile_id: str, profile: Profile):
    update_result = profiles_collection.update_one({"_id": ObjectId(profile_id)}, {"$set": profile.dict()})
    if update_result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Profile not found")
    return {"id": profile_id, "name": profile.name, "status": profile.status}

@app.delete("/profiles/{profile_id}")
async def delete_profile(profile_id: str):
    delete_result = profiles_collection.delete_one({"_id": ObjectId(profile_id)})
    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Profile not found")
    return {"message": "Profile deleted successfully"}



