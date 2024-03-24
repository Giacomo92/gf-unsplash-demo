import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import ImageGallery from './ImageGallery';
import Form from 'react-bootstrap/Form';
import {Button, InputGroup} from "react-bootstrap";

const ImageSearch = () => {
  const [keyword, setKeyword] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');

  const searchImages = useCallback(async (page = 1, isRandom = false, keyword) => {
    console.log(keyword)
    if (!keyword && !isRandom) {
      setError('Per favore inserisci una parola chiave per la ricerca');
      return;
    }
    try {
      const count = 12;
      const per_page = 12;
      const url = isRandom ? `${process.env.GATSBY_UNSPLASH_BASE_URL}photos/random` : `${process.env.GATSBY_UNSPLASH_BASE_URL}search/photos`;
      const response = await axios.get(url, {
        params: { query: keyword, page, count, per_page },
        headers: {
          Authorization: `Client-ID ${process.env.GATSBY_UNSPLASH_ACCESS_KEY}`,
        },
      });
      const result = isRandom ? response.data :  response.data.results;

      if(page === 1){
        setImages(result);
      }else{
        setImages(prevImages => [...prevImages, ...result]);
      }
      setError('');
    } catch (error) {
      setError('Si è verificato un errore durante la ricerca delle immagini.');
      console.error(error);
    }
  }, []);

  useEffect(() => {
    searchImages(currentPage, true, keyword);
  }, [currentPage, searchImages]);


  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchImages(currentPage, false, keyword);
    }
  };

  const loadMoreImages = () => {
    setCurrentPage(prevPage => prevPage + 1);
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
            onKeyDown={handleKeyPress}
          />
          <Button onClick={() =>  searchImages(currentPage, false, keyword)}
                  variant="outline-secondary" id="search-button">
            Cerca
          </Button>
        </InputGroup>
      </form>
      {error && <p>{error}</p>}
      <ImageGallery isFavorite={false} images={images} />
      <div className="d-flex mt-5 justify-content-center">
        <Button variant="primary" onClick={loadMoreImages}>Carica altre immagini</Button>
      </div>
    </div>
  );
};

export default ImageSearch;
