import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

const Navigation = ()=>(
    <div className="mt-4">
        <Link to="/dashboard">
            <h1 className="text-center">
                WalzeApp
            </h1>
        </Link>
    </div>
);

export const ConnectedNavigation = connect(state=>state)(Navigation);