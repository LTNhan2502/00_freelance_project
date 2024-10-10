import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row, Button, Form } from 'react-bootstrap'
import { useFormik } from "formik";
import * as Yup from "yup";
import { getOneUserByUsername } from '../../utils/userAPI';
import { createBank, getBankByUserId } from '../../utils/bank';

function InfoBank() {
    const userName = localStorage.getItem("user_name")
    const [thisUser, setThisUser] = useState(null)
    const [isHaveAccount, setIsHaveAccount] = useState(false)

    useEffect(() => {
        fetchThisUser()
        fetchIsHaveAccount()
    }, [])

    const fetchIsHaveAccount = async() => {
        if (thisUser) {
            const res = await getBankByUserId(thisUser._id)
            setIsHaveAccount(res.data.data !== null)
        }
    }

    const fetchThisUser = async() => {
        try {
            const res = await getOneUserByUsername(userName)
            setThisUser(res.data.data)
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

            if(registerBankAPI && registerBankAPI.data.EC === 0) {
                toast.success("Đăng kí thành công")
            } else {
                console.log("Có lỗi xảy ra");
            }
        }
    })

    return (
        <Container className='custom-container container py-5'>
            <Row className='my-4 justify-content-center'>
                <Col md={6} className='mb-4'>
                    <Card className='mt-4 ct-card' style={{ backgroundColor: 'transparent', border: 'none' }}>
                        <Card.Body>
                            <Row>
                                <Col xs={12}>
                                    <div className='login-container'>
                                        {isHaveAccount === false ? (
                                            <Form onSubmit={formik.handleSubmit}>
                                                <Form.Group className='mb-3'>
                                                    <Form.Label>Tên ngân hàng</Form.Label>
                                                    <Form.Control
                                                        type='text'
                                                        name='nameBank'
                                                        placeholder='Tên ngân hàng'
                                                        value={formik.values.nameBank}
                                                        onChange={formik.handleChange}
                                                        isInvalid={formik.touched.nameBank && formik.errors.nameBank}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formik.errors.nameBank}
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group className='mb-3'>
                                                    <Form.Label>Số tài khoản</Form.Label>
                                                    <Form.Control
                                                        type='text'
                                                        name='numberBank'
                                                        placeholder='Số tài khoản'
                                                        value={formik.values.numberBank}
                                                        onChange={formik.handleChange}
                                                        isInvalid={formik.touched.numberBank && formik.errors.numberBank}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formik.errors.numberBank}
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Form.Group className='mb-3'>
                                                    <Form.Label>Tên chủ thẻ</Form.Label>
                                                    <Form.Control
                                                        type='text'
                                                        name='userBank'
                                                        placeholder='Tên chủ thẻ'
                                                        value={formik.values.userBank}
                                                        onChange={formik.handleChange}
                                                        isInvalid={formik.touched.userBank && formik.errors.userBank}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formik.errors.userBank}
                                                    </Form.Control.Feedback>
                                                </Form.Group>

                                                <Button className='btn-login w-100' type='submit' variant='primary'>
                                                    Liên kết
                                                </Button>
                                            </Form>
                                        ) : (
                                            <div>
                                                Thông tin ngân hàng đã liên kết
                                            </div>
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

export default InfoBank;
