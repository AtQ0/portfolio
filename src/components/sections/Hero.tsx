import { cn } from "@/lib/utils";
export default function Hero() {
  return (
    <section className="bg-bg-secondary grid w-full lg:grid-cols-2">
      <div className="p-gutter flex h-screen flex-col justify-between bg-amber-500">
        {/* Content */}
        <div
          className={cn(
            "bg-bg-primary text-12 flex w-fit",
            "items-center gap-2.5 rounded-full px-3 py-1.5",
          )}
        >
          <span className="bg-tea-green block size-2 rounded-full" />
          <span className="-mt-px">Open for new projects</span>
        </div>

        <div className="bg-pink-500 p-10">
          <h1
            className="text-fluid-36-64 max-w-[18ch] bg-blue-500 text-pretty"
            aria-label="Crafted experiences, designed to be beautiful and built to last."
          >
            <span aria-hidden="true">
              <span aria-hidden="true">C</span>
              <span aria-hidden="true">r</span>
              <span aria-hidden="true">a</span>
              <span aria-hidden="true">f</span>
              <span aria-hidden="true">t</span>
              <span aria-hidden="true">e</span>
              <span aria-hidden="true">d</span>
            </span>
            <span aria-hidden="true">
              <span aria-hidden="true">e</span>
              <span aria-hidden="true">x</span>
              <span aria-hidden="true">p</span>
              <span aria-hidden="true">e</span>
              <span aria-hidden="true">r</span>
              <span aria-hidden="true">i</span>
              <span aria-hidden="true">e</span>
              <span aria-hidden="true">n</span>
              <span aria-hidden="true">c</span>
              <span aria-hidden="true">e</span>
              <span aria-hidden="true">s</span>
              <span aria-hidden="true">,</span>
            </span>
            <span aria-hidden="true">
              <span aria-hidden="true">d</span>
              <span aria-hidden="true">e</span>
              <span aria-hidden="true">s</span>
              <span aria-hidden="true">i</span>
              <span aria-hidden="true">g</span>
              <span aria-hidden="true">n</span>
              <span aria-hidden="true">e</span>
              <span aria-hidden="true">d</span>
            </span>
            <span aria-hidden="true">
              <span aria-hidden="true">t</span>
              <span aria-hidden="true">o</span>
            </span>
            <span aria-hidden="true">
              <span aria-hidden="true">b</span>
              <span aria-hidden="true">e</span>
            </span>
            <span aria-hidden="true">
              <span aria-hidden="true">b</span>
              <span aria-hidden="true">e</span>
              <span aria-hidden="true">a</span>
              <span aria-hidden="true">u</span>
              <span aria-hidden="true">t</span>
              <span aria-hidden="true">i</span>
              <span aria-hidden="true">f</span>
              <span aria-hidden="true">u</span>
              <span aria-hidden="true">l</span>
            </span>
            <span aria-hidden="true">
              <span aria-hidden="true">a</span>
              <span aria-hidden="true">n</span>
              <span aria-hidden="true">d</span>
            </span>
            <span aria-hidden="true">
              <span aria-hidden="true">b</span>
              <span aria-hidden="true">u</span>
              <span aria-hidden="true">i</span>
              <span aria-hidden="true">l</span>
              <span aria-hidden="true">t</span>
            </span>
            <span aria-hidden="true">
              <span aria-hidden="true">t</span>
              <span aria-hidden="true">o</span>
            </span>
            <span aria-hidden="true">
              <span aria-hidden="true">l</span>
              <span aria-hidden="true">a</span>
              <span aria-hidden="true">s</span>
              <span aria-hidden="true">t</span>
              <span aria-hidden="true">.</span>
            </span>
          </h1>
          <div>
            <p>
              I’m a freelance web designer and developer building with modern
              web technologies from my studio in Sweden.
            </p>
          </div>
        </div>
        <div>
          <p>WHAAAAAAAAWAWAWWAWAAWA</p>
        </div>
      </div>

      {/* Profile image */}
      <div className="w-full bg-blue-500">
        {/* image here */}

        <p>Image</p>
      </div>
    </section>
  );
}
