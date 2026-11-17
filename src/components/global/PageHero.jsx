
import footerbg from "../../assets/footerbg.jpg";
import bottomLine from "../../assets/header/bottom_line.png";

export default function PageHero({ title, showLine = false }) {
  return (
    <section
      className="relative flex min-h-[clamp(10rem,20vh,16rem)] items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${footerbg})` }}
    >
      {/* Mørkt overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Overskrift og dekorativ streg */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="page-hero-title text-center uppercase text-white">
          {title}
        </h1>

        {showLine && (
          <img
            src={bottomLine}
            alt=""
            aria-hidden="true"
            className="mt-2 w-[160px] max-w-none"
          />
        )}
      </div>
    </section>
  );
}
