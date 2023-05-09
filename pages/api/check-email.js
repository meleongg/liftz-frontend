export default async function handler(req, res) {
  const { email } = req.body;

  const data = {
    email: email,
  };

  try {
    const checkEmailResponse = await fetch(
      "http://localhost:3001/check-email",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!checkEmailResponse.ok) {
      throw new Error("Network response was not ok");
    }

    const response = await checkEmailResponse.json();

    res.status(200).json({ message: response.message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
