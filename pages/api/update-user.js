const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function handler(req, res) {
    const { userId, email, password } = req.body;

    const userData = {
        email: email,
        password: password,
    };

    try {
        const response = await fetch(`${BE_URL}/${userId}/update-user`, {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                return res
                    .status(401)
                    .json({ message: "Invalid email or password" });
            } else if (response.status === 400) {
                res.status(400).json(response.errors);
            } else {
                throw new Error("Network response was not ok");
            }
        }

        const data = await response.json();

        res.status(200).json({ userId: data._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}
