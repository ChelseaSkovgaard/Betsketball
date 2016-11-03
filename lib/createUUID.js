module.exports = function createUUID(g){
  let location = g.location.split(' ').join('-')
  let key = location + '-' + g.date
  return key ;
}
