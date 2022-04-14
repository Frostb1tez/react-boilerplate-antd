import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'antd'
import { Form, TextInput, SubmitButton, Select } from '../../components/Form'

export function WithdrawPage({
  initialValues,
  validationSchema,
  handleSubmit,
  loading,
  bankOptions,
}) {
  return (
    <div>
      <Typography.Title level={1} style={{ textAlign: 'center' }}>
        ถอนเงิน
      </Typography.Title>

      <Form
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <TextInput name="bankAccount" placeholder="xxxxxxxxxx" label="เลขที่บัญชี" />
        <TextInput name="bankOwnerName" placeholder="สวัสดี มีชัย" label="ชื่อบัญชี" />
        <Select name="bank" placeholder="ไทยพาณิชย์" label="ธนาคาร" options={bankOptions} />
        <TextInput name="priceAmount" placeholder="xxx" label="จำนวณเงินที่ถอน" suffix="THB" />
        <SubmitButton loading={loading} block type="primary">
          ถอน
        </SubmitButton>
      </Form>
    </div>
  )
}

WithdrawPage.propTypes = {
  initialValues: PropTypes.object,
  bankOptions: PropTypes.object,
  validationSchema: PropTypes.any,
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func,
}
