import { useState, useRef, useEffect } from 'react'
import * as yup from 'yup'
import request from '../../utils/request'
import { message } from 'antd'
import { useAuth } from '../../contexts/AuthContext'
import liff from '@line/liff'

export function withWithdrawPage(Component) {
  function withWithdrawPage() {
    const [loading, setLoading] = useState(false)
    const { state } = useAuth()
    const bankOptions = [
      {
        value: 'BBL',
        label: 'ธนาคารกรุงเทพ',
      },
      {
        value: 'KBANK',
        label: 'ธนาคารกสิกรไทย',
      },
      {
        value: 'KTB',
        label: 'ธนาคารกรุงไทย',
      },
      {
        value: 'TTB',
        label: 'ธนาคารทหารไทยธนชาต',
      },
      {
        value: 'SCB',
        label: 'ธนาคารไทยพาณิชย์',
      },
      {
        value: 'BAY',
        label: 'ธนาคารกรุงศรีอยุธยา',
      },
      {
        value: 'KKP',
        label: 'ธนาคารเกียรตินาคินภัทร',
      },
      {
        value: 'CIMBT',
        label: 'ธนาคารซีไอเอ็มบีไทย',
      },
      {
        value: 'TISCO',
        label: 'ธนาคารทิสโก้',
      },
      {
        value: 'UOBT',
        label: 'ธนาคารยูโอบี',
      },
      {
        value: 'TCD',
        label: 'ธนาคารไทยเครดิตเพื่อรายย่อย',
      },
      {
        value: 'LHFG',
        label: 'ธนาคารแลนด์ แอนด์ เฮ้าส์',
      },
      {
        value: 'SME',
        label: 'ธนาคารพัฒนาวิสาหกิจขนาดกลางและขนาดย่อมแห่งประเทศไทย',
      },
      {
        value: 'BAAC',
        label: 'ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร',
      },
      {
        value: 'EXIM',
        label: 'ธนาคารเพื่อการส่งออกและนำเข้าแห่งประเทศไทย',
      },
      {
        value: 'GSB',
        label: 'ธนาคารออมสิน',
      },
      {
        value: 'GHB',
        label: 'ธนาคารอาคารสงเคราะห์',
      },
      {
        value: 'ISBT',
        label: 'ธนาคารอิสลามแห่งประเทศไทย',
      },
    ]

    const handleSubmit = async ({ priceAmount, ...bankDetail }) => {
      try {
        setLoading(true)
        await request.post('/transaction', {
          userToken: state?.user.userId,
          price: +priceAmount,
          type: 'withdraw',
          ...bankDetail,
        })
        message.success('Success').then(() => liff.closeWindow())
      } catch (e) {
        message.error(e?.response?.data?.message || e?.message)
      } finally {
        setLoading(false)
      }
    }

    const validationSchema = yup.object().shape({
      bankAccount: yup
        .string()
        .trim()
        .matches(/^\d*$/g, '* กรุณากรอกบัญชีธนาคารให้ถูกต้อง')
        .required('* กรุณากรอกเลขที่บัญชีธนาคาร'),
      bankOwnerName: yup.string().required('* กรุณากรอกชื่อบัญชีธนาคาร'),
      bank: yup.string().required('* กรุณากรอกธนาคาร'),
      priceAmount: yup
        .string()
        .trim()
        .matches(/^[1-9]\d*$/g, '* กรุณากรอกจำนวณให้ถูกต้อง')
        .required('* กรุณากรอกจำนวณ'),
    })

    const pageProps = {
      initialValues: {
        priceAmount: '',
        bank: '',
        bankOwnerName: '',
        bankAccount: '',
      },
      bankOptions,
      validationSchema,
      loading,
      handleSubmit,
    }

    return <Component {...pageProps} />
  }

  return withWithdrawPage
}
