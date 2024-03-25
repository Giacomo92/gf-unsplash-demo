import * as React from "react"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import * as styles from "../../components/index.module.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {DiscussionEmbed} from "disqus-react";
import ImageWithSkeleton from "../../components/ImageWithSkeleton";
import ImageDetails from "../../components/ImageDetails";

function capitalizeFirstLetter(string) {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const ImagePage = ({params}) => {
  const {slug} = params;
  const [image, setImage] = useState({
    'urls': {regular: ''},
    'id': '',
    'alt_description': '',
    'user' : {name: ''},
    'likes': 0,
    'downloads': 0,
    'views': 0,
    'tags': [],
    'created_at': '',
    'updated_at': '',
    'links': {self: ''},
    'slug': '',
    'width': 0,
    'height': 0,
    'color': '',
    'location': {name: '', position:{latitude: '', longitude: ''}},
    'exif': {make: '', model: ''}
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
                Immagini
              </Breadcrumb.Item>
              <Breadcrumb.Item active>{capitalizeFirstLetter(image.alt_description)}</Breadcrumb.Item>
            </Breadcrumb>
            <ImageDetails image={image}/>
            <ImageWithSkeleton
              srcSet={`
                ${image.urls.raw}&w=400 400w,
                ${image.urls.raw}&w=800 800w,
                ${image.urls.raw}&w=1200 1200w
              `}
              sizes={`(max-width: 400px) 400px,
              (max-width: 800px) 800px,
              1200px`}
              src={image.urls.regular}
              alt={image.alt_description}
              image={image}/>
            <DiscussionEmbed
              className="mt-5"
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
export const Head = () => <Seo title="Immagine"/>

export default ImagePage
