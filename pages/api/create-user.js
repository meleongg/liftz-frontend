export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { firstName, lastName, email, password } = req.body;

  const userData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  };

  try {
    const response = await fetch("http://localhost:3001/create-user", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 400) {
        res.status(400).json(response.errors);
      }
    }

    const data = await response.json();

    res.status(200).json({ userId: data._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
