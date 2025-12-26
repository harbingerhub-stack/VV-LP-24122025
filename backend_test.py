#!/usr/bin/env python3
"""
Backend API Testing for Vacation Village Application
Tests all backend APIs including callback and EOI endpoints
"""

import requests
import json
import sys
from datetime import datetime

# Backend URL from frontend/.env
BACKEND_URL = "https://paradise-plots-3.preview.emergentagent.com/api"

def test_callback_api():
    """Test the callback/contact form API endpoints"""
    print("\n=== Testing Callback API ===")
    
    # Test data for callback request
    callback_data = {
        "name": "Rajesh Kumar",
        "phone": "9876543210", 
        "email": "rajesh.kumar@email.com",
        "message": "Interested in TYPE B plots. Please call me to discuss pricing and availability."
    }
    
    try:
        # Test POST /api/callback
        print("1. Testing POST /api/callback...")
        response = requests.post(f"{BACKEND_URL}/callback", json=callback_data, timeout=30)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            callback_result = response.json()
            print(f"   ✅ Callback created successfully")
            print(f"   ID: {callback_result.get('id')}")
            print(f"   Name: {callback_result.get('name')}")
            print(f"   Status: {callback_result.get('status')}")
            callback_id = callback_result.get('id')
        else:
            print(f"   ❌ Failed to create callback: {response.text}")
            return False
            
        # Test GET /api/callback
        print("\n2. Testing GET /api/callback...")
        response = requests.get(f"{BACKEND_URL}/callback", timeout=30)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            callbacks = response.json()
            print(f"   ✅ Retrieved {len(callbacks)} callback requests")
            
            # Verify our callback is in the list
            found_callback = False
            for cb in callbacks:
                if cb.get('id') == callback_id:
                    found_callback = True
                    print(f"   ✅ Found our callback in the list")
                    print(f"   Name: {cb.get('name')}, Phone: {cb.get('phone')}")
                    break
            
            if not found_callback:
                print(f"   ❌ Our callback not found in the list")
                return False
        else:
            print(f"   ❌ Failed to retrieve callbacks: {response.text}")
            return False
            
        print("   ✅ Callback API tests passed")
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"   ❌ Network error during callback API test: {e}")
        return False
    except Exception as e:
        print(f"   ❌ Unexpected error during callback API test: {e}")
        return False

def test_eoi_api():
    """Test the EOI (Expression of Interest) API endpoints"""
    print("\n=== Testing EOI API ===")
    
    # Test data for EOI submission
    eoi_data = {
        "applicant1Name": "Priya Sharma",
        "applicant1Email": "priya.sharma@email.com",
        "applicant1Mobile": "9999999999",
        "applicant1Address": "123 MG Road, Bangalore, Karnataka 560001",
        "applicant1PAN": "ABCDE1234F",
        "applicant1Aadhaar": "123456789012",
        "applicant1Occupation": "Software Engineer",
        "applicant1Designation": "Senior Developer",
        "plotType": "TYPE B",
        "plotArea": "1500",
        "eoiAmount": "50000",
        "totalConsideration": "2500000",
        "financingType": "self",
        "paymentMethod": "gateway",
        "acceptTerms": True
    }
    
    try:
        # Test POST /api/eoi
        print("1. Testing POST /api/eoi...")
        response = requests.post(f"{BACKEND_URL}/eoi", json=eoi_data, timeout=30)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            eoi_result = response.json()
            print(f"   ✅ EOI created successfully")
            print(f"   Success: {eoi_result.get('success')}")
            print(f"   Message: {eoi_result.get('message')}")
            print(f"   EOI Number: {eoi_result.get('eoi_number')}")
            print(f"   ID: {eoi_result.get('id')}")
            eoi_id = eoi_result.get('id')
        else:
            print(f"   ❌ Failed to create EOI: {response.text}")
            return False
            
        # Test GET /api/eoi
        print("\n2. Testing GET /api/eoi...")
        response = requests.get(f"{BACKEND_URL}/eoi", timeout=30)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            eoi_submissions = response.json()
            print(f"   ✅ Retrieved {len(eoi_submissions)} EOI submissions")
            
            # Verify our EOI is in the list
            found_eoi = False
            for eoi in eoi_submissions:
                if eoi.get('id') == eoi_id:
                    found_eoi = True
                    print(f"   ✅ Found our EOI in the list")
                    print(f"   Applicant: {eoi.get('applicant1', {}).get('name')}")
                    print(f"   Plot Type: {eoi.get('plot_type')}")
                    print(f"   EOI Number: {eoi.get('eoi_number')}")
                    break
            
            if not found_eoi:
                print(f"   ❌ Our EOI not found in the list")
                return False
        else:
            print(f"   ❌ Failed to retrieve EOI submissions: {response.text}")
            return False
            
        # Test GET /api/eoi/{id}
        print(f"\n3. Testing GET /api/eoi/{eoi_id}...")
        response = requests.get(f"{BACKEND_URL}/eoi/{eoi_id}", timeout=30)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            eoi_detail = response.json()
            print(f"   ✅ Retrieved specific EOI successfully")
            print(f"   Applicant: {eoi_detail.get('applicant1', {}).get('name')}")
            print(f"   Email: {eoi_detail.get('applicant1', {}).get('email')}")
            print(f"   Plot Type: {eoi_detail.get('plot_type')}")
            print(f"   Status: {eoi_detail.get('status')}")
        else:
            print(f"   ❌ Failed to retrieve specific EOI: {response.text}")
            return False
            
        print("   ✅ EOI API tests passed")
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"   ❌ Network error during EOI API test: {e}")
        return False
    except Exception as e:
        print(f"   ❌ Unexpected error during EOI API test: {e}")
        return False

def test_api_health():
    """Test basic API health and connectivity"""
    print("\n=== Testing API Health ===")
    
    try:
        # Test root endpoint
        print("1. Testing API root endpoint...")
        response = requests.get(f"{BACKEND_URL}/", timeout=30)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"   ✅ API is healthy")
            print(f"   Message: {result.get('message')}")
            return True
        else:
            print(f"   ❌ API health check failed: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"   ❌ Network error during API health test: {e}")
        return False
    except Exception as e:
        print(f"   ❌ Unexpected error during API health test: {e}")
        return False

def main():
    """Run all backend API tests"""
    print("🚀 Starting Vacation Village Backend API Tests")
    print(f"Backend URL: {BACKEND_URL}")
    print(f"Test started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    test_results = []
    
    # Run all tests
    test_results.append(("API Health", test_api_health()))
    test_results.append(("Callback API", test_callback_api()))
    test_results.append(("EOI API", test_eoi_api()))
    
    # Print summary
    print("\n" + "="*50)
    print("📊 TEST SUMMARY")
    print("="*50)
    
    passed = 0
    failed = 0
    
    for test_name, result in test_results:
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
        else:
            failed += 1
    
    print(f"\nTotal Tests: {len(test_results)}")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    
    if failed == 0:
        print("\n🎉 All tests passed! Backend APIs are working correctly.")
        return 0
    else:
        print(f"\n⚠️  {failed} test(s) failed. Please check the errors above.")
        return 1

if __name__ == "__main__":
    exit_code = main()
    sys.exit(exit_code)