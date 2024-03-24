import * as React from "react"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import * as styles from "../../components/index.module.css"
import ImageDetail from "../../components/ImageDetail";
import {useEffect, useState} from "react";
import axios from "axios";
import {DiscussionEmbed} from "disqus-react";

function capitalizeFirstLetter(string) {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const ImagePage = ({ params }) => {
  const { slug } = params;
  const [image, setImage] = useState({
    'urls' : {regular : ''},
    'id' : '',
    'alt_description' : '',
  });


  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = `${process.env.GATSBY_UNSPLASH_BASE_URL}/photos/${slug}`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Client-ID ${process.env.GATSBY_UNSPLASH_ACCESS_KEY}`,
          },
        });
        setImage(response.data);
      } catch (error) {
        console.error("Errore nel caricamento dell'immagine da Unsplash", error);
      }
    };

    if (slug) {
      fetchImage();
    }
  }, [slug]);
  return (
    <Layout>
      <Row>
        <Col>
          <div className={styles.textCenter}>

            <h1 className="my-5">
              {capitalizeFirstLetter(image.alt_description)}
            </h1>

            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="#">
                Images
              </Breadcrumb.Item>
              <Breadcrumb.Item active>{capitalizeFirstLetter(image.alt_description)}</Breadcrumb.Item>
            </Breadcrumb>

            <ImageDetail image={image}/>
            <DiscussionEmbed
              shortname='example'
              config={
                {
                  url: `${process.env.GATSBY_BASE_URL}/immagini/${image.slug}`,
                  identifier: image.id,
                  title: image.alt_description,
                  language: 'it_IT'
                }
              }
            />
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Immagine" />

export default ImagePage
