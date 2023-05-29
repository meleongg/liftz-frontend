const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function (req, res) {
    const { userId } = req.query;
    const { content, goalId } = req.body;

    const data = {
        content: content,
        goalId: goalId,
    };

    try {
        const rawResponse = await fetch(`${BE_URL}/${userId}/update-goal`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!rawResponse.ok) {
            if (rawResponse.status === 400) {
                res.status(400).json(rawResponse.errors);
            }
        }

        const updatedGoal = await rawResponse.json();

        res.status(200).json({ updatedGoal });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error updating goal" });
    }
}
