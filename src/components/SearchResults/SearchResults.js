import React from 'react';
import './SearchResults.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const SearchResults = () => {
	const context = React.useContext(CurrentUserContext);
	const { badSearchResult } = context;
	return <span className='search-result-message'>{badSearchResult}</span>;
};

export default SearchResults;
