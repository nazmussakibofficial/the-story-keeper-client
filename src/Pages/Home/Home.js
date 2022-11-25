import React from 'react';
import AdvertisedProducts from './AdvertisedProducts';
import Banner from './Banner';
import Categories from './Categories';
import RecentlyAdded from './RecentlyAdded';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AdvertisedProducts></AdvertisedProducts>
            <RecentlyAdded></RecentlyAdded>
            <Categories></Categories>
        </div>
    );
};

export default Home;