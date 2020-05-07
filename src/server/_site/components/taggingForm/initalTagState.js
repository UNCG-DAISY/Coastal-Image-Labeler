
const initalTagState = {
    devType: -1,
    washoverType: -1,
    damageType: -1,
    impactType: {
      swash:false,
      collision:false,
      overwash:false,
      inundation:false
    },
    terrianType: {
      sandyCoastline:false, 
      marsh:false, 
      inland:false, 
      river:false
    },
    water: 0,
    comments:''
};

export default initalTagState