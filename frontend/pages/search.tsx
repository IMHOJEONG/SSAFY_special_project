import React, {useState} from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import LoadingComponent from '../components/LoadingComponent/LoadingComponent';

const DynamicComponent = dynamic(() =>
  import('../components/SearchComponents/SearchBackground'), {
  loading: function loadingComponent() {
    return <LoadingComponent />;
  },
});

function Search({data}) {
  const [searchString, setSearchString] = useState('');
  const router = useRouter();
  function handleInputChange(event) {
    setSearchString(event.target.value);
  }

  const handleData = () => {
    if (searchString === '') {
      router.push(`/search?date=2019`);
    } else {
      router.push(`/search?date=${searchString}`);
    }
  };
  return (
    <div>
      <DynamicComponent />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      data: []
    }
  }
};

export default Search;
