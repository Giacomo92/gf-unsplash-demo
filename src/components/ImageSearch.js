// src/components/ImageSearch.js
import React, { useState } from 'react';
import axios from 'axios';
import ImageGallery from './ImageGallery';
import Form from 'react-bootstrap/Form';
import {Button, InputGroup} from "react-bootstrap";

const ImageSearch = () => {
  const [keyword, setKeyword] = useState('test');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  const searchImages = async (page = 1) => {
    console.log(keyword);
    if (!keyword) {
      setError('Per favore inserisci una parola chiave per la ricerca');
      return;
    }
    try {
      const url = `${process.env.UNSPLASH_BASE_URL}/search/photos`;
      const response = await axios.get(url, {
        params: { query: keyword, page },
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      });
      console.log(response.data.results)
      setImages(response.data.results);
      setError('');
    } catch (error) {
      setError('Si è verificato un errore durante la ricerca delle immagini.');
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <InputGroup className="mb-3 text-center">
          <Form.Control
            onChange={(event) => setKeyword(event.target.value)}
            aria-label="Ricerca"
            aria-describedby="keyword"
            value={keyword}
          />
          <Button onClick={() => searchImages()}
                  variant="outline-secondary" id="button-addon2">
            Cerca
          </Button>
        </InputGroup>
      </form>
      {error && <p>{error}</p>}
      <ImageGallery images={images} />
    </div>
  );
};

export default ImageSearch;
