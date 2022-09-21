import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'johnn@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jee Doe',
    email: 'jee@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
