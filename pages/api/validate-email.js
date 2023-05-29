const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function handler(req, res) {
    const { userId, email } = req.body;

    const data = {
        email: email,
    };

    try {
        const validatePasswordResponse = await fetch(
            `${BE_URL}/${userId}/validate-email`,
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!validatePasswordResponse.ok) {
            if (validatePasswordResponse.status === 400) {
                res.status(400).json(validatePasswordResponse.errors);
            }
        }

        const response = await validatePasswordResponse.json();

        res.status(200).json({ message: response.message });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}
