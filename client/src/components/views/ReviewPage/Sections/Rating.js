import React, { useState, useEffect }from 'react'
import { Card, Col, Row } from 'antd';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';


function Rating(props) {
    const [clicked, setClicked] = useState([false, false, false, false, false]);
    const ARRAY = [0, 1, 2, 3, 4];
    // const [Score, setScore] = useState(0)
    console.log(props.score)

    const handleStarClick = index => {
        let clickStates = [...clicked];
        for (let i = 0; i < 5; i++) {
        clickStates[i] = i <= index ? true : false;
        }
        setClicked(clickStates);
    };

    useEffect(() => {
        sendReview();
        // setScore(props.score)
    }, [clicked]); //컨디마 컨디업

    const sendReview = () => {
        let score = clicked.filter(Boolean).length;
        props.setbestScore(score)
    };

    if (props.submitRating) {
      return (
          <div>
              <div style = {{ width: '99%', margin: '1rem auto'}}>
                  <div className="site-card-wrapper">
                      <Row gutter={16}>
                          <Col span={4}>
                              <Card title="Best Movie" bordered={false}>
                                  <Stars>
                                      {ARRAY.map((el, idx) => {
                                      return (
                                          <FaStar
                                              id='rating'
                                              key={idx}
                                              size="50"
                                              onClick={() => handleStarClick(el)}
                                              className={clicked[el] && 'yellowStar'}
                                          />
                                      );
                                      })}
                                  </Stars>
                              </Card>
                          </Col>
                      </Row>
                  </div>
              </div>
          </div>
      )
  } else {
      return (
        <div>
            <div style = {{ width: '99%', margin: '1rem auto'}}>
                <div className="site-card-wrapper">
                    <Row gutter={16}>
                        <Col span={4}>
                            <Card title="Best Movie" bordered={false}>
                              {props.score}
                                <Stars>
                                    {ARRAY.slice(0,props.score).map((el, idx) => {
                                    return (
                                        <FaStar
                                            id='rating'
                                            key={idx}
                                            size="50"
                                            color="#fcc419"
                                            // onClick={() => handleStarClick(el)}
                                            // className={clicked[el] && 'yellowStar'}
                                        />
                                    );
                                    })}
                                </Stars>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
      )
    }
}

export default Rating

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
`;

const RatingText = styled.div`
  color: #787878;
  font-size: 12px;
  font-weight: 400;
`;

const Stars = styled.div`
  display: flex;
  padding-top: 5px;

  & svg {
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fcc419;
  }
`;