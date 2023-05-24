import React from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { handleFetch } from '../utilities/Api';
import { Button } from './Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import { FidgetSpinner } from 'react-loader-spinner';

export class App extends React.Component {
  state = {
    pictures: [],
    request: '',
    page: 1,
    totalPage: 1,
    isOpen: false,
    isLoadding: false,
    error: false,
    url: '',
    alt: '',
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.request !== this.state.request
    ) {
      try {
        this.toggleSpiner();
        const response = await handleFetch(this.state.request, this.state.page);

        prevState.request !== this.state.request
          ? this.setState(prevState => ({
              pictures: [...response.hits],
              totalPage: Math.ceil(response.total / 12),
            }))
          : this.setState(prevState => ({
              pictures: [...prevState.pictures, ...response.hits],
            }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.toggleSpiner();
      }
    }
  }

  toggleModal = (url, alt) => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen, url, alt }));
  };
  toggleSpiner = () => {
    this.setState(prevState => ({ isLoadding: !prevState.isLoadding }));
  };
  onSubmit = request => {
    this.setState({ request, page: 1 });
  };

  onLoadBtnClick = () => {
    if (this.state.page < this.state.totalPage) {
      this.setState(prevState => ({ page: prevState.page + 1 }));
    }
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.isLoadding && (
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
          <ImageGalleryItem
            data={this.state.pictures}
            toggleModal={this.toggleModal}
          />
        </ImageGallery>

        {this.state.totalPage > this.state.page && (
          <Button handleClick={this.onLoadBtnClick} />
        )}
        {this.state.isOpen && (
          <Modal
            toggleModal={this.toggleModal}
            img={this.state.url}
            alt={this.state.alt}
          />
        )}
      </div>
    );
  }
}
