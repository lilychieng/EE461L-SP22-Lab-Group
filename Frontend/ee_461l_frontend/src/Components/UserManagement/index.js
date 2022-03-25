import { useNavigate } from "react-router-dom";

function UserManagement() {
    const navigate = useNavigate();

    async function handleClick(event) {
        event.preventDefault();
        navigate("/", { replace: true });
    }
    return (
      <main>
        <h2>Hello World</h2>
        <button type="button" onClick={handleClick}>
          Go to home page
        </button>
      </main>
    );
  }
export default UserManagement;
