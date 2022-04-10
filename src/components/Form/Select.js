import PropTypes from 'prop-types'
import InputWrapper from './InputWrapper'
import { Select } from 'antd'

const { Option } = Select

const SelectInput = ({
  name,
  label = '',
  type = 'text',
  formItemOptions = { formItemLayout: null },
  options,
  ...rest
}) => {
  return (
    <InputWrapper name={name} eventValueGetter={(e) => e} label={label} {...formItemOptions}>
      <Select type={type} {...rest}>
        {options.map(({ value, label }) => (
          <Option key={value} value={value}>
            {label}
          </Option>
        ))}
      </Select>
    </InputWrapper>
  )
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  formItemOptions: PropTypes.object,
}

export default SelectInput
