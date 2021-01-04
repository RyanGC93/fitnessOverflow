var express = require('express');
const bcrypt = require('bcryptjs')
var router = express.Router();
const {loginUser} = require('../utils/auth')

const { asyncHandler, csrfProtection } = require('../utils/utils.js')
const db = require('../db/models')
const { check, validationResult } = require('express-validator');





/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', csrfProtection, (req, res) =>{
  const user = db.User.build()
  res.render('user-signup', {
    title: 'Signup',
    user,
    csrfToken: req.csrfToken(),
  })
})

const userValidators = [
  check('username')
    .exists({checkFalsy: true})
    .withMessage('Please provide a value for username.')
    .isLength({max: 20})
    .withMessage('Username must be less than 20 characters.'),
  check('email')
    .exists({checkFalsy: true})
    .withMessage('Please provide a value for email.')
    .isLength({max: 255})
    .withMessage('Email must be less than 255 characters.')
    .custom((value) => {
    return db.User.findOne({ where: { email: value } })
      .then((user) => {
        if (user) {
          return Promise.reject('The provided Email Address is already in use by another account');
        }
      });
  }),
  check('password')
    .exists({checkFalsy: true})
    .withMessage('Please provide a value for password.')
    .isLength({max: 50})
    .withMessage('Password must be less than 50 characters.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
  check('confirmPassword')
    .exists({checkFalsy: true})
    .withMessage('Please provide a value for confirm password.')
    .isLength({max: 50})
    .withMessage('Confirm Password must be less than 50 characters.')
    .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Confirm Password does not match Password');
    }
    return true;
  }),
]

router.post('/register', csrfProtection, userValidators, asyncHandler(async (req, res) =>{
  const {
    email,
    username,
    password
  } = req.body

  const user = db.User.build({
    email,
    username
  })

  const validatorErrors = validationResult(req)

  if(validatorErrors.isEmpty()){
    const hashedPassword = await bcrypt.hash(password, 10)
    user.hashedPassword = hashedPassword
    await user.save();
    loginUser(req, res, user)
    res.redirect('/')
  }
  else{
    const errors = validatorErrors.array().map((error) => error.msg)
    res.render('user-signup', {
      title: 'Signup',
      user,
      errors,
      csrfToken: req.csrfToken(),
    })
  }
}))

router.get('/login', csrfProtection, (req, res) => {
  res.render('user-login', {
    title: 'Login',
    csrfToken: req.csrfToken(),
  })
})

const loginValidators = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for email'),
  check('password')
    .exists({
      checkFalsy: true
    })
    .withMessage('Please provide a value for password'),
]


router.post('/login', csrfProtection, loginValidators, asyncHandler( async(req, res) => { 
  const {
    email,
    password
  } = req.body;

  let errors =[]
  const validatorErrors = validationResult(req)
  
  if (validatorErrors.isEmpty()) {
    const user = await db.User.findOne({
      where: {email}
    })
    if (user !== null) {
      const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString())
      if(passwordMatch) {
        loginUser(req, res, user)
        return res.redirect('/')
      }
    }
  errors.push('Login Failed For The Password and Email')  
  } else {
    errors = validatorErrors.array().map((error) => error.msg)
    
  }
  res.render('user-login', {
    title: "Login",
    email, 
    errors,
    csrfToken: req.csrfToken()
})
}))

module.exports = router;
