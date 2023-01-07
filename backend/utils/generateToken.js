import jwt from 'jsonwebtoken'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.VITE_JWT_SECRET, {
    expiresIn: '30d',
  })
}

export default generateToken
