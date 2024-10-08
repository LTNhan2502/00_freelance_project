import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import "./Level_Member.scss";
import { getAllMemberPackage } from "../../utils/memberPackageAPI";
import { getOneUserByUsername, updateMemberToUser } from "../../utils/userAPI";
import { toast } from "react-toastify";

function Level_Member({ userAmount }) {
  const userName = localStorage.getItem("user_name");
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllMembership();
  }, []);

  // Fetch api lấy tất cả gói thành viên
  const fetchAllMembership = async () => {
    try {
      const getMemberPackages = await getAllMemberPackage();
      const result = getMemberPackages.data.data;

      if (result) {
        setDataSource(result);
      }
    } catch (error) {
      console.error("Error fetching membership data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Fetch api mua gói thành viên
  // Vấn đề ở đây
  const unlockMembership = async (packageName, memberID, packagePrice) => {
    // Kiểm tra tham số
    // console.log("User Amount:", userAmount);
    // console.log("Package Price:", packagePrice);

    // Kiểm tra kiểu dữ liệu
    // console.log("User Amount Type:", typeof userAmount);
    // console.log("Package Price Type:", typeof packagePrice);
    console.log(memberID);
    console.log(userName);

    const unlock = await updateMemberToUser(userName, memberID);
    console.log(unlock);

    // if(userAmount < packagePrice){
    //   toast.error("Tài khoản không đủ để nâng cấp! Xin hãy nạp thêm!")
    //   return;
    // }else{
    //   try {
    //     // if(unlock){
    //     //   toast.success(`Mua gói ${packageName} thành công`)
    //     // }

    //   } catch (error) {
    //     toast.error("Mua gói thất bại")
    //   }
    // }
  };

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
                        className={`unlock-title ${
                          level.currentLevel
                            ? "current-level top-0 start-0"
                            : ""
                        }`}
                        onClick={() =>
                          unlockMembership(
                            level.packageName,
                            level._id,
                            level.price
                          )
                        }
                      >
                        {level.currentLevel ? "Cấp hiện tại" : "Mở khóa"}
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
