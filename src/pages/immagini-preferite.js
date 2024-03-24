import * as React from "react"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Layout from "../components/layout"
import Seo from "../components/seo"
import 'bootstrap/dist/css/bootstrap.min.css';
import * as styles from "../components/index.module.css"
import FavoriteImages from "../components/FavoriteImages";

const IndexPage = () => (
  <Layout>
    <Row>
      <Col>
        <div className={styles.textCenter}>
          <h1 className="my-5">
           Le mie immagini preferite
          </h1>
        </div>
        <FavoriteImages/>
      </Col>
    </Row>
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
