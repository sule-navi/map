<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">OneMapEditor</div>
      <a-form
        name="custom-validation"
        ref="formRef"
        :model="param"
        :rules="rules"
        v-bind="layout"
        @finish="handleFinish"
      >
        <a-form-item required has-feedback label="用户名" name="username">
          <a-input v-model:value="param.username" />
        </a-form-item>
        <a-form-item required has-feedback label="密码" name="password">
          <a-input v-model:value="param.password" type="password" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 19, offset: 2 }">
          <a-button type="primary" html-type="submit" block
            >登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</a-button
          >
        </a-form-item>
      </a-form>
      <!-- <el-form
        :model="param"
        :rules="rules"
        ref="ruleForm"
        label-width="0px"
        class="ms-content"
      >
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="用户名">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="密码"
            v-model="param.password"
            @keyup.enter="submitForm()"
          >
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
      </el-form> -->
    </div>
    <!-- 登录动画部分   平时不用可注释 -->
    <!-- <video autoplay="true" muted loop width="100%" height="100%" style="z-index: 1; position: fixed; object-fit: fill;"> 
      <source  src="../assets/images/bg.mp4" type="video/mp4">
    </video> -->
  </div>
</template>

<script>
import { reactive, onMounted, computed, onBeforeUnmount, ref, toRefs } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { get } from "@/api/request";
import URL from "@/api/url";

export default {
  setup() {
    const formRef = ref();
    const state = reactive({
      param: {
        username: "",
        password: "",
        database: "parkRegion",
      },
      rules: {
        username: [{ validator: validatePass, trigger: "change" }],
        password: [{ validator: validatePass2, trigger: "change" }],
      },
    });
    let validatePass = async (rule, value) => {
      if (value === "") {
        return Promise.reject("Please input the password");
      } else {
        if (state.param.username !== "") {
          formRef.value.validateField("checkPass");
        }

        return Promise.resolve();
      }
    };

    let validatePass2 = async (rule, value) => {
      if (value === "") {
        return Promise.reject("Please input the password again");
      } else {
        return Promise.resolve();
      }
    };

    const layout = {
      labelCol: {
        span: 4,
        offset: 2,
      },
      wrapperCol: {
        span: 14,
        offset: 1,
      },
    };
    const ruleForm = ref(null);
    const router = useRouter();
    const handleFinish = (values) => {
      //校验成功
      const param = {};
      // get(URL.login, param)
      //   .then((rest) => {
      //     ElMessage.success({
      //       message: "登录成功",
      //       center: true,
      //       type: "success",
      //       duration: 700,
      //     });
      //     router.push({
      //       path: "/list",
      //     });
      //   })
      //   .catch((err) => {
      //     ElMessage({
      //       message: err,
      //       duration: 700,
      //       center: true,
      //       type: "error",
      //     });
      //   })
      //   .finally((f) => {});
      ElMessage.success({
        message: "登录成功",
        center: true,
        type: "success",
        duration: 700,
      });
      router.push({
        path: "/list",
      });
    };

    return {
      ...toRefs(state),
      ruleForm,
      handleFinish,
      layout,
    };
  },
};
</script>

<style scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-image: url(../assets/images/logo.jpg);
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #0959a9;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
  z-index: 2;
  /* alternate：动画先正常运行再反方向运行，并持续交替运行 */
  /* animation: horizontal 18s linear 0s infinite alternate,
    vertical 12s linear 0s infinite alternate; */
}
.ms-login:hover {
  animation-play-state: paused;
  background: rgba(255, 255, 255, 0.5);
}
@keyframes horizontal {
  0% {
    left: 180px;
  }
  100% {
    /* 运动最大距离为盒子长度减去球的长度 */
    left: calc(100% - 150px);
  }
}
@keyframes vertical {
  0% {
    top: 180px;
  }
  100% {
    /* 运动最大距离为盒子高度减去球的高度 */
    top: calc(100% - 40px);
  }
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
.el-select {
  width: 100%;
}
.el-select-dropdown__item {
  font-size: 12px;
}
.ant-form {
  padding-top: 24px;
}
</style>
