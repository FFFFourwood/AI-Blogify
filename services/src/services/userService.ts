import User, { IUser } from '../models/userModel';

const getAllUsers = async (): Promise<IUser[]> => {
    return User.find();
};

const getUserById = async (id: string): Promise<IUser | null> => {
    return User.findById(id);
};

const updateUser = async (id: string, username: string, email: string): Promise<IUser | null> => {
    const user = await User.findById(id);
    if (!user) {
        return null;
    }

    user.username = username;
    user.email = email;
    await user.save();

    return user;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
    const user = await User.findById(id);
    if (!user) {
        return null;
    }

    await user.deleteOne();
    return user;
};

export default {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
