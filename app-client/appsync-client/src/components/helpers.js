import styled from 'styled-components';

export const Div = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 100%;
  text-align: left;
  background-color: #ffffff;
  border-radius: 2px;
  box-shadow: 0px 1px 1px 0 rgba(0, 0, 0, 0.3);

  p {
    padding: 10px;
  }
`;

export const Tweet = styled.div`
  border-bottom: 1px solid #e6ecf0;
  padding: 15px 15px;
  font-size: 14px;
  line-height: 20px;

  button {
    margin-left: 5px;
    float: right;
  }
`;

export const ProfileIcon = styled.div`
  border-radius: 1rem;
  background: grey;
  width: 1.5rem;
  height: 1.5rem;
  float: left;
  color: white;
  margin-right: 1rem;
  text-align: center;
  line-height: 1.5rem;
`;
