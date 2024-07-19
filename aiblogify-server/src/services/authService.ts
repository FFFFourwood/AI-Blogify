import User, { IUser } from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'default_secret_key';
const tokenExpirationTime = process.env.TOKEN_EXPIRATION_TIME || '72h'; // 72 hours

const generateToken = (userId: string) => {
    return jwt.sign({ userId }, secretKey, { expiresIn: tokenExpirationTime });
}

const refreshToken = (userId: string): string => {
    return generateToken(userId);
};


const verifyTokenFn = (token: string): any => {
    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        return null;
    }
};


// register
const register = async (username: string, email: string, password: string): Promise<IUser> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return User.create({
        username,
        email,
        password: hashedPassword,
    });
};

// login
const login = async (email: string, password: string): Promise<{ user: IUser; token: string } | null> => {
    const user = await User.findOne({ email });

    if (!user) {
        return null;
    }

    const isMatch = await bcrypt.compare(password, user.password!);

    if (!isMatch) {
        return null;
    }

    const token = generateToken(user._id.toString());

    return { user, token };
};

// OAuth 
const oauthLogin = async (oauthProvider: string, oauthId: string, email: string, username: string, token: string): Promise<{ user: IUser; jwtToken: string }> => {
    let user = await User.findOne({ oauthProvider, oauthId });

    if (!user) {
        user = new User({
            username,
            email,
            oauthProvider,
            oauthId,
            oauthToken: token,
        });
        await user.save();
    }

    const jwtToken = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });

    return { user, jwtToken };
};

// wallet login
const walletLogin = async (walletAddress: string): Promise<{ user: IUser; token: string } | null> => {
    const user = await User.findOne({ walletAddress });

    if (!user) {
        return null;
    }

    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });

    return { user, token };
};

export default {
    register,
    login,
    oauthLogin,
    walletLogin,
    refreshToken,
    verifyTokenFn,
};
