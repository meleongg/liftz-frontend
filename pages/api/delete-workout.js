const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function (req, res) {
  const { userId, workoutId } = req.body;

  const data = {
    userId: userId,
    workoutId: workoutId,
  };

  try {
    const rawResponse = await fetch(`${BE_URL}/workouts/${workoutId}/delete`, {
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
    res.status(500).json({ message: "Error deleting workout" });
  }
}
