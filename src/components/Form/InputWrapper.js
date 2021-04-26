import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useFormContext } from 'react-hook-form'
import { Form } from 'antd'

const InputWrapper = ({
  name = undefined,
  label = ' ',
  colon = false,
  // defaultValueKey = 'defaultValue',
  changeEvent = 'onChange',
  eventValueGetter = (e) => e.target.value,
  children,
  formItemLayout = {
    labelAlign: 'right',
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  },
  onValueChange = () => {},
  ...rest
}) => {
  const { register, unregister, setValue, errors } = useFormContext()
  const [errorMessage, seterrorMessage] = useState(null)
  useEffect(() => {
    if (!name) {
      return () => {}
    }
    console.log('register field', name)
    register({
      name,
    })
    return () => unregister(name)
  }, [register, name, unregister])
  useEffect(() => {
    const error = errors[name]
    if (error) {
      seterrorMessage(error.message)
    }
    return () => {
      seterrorMessage('')
    }
  }, [errors, name])
  const handleChange = (...params) => {
    const value = eventValueGetter(...params)
    // console.log('update field', name, value)
    setValue(name, value)
    onValueChange(value)
  }

  const hasFeedback = false
  let status
  const required = false

  if (errorMessage) {
    status = 'error'
  }
  // const value = getValues(name)
  const inputProps = {
    ...rest,
    [changeEvent]: handleChange,
    // [defaultValueKey]: value,
  }
  return (
    // @ts-ignore
    <Form.Item
      {...formItemLayout}
      colon={colon}
      hasFeedback={hasFeedback}
      label={label}
      validateStatus={status}
      help={errorMessage}
      required={required}
    >
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, { key: index, ...inputProps })
      )}
    </Form.Item>
  )
}

InputWrapper.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  colon: PropTypes.bool,
  defaultValueKey: PropTypes.string,
  changeEvent: PropTypes.string,
  eventValueGetter: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  formItemLayout: PropTypes.object,
  onValueChange: PropTypes.func,
}

export default InputWrapper
