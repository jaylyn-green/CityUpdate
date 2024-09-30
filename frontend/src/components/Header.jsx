import { Navbar } from "react-bootstrap";

const HeaderComponent = () => {
    return (
        <Navbar bg="dark" className="mb-4">
            <h2 className="ms-auto pe-5">
                <div className="link-light text-decoration-none">City Update</div>
            </h2>
        </Navbar>
    );
}

export default HeaderComponent;
