import PropTypes from 'prop-types'
import { Card, Layout } from 'antd'

const AuthLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <Layout.Content style={{ padding: '70px 15px', display: 'flex', alignItems: 'center' }}>
        <Card
          style={{
            width: 600,
            maxWidth: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            boxShadow: '0px 3px 10px #00000029',
            borderRadius: 20,
            padding: '15px 30px',
          }}
        >
          {children}
        </Card>
      </Layout.Content>
    </Layout>
  )
}

AuthLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

export default AuthLayout
