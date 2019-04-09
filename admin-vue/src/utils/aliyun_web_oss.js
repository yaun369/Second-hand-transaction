import {getPolicy_api} from '@/api/common';
 //目前的处理是接收ELementUI File对象文件，不支持数组上传
 let upLoadFile= function  uploadFn(file){
 	return new Promise(function(resolve, reject){
 		handleUpFile(file)
 		function handleUpFile(file){
 			  //上传成功的url
	    let callbackUrl=""
	    getPolicy_api().then((res) => {
			console.log("获取签名")
			
          const fd = new FormData()
		      const Obj=res.data
            let index1 = file.name.lastIndexOf(".");
            let index2 = file.name.length;
            let postf = file.name.substring(index1, index2); //后缀名
			 //  随机生成文件名称
            let fileRandName = Date.now() + "" + parseInt(Math.random() * 1000);
            let fileName = fileRandName + postf;
          console.log(fileName)
          fd.append('OSSAccessKeyId', Obj.accessid)
          fd.append('policy', Obj.policy)
          fd.append('signature', Obj.signature)
          fd.append('key', fileName)
          fd.append('success_action_status', 200)
          fd.append('file', file, fileName)
          const xhr = new XMLHttpRequest()
          xhr.open('post', Obj.host, true)
		  //进度
//           xhr.upload.addEventListener('progress', (evt) => {
//             this.progress = Math.round((evt.loaded) * 100 / evt.total)
//           }, false)
          xhr.addEventListener('load', (e) => {
            if (e.target.status !== 200) {
              console.log(e.target.response)
              console.log('上传失败！')
              reject('false')
            }
            if (e.target.status === 200) {
              let callbackUrl = Obj.host + '/' + fileName;
			  //console.log(imgUrl)
			  resolve(callbackUrl)
            }
          }, false)
          xhr.send(fd)

        })
 		}
 	})
	   
	
}
export default upLoadFile