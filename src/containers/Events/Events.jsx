// import React from 'react'
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
import './Events.scss';

import jewelry1 from '../../assets/jewelry-01.jpg';
import jewelry2 from '../../assets/jewelry-02.jpg';
import jewelry3 from '../../assets/jewelry-03.jpg';

// import mainEv1 from '../../assets/blur-rain-01.webp';
// import sub1Ev1 from '../../assets/blur-rain-03.jpg';
// import sub2Ev1 from '../../assets/background-distribute.jpg';

// import mainEv2 from '../../assets/076dba666015d94b8004.jpg';
// import sub1Ev2 from '../../assets/background-distribute.jpg';
// import sub2Ev2 from '../../assets/bank-account-img.jpg';

// function Events() {
//     const eventsData = [
//         {
//             mainEvent: {
//                 image: mainEv1,
//                 title: "Ngày Phụ Nữ Việt Nam 20/10",
//                 description: "Vào 00:00 ngày 20/10 đến 23:59 cùng ngày, nạp ngay 500€ để nhận ưu đãi thêm 500€ "
//             },
//             subEvents: [
//                 { image: sub1Ev1, title: "Ngày Nhà Giáo Thế Giới 05/10", description: "Chia sẻ mã mời để được nhận nhiều lợi ích" },
//                 { image: sub2Ev1, title: "Lễ hội Halloween 31/10", description: "Chia sẻ mã mời để được nhận nhiều lợi ích" }
//             ]
//         },
//         {
//             mainEvent: {
//                 image: mainEv2,
//                 title: "Main Event of February",
//                 description: "This is the main event of February"
//             },
//             subEvents: [
//                 { image: sub1Ev2, title: "Sub Event 1", description: "Description of sub event 1" },
//                 { image: sub2Ev2, title: "Sub Event 2", description: "Description of sub event 2" }
//             ]
//         }
//     ];

//     return <EventCarousel events={eventsData} />;
// }

// const EventCarousel = ({ events }) => {
//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         arrows: true
//     };

//     return (
//         <Slider {...settings}>
//             {events.map((event, index) => (
//                 <div key={index} className="carousel-slide">
//                     <div className="event-content">
//                         <div className="main-event">
//                             <img src={event.mainEvent.image} alt={event.mainEvent.title} />
//                             <h3>{event.mainEvent.title}</h3>
//                             <p className='text-start'>{event.mainEvent.description}</p>
//                         </div>
//                         <div className="sub-events">
//                             {event.subEvents.map((subEvent, subIndex) => (
//                                 <div key={subIndex} className="sub-event">
//                                     <img src={subEvent.image} alt={subEvent.title} />
//                                     <h4>{subEvent.title}</h4>
//                                     <p>{subEvent.description}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </Slider>
//     );
// };

// export default Events;

import React from 'react'

function Events() {
  return (
    <div className="event-page">
      <div className="event-left">
        {/* Phần bên trái */}
        <div className="event-title">
          <h1>MERCADO</h1>
          <h1>CHƯƠNG TRÌNH ƯU ĐÃI SỰ KIỆN</h1>
          <h1>MÃ MỜI TÌNH NHÂN</h1>
        </div>
        <div className="event-content">
          <p>THÀNH  VIÊN MỚI THAM GIA DƯỚI MÃ MỜI TÌNH NHÂN</p>
          <p>NẠP TỐI THIỂU 500 NHẬN GÓI QUÀ GIÁ TRỊ 500€</p>
          <p>NÂNG CẤP THÀNH VIÊN VÀNG NHẬN CẶP NHẪN TÌNH NHÂN TRỊ GIÁ LÊN TỚI 2000€</p>
          <p>NÂNG CẤP THÀNH VIÊN BẠCH KIM NHẬN TOUR DU LỊCH PARIS 2 NGƯỜI TRỊ GIÁ 6000€</p>
          <p style={{ marginBottom: "0" }}>***ĐẶC BIỆT***</p>
          <p>NÂNG CẤP THÀNH VIÊN KIM CƯƠNG NHẬN VIÊN KIM CƯƠNG TRỊ GIÁ 10000€</p>
        </div>
        <div className="event-thankyou">
          <p>MERCADO XIN CHÂN THÀNH CẢM ƠN</p>
        </div>
      </div>

      <div className="event-right">
        {/* Phần bên phải */}
        <div className="event-image">
          <img src={jewelry1} alt="Event 1" />
        </div>
        <div className="event-image">
          <img src={jewelry2} alt="Event 2" />
        </div>
        <div className="event-image">
          <img src={jewelry3} alt="Event 3" />
        </div>
      </div>
    </div>
  )
}

export default Events
