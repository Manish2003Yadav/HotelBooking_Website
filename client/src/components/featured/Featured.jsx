import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=mumbai,ahmedabad,dehradun"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://images.pexels.com/photos/774042/pexels-photo-774042.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>mumbai</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              // src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
              src="https://images.pexels.com/photos/70441/pexels-photo-70441.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>ahmedabad</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>dehradun</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
