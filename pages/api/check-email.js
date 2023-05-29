const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function handler(req, res) {
    const { email } = req.body;

    const data = {
        email: email,
    };

    try {
        const checkEmailResponse = await fetch(`${BE_URL}/check-email`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!checkEmailResponse.ok) {
            if (checkEmailResponse.status === 400) {
                res.status(400).json(checkEmailResponse.errors);
            }
        }

        const response = await checkEmailResponse.json();

        res.status(200).json({ message: response.message });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}
