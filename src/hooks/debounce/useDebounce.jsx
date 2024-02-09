import { debounce } from '../../utils/utils';

function useDebounce(dispatch) {

  const debouncedSetPage = debounce((newPage) => {
    console.log(newPage)
    dispatch({
      type: "SET_CUSTOM_PAGE",
      payload: newPage
    });
  }, 300);

  const debouncedSetSearch = debounce((searchData) => {
    dispatch({
      type: "SET_SEARCH",
      payload: searchData
    })
  }, 500);

  return {
    debouncedSetPage,
    debouncedSetSearch,
  };
}

export default useDebounce;