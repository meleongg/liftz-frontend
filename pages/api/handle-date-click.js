const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function handler(req, res) {
  const { userId, isoDate } = req.query;

  try {
    const response = await fetch(`${BE_URL}/calendar/${userId}/${isoDate}`);

    const sessionsData = await response.json();
    res.status(200).json(sessionsData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true });
  }
}
