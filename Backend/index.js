const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors())
app.use(express.json());

app.put('/handleDataFetch', async (req, res) => {

  const company = req.body.company;
  const categories = req.body.categories;

  const queryParams = {
    top: 10,
    minPrice: 100,
    maxPrice: 10000000,
  };
  const queryString = new URLSearchParams(queryParams).toString();

  // Fetch access token (assuming same logic as before)
  const form = {
    "companyName": "goMart",
    "clientID": "8bfb3a46-ed85-46af-8074-d2a4109f6867",
    "clientSecret": "yHocTKCqyvkEegRt",
    "ownerName": "Durai Murugan V",
    "ownerEmail": "927621bcs027@mkce.ac.in",
    "rollNo": "927621BCS27"
}
  const response = await fetch(`http://20.244.56.144/test/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
  const responseData = await response.json();
  const token = responseData.access_token;
  console.log(token)

  const url = `http://20.244.56.144/test/companies/${company}/categories/${categories}/products?${queryString}`;

  // Add bearer token to authorization header
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Make the GET request with fetch
  const responseFinal = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  const data = await responseFinal.json();
  // Now you have the fetched data in the 'data' variable

  let c = 100;
  for (let i = 0; i < data.length; i++) {
    data[i].id = c + i;
  }
  data.sort((a, b) => a.id - b.id);
  console.log(data);
  return res.json(data);// You can return the da

});

app.listen(5001, () => {

  console.log("Server is running on http://localhost:5001");
});
