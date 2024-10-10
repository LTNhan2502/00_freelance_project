import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { getAllMemberPackage } from "../../utils/memberPackageAPI";
import { getOneUserByUsername, updateMemberToUser } from "../../utils/userAPI";
import { toast } from "react-toastify";
import Spinner from 'react-bootstrap/Spinner';
import "./Level_Member.scss";


function Level_Member() {
  const userName = localStorage.getItem("user_name");
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [thisUser, setThisUser] = useState(null);

  useEffect(() => {
    const fetchAllMembership = async () => {
      try {
        const [memberPackages, userInfo] = await Promise.all([
          getAllMemberPackage(),
          getOneUserByUsername(userName),
        ]);
        setDataSource(memberPackages.data.data);
        setThisUser(userInfo.data.data);
      } catch (error) {
        console.error("Lỗi khi fetch membership data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMembership();
  }, [userName]);

  const unlockMembership = async (packageName, memberID) => {
    try {
      const unlock = await updateMemberToUser(userName, memberID);
      if (unlock.data.data === "Bạn không đủ tiền mua gói") {
        toast.error("Số dư không đủ! Hãy nạp thêm tiền!");
      } else {
        toast.success(`Bạn đã mua gói ${packageName} thành công!`);
        setTimeout(() => window.location.reload(), 2500);
      }
    } catch (error) {
      console.error("Lỗi khi mua gói thành viên:", error);
    }
  };

  if (loading) return (
    <div className="spinner-container">
        <Spinner animation="border" className="custom-spinner"/>
    </div>
  );

  return (
    <Container className="full-height-container p-0 mt-3">
      <h3 className="text-white fs-4 fw-bold">Cấp thành viên</h3>
      {dataSource.map((level, index) => (
        <Row key={index} className="mb-3">
          <Col>
            <Card className="text-white blur-card position-relative">
              <Card.Body className="non-padding">
                <Row>
                  <Col sm={12}>
                    <div className="d-flex align-items-center justify-content-between">
                      <span
                        className={level._id === thisUser?.memberId?._id ? "current-level" : "unlock-title"}
                        onClick={() => level._id !== thisUser?.memberId?._id && unlockMembership(level.packageName, level._id)}
                        style={{ cursor: level._id === thisUser?.memberId?._id ? "not-allowed" : "pointer" }}
                      >
                        {level._id === thisUser?.memberId?._id ? "Cấp hiện tại" : "Mở khóa"}
                      </span>
                      <span className="badge badge-bg position-absolute top-0 end-0">
                        {level.packageName}
                      </span>
                    </div>
                    <Card.Text>
                      <div className="d-flex justify-content-around text-center">
                        <div>
                          <div>Phí nâng cấp</div>
                          <div>{level.price} €</div>
                        </div>
                        <div>
                          <div>Chiết khấu</div>
                          <div>{`${level.discountFrom}% - ${level.discountTo}%`}</div>
                        </div>
                        <div>
                          <div>Lượt phân phối</div>
                          <div>{level.distribution}</div>
                        </div>
                      </div>
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </Container>
  );
}

export default Level_Member;
