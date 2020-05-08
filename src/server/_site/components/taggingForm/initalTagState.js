
const initalTagState = {
    devType: -1,
    washoverType: -1,
    damageType: -1,
    //hasSand:-1, //New state
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
    sandType:{
      rough:false,//default values, unchecked
      coarse:false,
      getsEverywhere:false
    },
    water: 0,
    comments:''
};

export default initalTagState