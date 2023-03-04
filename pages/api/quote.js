export default async function getQuote(req, res) {
  const url = `https://zenquotes.io/api/quotes/`;
  const response = await fetch(url, {
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  // const data = await response.json();

  res.status(200).json(response);
}
