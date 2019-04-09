<style lang="stylus">
.login-container {
  .hbs-login-switch {
    text-align: right;
    box-sizing: border-box;
    height: 40px;
    padding-right: 20px;

    .el-switch__label {
      color: #aaaaaa;

      & * {
        font-size: 16px;
      }
    }

    .el-switch__label.is-active {
      color: #ffffff;

      & * {
        font-size: 18px;
      }
    }
  }
}

.forget-password {
  font-size: 10px;
  color: #ffffff;
  text-align: right;
  margin-bottom: 10px;
  cursor: pointer;
}
</style>

<template>
  <div>
    <div class="login-container">
      <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
        <div class="title-container">
          <h3 class="title" :style="isAdmin?'color:#E6A23C':''">{{ITEM_NAME}}</h3>
          <!-- <lang-select class="set-language"></lang-select> -->
        </div>
        
        <el-form-item prop="username">
          <span class="svg-container svg-container_login">
            <svg-icon icon-class="user" />
          </span>
          <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="手机号码" />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon icon-class="eye" />
          </span>
        </el-form-item>
        <div class="forget-password" v-if="SMS_close=='1'" @click="centerDialogVisible = true">忘记密码</div>
        <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">{{$t('login.logIn')}}</el-button>
      </el-form>
    </div>
    <el-dialog
        title="重置密码"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <el-form :model="findForm">
          <el-form-item label="账号手机号" label-width="90px">
            <el-input type='text' v-model="findForm.phone" autoComplete="on" placeholder="手机号码" />
          </el-form-item>
          <div class="codebox">
            <el-form-item label="验证码" label-width="90px">
              <el-input v-model="findForm.code" autoComplete="on" placeholder="验证码" />
            </el-form-item>
            <el-button type="primary" style="width:30%;height:36px;margin-left:10px" @click="sendCode">{{codetimeShow?codetime+'秒后获取':'获取验证码'}}</el-button>
          </div>
          <el-form-item label="输入新密码" label-width="90px">
            <el-input v-model="findForm.password1" type='password' autoComplete="on" placeholder="新密码" />
          </el-form-item>
          <el-form-item label="确认新密码" label-width="90px">
            <el-input v-model="findForm.password2" type='password' autoComplete="on" placeholder="确认密码" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="resetPassword">确 定</el-button>
        </div>
      </el-dialog>
  </div>  
</template>

<script>
import { isvalidUsername } from "@/utils/validate";
import LangSelect from "@/components/LangSelect";
import { getVerificationCode, resetPassword, login } from "@/api/login";
export default {
  components: { LangSelect },
  name: "login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("请输入手机号"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6位"));
      } else {
        callback();
      }
    };
    return {
      // -------------
      isAdmin: false, //控制平台和商家角色
      tabRole: "",
      // -------------
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      passwordType: "password",
      loading: false,
      centerDialogVisible: false,
      formLabelWidth: "120px",
      findForm: {
        phone: "",
        code: "",
        password1: "",
        password2: ""
      },
      codetimeShow: false,
      codetime: 60,
      ITEM_NAME: process.env.ITEM_NAME,
      SMS_close: process.env.SMS_close
    };
  },
  methods: {
    // --------------
    // --------------
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },
    /**
     * 获取验证码
     */
    sendCode() {
      if (!this.codetimeShow) {
        let phoneReg = /^[1][0-9][0-9]{9}$/;
        if (this.findForm.phone == "") {
          return this.$message("请输入手机号");
        }
        if (!phoneReg.test(this.findForm.phone)) {
          return this.$message("请输入正确手机号");
        }
        getVerificationCode({ phone: this.findForm.phone }).then(
          response => {}
        );
        let that = this;
        that.codetimeShow = true;
        let interval = setInterval(() => {
          if (that.codetime-- <= 0) {
            that.codetime = 60;
            that.codetimeShow = false;
            clearInterval(interval);
          }
        }, 1000);
      }
    },
    /**
     * 重置密码
     */
    resetPassword() {
      if (this.findForm.phone == "") {
        return this.$message("请输入手机号");
      } else if (this.findForm.code == "") {
        return this.$message("请输入短信验证码");
      } else if (this.findForm.password1 == "") {
        return this.$message("请输入密码");
      } else if (this.findForm.password2 == "") {
        return this.$message("请确认密码");
      } else if (this.findForm.password1 != this.findForm.password2) {
        return this.$message("两次密码不一致");
      }
      resetPassword({
        phone: this.findForm.phone,
        code: this.findForm.code,
        pass: this.findForm.password2
      }).then(response => {
        if (response.status == 0) {
          this.$message(response.data.message);
          this.centerDialogVisible = false;
        }
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          //对 平台 和 卖家 做区分
          let loginPromise;
            loginPromise = this.$store.dispatch("LoginByAdminname", {
              admin_name: this.loginForm.username,
              admin_password: this.loginForm.password,
              captcha: 1234
            });
          loginPromise
            .then(() => {
              this.loading = false;
              this.$router.push({ path: "/" });
            })
            .catch(e => {
              console.log("no", e);
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1)
      // const hashObj = getQueryObject(hash)
      // const originUrl = window.location.origin
      // history.replaceState({}, '', originUrl)
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // }
      // const codeName = hashObj[codeMap[this.auth_type]]
      // if (!codeName) {
      //   alert('第三方登录失败')
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' })
      //   })
      // }
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
.v-modal {
  width: 0 !important;
}
.codebox {
  display: flex;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    // padding: 6px 5px 6px 15px;
    padding: 5px 5px 5px 10px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 18px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
