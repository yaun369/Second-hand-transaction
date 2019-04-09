<template>
  <el-menu class="navbar" mode="horizontal">
    <!-- 收缩侧边栏 单纯 -->
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

    <breadcrumb class="breadcrumb-container"></breadcrumb>
    <div class="right-menu">
      <!-- 待观察 -->
      <!-- <error-log class="errLog-container right-menu-item"></error-log> -->

      <el-tooltip effect="dark" :content="$t('navbar.screenfull')" placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip>

      <!-- <lang-select class="international right-menu-item"></lang-select> -->

      <el-tooltip effect="dark" :content="$t('navbar.theme')" placement="bottom">
        <theme-picker class="theme-switch right-menu-item"></theme-picker>
      </el-tooltip>

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <svg-icon icon-class="people" class="user-avatar"/>
          <!-- <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'"> -->
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- <router-link to="/">
            <el-dropdown-item>
              {{$t('navbar.dashboard')}}
            </el-dropdown-item>
          </router-link> -->
          <!-- <a target='_blank' href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item>
              {{$t('navbar.github')}}
            </el-dropdown-item>
          </a> -->
          <el-dropdown-item>
            <span  @click="showPasswordForm=true"  style="display:block;">{{$t('navbar.HSBopera')}}</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="showPasswordForm"
      width="30%"
      >
      <el-form :model="formForNotive"  ref="ruleForm" :rules="rules" >
        <el-form-item label="新密码" :label-width="formLabelWidth"  prop="new">
          <el-input v-model="formForNotive.new" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" :label-width="formLabelWidth"  prop="newAgain">
          <el-input v-model="formForNotive.newAgain" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="旧密码" :label-width="formLabelWidth"  prop="old">
          <el-input v-model="formForNotive.old" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showPasswordForm = false">取 消</el-button>
        <el-button type="primary" @click="changePassword('ruleForm')"
        :disabled="waitAddNotice"
        :loading="waitAddNotice">确 定</el-button>
      </span>
    </el-dialog>
  </el-menu>
</template>

<script>
import { getRoles,setRoles } from '@/utils/auth'
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
// import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'

import {changePasswordForAdmin_api,changePasswordForSeller_api} from '@/api/common'

export default {
  data(){
    var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formForNotive.new) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      waitAddNotice:false,
      showPasswordForm:false,
      formForNotive:{
        new:'',
        newAgain:'',
        old:'',
      },
      rules:{
        new:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        newAgain:[
          { validator: validatePass2, trigger: 'blur',required: true }
        ],
        old:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
      },
      formLabelWidth:'120px',
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    // LangSelect,
    ThemePicker
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ])
  },
  methods: {
    async changePassword(){
      let res = await new Promise((res,rej)=>{
        this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
              res(true)
            } else {
              res(false)
            }
          })
        })
        if(!res){
          return 
        }
      let roles = []
      try{
        roles = JSON.parse(getRoles())
      }catch(e){
        console.log(e)
        return
      }
      let sendData = {
        new_pw : this.formForNotive.new,
        new_pw2:this.formForNotive.newAgain,
        old_pw:this.formForNotive.old
      }
      let tempPromise = ''
      if(roles.indexOf('admin')!==-1||roles.indexOf('admin2')!==-1){
        //管理员
        tempPromise =  changePasswordForAdmin_api(sendData)
      }
      if(roles.indexOf('seller')!==-1||roles.indexOf('seller2')!==-1){
        //卖家
        tempPromise =  changePasswordForSeller_api(sendData)
      }
      tempPromise.then(data=>{
          this.waitAddNotice = false
          this.showPasswordForm = false
          if(data.status===0){
            this.$notify({
              title: '成功',
              message: '密码已修改',
              type: 'success'
            })
          }else{
            this.$notify({
              title: '失败',
              message: '操作失败',
              type: 'error'
            })
          }
        }).catch(e=>{
          this.waitAddNotice = false
          this.showPasswordForm = false
          console.error('manageShop:changePasswordForSeller_api or changePasswordForAdmin_api 接口错误')
        })
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
