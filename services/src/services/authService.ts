import User, { IUser } from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async (username: string, email: string, password: string): Promise<IUser> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return User.create({
        username,
        email,
        password: hashedPassword,
    });
};

const login = async (email: string, password: string): Promise<{ user: IUser; token: string } | null> => {
    const user = await User.findOne({ email });

    if (!user) {
        return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return null;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    return { user, token };
};

export default {
    register,
    login,
};
