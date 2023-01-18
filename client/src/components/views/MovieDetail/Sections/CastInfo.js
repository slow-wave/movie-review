import React, { useState } from "react";
import { IMAGE_BASE_URL } from "../../../../Config";
import GridCards from "../../commons/GridCards";
import { Row, Button, Modal } from "antd";

function CastInfo(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const Casts = props.casts;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ margin: "1rem auto", marginTop: "2%" }}>
      <h2 style={{ fontSize: "1rem" }}>Casts Info</h2>
      <Button type="dashed" onClick={showModal}>
        Click
      </Button>

      <>
        <Modal
          title="Casts"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1000}
        >
          {isModalOpen && (
            <Row gutter={[16, 16]}>
              {Casts.cast &&
                Casts.cast.map((cast, index) => (
                  <React.Fragment key={index}>
                    <GridCards
                      image={
                        cast.profile_path
                          ? `${IMAGE_BASE_URL}w500${cast.profile_path}`
                          : null
                      }
                      characterName={cast.name}
                    />
                  </React.Fragment>
                ))}
            </Row>
          )}
        </Modal>
      </>
    </div>
  );
}

export default CastInfo;
