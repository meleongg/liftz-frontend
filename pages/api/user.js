export default async function getUserData(req, res) {
    const response = await fetch("http://localhost:3001/");

    return res.status(200).json(response); 
}