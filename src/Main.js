import React from "react";
import Mainitems from "./Mainitems";
import ReactPaginate from "react-paginate";
export default function Main() {
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [masterData, setmasterData] = React.useState([]);
  const [search, setsearch] = React.useState("");
  const [offset, setOffset] = React.useState(0);
  const [perPage] = React.useState(10);
  const [pageCount, setPageCount] = React.useState(0);
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  };

  React.useEffect(() => {
    fetch("https://www.breakingbadapi.com/api/characters")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setmasterData(json);
        setPageCount(Math.ceil(json.length / perPage));
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [offset]);
  const slice = data.slice(offset, offset + perPage);
  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item ? item.name.toLowerCase() : "";
        const itemData2 = item ? item.nickname.toLowerCase() : " ";
        console.log(itemData, "itemdata ");
        const textData = text.toLowerCase();

        return (
          itemData.indexOf(textData) > -1 || itemData2.indexOf(textData) > -1
        );
      });
      setData(newData);
      setsearch(text);
    } else {
      setData(masterData);
      setsearch(text);
    }
  };
  return (
    <div className="container-main">
      <div>
        <img
          src="https://i.pinimg.com/originals/d3/bb/d0/d3bbd00fc97e601c6dabca395af2e7f6.png"
          className="m-auto h-60  "
        />
      </div>
      <div className="search-div">
        <input
          placeholder="Search Characters"
          type="text"
          className="w-full focus:outline-none p-2 border"
          onChange={(event) => searchFilter(event.target.value)}
        />
      </div>

      <div className="grid grid-cols-4 gap-4 p-16">
        {slice &&
          slice.map((item, idx) => {
            return (
              <Mainitems
                key={item.char_id}
                image={item.img}
                name={item.name}
                status={item.status}
                dob={item.birthday}
                nickname={item.nickname}
                link={item.name}
              />
            );
          })}
      </div>
      <div className="text-center">
        <div className="m-auto">
          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </div>
  );
}
