import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import AdvertisedProducts from './AdvertisedProducts';
import Banner from './Banner';
import Categories from './Categories';
import RecentlyAdded from './RecentlyAdded';

const Home = () => {
    return (
        <div>
            <HelmetProvider>
                <Helmet>
                    <title>Home - The Story Keeper</title>
                </Helmet>
            </HelmetProvider>
            <Banner></Banner>
            <AdvertisedProducts></AdvertisedProducts>
            <RecentlyAdded></RecentlyAdded>
            <Categories></Categories>
        </div>
    );
};

export default Home;