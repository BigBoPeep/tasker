export default function HeroSection({ text, subtext, children, className }) {
  return (
    <section
      className={`grid grid-cols-[1fr_auto] grid-rows-2 text-balance leading-tight 
        bg-(--color-sec) rounded-md ${className}`}
    >
      <h2 className="row-start-1 col-start-1 self-end leading-11 p-2 text-4 text-center">
        {text}
      </h2>
      <p className="row-start-2 col-start-1 text-1 px-2 self-start text-center font-light">
        {subtext}
      </p>
      <div className="row-start-1 row-span-2 col-start-2 content-center p-4 justify-items-center">
        {children}
      </div>
    </section>
  );
}
