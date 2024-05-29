from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from pymongo import MongoClient
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from passlib.context import CryptContext

app = FastAPI()

# Conectar a MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["saas"]
users_collection = db["users"]

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

# Crear contexto de cifrado
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(BaseModel):
    first_name: str
    paternal_last_name: str
    maternal_last_name: str
    email: EmailStr
    confirm_email: EmailStr
    password: str
    confirm_password: str
    agree_terms: bool
    status: bool = True
    created_at: datetime = datetime.utcnow()

class Login(BaseModel):
    email: EmailStr
    password: str

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

@app.post("/register")
async def register_user(user: User):
    if user.email != user.confirm_email:
        raise HTTPException(status_code=400, detail="Emails do not match")
    if user.password != user.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    
    existing_user = users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Encriptar la contraseña
    user_data = user.dict()
    user_data["password"] = get_password_hash(user.password)
    
    # Eliminar campos innecesarios antes de guardar
    del user_data["confirm_email"]
    del user_data["confirm_password"]
    
    # Guardar el usuario en la base de datos
    user_id = users_collection.insert_one(user_data).inserted_id
    return {"id": str(user_id), "email": user.email}

@app.post("/login")
async def login_user(login: Login):
    user = users_collection.find_one({"email": login.email})
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    if not verify_password(login.password, user["password"]):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    return {"email": login.email, "message": "Login successful"}
