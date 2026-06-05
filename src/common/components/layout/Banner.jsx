import { Link } from "react-router-dom";

export default function Banner({ title, bgImage, breadcrumbs = [] }) {
  return (
    <section
      className="relative flex min-h-[280px] w-full items-end overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
      aria-label={`${title} page banner`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/25 to-white/20" />
      <div className="container-page relative z-10 pb-10 pt-20 text-white">
        <p className="eyebrow text-white/80">Furniro collection</p>
        <h1 className="mt-2 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
          {title}
        </h1>

        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mt-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm font-semibold text-white/85">
              <li>
                <Link to="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb) => (
                <li key={`${crumb.label}-${crumb.path || "current"}`} className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  {crumb.path ? (
                    <Link to={crumb.path} className="transition-colors hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>
    </section>
  );
}
