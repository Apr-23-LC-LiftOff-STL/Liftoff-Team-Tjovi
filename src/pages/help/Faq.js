import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';

export default function Faq() {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div>
      <div
        className="mx-6 px-5 py-5 box"
        style={{
          borderStyle: "solid",
          borderColor: "lightgray",
          borderWidth: "1px",
        }}
      >
        <div className="question">
          <p><span className="has-text-info"><FontAwesomeIcon icon={faCircleQuestion} /></span>&nbsp;
            <strong>Is this a real site and business?  How do I download my movie?</strong>
          </p>
          <p className="pt-2 pl-5">
            Although this site looks somewhat legit, it's not, so please don't
            spend any money here. We don't actually have resources with which to
            sell and send you movies.
          </p>
        </div>
        <br></br>

        <div className="question">
        <p><span className="has-text-info"><FontAwesomeIcon icon={faCircleQuestion} /></span>&nbsp;
            <strong>
              I recently purchased eight copies of 2 Fast 2 Furious, but lead a busy life
              and don't know when I will have time to watch them all.  What do I do next?
            </strong>
          </p>
          <p className="pt-2 pl-5">
            We find that nine copies is the generally sweet spot for this title.
            Have you considered placing a subsequent order?
          </p>
        </div>
        <br></br>


        <div className="question">
        <p><span className="has-text-info"><FontAwesomeIcon icon={faCircleQuestion} /></span>&nbsp;
            <strong>Lorem ipsum dolor sit amet?</strong>
          </p>
          <p className="pt-2 pl-5">
            Thanks for asking, we get this one all the time. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Obcaecati tenetur
            consectetur dolorem eius ex, ad, laudantium inventore quia odio
            minus eligendi ipsa.
          </p>
        </div>
        <br></br>

        <div className="question">
        <p><span className="has-text-info"><FontAwesomeIcon icon={faCircleQuestion} /></span>&nbsp;
            <strong>What tech stack did you use for this web app?</strong>
          </p>
          <p className="pt-2 pl-5">
            Check the <NavLink to="/about" className="has-text-link">About page</NavLink> for details.
          </p>
        </div>
        <br></br>

      </div>
    </div>
  );
}
