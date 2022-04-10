import PropTypes from 'prop-types'
import { FormProvider, useForm } from 'react-hook-form'
import { Form as AntdForm } from 'antd'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDeepCompareEffect } from 'react-use'

const Form = ({
  children,
  onSubmit,
  defaultValues = {},
  validationSchema = yup.object({}),
  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
  },
}) => {
  useDeepCompareEffect(() => {
    console.log('default value change')
    const formValue = methods.getValues()
    Object.keys(formValue).forEach((key) => {
      try {
        methods.setValue(key, defaultValues[key])
      } catch (e) {
        console.log(e)
        throw e
      }
    })
    return () => {}
  }, [defaultValues])
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  })
  const handleSubmit = (data, e) => {
    // console.log({ data, e })
    onSubmit(data)
  }
  return (
    <FormProvider {...methods}>
      <AntdForm {...formItemLayout} onFinish={methods.handleSubmit(handleSubmit)}>
        {children}
      </AntdForm>
    </FormProvider>
  )
}

Form.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  onSubmit: PropTypes.func,
  defaultValues: PropTypes.object,
  validationSchema: PropTypes.object,
  formItemLayout: PropTypes.object,
}

export default Form
