const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS header — required or grading script can't reach your server
app.use(cors({
  origin: '*'
}));

app.get('/api/classify', async (req, res) => {
  const { name } = req.query;

  // 400 — missing or empty name
  if (name === undefined || name === '') {
    return res.status(400).json({
      status: 'error',
      message: 'Missing or empty name parameter'
    });
  }

  // 422 — name is not a string
  if (typeof name !== 'string') {
    return res.status(422).json({
      status: 'error',
      message: 'name is not a string'
    });
  }

  try {
    // Call the Genderize API
    const response = await axios.get(`https://api.genderize.io/?name=${encodeURIComponent(name)}`);
    const apiData = response.data;

    // Edge case — gender is null or count is 0
    if (apiData.gender === null || apiData.count === 0) {
      return res.status(200).json({
        status: 'error',
        message: 'No prediction available for the provided name'
      });
    }

    // Extract and rename fields
    const gender = apiData.gender;
    const probability = apiData.probability;
    const sample_size = apiData.count; // renamed from count

    // Confidence logic — BOTH must be true
    const is_confident = probability >= 0.7 && sample_size >= 100;

    // Generate processed_at dynamically — UTC, ISO 8601
    const processed_at = new Date().toISOString();

    return res.status(200).json({
      status: 'success',
      data: {
        name: apiData.name,
        gender,
        probability,
        sample_size,
        is_confident,
        processed_at
      }
    });

  } catch (error) {
    // 500/502 — upstream or server failure
    return res.status(502).json({
      status: 'error',
      message: 'Upstream or server failure'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});