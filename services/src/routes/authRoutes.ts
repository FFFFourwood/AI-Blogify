import express from 'express';
import { register, login, oauthLogin, walletLogin, logout, verifyToken } from '../controllers/authController';
import passport from 'passport';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// // OAuth 登录
// router.post('/oauth/login', oauthLogin);

// // 区块链钱包登录
// router.post('/wallet/login', walletLogin);

// 验证 JWT 令牌
router.get('/verify', verifyToken);

// // Google OAuth
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
//     res.redirect('/');
// });


// // GitHub OAuth
// router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
// router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
//     res.redirect('/');
// });

export default router;
