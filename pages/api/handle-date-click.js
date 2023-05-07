export default async function handler(req, res) {
  const { userId, isoDate } = req.query;

  try {
    const response = await fetch(
      `http://localhost:3001/calendar/${userId}/${isoDate}`
    );

    const sessionsData = await response.json();
    res.status(200).json(sessionsData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true });
  }
}
