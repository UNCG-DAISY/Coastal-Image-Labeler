export default [
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
]
