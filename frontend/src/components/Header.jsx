import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const HeaderComponent = () => {
    return (
        <Navbar bg="dark" className="mb-4">
                <h2 className="ms-auto pe-5">
                    <Link to='/addCity' className="link-light text-decoration-none">Add construction</Link>
                </h2>
        </Navbar>
    );
}

export default HeaderComponent;
