import {upFileToken_api} from '@/api/common' 
// const COS = require('./cos-js-sdk-v5.min.js')
const COS = window.COS
const Bucket = 'threecloud-1253114089';
const Region = 'ap-shanghai';
//只接受 文件数组 非类数组！！如果你想对类数组处理可以在下面进行转换
let upLoadFile = function (allFile){
  let length = 0
  if(allFile instanceof Array){
    length = allFile.length
  }else{
    allFile = [allFile]
    length = 1
  }
  let promiseAll = []
  return new Promise((resUp,rejUp)=>{
    //初始化
    let cos = new COS({
      getAuthorization: function (options, callback) {
        // callback({
        //           TmpSecretId: 'AKIDH3UROAZYg2YS39RqlOhZciWZNAiNUWsQ',
        //           TmpSecretKey: 'tZ8mwW3rOYwhYvNSOeDkd3KLgFD2pLk1',
        //           XCosSecurityToken: '40ffcf2987cfacac7a0f86a11b4294a066852dc230001',
        //           ExpiredTime: 1530851445,
        //       });
        upFileToken_api().then(data=>{
          data = data.data
          callback({
                  TmpSecretId: data.credentials && data.credentials.tmpSecretId,
                  TmpSecretKey: data.credentials && data.credentials.tmpSecretKey,
                  XCosSecurityToken: data.credentials && data.credentials.sessionToken,
                  ExpiredTime: data.expiredTime,
              })
        }).catch(err=>{
          console.log(err,'upFileToken_api')
        })
        }
    });
    //上传一个文件 返回一个promise
    function upLoadOneFile(file) {
        return new Promise((oneOK,oneFail)=>{
          cos.sliceUploadFile({
              Bucket: Bucket,
              Region: Region,
              Key: new Date().getTime()+file.name.slice(-100),
              Body: file,
              onHashProgress: function (progressData) {
                  console.log('校验中', JSON.stringify(progressData));
              },
              onProgress: function (progressData) {
                  console.log('上传中', JSON.stringify(progressData));
              },
          }, function (err, data) {
						// console.log(data)
              if(err){
								console.log("错误")
								console.log(err)
                oneFail()
              }else{
                oneOK(data.Location)
								
              }
          });
        })
      // })  
    };
    function upLoadAllFile(allFile){
      for(let i=0;i<length;i++){
        promiseAll.push(upLoadOneFile(allFile[i]))
      }
      Promise.all(promiseAll).then(allUrl=>{
        for(let i = 0;i<allUrl.length;i++){
          allUrl[i] = "http://"+allUrl[i]
        }
        resUp(allUrl)
      }).catch(err=>{
        rejUp()
      })
    }
    upLoadAllFile(allFile)
  })
    

}
export default upLoadFile