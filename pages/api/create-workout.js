const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function (req, res) {
    const { userId } = req.query;
    const { values } = req.body;

    console.log(values);

    try {
        const rawResponse = await fetch(
            `${BE_URL}/workouts/${userId}/create-workout`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }
        );

        if (!rawResponse.ok) {
            if (rawResponse.status === 400) {
                res.status(400).json(rawResponse.errors);
            }
        }

        const workoutId = await rawResponse.json();

        res.status(200).json({ workoutId });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error creating workout" });
    }
}
