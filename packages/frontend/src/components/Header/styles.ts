import styled from 'styled-components';

export const ContainerHeader = styled.div`
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: space-between;
    color: #fff !important;
    background-color: rgba(0, 0, 0, 0.3) !important;
    
    button {
        background-color: transparent;
        border: 0;
        padding: 15px;
        margin-left: 15px;
        margin-right: 15px;
        cursor: pointer;
        display: flex;
        
        strong {
            font-size: 14px;
            text-transform: uppercase;
            margin: auto;
        }
    }
`;

export const ContainerInfoUser = styled.div`
    display: flex;
    div {
        margin: auto;
        display: flex;
    }
`;