import styled from 'styled-components';

export const ContainerList = styled.div`
    border-radius: 3px;
    border-radius: 5px;
    width: 100%;
    min-width: 300px;
    height: fit-content;
    background: rgba(0, 0, 0, 0.3);
    height: 75vh;
    margin-right: 10px;
    padding-left: 15px;
    padding-right: 15px;
    text-align: left;
    display: block;
    color: whitesmoke;
`;

export const ListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: inherit;
    height: fit-content;

    h4 {
        margin-top: 8;
        color: white;
    }
`;
export const ContainerActions = styled.div`
   margin-top: auto;
   margin-bottom: auto;
    button {
        background: transparent;
        border: 0;
    }
`;

export const ContainerTasks= styled.div`

`;