import React from 'react';
import Banner from './Banner';
import Categories from './Categories';
import RecentlyAdded from './RecentlyAdded';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <RecentlyAdded></RecentlyAdded>
            <Categories></Categories>
        </div>
    );
};

export default Home;