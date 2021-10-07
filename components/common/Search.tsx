interface Props {
  search: string;
  onSearch: (value: string) => void;
}

const Search = ({ onSearch, search }: Props) => {
  return (
    <div className="flex items-center w-full p-2 mb-2 rounded-lg shadow-md md:w-1/3">
      <img src="/search.svg" width="15" height="15" className="mr-2" />
      <input
        className="flex-grow w-auto focus:border-transparent focus:outline-none"
        type="search"
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search"
        value={search}
      />
      {search && (
        <img
          title="Clear Search"
          className="order-last cursor-pointer"
          src="/close.svg"
          width="15"
          height="15"
          onClick={() => onSearch('')}
        />
      )}
    </div>
  );
};

export default Search;
