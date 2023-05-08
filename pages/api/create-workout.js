export default async function (req, res) {
  const { userId } = req.query;
  const { values } = req.body;

  try {
    const rawResponse = await fetch(
      `http://localhost:3001/workouts/${userId}/create-workout`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }
    );

    const workoutId = await rawResponse.json();

    res.status(200).json({ workoutId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating workout" });
  }
}
