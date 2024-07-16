import User, { IUser } from '../models/userModel';

const bindWallet = async (userId: string, walletAddress: string): Promise<IUser | null> => {
    const user = await User.findById(userId);
    if (!user) {
        return null;
    }

    user.walletAddress = walletAddress;
    await user.save();

    return user;
};

const loginWithWallet = async (walletAddress: string): Promise<IUser | null> => {
    return User.findOne({ walletAddress });
};

export default {
    bindWallet,
    loginWithWallet,
};
