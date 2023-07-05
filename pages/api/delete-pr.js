const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function (req, res) {
    const { prId } = req.body;

    const data = {
        prId: prId,
    };

    try {
        const rawResponse = await fetch(`${BE_URL}/prs/${prId}/delete`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const deleteMsg = await rawResponse.json();

        res.status(200).json(deleteMsg);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error deleting PR" });
    }
}
