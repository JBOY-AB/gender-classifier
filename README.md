# Gender Classifier API

A REST API that classifies names by gender using the Genderize API.

## Live URL
https://yourapp.up.railway.app

## Endpoint
GET /api/classify?name={name}

## Example Request
GET /api/classify?name=john

## Example Response
{
  "status": "success",
  "data": {
    "name": "john",
    "gender": "male",
    "probability": 0.99,
    "sample_size": 1234,
    "is_confident": true,
    "processed_at": "2026-04-11T10:00:00.000Z"
  }
}

## Tech Stack
- Node.js
- Express
- Axios
- Deployed on Railway
