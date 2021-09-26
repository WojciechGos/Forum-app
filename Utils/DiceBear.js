const { createAvatar } = require('@dicebear/avatars')
const style  = require('@dicebear/croodles')

function createProfileImage(seed){
  return createAvatar(style, {
    seed: seed
  });
}



module.exports.createProfileImage = createProfileImage