//app.js
const Bmob = require('utils/Bmob-1.7.0.min.js');
Bmob.initialize('e0ec3539a06757d50c24f827689dc745', 'c78133dc19f7d1301595422258e03b00');
App({
  onLaunch: function() {
    Bmob.User.auth().then(res => {
      // console.log(res)
      // console.log('一键登陆成功')
    }).catch(err => {
      console.log(err)
    });
  }
})