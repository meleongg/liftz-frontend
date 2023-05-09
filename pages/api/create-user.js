export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  console.log(req.body);

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
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    res.status(200).json({ userId: data._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
