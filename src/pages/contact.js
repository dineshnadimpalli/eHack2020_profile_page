import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styles from './contact.module.css'
import Layout from '../components/layout'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faGooglePlusG, faWhatsapp, faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import ArticlePreview from '../components/article-preview'

class Contact extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const [author] = get(this, 'props.data.allContentfulPerson.edges')
    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <div className={styles.contact}>
            <div className={styles.contactTitle}>Contact</div>
            <div className={styles.contactInfo}>
                <a href={`${author.node.github}`} target="_blank" title="GitHub">
                    <FontAwesomeIcon icon={faGithub} color={'black'} style={{fontSize: 30}}/>
                </a>
                &nbsp;&nbsp;&nbsp;
                <a href={`${author.node.stackOverflow}`} target="_blank" title="StackOverflow">                
                    <FontAwesomeIcon icon={faStackOverflow} color={'#f48024'} style={{fontSize: 30}}/>
                </a>
                &nbsp;&nbsp;&nbsp;
                <a href={`${author.node.linkedIn}`} target="_blank" title="LinkedIn">                
                    <FontAwesomeIcon icon={faLinkedin} color={'#0077b5'} style={{fontSize: 30}}/>
                </a>
                &nbsp;&nbsp;&nbsp;
                <a href={`mailto:${author.node.email}`} target="_blank" title={`Email to: ${author.node.email}`}>                
                    <FontAwesomeIcon icon={faGooglePlusG} color={'#B23121'} style={{fontSize: 30}}/>
                </a>
                &nbsp;&nbsp;&nbsp;
                <a href={`tel:${author.node.phone}`} target="_blank" title={`WhatsApp to: ${author.node.phone}`}>                
                    <FontAwesomeIcon icon={faWhatsapp} color={'#4FCE5D'} style={{fontSize: 30}}/>
                </a>
            </div>
          </div>
          <div className="wrapper">
            <h2 className="section-headline">My Portfolio</h2>
            <ul className="article-list">
              {posts.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <ArticlePreview article={node} />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Contact

export const pageQuery = graphql`
  query Contact {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allContentfulPerson{
        edges {
          node {
            email
            phone
            github
            linkedIn
            stackOverflow
          }
        }
      }
  }
`
