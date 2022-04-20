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
      <Typography.Title level={1} style={{ textAlign: 'center' }}>
        {process.env.REACT_APP_ROOM === 'room1' ? 'แจ้งฝาก ห้อง789' : 'ฝากเงิน'}
      </Typography.Title>
      {process.env.REACT_APP_ROOM === 'room1' && (
        <Typography.Title level={5} style={{ color: '#ff0000', margin: '0px' }}>
          *ข้อมูลที่จำเป็นต้องกรอก
        </Typography.Title>
      )}
      <div style={{ margin: '25px 0px' }}>
        <Typography.Title level={4}>ชื่อบัญชี: {bankDetail.bankOwnerName}</Typography.Title>
        <Typography.Title level={4}>เลขบัญชี: {bankDetail.bankAccount}</Typography.Title>
        <Typography.Title level={4}>ธนาคาร: {bankDetail.bank} </Typography.Title>
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
