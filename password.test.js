const BASE_URL = "http://localhost:3000/generate-password";

describe("Password Generator Microservice API Tests", () => {

  test("should generate password with valid request", async () => {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        length: 12,
        includeUppercase: true,
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: true
      })
    });

    expect(response.status).toBe(200);

    const data = await response.json();

    expect(data).toHaveProperty("password");
    expect(typeof data.password).toBe("string");
    expect(data.password.length).toBe(12);
  });


  test("should respect length requirement", async () => {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        length: 20,
        includeUppercase: true,
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: false
      })
    });

    const data = await response.json();

    expect(data.password.length).toBe(20);
  });


  test("should fail when no character types selected", async () => {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        length: 10,
        includeUppercase: false,
        includeLowercase: false,
        includeNumbers: false,
        includeSymbols: false
      })
    });

    expect(response.status).toBe(400);

    const data = await response.json();

    expect(data).toHaveProperty("error");
  });


  test("should return error for invalid length", async () => {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        length: 2,
        includeUppercase: true,
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: false
      })
    });

    expect(response.status).toBe(400);

    const data = await response.json();

    expect(data.error).toMatch(/Length must be a number >= 4/);
  });

});