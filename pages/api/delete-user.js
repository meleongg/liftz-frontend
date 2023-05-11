export default async function (req, res) {
  const { userId } = req.body;

  try {
    const rawResponse = await fetch(
      `http://localhost:3001/${userId}/delete-user`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await rawResponse.json();

    res.status(200).json({ message: data.message });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting user" });
  }
}
