import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'antd'
import { Form, TextInput, SubmitButton } from '../../components/Form'

export function DepositPage({
  initialValues,
  handleSubmit,
  validationSchema,
  loading,
  bankDetail,
}) {
  return (
    <div>
      <Typography.Title level={2} style={{ textAlign: 'center' }}>
        ฝากเงิน
      </Typography.Title>
      <div style={{ margin: '25px 0px' }}>
        <Typography.Title level={5}>ชื่อบัญชี: {bankDetail.bankOwnerName}</Typography.Title>
        <Typography.Title level={5}>เลขบัญชี: {bankDetail.bankAccount}</Typography.Title>
        <Typography.Title level={5}>ธนาคาร: {bankDetail.bank} </Typography.Title>
      </div>
      <Form onSubmit={handleSubmit} validationSchema={validationSchema}>
        <TextInput name="priceAmount" placeholder="จำนวณเงิน" suffix="THB" />
        <TextInput
          name="imageUrl"
          accept="image/*"
          type="file"
          placeholder="อัพโหลดรูป"
          formItemOptions={{ eventValueGetter: (e) => e.target.files[0] }}
        />
        <SubmitButton loading={loading} block type="primary">
          ฝาก
        </SubmitButton>
      </Form>
    </div>
  )
}

DepositPage.propTypes = {
  initialValues: PropTypes.any,
  validationSchema: PropTypes.any,
  bankDetail: PropTypes.object,
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func,
}