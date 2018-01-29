import styled from 'styled-components';

export const Main = styled.div`
  width: 800px;
  margin: auto;
  display: flex;
  flex-direction: row;
`;

export const SideBar = styled.div`
  flex: 1;
  margin-right: 10px;
`;

export const Content = styled.div`
  flex: 2;
`;

export const Div = styled.div`
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

export const UserProfile = styled.div`
  margin-bottom: 15px;
  padding: 15px 15px;
  text-align: center;
  & .username {
    color: #14171a;
    font-size: 16px;
    font-weight: bold;
  }
  & .username span {
    font-size: 14px;
    color: #657786;
  }
  & .location {
    color: #657786;
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & .description {
    margin-top: 15px;
  }
  & .material-icons {
    font-size: 16px;
  }
`;

export const Following = styled.div`
  margin-bottom: 15px;
  padding: 15px 15px;
  text-align: center;
  & .username {
    font-size: 14px;
    color: #657786;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
  }
`;
