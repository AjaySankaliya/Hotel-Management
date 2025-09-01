const User=require('../model/userModel')
const path=require('path')
const bcrypt=require('bcrypt')
const {setUser}=require('../service/auth')

const handleUserSignUp = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).send("Email already exists.");

    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashPassword, role });

    return res.redirect('/login?signup=success');
  } catch (err) {
    console.log("Signup error:", err);
    return res.status(500).send("Signup failed.");
  }
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.redirect('/login?error=invalid');

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.redirect('/login?error=invalid');

  const token = setUser(user);
  res.cookie('uid', token, { httpOnly: true });

  if (user.role === 'admin') {
    return res.redirect('/admin-dashboard');
  } else {
    return res.redirect('/home');
  }
};


module.exports= {handleUserSignUp,handleUserLogin}
