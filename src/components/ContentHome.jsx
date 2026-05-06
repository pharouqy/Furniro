function ContentHome({ living, text }) {
  return (
    <article>
      <img
        src={living}
        alt="banner"
        className="w-full h-full object-cover rounded-xl hover:scale-105 transition-all duration-500"
      />
      <h3 className="text-center my-3 font-bold">{text}</h3>
    </article>
  );
}

export default ContentHome;
