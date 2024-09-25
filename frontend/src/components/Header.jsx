//Style header

import styled from "styled-components";

const HeaderComponent = () => {
    return (
        <HeaderStyled>
            <h1>City Update</h1>
        </HeaderStyled>
    );
}
const HeaderStyled = styled.header`
    background-color: #959595;
    height: 3.75em;
    display: flex;
    padding-top: 15px;
    padding-left: 15px; 
    
`
export default HeaderComponent;