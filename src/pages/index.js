import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Layout from "../components/layout"
import Seo from "../components/seo"
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageSearch from "../components/ImageSearch";
import * as styles from "../components/index.module.css"

const IndexPage = () => (
  <Layout>
    <Row>
      <Col>
        <div className={styles.textCenter}>
          <StaticImage
            src="../images/gatsby-icon.png"
            loading="eager"
            width={64}
            quality={95}
            formats={["auto", "webp"]}
            alt="Gatsby"
            style={{ marginBottom: `var(--space-3)` }}
          />
          <h1>
            Welcome to <b>Unsplash Demo Homepage!</b>
          </h1>
        </div>
          <ImageSearch/>
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
