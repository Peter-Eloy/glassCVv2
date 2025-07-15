import PropTypes from "prop-types";

const SimpleTestModal = ({ isExpanded, onClose }) => {
  console.log("SimpleTestModal rendered with isExpanded:", isExpanded);

  if (!isExpanded) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 255, 0, 0.8)",
        zIndex: 999999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={() => {
        console.log("Test modal clicked, closing");
        onClose();
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          border: "5px solid red",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>TEST MODAL WORKS!</h2>
        <p>This proves the modal system is working</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

SimpleTestModal.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SimpleTestModal;
