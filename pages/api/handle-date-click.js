const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function handler(req, res) {
    const { userId, date, timezone } = req.query;

    const data = {
        timezone: timezone,
    };

    try {
        const response = await fetch(`${BE_URL}/calendar/${userId}/${date}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const sessionsData = await response.json();
        res.status(200).json(sessionsData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true });
    }
}
