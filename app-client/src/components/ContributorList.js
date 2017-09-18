import React, { Component } from 'react'
import Contributor from './Contributor'
import { graphql, gql } from 'react-apollo'

class ContributorList extends Component {

    render() {

        // // 1
        // if (this.props.allLinksQuery && this.props.allLinksQuery.loading) {
        //     return <div>Loading</div>
        // }
        //
        // // 2
        // if (this.props.allLinksQuery && this.props.allLinksQuery.error) {
        //     return <div>Error</div>
        // }

        // 3
        const linksToRender = this.props.allLinksQuery.getViewer

        return (
            <div>
                {linksToRender.map(link => (
                    <Contributor key={link.id} link={link}/>
                ))}
            </div>
        )
    }

}

const ALL_LINKS_QUERY = gql`
  # 2
  query getViewer {
    viewer {
      name
    }
  }
`

// 3
export default graphql(ALL_LINKS_QUERY, { name: 'allLinksQuery' }) (ContributorList)