from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Contact Form / Callback Request Model
class CallbackRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[str] = None
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "pending"

class CallbackRequestCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    message: Optional[str] = None

# EOI Form Models
class ApplicantDetails(BaseModel):
    name: str
    email: str
    mobile: str
    address: Optional[str] = None
    dob: Optional[str] = None
    occupation: Optional[str] = None
    designation: Optional[str] = None
    aadhaar: Optional[str] = None
    pan: Optional[str] = None
    gst: Optional[str] = None
    tan: Optional[str] = None

class EOISubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    eoi_number: str = Field(default_factory=lambda: f"EOI-{datetime.now().strftime('%Y%m%d')}-{str(uuid.uuid4())[:8].upper()}")
    
    # Applicant Details
    applicant1: ApplicantDetails
    applicant2: Optional[ApplicantDetails] = None
    
    # Plot Details
    plot_type: Optional[str] = None
    plot_area: Optional[str] = None
    eoi_amount: Optional[str] = None
    total_consideration: Optional[str] = None
    financing_type: str = "self"
    
    # Payment Details
    payment_method: str = "bank"
    payment_date: Optional[str] = None
    payment_number: Optional[str] = None
    bank_branch: Optional[str] = None
    
    # Metadata
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "submitted"
    terms_accepted: bool = True

class EOISubmissionCreate(BaseModel):
    # Applicant 1 Details
    applicant1Name: str
    applicant1Email: str
    applicant1Mobile: str
    applicant1Address: Optional[str] = None
    applicant1DOB: Optional[str] = None
    applicant1Occupation: Optional[str] = None
    applicant1Designation: Optional[str] = None
    applicant1Aadhaar: Optional[str] = None
    applicant1PAN: Optional[str] = None
    applicant1GST: Optional[str] = None
    applicant1TAN: Optional[str] = None
    
    # Applicant 2 Details (Optional)
    applicant2Name: Optional[str] = None
    applicant2Email: Optional[str] = None
    applicant2Mobile: Optional[str] = None
    applicant2Address: Optional[str] = None
    applicant2DOB: Optional[str] = None
    applicant2Occupation: Optional[str] = None
    applicant2Designation: Optional[str] = None
    applicant2Aadhaar: Optional[str] = None
    applicant2PAN: Optional[str] = None
    applicant2GST: Optional[str] = None
    applicant2TAN: Optional[str] = None
    
    # Plot Details
    plotType: Optional[str] = None
    plotArea: Optional[str] = None
    eoiAmount: Optional[str] = None
    totalConsideration: Optional[str] = None
    financingType: str = "self"
    
    # Payment Details
    paymentMethod: str = "bank"
    paymentDate: Optional[str] = None
    paymentNumber: Optional[str] = None
    bankBranch: Optional[str] = None
    
    # Terms
    acceptTerms: bool = True


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Vacation Village API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Callback Request Endpoints
@api_router.post("/callback", response_model=CallbackRequest)
async def create_callback_request(input: CallbackRequestCreate):
    callback_obj = CallbackRequest(**input.model_dump())
    
    doc = callback_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.callback_requests.insert_one(doc)
    logger.info(f"New callback request created: {callback_obj.id}")
    return callback_obj

@api_router.get("/callback", response_model=List[CallbackRequest])
async def get_callback_requests():
    callbacks = await db.callback_requests.find({}, {"_id": 0}).to_list(1000)
    
    for cb in callbacks:
        if isinstance(cb['created_at'], str):
            cb['created_at'] = datetime.fromisoformat(cb['created_at'])
    
    return callbacks

# EOI Submission Endpoints
@api_router.post("/eoi")
async def create_eoi_submission(input: EOISubmissionCreate):
    # Build applicant 1 details
    applicant1 = ApplicantDetails(
        name=input.applicant1Name,
        email=input.applicant1Email,
        mobile=input.applicant1Mobile,
        address=input.applicant1Address,
        dob=input.applicant1DOB,
        occupation=input.applicant1Occupation,
        designation=input.applicant1Designation,
        aadhaar=input.applicant1Aadhaar,
        pan=input.applicant1PAN,
        gst=input.applicant1GST,
        tan=input.applicant1TAN
    )
    
    # Build applicant 2 details if provided
    applicant2 = None
    if input.applicant2Name:
        applicant2 = ApplicantDetails(
            name=input.applicant2Name,
            email=input.applicant2Email or "",
            mobile=input.applicant2Mobile or "",
            address=input.applicant2Address,
            dob=input.applicant2DOB,
            occupation=input.applicant2Occupation,
            designation=input.applicant2Designation,
            aadhaar=input.applicant2Aadhaar,
            pan=input.applicant2PAN,
            gst=input.applicant2GST,
            tan=input.applicant2TAN
        )
    
    # Create EOI submission
    eoi_obj = EOISubmission(
        applicant1=applicant1,
        applicant2=applicant2,
        plot_type=input.plotType,
        plot_area=input.plotArea,
        eoi_amount=input.eoiAmount,
        total_consideration=input.totalConsideration,
        financing_type=input.financingType,
        payment_method=input.paymentMethod,
        payment_date=input.paymentDate,
        payment_number=input.paymentNumber,
        bank_branch=input.bankBranch,
        terms_accepted=input.acceptTerms
    )
    
    # Convert to dict for MongoDB
    doc = eoi_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.eoi_submissions.insert_one(doc)
    logger.info(f"New EOI submission created: {eoi_obj.eoi_number}")
    
    return {
        "success": True,
        "message": "EOI submitted successfully",
        "eoi_number": eoi_obj.eoi_number,
        "id": eoi_obj.id
    }

@api_router.get("/eoi")
async def get_eoi_submissions():
    submissions = await db.eoi_submissions.find({}, {"_id": 0}).to_list(1000)
    
    for sub in submissions:
        if isinstance(sub.get('created_at'), str):
            sub['created_at'] = datetime.fromisoformat(sub['created_at'])
    
    return submissions

@api_router.get("/eoi/{eoi_id}")
async def get_eoi_submission(eoi_id: str):
    submission = await db.eoi_submissions.find_one({"id": eoi_id}, {"_id": 0})
    
    if not submission:
        raise HTTPException(status_code=404, detail="EOI submission not found")
    
    if isinstance(submission.get('created_at'), str):
        submission['created_at'] = datetime.fromisoformat(submission['created_at'])
    
    return submission


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()