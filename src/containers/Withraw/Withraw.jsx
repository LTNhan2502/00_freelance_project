import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import bcrypt from 'bcryptjs';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import { getOneUserByUsername } from '../../utils/userAPI';
import { getBankByUserId, reqWithdrawal } from '../../utils/bank';
import bankAccountImg from "../../assets/withraw-img.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Withraw.scss';
import { toast } from 'react-toastify';

function Withraw() {
    const userName = localStorage.getItem("user_name")
    const navigate = useNavigate()
    const [thisUser, setThisUser] = useState(null)
    const [isHaveAccount, setIsHaveAccount] = useState(false)
    const [userBankAccount, setUserBankAccount] = useState(null)
    const [showPassword, setShowPassword] = useState(false)

    const verifyPassword = (inputPassword, hashedPassword) => {
        return bcrypt.compare(inputPassword, hashedPassword);
    };

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
        console.log(result);
        
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
            amount: "",
            passwordBank: ""
        },

        validationSchema: Yup.object({
            amount: Yup.number()
                .required("Không được để trống")
                .positive("Số tiền phải lớn hơn 0"),  
            passwordBank: Yup.string().required("Không được để trống")          
        }),

        onSubmit: async(values) => {
            verifyPassword(values.passwordBank, thisUser.password)
                .then(async(isMatch) => {
                    if(isMatch){
                        // Phải có thêm điều kiện lượt phân phối hôm nay phải đạt tối đa mới cho phép gọi tới reqWWithraw
                        // if(thisUser.todayDist === thisUser.memberId.distribution)
                        const letWithraw = await reqWithdrawal(
                            thisUser._id, 
                            values.amount
                        )
                        // Kiểm tra api
                        console.log(letWithraw); 
                        
                        if(letWithraw && letWithraw.data.EC === 0) {
                            toast.success("Gửi yêu cầu thành công")
                            console.log("success");
                            
                        }else {
                            console.log("Có lỗi");                            
                        }
                    }else{
                        toast.error("Mật khẩu không khớp")
                    }
                })

        }
        
    })

    // Format số tài khoản ngân hàng thành dạng 28****37
    const formatBankAccount = (accountNumber) => {
        if (!accountNumber) return 0;
        const accountStr = accountNumber.toString(); // Chuyển số tài khoản thành chuỗi
        const firstPart = accountStr.slice(0, 2); // lấy 2 số đầu
        const lastPart = accountStr.slice(-2); // lấy 2 số cuối
        const middlePart = '*'.repeat(4); // thay thế phần giữa bằng dấu *
        return `${firstPart}${middlePart}${lastPart}`;
    };
    

    const handleShowOrHide = () => {
        setShowPassword(!showPassword)
    }

    const handleGoToBankAccount = () => {
        navigate("/bank-account")
    }

    const handleGoToHome = () => {
        navigate("/home")
    }

    return (
        <Container className='custom-container-bank-account py-5'>
            <Row className='my-4 justify-content-center custom-row'>
                <Card className="ct-bank-card"> 
                    <Row>
                        <Col xs={12} md={6} className='p-4 custom-bank-account-col'>
                            <Row className='backArrow'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <span onClick={handleGoToHome}>
                                        <FontAwesomeIcon icon={faAngleLeft}/> Rút tiền
                                    </span>
                                    <span className='user-amount'>
                                        <div className='fs-12'>Số dư (€)</div>
                                        <div className='fs-15'>{thisUser?.amount || 0} €</div>
                                    </span>
                                </div>
                            </Row>
                            <Card className='ct-card'>
                                <Card.Body>
                                    <Row>
                                        <Col xs={12}>
                                            <div className='bank-linking-container'>
                                                {isHaveAccount ? (
                                                    <Form onSubmit={formik.handleSubmit}>
                                                        <Form.Group className='mb-3'>
                                                            <Form.Label>Tên chủ thẻ</Form.Label>
                                                            <Form.Control
                                                                type='text'
                                                                name='userBank'
                                                                placeholder='Tên chủ thẻ'
                                                                value={ !!isHaveAccount === true ? userBankAccount.userBank : ""}
                                                                disabled
                                                            />
                                                        </Form.Group>

                                                        <Form.Group className='mb-3 p-relative'>
                                                            <Form.Label>Số tài khoản</Form.Label>
                                                            <Form.Control
                                                                type='text'
                                                                name='numberBank'
                                                                placeholder='Số tài khoản'
                                                                value={ !!isHaveAccount === true ? formatBankAccount(userBankAccount.numberBank) : ""}
                                                                disabled
                                                            />
                                                        </Form.Group>

                                                        <Form.Group className='mb-3'>
                                                            <Form.Label>Số tiền</Form.Label>
                                                            <Form.Control
                                                                type='number'
                                                                name='amount'
                                                                placeholder='Số tiền'
                                                                value={formik.values.amount}
                                                                onChange={formik.handleChange}
                                                                isInvalid={formik.touched.amount && formik.errors.amount}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {formik.errors.amount}
                                                            </Form.Control.Feedback>  
                                                        </Form.Group>

                                                        <Form.Group className='mb-3'>
                                                            <Form.Label>Mật khẩu</Form.Label>
                                                            <InputGroup>                                                            
                                                                <Form.Control
                                                                    type={showPassword ? "text" : "password"}
                                                                    name='passwordBank'
                                                                    placeholder='Mật khẩu'
                                                                    value={formik.values.passwordBank}
                                                                    onChange={formik.handleChange}
                                                                    isInvalid={formik.touched.passwordBank && formik.errors.passwordBank}
                                                                />
                                                                <InputGroup.Text style={{ cursor: "pointer", borderTopRightRadius: "0.375rem", borderBottomRightRadius: "0.375rem" }}>
                                                                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} onClick={() => handleShowOrHide()}/>
                                                                </InputGroup.Text>
                                                                <Form.Control.Feedback type="invalid">
                                                                    {formik.errors.passwordBank}
                                                                </Form.Control.Feedback>
                                                            </InputGroup>
                                                        </Form.Group>

                                                        <Button className='btn-login w-100' type='submit' variant='primary'>
                                                            Rút tiền
                                                        </Button>
                                                    </Form>
                                                ) : (
                                                    <div>
                                                        Bạn chưa điền thông tin ngân hàng. Vui lòng click vào  
                                                        <span
                                                            style={{
                                                                color: "#FFD700",
                                                                cursor: "pointer",
                                                                fontSize: "15px",
                                                                padding: "7px"
                                                            }}
                                                            onClick={handleGoToBankAccount}
                                                        >Tại đây</span>
                                                        để đi điền thông tin
                                                    </div>
                                                )}
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={6} className="right-col">
                            <img 
                                src={bankAccountImg}
                                alt="Bank Info Image" 
                                className="withraw-image"
                            />
                        </Col>
                    </Row>
                </Card>
            </Row>
        </Container>

    )
}

export default Withraw