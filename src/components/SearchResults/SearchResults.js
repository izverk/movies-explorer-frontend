import './SearchResults.css';

const SearchResults = ({ badSearchResult }) => {
	return <span className='search-result-message'>{badSearchResult}</span>;
};

export default SearchResults;
