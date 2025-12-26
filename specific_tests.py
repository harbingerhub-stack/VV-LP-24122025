#!/usr/bin/env python3
"""
Specific test cases as requested in the review request
"""

import requests
import json

BACKEND_URL = "https://harmony-estates.preview.emergentagent.com/api"

def test_specific_callback_request():
    """Test the exact callback request from review request"""
    print("Testing specific callback request from review...")
    
    callback_data = {
        "name": "Test User",
        "phone": "9876543210",
        "email": "test@test.com",
        "message": "Interested in plots"
    }
    
    # POST request
    response = requests.post(f"{BACKEND_URL}/callback", json=callback_data)
    print(f"POST /api/callback - Status: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print(f"✅ Created callback with ID: {result['id']}")
    else:
        print(f"❌ Failed: {response.text}")
        return False
    
    # GET request to verify
    response = requests.get(f"{BACKEND_URL}/callback")
    print(f"GET /api/callback - Status: {response.status_code}")
    if response.status_code == 200:
        callbacks = response.json()
        print(f"✅ Retrieved {len(callbacks)} callbacks")
        return True
    else:
        print(f"❌ Failed: {response.text}")
        return False

def test_specific_eoi_request():
    """Test the exact EOI request from review request"""
    print("\nTesting specific EOI request from review...")
    
    eoi_data = {
        "applicant1Name": "Test Applicant",
        "applicant1Email": "applicant@test.com", 
        "applicant1Mobile": "9999999999",
        "applicant1Address": "Test Address",
        "applicant1PAN": "AAAAA1234A",
        "plotType": "TYPE B",
        "plotArea": "1500",
        "financingType": "self",
        "paymentMethod": "gateway",
        "acceptTerms": True
    }
    
    # POST request
    response = requests.post(f"{BACKEND_URL}/eoi", json=eoi_data)
    print(f"POST /api/eoi - Status: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print(f"✅ Created EOI with ID: {result['id']}")
        eoi_id = result['id']
    else:
        print(f"❌ Failed: {response.text}")
        return False
    
    # GET all EOIs
    response = requests.get(f"{BACKEND_URL}/eoi")
    print(f"GET /api/eoi - Status: {response.status_code}")
    if response.status_code == 200:
        eois = response.json()
        print(f"✅ Retrieved {len(eois)} EOIs")
    else:
        print(f"❌ Failed: {response.text}")
        return False
    
    # GET specific EOI
    response = requests.get(f"{BACKEND_URL}/eoi/{eoi_id}")
    print(f"GET /api/eoi/{eoi_id} - Status: {response.status_code}")
    if response.status_code == 200:
        eoi = response.json()
        print(f"✅ Retrieved specific EOI for {eoi['applicant1']['name']}")
        return True
    else:
        print(f"❌ Failed: {response.text}")
        return False

if __name__ == "__main__":
    print("🧪 Running specific test cases from review request")
    
    success1 = test_specific_callback_request()
    success2 = test_specific_eoi_request()
    
    if success1 and success2:
        print("\n✅ All specific test cases passed!")
    else:
        print("\n❌ Some test cases failed!")