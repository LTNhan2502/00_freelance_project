import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import { getOneUserByUsername } from '../../utils/userAPI';
import { createBank, getBankByUserId } from '../../utils/bank';

function Withraw() {
    const userName = localStorage.getItem("user_name")
    const navigate = useNavigate()
    const [thisUser, setThisUser] = useState(null)
    const [isHaveAccount, setIsHaveAccount] = useState(false)

    useEffect(() => {
        fetchThisUser()
        fetchIsHaveAccount()
    }, [])

    const fetchIsHaveAccount = async() => {
        const res = await getBankByUserId(thisUser._id)
        if(res.data.data === null){
            setIsHaveAccount(false)
        }else{
            setIsHaveAccount(true)
        }
    }

    const fetchThisUser = async() => {
        try {
            const res = await getOneUserByUsername(userName)
            const userData = res.data.data

            setThisUser(userData)
        } catch (error) {
            console.log("Error fetching: ", error);       
        }
    }

    const formik = useFormik({
        initialValues: {
            nameBank: "",
            userBank: "",
            numberBank: ""
        },

        validationSchema: Yup.object({
            nameBank: Yup.string()                
                .required("Không được để trống"),
            userBank: Yup.string()                
                .required("Không được để trống"),
            numberBank: Yup.string().required("Không được để trống"),            
        }),

        onSubmit: async(values) => {
            const registerBankAPI = await createBank(
                values.nameBank, 
                values.userBank, 
                values.numberBank, 
                thisUser._id
            )

            // Kiểm tra api
            console.log(registerBankAPI);
            
            if(registerBankAPI && registerBankAPI.data.EC === 0) {
                toast.success("Đăng kí thành công")
                
              }else {
                console.log("Hình như lỗi ní ơi");
                
              }
        }
    })

    const handleNavigate = () => {
        navigate("/bank-account")
    }
    return (
        <Container className='custom-container container py-5'>
            <Row className='my-4 justify-content-center'>
                <Col className='mb-4'>
                    <Card className='mt-4'>
                        <Card.Body>
                            <Row>
                                <Col xs={12}>
                                    <div className='login-container'>
                                        {isHaveAccount === false ? (
                                            <>
                                                Bạn chưa điền thông tin ngân hàng. Vui lòng click vào 
                                                <span 
                                                    style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} 
                                                    onClick={handleNavigate}
                                                >
                                                    Tại đây
                                                </span>
                                                để điền thông tin.
                                        </>
                                        ) : (
                                            <form onSubmit={formik.handleSubmit}>
                                                <div className='input-group'>
                                                    <div className='input-container'>
                                                        <input
                                                            type='text'
                                                            name='nameBank'
                                                            placeholder='Tên ngân hàng'
                                                            value={formik.values.nameBank}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </div>
                                                    {formik.touched.nameBank && formik.errors.nameBank ? (
                                                        <small className="error">{formik.errors.nameBank}</small>
                                                    ) : (
                                                        <small>&nbsp;</small>
                                                    )}
                                                </div>
                                                <div className='input-group'>
                                                    <div className='input-container'>
                                                        <input
                                                            type='text'
                                                            name='numberBank'
                                                            placeholder='Số tài khoản'
                                                            value={formik.values.numberBank}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </div>
                                                    {formik.touched.numberBank && formik.errors.numberBank ? (
                                                        <small className="error">{formik.errors.numberBank}</small>
                                                    ) : (
                                                        <small>&nbsp;</small>
                                                    )}
                                                </div>
                                                <div className='input-group'>
                                                    <div className='input-container'>
                                                        <input
                                                            type='text'
                                                            name='userBank'
                                                            placeholder='Tên chủ thẻ'
                                                            value={formik.values.userBank}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </div>
                                                    {formik.touched.userBank && formik.errors.userBank ? (
                                                        <small className="error">{formik.errors.userBank}</small>
                                                    ) : (
                                                        <small>&nbsp;</small>
                                                    )}
                                                </div>
    
                                                <input className='btn-login' type='submit' value="Submit"></input>
                                            </form>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Withraw