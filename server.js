async function testPasswordAPI() {
  console.log("🚀 Testing Password Generator Microservice...\n");

  try {
    const requestBody = {
      length: 14,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true
    };

    console.log("📤 Sending request:", requestBody);

    const response = await fetch("http://localhost:3000/generate-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    console.log("\nResponse Status:", response.status);

    const data = await response.json();

    console.log("\nResponse:");
    console.log(data);

    console.log("\nPassword:", data.password);

  } catch (err) {
    console.error("Test failed:", err.message);
  }
}

testPasswordAPI();