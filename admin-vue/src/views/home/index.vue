<style lang="stylus">
.dashboard-container
  .dashboard-hbs
    color #555
    margin-left 20%
    transition all 1s 
  .hbs-down
    transform translateY(60px)
</style>

<template>
  <div class="dashboard-container" id="home">
    <!-- 数字测试 -->
    <!-- <el-form :model="testform" :rules="testrule" ref="testref">
      <el-form-item label="测试" prop="testinput">
        <el-input v-model.number="testform.testinput" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="测试" prop="testinput2">
        <el-input v-model="testform.testinput2" placeholder="请输入内容"></el-input>
      </el-form-item>
    </el-form>
    {{testform.testinput}}
    <el-button type="primary" @click="submitForm('testref')">立即创建</el-button> -->
    <!-- <el-form :model="formForNotive" >
      <el-form-item  label="所属行业" >
        <el-select v-model="formForNotive.industry" placeholder="请选择行业">
          <el-option
            v-for="item in industryList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form> -->
    <!-- <input type="file" ref="i1" multiple >
    <button ref="b1" @click="upload">upload</button>
    <button  @click="getfile">getfile</button> -->
    <component :is="currentRole" class="dashboard-hbs " :class="down"></component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import admin from './admin'
import seller from './seller'

import {test} from '@/api/seller'
import { getRoles } from '@/utils/auth' // getToken from cookie

import uploadFn from '@/utils/aahbs'
let stop = false

export default {
  mounted(){
    setTimeout(()=>{
      this.down = "hbs-down"
    },800)
  },
  beforeDestroy(){
  },
  created() {
    let roles = []
    try{
      roles = JSON.parse(getRoles())
    }catch(e){
      console.log(e)
      roles = []
    }
    if(roles.indexOf('admin')>-1||roles.indexOf('admin2')>-1){
      this.currentRole = 'admin'
    }else{
      this.currentRole = 'seller'
    }
  },
  name: 'home',
  components: { 
    admin, 
    seller 
  },
  data() {
    return {
      testinput:"",
      testform:{},
      testrule:{
        testinput:[
          {
            required:true,message:'请输入不小于0数字',trigger: 'blur' ,type:'number',min:0
          }
        ],
        testinput2:[
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      //-------------------
      timer:"",
      timer2:"",
      formForNotive:{
        industry:'edu',
      },
      industryList: [{  //通过接口获取 created时
          value: 'edu',
          label: '教育'
        }, {
          value: 'others',
          label: '其他'
        }],
      currentRole: 'admin',
      down:''
    }
  },
  methods:{
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    // getfile(){
    //   console.log(this.$refs['i1'].files)
    // },
    async upload(){
      let files = Array.prototype.slice.call(this.$refs['i1'].files) 
      let allUrl = await uploadFn(files)
      console.log(allUrl)
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  
  
}
</script>
