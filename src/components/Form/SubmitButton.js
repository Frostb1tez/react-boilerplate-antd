import PropTypes from 'prop-types'
import InputWrapper from './InputWrapper'
import { Button } from 'antd'

const SubmitButton = ({ label, formItemOptions = {}, children = 'Submit', ...rest }) => {
  return (
    <InputWrapper label={label} {...formItemOptions}>
      <Button type="primary" htmlType="submit" {...rest}>
        {children}
      </Button>
    </InputWrapper>
  )
}

SubmitButton.propTypes = {
  label: PropTypes.string,
  formItemOptions: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

export default SubmitButton
