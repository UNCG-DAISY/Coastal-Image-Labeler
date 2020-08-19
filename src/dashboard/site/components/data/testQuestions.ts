const questions = [
  {
    type: 'radioGroup',
    required: true,
    label: 'Development Type',
    key: 'devType',
    buttons: [
      {
        name: 'Undeveloped',
        value: 'undeveloped',
      },
      {
        name: 'Developed',
        value: 'developed',
      },
    ],
  },
  {
    type: 'radioGroup',
    required: true,
    label: 'Washover Type',
    key: 'washoverType',
    buttons: [
      {
        name: 'No visible washover',
        value: 'noWashover',
      },
      {
        name: 'Visibile washover',
        value: 'washover',
      },
    ],
  },
  {
    type: 'radioGroup',
    required: true,
    label: 'Damage Type',
    key: 'dmgType',
    buttons: [
      {
        name: 'No visible damage to infrastructure',
        value: 'noDamage',
      },
      {
        name: 'Visible damage to infrastructure',
        value: 'damage',
      },
    ],
  },
  {
    type: 'checkboxGroup',
    required: true,
    min: 1,
    label: 'Impact Type(s)',
    key: 'impactType',
    buttons: [
      {
        name: 'Swash',
        value: 'swash',
      },
      {
        name: 'Collision',
        value: 'collision',
      },
      {
        name: 'Overwash',
        value: 'overwash',
      },
      {
        name: 'Inundation',
        value: 'inundation',
      },
    ],
  },
  {
    type: 'checkboxGroup',
    required: true,
    min: 1,
    label: 'Terrian Type(s)',
    key: 'terrianType',
    buttons: [
      {
        name: 'Sandy Coastline',
        value: 'sandyCoastline',
      },
      {
        name: 'Marsh',
        value: 'marsh',
      },
      {
        name: 'Inland',
        value: 'inland',
      },
      {
        name: 'River',
        value: 'river',
      },
    ],
  },
  {
    type: 'textField',
    required: false,
    label: 'Additional Comments',
    key: 'additionalComments',
    multiline: true,
    rows: 5,
  },
  {
    type: 'buttonSubmit',
    required: false,
    label: 'Quick Submit',
    docLink:
      'https://uncg-daisy.github.io/Coastal-Image-Labeler/docs/question_sets/BeachStateQuestionSet',
    key: 'quickSubmitButtons',
    tag: {
      water: true,
    },
    buttons: [
      {
        label: 'Label image as Unusable and go to next image',
        tag: {
          unusable: true,
        },
        key: 'tagAsUnusable',
      },
    ],
  },
]

const questionSetData = {
  questions: questions,
  name: 'Test name',
  description: 'Test desc',
}
export { questionSetData }
