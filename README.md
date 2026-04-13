# Gender Classifier API

A REST API that classifies names by predicted gender using the [Genderize.io](https://genderize.io) API. Built as part of the Backend Wizards Stage 0 Assessment.

---

## 🚀 Live URL

**Base URL:** `https://gender-classifier-ten.vercel.app`

---

## 📌 Endpoint

### `GET /api/classify`

Classifies a given name by gender.

**Query Parameter:**

| Parameter | Type   | Required | Description              |
|-----------|--------|----------|--------------------------|
| `name`    | string | Yes      | The name to classify     |

---

## ✅ Example Request

```
GET /api/classify?name=john
```

## ✅ Example Success Response (200 OK)

```json
{
  "status": "success",
  "data": {
    "name": "john",
    "gender": "male",
    "probability": 1,
    "sample_size": 2692560,
    "is_confident": true,
    "processed_at": "2026-04-11T14:43:43.914Z"
  }
}
```

### Response Fields

| Field          | Type    | Description                                                                 |
|----------------|---------|-----------------------------------------------------------------------------|
| `name`         | string  | The name that was classified                                                |
| `gender`       | string  | Predicted gender (`male` or `female`)                                       |
| `probability`  | number  | Probability of the predicted gender (0 to 1)                                |
| `sample_size`  | number  | Number of samples used for prediction (renamed from `count`)                |
| `is_confident` | boolean | `true` only if probability >= 0.7 AND sample_size >= 100. Both must pass.  |
| `processed_at` | string  | UTC timestamp of when the request was processed (ISO 8601, dynamic)        |

---

## ❌ Error Responses

All errors follow this structure:

```json
{
  "status": "error",
  "message": "<error message>"
}
```

| Status Code | Condition                              | Message                                          |
|-------------|----------------------------------------|--------------------------------------------------|
| `400`       | Missing or empty `name` parameter      | `Missing or empty name parameter`                |
| `422`       | `name` is not a string                 | `name is not a string`                           |
| `500/502`   | Upstream or server failure             | `Upstream or server failure`                     |
| `200`       | Gender null or count is 0 from API     | `No prediction available for the provided name`  |

---

## 🔍 Processing Rules

1. **Field extraction:** Extracts `gender`, `probability`, and `count` from the Genderize API response. Renames `count` to `sample_size`.
2. **Confidence logic:** `is_confident` is `true` only when **both** conditions are met:
   - `probability >= 0.7`
   - `sample_size >= 100`
   - If either condition fails, `is_confident` is `false`
3. **Timestamp:** `processed_at` is generated dynamically on every request in UTC ISO 8601 format. It is never hardcoded.

---

## 🛡️ Additional Features

- **CORS enabled:** `Access-Control-Allow-Origin: *` — allows cross-origin requests from any source
- **Response time:** Under 500ms (excluding external Genderize API latency)
- **Stability:** Handles multiple concurrent requests without going down

---

## 🧪 Test the Endpoint

| Test Case         | URL                                                                           | Expected Result              |
|-------------------|-------------------------------------------------------------------------------|------------------------------|
| Valid name        | `/api/classify?name=john`                                                     | 200 success with full data   |
| Missing parameter | `/api/classify`                                                               | 400 error                    |
| Empty name        | `/api/classify?name=`                                                         | 400 error                    |
| Unknown name      | `/api/classify?name=xzqwerty`                                                 | Error: no prediction available |

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **HTTP Client:** Axios
- **CORS:** cors package
- **External API:** [Genderize.io](https://genderize.io)
- **Deployment:** Vercel

---

## 📁 Project Structure

```
gender-classifier/
├── index.js        # Main server file with the /api/classify endpoint
├── vercel.json     # Vercel deployment configuration
├── package.json    # Project dependencies
└── README.md       # Project documentation
```

---

## ⚙️ Run Locally

**Prerequisites:** Node.js installed

```bash
# Clone the repository
git clone https://github.com/JBOY-AB/gender-classifier.git

# Navigate into the project
cd gender-classifier

# Install dependencies
npm install

# Start the server
node index.js
```

Server will run on `http://localhost:3000`

Test it:
```
http://localhost:3000/api/classify?name=john
```

---

## 👨‍💻 Author

**Jeremiah Abiona**  
GitHub: [@JBOY-AB](https://github.com/JBOY-AB)
