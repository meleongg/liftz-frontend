export default async function (req, res) {
  const { userId } = req.query;
  const { goalId } = req.body;

  try {
    const rawResponse = await fetch(
      `http://localhost:3001/${userId}/delete-goal`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ goalId }),
      }
    );
    const deletedGoalId = await rawResponse.json();

    res.status(200).json({ deletedGoalId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting goal" });
  }
}