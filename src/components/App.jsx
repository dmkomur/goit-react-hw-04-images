import React, { useEffect, useState, useRef } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { handleFetch } from '../utilities/Api';
import { Button } from './Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import { FidgetSpinner } from 'react-loader-spinner';

export const App = () => {
  const [pictures, setPictures] = useState([]);
  const [request, setRequest] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [err, setErr] = useState(false);
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');
  const isFirstLoad = useRef(true);
  useEffect(() => {
    if (isFirstLoad.current) {
      return;
    }
    toggleSpiner();
    handleFetch(request, page)
      .then(response => {
        setPictures([...response.hits]);
        setTotalPage(Math.ceil(response.total - 12));
      })
      .catch(error => {
        setErr(error);
      })
      .finally(toggleSpiner());
    // eslint-disable-next-line
  }, [request]);

  useEffect(() => {
    if (isFirstLoad.current) {
      return;
    }
    toggleSpiner();
    handleFetch(request, page)
      .then(response => {
        setPictures(prevState => [...prevState, ...response.hits]);
      })
      .catch(error => {
        setErr(error);
        console.log(err);
      })
      .finally(toggleSpiner());
    // eslint-disable-next-line
  }, [page]);

  const toggleModal = (url, alt) => {
    setIsOpen(prevState => !prevState);
    setUrl(url);
    setAlt(alt);
  };
  const toggleSpiner = () => {
    setIsLoading(prevState => !prevState);
  };
  const onSubmit = request => {
    setRequest(prevState => request);
    setPage(1);
    isFirstLoad.current = false;
  };

  const onLoadBtnClick = () => {
    if (page < totalPage) {
      setPage(prevState => prevState + 1);
    }
  };
  return (
    <div className="App">
      <Searchbar onSubmit={onSubmit} />
      {isLoading && (
        <FidgetSpinner
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
          ballColors={['#ff0000', '#00ff00', '#0000ff']}
          backgroundColor="#F4442E"
        />
      )}
      <ImageGallery>
        <ImageGalleryItem data={pictures} toggleModal={toggleModal} />
      </ImageGallery>

      {totalPage > page && <Button handleClick={onLoadBtnClick} />}
      {isOpen && <Modal toggleModal={toggleModal} img={url} alt={alt} />}
    </div>
  );
};
