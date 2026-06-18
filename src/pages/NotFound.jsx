import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center bg-[#fbfbf9]">
      <section className="container-page text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 text-5xl font-extrabold text-stone-950 md:text-7xl">Page not found</h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-stone-500 md:text-base">
          The page you are looking for may have moved, or the link is no longer available.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">Back Home</Link>
          <Link to="/shop" className="btn-secondary">Shop Products</Link>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
