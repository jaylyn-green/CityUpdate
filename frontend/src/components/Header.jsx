import { Navbar } from "react-bootstrap";

const HeaderComponent = () => {
    return (
        <Navbar className="mb-4 rounded-bottom-3" style={{backgroundColor: "#5e5e5e"}}>
            <h2 className="ms-auto pe-5">
                <div className="text-light">City Update</div>
            </h2>
        </Navbar>
    );
}

export default HeaderComponent;
