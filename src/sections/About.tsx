import { GlassCard } from "../components/GlassCard";
import { StickerScatter, type ScatterPhoto } from "../components/Sticker";
import bauhaus from "../content/about/bauhaus.jpg";
import boulder from "../content/about/boulder.jpg";
import pole from "../content/about/pole.jpg";
import portraitBeach from "../content/about/portrait-beach.jpg";
import portraitWave from "../content/about/portrait-wave.jpg";

// Beside the text, `place` zigzags them top to bottom down the right column;
// below 1024px they're a row under the text, left to right, every second one
// lower (`width`). Blob outlines rotate through a/b/c.
const photos: ScatterPhoto[] = [
  {
    src: portraitWave,
    alt: "David in a loose striped shirt on a sunny terrace, holding a hand up toward the camera.",
    rotate: -6,
    shape: "blob-a",
    width: 0.19,
    place: { x: 0.05, y: 0, w: 0.56 },
    aspect: 728 / 1000,
  },
  {
    src: pole,
    alt: "David upside down on a pole in a tucked grip, knees pulled in and one hand gripping low, in a studio lit red.",
    rotate: 5,
    shape: "blob-b",
    width: 0.16,
    place: { x: 1, y: 0.2, w: 0.44 },
    aspect: 565 / 1000,
  },
  {
    src: portraitBeach,
    alt: "David at the beach at dusk, holding up a can of beer and smiling at the camera.",
    rotate: -2,
    shape: "blob-c",
    width: 0.18,
    place: { x: 0.2, y: 0.5, w: 0.5 },
    aspect: 675 / 1000,
  },
  {
    src: boulder,
    alt: "David climbing a tall sandstone slab boulder at Bahratal, reaching for a hold near the top.",
    rotate: 6,
    shape: "blob-a",
    width: 0.17,
    place: { x: 0.95, y: 0.76, w: 0.46 },
    aspect: 616 / 1000,
  },
  {
    src: bauhaus,
    alt: "David climbing the spiral staircase at Bauhaus University Weimar, under a mural of blue, red, and yellow shapes.",
    rotate: -4,
    shape: "blob-b",
    width: 0.2,
    place: { x: 0.1, y: 1, w: 0.54 },
    aspect: 800 / 1000,
  },
];

export function About() {
  return (
    <GlassCard as="section" id="about" className="section about">
      <h2>About Me</h2>

      <div className="about__body">
        <div className="about__text">
          <h3>Curiosity and creativity motivate me</h3>
          <p>
            My academic career began with me as a computer science student, but
            I shifted this trajectory to{" "}
            <a
              href="https://computationalmedia.gatech.edu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              computational media
            </a>{" "}
            after my first internship, because I craved to dive deeper into the
            more creative and design-focused side of computing. This, paired
            with my curiosity in other languages and cultures, brought me to{" "}
            <a
              href="https://www.uni-weimar.de/de/medien/studium/human-computer-interaction-msc/the-programme/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bauhaus University's Human-Computer Interaction (HCI) program
            </a>
            , where I continued my exploration in languages & cultures, creative
            practices, and HCI methods & how they can be situated in those
            contexts.
          </p>

          <h3>
            I feel fulfilled when designing & researching for underrepresented
            people & spaces
          </h3>
          <p>
            Accessibility has also been a through line for the work I've been
            interested in. From uncovering biases in products' design, to
            working with underrepresented users to bring more visibility and
            accessibility to the benefits that certain technology afford, I have
            found that I am interested mostly in HCI and UX research that
            empower those who are underserved by mainstream product design.
          </p>

          <h3>I can also be found...</h3>
          <ul>
            <li>
              🪨 at the bouldering gym practicing dynamic moves or on my
              favorite wall, the slab wall
            </li>
            <li>
              💃🏻 at the dance studio working on my handstands or cleaning my
              tricks, aerial & floor
            </li>
            <li>
              🛋️ at home reading, crocheting, studying a language, or
              considering a new hobby to dabble in
            </li>
          </ul>
        </div>

        <StickerScatter photos={photos} free className="about__photos" />
      </div>
    </GlassCard>
  );
}
