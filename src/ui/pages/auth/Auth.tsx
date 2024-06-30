// Core
import { Button, Form, FormProps, Input, Layout, message } from 'antd';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

// Stores
import authStore from '~/domain/auth/auth.store';

// Types
import { Page } from '~/ui/navigation/pages';

type FieldType = {
  key: string;
};

const Auth = (): React.ReactElement => {
  const { login, isAuth } = authStore;
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    try {
      login(values.key);
      navigate(Page.WORKS);
    } catch (error) {
      message.error((error as Error).message);
    }
  };

  if (isAuth) {
    navigate(Page.ROOT);
  }

  return (
    <Layout style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <Form
        name="auth"
        style={{ width: '100%', maxWidth: 600 }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType> label="Ключ" name="key" rules={[{ required: true, message: 'Введите ключ!' }]}>
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default observer(Auth);
