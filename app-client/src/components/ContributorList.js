import React, { Component } from 'react'
import Contributor from './Contributor'
import {
    gql,
    graphql,
} from 'react-apollo';


const ContributorList = ({ data: {loading, error, getContributorFeed }}) => {

    if (loading) {
        return <p>Loading ...</p>;
    }
    if (error) {
        return <p>{error.message}</p>;
    }

    return (
        <div>
            {getContributorFeed.map(user => (
                <Contributor key={user.name} user={user}/>
            ))}
        </div>
    );
};

export const ContributorQuery = gql`
  query ContributorQuery {
    getContributorFeed {
      name
      location
    }
  }
`;

export default graphql(ContributorQuery,)(ContributorList);