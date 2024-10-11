import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row, Button, Form, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import { getOneUserByUsername } from '../../utils/userAPI';
import { createBank, getBankByUserId } from '../../utils/bank';
import bankAccountImg from '../../assets/bank-account-img.jpg';
import './InfoBank.scss';
import { faAngleLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';

function InfoBank() {
    const navigate = useNavigate();
    const userName = localStorage.getItem("user_name")
    const [thisUser, setThisUser] = useState(null)
    const [isHaveAccount, setIsHaveAccount] = useState(false)
    const [userBankAccount, setUserBankAccount] = useState(null)
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        fetchThisUser()
    }, [])

    
    const fetchThisUser = async() => {
        try {
            const res = await getOneUserByUsername(userName)
            const userData = res.data.data
            
            setThisUser(userData)
            console.log("User data: ",userData);
            
            fetchIsHaveAccount(userData._id);
        } catch (error) {
            console.log("Error fetching: ", error);       
        }
    }
    
    const fetchIsHaveAccount = async(userId) => {
        const res = await getBankByUserId(userId)
        const result = res.data.data
        console.log("User bank account: ",result);
        
        if(result === null){
            setIsHaveAccount(false)
            setUserBankAccount(null)
        }else{
            setIsHaveAccount(true)
            setUserBankAccount(result)
        }
    }

    const formik = useFormik({
        initialValues: {
            nameBank: "",
            userBank: "",
            numberBank: "",
            passwordBank: ""
        },

        validationSchema: Yup.object({
            nameBank: Yup.string()                
                .required("Không được để trống"),
            userBank: Yup.string()                
                .required("Không được để trống"),
            numberBank: Yup.string()
                .required("Không được để trống"),  
            passwordBank: Yup.string().required("Không được để trống"),  

        }),

        onSubmit: async(values) => {
            console.log("Check đã vào submit chưa");
            
            const registerBankAPI = await createBank(
                values.nameBank, 
                values.userBank, 
                values.numberBank, 
                thisUser._id
            )

            if(registerBankAPI && registerBankAPI.data.EC === 0) {
                toast.success("Liên kết thành công")
            } else {
                console.log("Có lỗi xảy ra");
            }
        }
    })

    const handleShowOrHide = () => {
        setShowPassword(!showPassword);
    };

    const handleGoToHome = () => {
        navigate("/home")
    }

    return (
        <Container className='custom-container-bank-account py-5'>
            <Row className='my-4 justify-content-center custom-row'>
                <Card className="ct-bank-card"> 
                    <Row>
                        <Col xs={12} md={6} className="left-col">
                            <img 
                                src={bankAccountImg}
                                alt="Bank Info Image" 
                                className="bank-image"
                            />
                        </Col>
                        <Col xs={12} md={6} className='p-4 custom-bank-account-col'>
                            <Row className='backArrow'>
                                <span onClick={handleGoToHome}>
                                    <FontAwesomeIcon icon={faAngleLeft}/> Thông tin ngân hàng
                                </span>
                            </Row>
                            <Card className='ct-card'>
                                <Card.Body>
                                    <Row>
                                        <Col xs={12}>
                                            <div className='bank-linking-container'>
                                                <Form onSubmit={formik.handleSubmit}>
                                                    <Form.Group className='mb-3'>
                                                        <Form.Label>Tên ngân hàng</Form.Label>
                                                        <Form.Control
                                                            type='text'
                                                            name='nameBank'
                                                            placeholder='Tên ngân hàng'
                                                            value={ isHaveAccount ? userBankAccount.nameBank : formik.values.nameBank}
                                                            onChange={formik.handleChange}
                                                            isInvalid={formik.touched.nameBank && formik.errors.nameBank}
                                                            disabled={isHaveAccount}
                                                        />
                                                        <Form.Control.Feedback type="invalid"
                                                            style={{ minHeight: '1.25rem' }}
                                                        >
                                                            {formik.errors.nameBank}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>

                                                    <Form.Group className='mb-3'>
                                                        <Form.Label>Số tài khoản</Form.Label>
                                                        <Form.Control
                                                            type='text'
                                                            name='numberBank'
                                                            placeholder='Số tài khoản'
                                                            value={ isHaveAccount ? userBankAccount.numberBank : formik.values.numberBank}
                                                            onChange={formik.handleChange}
                                                            isInvalid={formik.touched.numberBank && formik.errors.numberBank}
                                                            disabled={isHaveAccount}
                                                        />
                                                        <Form.Control.Feedback type="invalid"
                                                            style={{ minHeight: '1.25rem' }}
                                                        >
                                                            {formik.errors.numberBank}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>

                                                    <Form.Group className='mb-3'>
                                                        <Form.Label>Tên chủ thẻ</Form.Label>
                                                        <Form.Control
                                                            type='text'
                                                            name='userBank'
                                                            placeholder='Tên chủ thẻ'
                                                            value={ isHaveAccount ? userBankAccount.userBank : formik.values.userBank}
                                                            onChange={formik.handleChange}
                                                            isInvalid={formik.touched.userBank && formik.errors.userBank}
                                                            disabled={isHaveAccount}
                                                        />
                                                        <Form.Control.Feedback type="invalid"
                                                            style={{ minHeight: '1.25rem' }}
                                                        >
                                                            {formik.errors.userBank}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>

                                                    {isHaveAccount ? <></> : (
                                                        <>
                                                            <Form.Group className='mb-3'>
                                                                <Form.Label>Mật khẩu</Form.Label>
                                                                <InputGroup>
                                                                    <Form.Control
                                                                        type={showPassword ? 'text' : 'password'}
                                                                        name='passwordBank'
                                                                        placeholder='Mật khẩu'
                                                                        value={formik.values.passwordBank}
                                                                        onChange={formik.handleChange}
                                                                        isInvalid={formik.touched.passwordBank && formik.errors.passwordBank}
                                                                        
                                                                    />
                                                                    <InputGroup.Text onClick={handleShowOrHide} 
                                                                        style={{ 
                                                                            cursor: 'pointer', 
                                                                            borderTopRightRadius: "0.375rem", 
                                                                            borderBottomRightRadius: "0.375rem" 
                                                                        }}
                                                                    >
                                                                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                                                    </InputGroup.Text>
                                                                    <Form.Control.Feedback type="invalid"
                                                                        style={{ minHeight: '1.25rem' }}
                                                                    >
                                                                        {formik.errors.passwordBank}
                                                                    </Form.Control.Feedback>
                                                                </InputGroup>
                                                            </Form.Group>

                                                            <Button className='btn-login w-100' type='submit' variant='primary'>
                                                                Liên kết
                                                            </Button>                                                        
                                                        </>

                                                    )}
                                                </Form>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card>
            </Row>
        </Container>



    )
}

export default InfoBank;
