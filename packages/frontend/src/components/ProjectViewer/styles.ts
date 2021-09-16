import styled from 'styled-components';

export const ContainerProject = styled.div`
    margin-left: 20px;
    margin-right: 20px;

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

export const ContainerProjectHeader = styled.div`
    color: #fff;
    text-align: left;
    padding-left: 20;
    padding-right: 20;
    display: flex;
    justify-content: space-between;
`;

export const ContainerHeaderActions = styled.div`
    display: flex;
    button {
        
        background-color: transparent;
        border: 0;
        font-size: 16px;
        text-transform: uppercase;
        margin: auto;
        padding: 12px 16px;
    }
`;

export const ContainerLists = styled.div`
    display: flex;
    overflow-x: scroll;
    margin-left: 10;
`;