<script lang="ts" setup>
import router from '@/router';
import { Form, Row, Col, Input, Button, Typography, Divider } from 'ant-design-vue';

const handleLogin = () => {
  router.push({
    path: '/home',
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
          <Typography.Title :level="2" style="color: #aaa; text-align: center">北极星学社管理后台</Typography.Title>
        </Typography>
        <Form>
          <Row>
            <Col span="24">
              <Form.Item label="" name="phone">
                <Input placeholder="请输入手机号" size="large" :maxlength="11" />
              </Form.Item>
            </Col>
            <Col span="24">
              <Form.Item label="" name="verifyCode" class="send-code-item">
                <Input placeholder="请输入验证码" size="large" :maxlength="4" />
                <div class="send-code-button">
                  <Divider type="vertical" />
                  <Button type="link">发送验证码</Button>
                </div>
              </Form.Item>
            </Col>
            <Col span="24">
              <Form.Item>
                <Button type="primary" size="large" block @click="handleLogin">登录</Button>
              </Form.Item>
            </Col>
            <Col span="24">
              <Form.Item> 暂不需要输入手机号和验证码直接登录 </Form.Item>
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
