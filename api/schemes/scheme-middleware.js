const Scheme = require('./scheme-model')
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  const { id } = req.params
  console.log(id)
  try {
    const scheme = await Scheme.findById(id)
    if (!scheme) {
      res.status(404).json({ message: `scheme with scheme_id ${id} not found` })
    }
    else {next()}
  }
  catch (err) {
    next(err)
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = async (req, res, next) => {
  const { scheme_name } = await req.body
  try {
    if (!scheme_name || typeof scheme_name !== "string" || scheme_name === "") {
      res.status(400).json({ message: "invalid scheme_name"})
    } else {
      next()
    }
  }
  catch (err) {
    next(err)
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const { instructions, step_number } = await req.body
  try {
    if ( 
    !instructions ||
    instructions === '' ||
    typeof instructions !== "string" ||
    typeof step_number !== "number" ||
    step_number < 1 ) {
      res.status(400).json({ message: "invalid step"})
    } else {
      next()
    }
  }
  catch (err) {
    next(err)
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
