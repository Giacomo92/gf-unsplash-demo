import React from 'react';
import {FaHeart, FaUser, FaCalendarAlt, FaLink, FaEye, FaDownload} from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';

const ImageDetails = ({ image }) => {
  return (
            <div className="mb-4 shadow-sm">
              <Row>
                <Col md={6}>
                  <p><strong>ID:</strong> {image.id}</p>
                  <p><strong>Location:</strong> {image.location.name}</p>
                  <p><FaUser/><strong>Caricata da:</strong> {image.user.username}</p>
                  <p><strong>Dimensioni:</strong> {image.width} x {image.height}</p>
                  <p><FaHeart/><strong>Likes:</strong> {image.likes}</p>
                </Col>
                <Col md={6}>
                  <p><FaDownload/><strong>Downloads:</strong> {image.downloads}</p>
                  <p><FaCalendarAlt /> <strong>Creata il:</strong> {new Date(image.created_at).toLocaleDateString()}<br /></p>
                  <p><FaCalendarAlt /> <strong>Aggiornata il:</strong> {new Date(image.updated_at).toLocaleDateString()}<br /></p>
                  <p><FaLink /> <a href={image.links.html} target="_blank" rel="noopener noreferrer">Visualizza su Unsplash</a></p>
                  <p><FaEye/><strong>Visualizzazioni:</strong> {image.views}</p>
                </Col>
              </Row>
            </div>
  );
};

export default ImageDetails;
