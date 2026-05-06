import image from "../assets/living-room.jpg";

function Banner() {
  return (
    <div className="home__banner relative w-full">
      <img src={image} alt="banner h-5 w-full contain" />
      <div className="home__banner__section absolute top-30 right-20 flex flex-col gap-4 justify-left items-center w-60 h-50 bg-orange-100 rounded-2xl">
        <div className="flex flex-col gap-1 justify-center items-start p-8">
          <span className="text-sm p-0 m-0">New Arrival</span>
          <h1 className="text-5xl text-orange-600 font-bold">
            Discover Our New Collection
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            inventore corrupti modi autem in quidem aut eum itaque quasi.
          </p>
          <button
            className="bg-orange-600 text-white px-5 py-2 mt-3 cursor-pointer"
            onClick={() => alert("Farouk")}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
