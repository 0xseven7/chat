export function getRedirectPath ({type, avatar}) {

  // 根据用户信息返回跳转地址

  // user.type /boss /genius
  // user.avatar /bossinfo /genius info
  let url = (type === 'boss') ? '/boss' : '/genius';
  if (!avatar) {
    url += 'info';
  }
  console.log(avatar, url);
  return url;
}
export  function getChatId (userId, targetId) {
  return [userId, targetId].sort().join('_');
}