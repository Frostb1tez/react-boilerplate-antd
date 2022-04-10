import PropTypes from 'prop-types'
import { Card, Layout } from 'antd'
import BG from '../images/bg.jpg'

const AuthLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <Layout.Content
        style={{
          padding: '70px 30px',
          display: 'flex',
          alignItems: 'center',
          backgroundImage: `url(${BG})`,
          backgroundSize: 'cover',
        }}
      >
        <Card
          style={{
            width: 600,
            maxWidth: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            boxShadow:
              '0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),0 1px 5px 0 rgb(0 0 0 / 12%)',
            borderRadius: 20,
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
