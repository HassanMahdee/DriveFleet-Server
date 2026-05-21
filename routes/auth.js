const router = require('express').Router();

router.post('/logout', (req, res) => {
  res.clearCookie('drivefleet_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  }).json({ success: true });
});

module.exports = router;