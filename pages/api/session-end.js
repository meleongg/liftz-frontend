const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function (req, res) {
  const { userId, workoutId, sessionExercises } = req.body;

  const data = {
    userId: userId,
    sessionExercises: sessionExercises,
  };

  try {
    // Save the session data to the server
    const rawResponse = await fetch(
      `${BE_URL}/workouts/${workoutId}/session-end`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const sessionId = await rawResponse.json();

    res.status(200).json({ sessionId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error ending workout session" });
  }
}
