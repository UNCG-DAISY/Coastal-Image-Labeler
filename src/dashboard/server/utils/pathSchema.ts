const keys = ['compressed', 'gradcam']

const validationObj = {
  type: String,
  unique: true,
  maxlength: [128, 'Path can not be longer than 128 characters'],
}

const fullPathValidationObj = {
  original: {
    type: String,
    required: [true, 'Please provide catalog path'],
    unique: true,
    maxlength: [128, 'Path can not be longer than 128 characters'],
  },
}

keys.map((key) => {
  fullPathValidationObj[key] = validationObj
})

export default fullPathValidationObj
