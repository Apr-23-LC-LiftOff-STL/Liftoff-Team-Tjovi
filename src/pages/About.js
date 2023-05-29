import MovieBar from "../components/MovieBar/MovieBar";

export default function About() {
  return (
    <div>
      <div>
        <nav
          className="breadcrumb is-medium has-succeeds-separator pl-6 pt-1 pb-2"
          aria-label="breadcrumbs"
        >
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li className="is-active">
              <a href="#" aria-current="page">
                About MovieDL
              </a>
            </li>
          </ul>
        </nav>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui
          provident consequuntur vel omnis quisquam rem harum, maxime expedita,
          ullam ut dolore! Distinctio eos minima voluptatum totam id hic!
          Sapiente debitis quia illum officia obcaecati provident nulla odio
          molestiae suscipit quasi.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui
          provident consequuntur vel omnis quisquam rem harum, maxime expedita,
          ullam ut dolore! Distinctio eos minima voluptatum totam id hic!
          Sapiente debitis quia illum officia obcaecati provident nulla odio
          molestiae suscipit quasi.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui
          provident consequuntur vel omnis quisquam rem harum, maxime expedita,
          ullam ut dolore! Distinctio eos minima voluptatum totam id hic!
          Sapiente debitis quia illum officia obcaecati provident nulla odio
          molestiae suscipit quasi.
        </p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12463.52241198916!2d-90.2595139!3d38.6516256!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d8b4d4dfb1118d%3A0x46ba750d4f6e9fe1!2sLaunchCode!5e0!3m2!1sen!2sus!4v1682710416782!5m2!1sen!2sus"
          width={600}
          height={400}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"
        ></iframe>
      </div>
      <MovieBar />
    </div>
  );
}
