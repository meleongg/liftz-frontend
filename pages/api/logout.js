const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function (req, res) {
  try {
    await fetch(`${BE_URL}/log-out`);

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error logging out" });
  }
}
