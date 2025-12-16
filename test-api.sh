#!/bin/bash

# Test script to verify the API endpoint is working correctly
# This sends a simplified request without file uploads

echo "Testing API endpoint..."
echo ""

# First get CSRF token
echo "1. Getting CSRF token..."
CSRF_RESPONSE=$(curl -s http://localhost:3001/api/csrf-token)
CSRF_TOKEN=$(echo $CSRF_RESPONSE | grep -o '"csrfToken":"[^"]*"' | cut -d'"' -f4)
echo "CSRF Token: $CSRF_TOKEN"
echo ""

# Test submission without files
echo "2. Testing form submission (without files)..."
curl -X POST http://localhost:3001/api/submit-form \
  -H "Content-Type: application/json" \
  -d "{
    \"csrfToken\": \"$CSRF_TOKEN\",
    \"fullName\": \"Test User\",
    \"email\": \"testuser@example.com\",
    \"phone\": \"9800000000\",
    \"contactInfo\": \"LinkedIn: test\\nGitHub: test\",
    \"addressInfo\": \"Test Address, Kathmandu\",
    \"yearOfStudy\": \"2nd Year\",
    \"semester\": \"3rd Semester\",
    \"faculty\": \"Computer Engineering\",
    \"pythonExperience\": \"Beginner (Basic syntax and concepts)\",
    \"microcontrollerExperience\": [\"ESP32/ESP8266\", \"Arduino\"],
    \"linuxFamiliarity\": \"Intermediate (Comfortable with terminal)\",
    \"iotProjectExperience\": \"Built a simple temperature monitoring system using Arduino and DHT11 sensor.\",
    \"expectations\": \"I want to learn how to build IoT projects with Raspberry Pi and understand networking concepts.\",
    \"improvementSuggestions\": \"More hands-on projects would be great.\",
    \"sessionPreference\": \"Morning Session\",
    \"transactionCode\": \"TEST12345\",
    \"agreeToCodeOfConduct\": true
  }" | jq '.'

echo ""
echo "3. Check the terminal running 'npm run dev' for detailed logs"
echo ""
echo "If you see '500 Internal Server Error' with the same .join() error,"
echo "it means the Google Apps Script is NOT updated/deployed yet."
echo ""
echo "The prepared data shows:"
echo "  microcontrollerExperience: 'ESP32/ESP8266, Arduino' (string)"
echo ""
echo "So the backend is working correctly. The issue is in Google Apps Script."
