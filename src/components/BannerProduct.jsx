import { Link, useParams } from "react-router-dom";

function BannerProduct() {
  const { id } = useParams();
  return (
    <div className="bg-amber-100 py-7 px-5 flex flex-row gap-1 justify-start items-center w-full">
      <Link to="/" className="font-bold">
        Home
      </Link>{" "}
      \{" "}
      <Link to="/shop" className="font-bold">
        Shop
      </Link>{" "}
      | Product {id}
    </div>
  );
}

export default BannerProduct;
