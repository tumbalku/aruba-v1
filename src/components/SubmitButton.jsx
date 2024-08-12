import { useNavigation } from "react-router-dom";

const SubmitButton = ({ text, size, color, disabled }) => {
  const navigation = useNavigation();
  // console.log(navigation);
  const isSubmitting = navigation.state === "submitting";
  return (
    <button
      type="submit"
      className={`btn ${color} ${size}`}
      disabled={disabled || isSubmitting}
    >
      {isSubmitting ? (
        <>
          <span className="loading loading-spinner"></span> sending...
        </>
      ) : (
        text || "submit"
      )}
    </button>
  );
};

export default SubmitButton;
