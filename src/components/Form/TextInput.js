import PropTypes from 'prop-types'
import InputWrapper from './InputWrapper'
import { Input } from 'antd'

const TextInput = ({ name, label, type = 'text', formItemOptions = {}, ...rest }) => {
  return (
    <InputWrapper name={name} label={label} {...formItemOptions}>
      <Input type={type} {...rest} />
    </InputWrapper>
  )
}

TextInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  formItemOptions: PropTypes.object,
}

export default TextInput
