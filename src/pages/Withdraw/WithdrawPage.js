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
        {process.env.REACT_APP_ROOM === 'room1' ? 'แจ้งถอน ห้อง789' : 'ถอนเงิน'}
      </Typography.Title>

      <Form
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <TextInput name="bankAccount" label="เลขที่บัญชี" />
        <TextInput name="bankOwnerName" label="ชื่อบัญชี" />
        <Select name="bank" label="ธนาคาร" options={bankOptions} />
        <TextInput name="priceAmount" label="จำนวณเงินที่ถอน" suffix="THB" />
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
