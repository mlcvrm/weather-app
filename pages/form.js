import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Form = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        className="input"
        type="text"
        name="location"
        placeholder="Type your location for a weather check"
        required
      />
      <button type="submit" className="submitButton">
        <FontAwesomeIcon className="icon" size="lg" icon={faSearch} />
      </button>
    </form>
  );
};

export default Form;
