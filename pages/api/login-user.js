export default async function handler(req, res) {
  const { email, password } = req.body;

  const userData = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        return res.status(401).json({ message: "Invalid email or password" });
      } else {
        throw new Error("Network response was not ok");
      }
    }

    const data = await response.json();

    console.log(data);

    res.status(200).json({ userId: data._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
