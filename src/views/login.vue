<script lang="ts" setup>
import { reactive, toRaw, ref, computed } from 'vue';
import { Form, Row, Col, Input, Button, Typography, Divider, message } from 'ant-design-vue';
import { sendSms, GtInit, getToken } from '@/request/common/login';
import { getEQP } from '@/service/sign';
import { useCountDown } from '@/hooks/index';
import { APP_TOKEN_KEY } from '@/utils/axios';
import storage from '@/utils/storage';
import router from '@/router';

const { Title } = Typography;

const useForm = Form.useForm;

interface LoginFormState {
  phone: string;
  verifyCode: string;
  disabled: boolean;
}

const [count, start] = useCountDown();

const state = reactive<LoginFormState>({
  phone: '',
  verifyCode: '',
  disabled: false,
});

const rulesRef = reactive({
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
      message: '请输入正确的手机号',
      trigger: 'blur',
    },
  ],
  verifyCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
});

const { validate, validateInfos } = useForm(state, rulesRef);

const fetchToken = async () => {
  const res = await getToken({
    phone: state.phone,
    code: state.verifyCode,
    eqp: getEQP(),
  });
  if (res.HttpStatusCode == 200 || res.HttpStatusCode == 215) {
    message.success('登陆成功');
    storage.set(APP_TOKEN_KEY, res.Data.tokenType + ' ' + res.Data.accessToken);
    router.replace({
      path: '/home',
    });
  } else {
    message.error(res.Error);
  }
};

const handleLogin = () => {
  validate()
    .then(() => {
      console.log(toRaw(state));
      fetchToken();
    })
    .catch(err => {
      console.log(err);
    });
};

// 极验
const sendVerifyCode = () => {
  var handle = (captchaObj: {
    appendTo: (arg0: string) => void;
    onReady: (arg0: () => void) => {
      (): any;
      new (): any;
      onSuccess: { (arg0: () => void): void; new (): any };
    };
    verify: () => void;
    getValidate: () => any;
  }) => {
    captchaObj.appendTo('#captcha-box');
    captchaObj
      .onReady(() => {
        captchaObj.verify();
      })
      .onSuccess(() => {
        var result = captchaObj.getValidate();
        if (!result) return alert('请完成验证');
        const params = {
          phone: state.phone,
          challenge: result.geetest_challenge,
          validate: result.geetest_validate,
          seccode: result.geetest_seccode,
        };
        sendSms(params)
          .then((res: any) => {
            start();
            console.log(res);
          })
          .catch((err: any) => {
            start();
            console.log(err);
          });
      });
  };
  validate(['phone'])
    .then(() => {
      GtInit()
        .then((res: any) => {
          initGeetest(
            {
              gt: res.Data.Gt,
              challenge: res.Data.Challenge,
              offline: !res.Data.Success,
              new_captcha: res.Data.New_Captcha,
              product: 'bind',
            },
            handle,
          );
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
};
</script>
<template>
  <div class="login-container">
    <div id="captcha-box"></div>
    <div class="login-pannel">
      <div class="left-pannel">
        <img src="https://iph.href.lu/260x400?fg=666666&bg=cccccc" alt="" />
      </div>
      <div class="right-pannel">
        <Typography>
          <Title :level="2" style="color: #aaa; text-align: center">北极星学社管理后台</Title>
        </Typography>
        <Form :model="state">
          <Row>
            <Col span="24">
              <Form.Item label="" name="phone" v-bind="validateInfos.phone">
                <Input
                  v-model:value="state.phone"
                  placeholder="请输入手机号"
                  size="large"
                  :maxlength="11"
                />
              </Form.Item>
            </Col>
            <Col span="24">
              <Form.Item
                label=""
                name="verifyCode"
                class="send-code-item"
                v-bind="validateInfos.verifyCode"
              >
                <Input
                  v-model:value="state.verifyCode"
                  placeholder="请输入验证码"
                  size="large"
                  :maxlength="4"
                />
                <div class="send-code-button">
                  <Divider type="vertical" />
                  <Button
                    type="link"
                    :disabled="count !== 10 && count !== 0"
                    @click="sendVerifyCode"
                  >
                    发送验证码{{ count == 10 || count == 0 ? '' : '(' + count + 's)' }}
                  </Button>
                </div>
              </Form.Item>
            </Col>
            <Col span="24">
              <Form.Item>
                <Button type="primary" size="large" block @click="handleLogin">登录</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.login-container {
  height: 100vh;
  position: relative;
}

.login-pannel {
  width: 700px;
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fafafa;

  .left-pannel {
    height: 400px;
    width: 260px;
    background: #333131;
  }

  .right-pannel {
    flex: 1;
    margin: 60px 60px 40px 60px;

    .send-code-item {
      position: relative;

      .send-code-button {
        position: absolute;
        right: 0px;
        top: 4px;
      }
    }
  }
}
</style>
