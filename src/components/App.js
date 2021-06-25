import '../css/styles.css';
import { useState, useEffect, Fragment } from 'react';
import PostsGrid from './PostsGrid';
import Navbar from './Navbar';
import SearchField from './SearchField';
import Loader from './Loader';
import GetMorePosts from './GetMorePosts';
import formatDate from '../utils/formatDate';
import API from '../utils/API';

function App() {
  //holds the string currently in the serach input field
  const [searchField, setSearchField] = useState('');

  //holds the string that was in the input box the last time the search button was pressed
  const [activeSearch, setActiveSearch] = useState('');

  const [scrollId, setScrollId] = useState('');
  const [posts, setPosts] = useState('');
  const [updateTime, setUpdateTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async () => {
    if (activeSearch) return await API.searchPosts(activeSearch);

    return await API.getLatest();
  };

  const getLatestPosts = async () => {
    setIsLoading(true);
    const json = await fetchPosts();
    setPosts(json.data.latestPosts);
    setScrollId(json.data.scrollId);
    setIsLoading(false);
  };

  const getNextPosts = async () => {
    const json = await API.getLatest(scrollId);
    setPosts([...posts, ...json.data.latestPosts]);
    setScrollId(json.data.scrollId);
  };

  const handleSearch = async () => {
    setActiveSearch(searchField);
  };

  useEffect(() => {
    getLatestPosts();
  }, [activeSearch]);

  return (
    <div className="bg-white min-h-screen">
      <div className="w-11/12 max-w-screen-lg mx-auto">
        <Navbar getPosts={getLatestPosts} isLoading={isLoading} />
        <SearchField setSearchField={setSearchField} onSearch={handleSearch} />
        {isLoading ? (
          <Loader classes="text-purple-500" />
        ) : (
          <Fragment>
            <p className="text-lg mb-6 text-gray-400 text-center">
              {updateTime && updateTime}
            </p>
            <PostsGrid posts={posts} />
            <GetMorePosts getNextPosts={getNextPosts} />
          </Fragment>
        )}
      </div>
    </div>
  );
}

export default App;
