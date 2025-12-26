# Test Results for Vacation Village Application

## Testing Protocol
- Test callback form submission (Contact section)
- Test EOI form submission (full flow)
- Verify data is stored in MongoDB

## Test Cases

### 1. Callback Form (Request a Call Back)
- Fill in name, phone, email, message
- Submit form
- Verify success toast appears
- Verify data stored in backend

### 2. EOI Form
- Navigate to /eoi page
- Complete all 4 steps:
  - Step 1: Applicant Details
  - Step 2: Plot Selection  
  - Step 3: Payment Details
  - Step 4: Terms & Signature
- Submit form
- Verify success page appears
- Verify data stored in backend

## Incorporate User Feedback
- None at this time

## API Endpoints
- POST /api/callback - Submit callback request
- GET /api/callback - Get all callback requests
- POST /api/eoi - Submit EOI
- GET /api/eoi - Get all EOI submissions
