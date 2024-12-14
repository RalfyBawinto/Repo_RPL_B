import Users from "../models/UserModel";

export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
    }
}