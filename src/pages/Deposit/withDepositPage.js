import { useState, useEffect } from 'react'
import * as yup from 'yup'
import request from '../../utils/request'
import { message } from 'antd'
import { useAuth } from '../../contexts/AuthContext'
import liff from '@line/liff'

export function withDepositPage(Component) {
  function withDepositPage() {
    const [loading, setLoading] = useState(false)
    const [bankDetail, setBankDetail] = useState({ bank: '', bankAccount: '', bankOwnerName: '' })
    const { state } = useAuth()

    useEffect(() => {
      getBank()
    }, [])

    const handleSubmit = async (data) => {
      try {
        setLoading(true)
        await request.post('/transaction', {
          userToken: state?.user.userId,
          price: +data.priceAmount,
          imageUrl: data.imageUrl,
          type: 'deposit',
        })
        await liff.sendMessages([
          {
            type: 'text',
            text: 'ทำรายการฝากสำเร็จ กรุณารอซักครู่',
          },
        ])
        message.success('Success').then(() => liff.closeWindow())
      } catch (e) {
        message.error(e?.response?.data?.message || e?.message)
      } finally {
        setLoading(false)
      }
    }

    const getBank = async () => {
      try {
        const { bank, bankAccount, bankOwnerName } = await request.get('/setting')
        setBankDetail({ bank, bankAccount, bankOwnerName })
      } catch (e) {
        alert(e)
      }
    }

    const validationSchema = yup.object().shape({
      priceAmount: yup
        .string()
        .trim()
        .matches(/^[1-9]\d*$/g, '* กรุณากรอกจำนวณให้ถูกต้อง')
        .required('* กรุณากรอกจำนวณ'),
      imageUrl: yup.string().trim().required('* กรุณาอัพโหลดรูปภาพ'),
    })

    const pageProps = {
      bankDetail,
      initialValues: {
        priceAmount: '',
        imageUrl: '',
      },
      validationSchema,
      loading,
      handleSubmit,
    }

    return <Component {...pageProps} />
  }

  return withDepositPage
}
