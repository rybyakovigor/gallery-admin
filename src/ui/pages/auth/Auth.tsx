import { useNavigate } from 'react-router-dom';

import { Button, Form, FormProps, Input, Layout, message } from 'antd';
import { observer } from 'mobx-react-lite';

import authStore from '~/domain/auth/auth.store';

import { PageRoute } from '~/ui/navigation/pages';

type FieldType = {
  key: string;
};

const Auth = (): React.ReactElement => {
  const { isAuth, login } = authStore;
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    try {
      login(values.key);
      navigate(PageRoute.WORKS);
    } catch (error) {
      message.error((error as Error).message);
    }
  };

  if (isAuth) {
    navigate(PageRoute.ROOT);
  }

  return (
    <Layout style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <Form
        autoComplete="off"
        labelCol={{ span: 8 }}
        name="auth"
        style={{ width: '100%', maxWidth: 600 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
      >
        <Form.Item<FieldType> label="Ключ" name="key" rules={[{ required: true, message: 'Введите ключ!' }]}>
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button htmlType="submit" type="primary">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default observer(Auth);
