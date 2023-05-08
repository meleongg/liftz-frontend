export default async function (req, res) {
  try {
    await fetch("http://localhost:3001/log-out");

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error logging out" });
  }
}
