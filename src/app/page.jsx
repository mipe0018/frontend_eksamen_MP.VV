
import Hero from "../components/home/Hero";
import Welcome from "../components/home/Welcome";
import FeaturedEvents from "../components/home/FeaturedEvents";
import Gallery from "../components/home/Gallery";
import MusicPlayer from "../components/home/MusicPlayer";
import LatestVideo from "../components/home/LatestVideo";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";

export default function Home() {
  return (
    <main>
      <Hero />
      <Welcome />
      <FeaturedEvents />
      <Gallery />
      <MusicPlayer />
      <LatestVideo />
      <Testimonials />
      <Newsletter />
    </main>
  );
}

