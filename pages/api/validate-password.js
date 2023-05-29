const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function handler(req, res) {
    const { userId, password } = req.body;

    const data = {
        password: password,
    };

    try {
        const validatePasswordResponse = await fetch(
            `${BE_URL}/${userId}/validate-password`,
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!validatePasswordResponse.ok) {
            throw new Error("Network response was not ok");
        }

        const response = await validatePasswordResponse.json();

        res.status(200).json({ message: response.message });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}
