const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Middleware para encriptar la contraseña antes de guardarla
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar contraseñas
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);

async function createAdminUser() {
  const adminExists = await User.findOne({ username: 'admin' });

  if (!adminExists) {
    const admin = new User({
      username: 'admin',
      password: '201437',
    });
    await admin.save();
    console.log('Usuario admin creado con éxito');
  }
}

createAdminUser(); // Crea el usuario admin si no existe

module.exports = User;
