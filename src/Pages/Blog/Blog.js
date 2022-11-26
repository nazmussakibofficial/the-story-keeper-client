import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Blog = () => {
    return (
        <div className="flex justify-center">
            <HelmetProvider>
                <Helmet>
                    <title>Blog - The Story Keeper</title>
                </Helmet>
            </HelmetProvider>
            <div className='w-3/4 min-h-screen py-16'>
                <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-6">
                    <div className="collapse-title text-xl font-medium">
                        What are the different ways to manage a state in a React application?
                    </div>
                    <div className="collapse-content">
                        <p>
                            There are mainly three ways to handle a state in a react app: using the useState hook, using Context API and using Apollo Link State
                        </p>
                    </div>
                </div>
                <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-6">
                    <div className="collapse-title text-xl font-medium">
                        How does prototypical inheritance work?
                    </div>
                    <div className="collapse-content">
                        <p>prototypical inheritance works by constructing one object through inheritance of a constructor object</p>
                    </div>
                </div>
                <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-6">
                    <div className="collapse-title text-xl font-medium">
                        What is a unit test? Why should we write unit tests?
                    </div>
                    <div className="collapse-content">
                        <p>
                            Unit test is a type of testing where every component of the app is tested, It helps to validate the stability of each components in the app.
                        </p>
                    </div>
                </div>
                <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                    <div className="collapse-title text-xl font-medium">
                        React vs. Angular vs. Vue?
                    </div>
                    <div className="collapse-content">
                        <p>
                            The main difference between react, angular and vue is that react is a UI library, angular is a front end framework and vue.js is a progressive framework.
                            Hence in react it is easier to build apps with built-in modules.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Blog;