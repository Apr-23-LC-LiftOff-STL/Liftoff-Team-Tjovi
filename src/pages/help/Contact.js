import { useState } from "react";
import { Form, redirect, useActionData, useNavigate } from "react-router-dom";

import logo125 from "../../logos/Logo_MovieDL_20230426_125x22.png";

export default function Contact() {
  const [open, setOpen] = useState(false);

  const data = useActionData();

  const navigate = useNavigate();

  const handleResetFields = (e) => {
    e.preventDefault();
    e.target.closest("form").reset();
    navigate("/help/contact");
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <p className="mx-6 pb-2">
        If you have a question not addressed in the FAQ, please send us a
        message here.
      </p>
      <div
        className="mx-6 px-5 py-5 box"
        style={{
          borderStyle: "solid",
          borderColor: "lightgray",
          borderWidth: "1px",
        }}
      >
        <Form method="post" action="/help/contact">
          <div className="columns">
            <div className="column is-3">
              <div class="field">
                <label className="label">
                  <span>Your Name</span>{" "}
                  {data && data.errorName && (
                    <span className="has-text-danger has-text-weight-normal">
                      {data.errorName}
                    </span>
                  )}
                </label>
                <div class="control">
                  <input class="input" type="text" name="name" />
                </div>
              </div>
            </div>
            <div className="column is-3">
              <div class="field">
                <label className="label">
                  <span>Your E-mail</span>{" "}
                  {data && data.errorEmail && (
                    <span className="has-text-danger has-text-weight-normal">
                      {data.errorEmail}
                    </span>
                  )}
                </label>
                <div class="control">
                  <input class="input" type="email" name="email" />
                </div>
              </div>
            </div>
            <div className="column is-3">
              <div class="field">
                <label class="label">Order No.</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    name="orderNo"
                    placeholder="(optional)"
                  />
                </div>
              </div>
            </div>
          </div>
          <label>
            <div className="field">
              <label className="label">
                <span>Your Message</span>{" "}
                {data && data.errorMessage && (
                  <span className="has-text-danger has-text-weight-normal">
                    {data.errorMessage}
                  </span>
                )}
              </label>
              <div class="control">
                <textarea className="textarea" name="message"></textarea>
              </div>
            </div>
          </label>
          <div className="field">
            <div className="control">
              <label className="checkbox pt-2">
                <input type="checkbox" name="tac" />
                &nbsp;I agree to the <a href="#">terms and conditions &nbsp;</a>
                {data && data.errorTac && (
                  <span className="has-text-danger has-text-weight-normal">
                    {data.errorTac}
                  </span>
                )}
              </label>
            </div>
          </div>
          <div>
            {data && data.errorGeneral && (
              <p className="has-text-danger pb-2">{data.errorGeneral}</p>
            )}
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button className="button is-primary">Submit</button>
            </div>
            <div class="control">
              <button className="button is-warning" onClick={handleResetFields}>
                Reset Fields
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export const contactAction = async ({ request }) => {
  const data = await request.formData();

  let date = new Date();

  const submission = {
    date: date,
    name: data.get("name"),
    email: data.get("email"),
    orderNo: data.get("orderNo"),
    message: data.get("message"),
    tacOk: data.get("tac"),
  };

  const errors = {};

  if (submission.name.length < 1 || submission.name === null) {
    errors.errorName = "*required field";
    errors.errorGeneral = "Submission incomplete, please try again.";
  }
  if (submission.email.length < 1 || submission.email === null) {
    errors.errorEmail = "*required field";
  }
  if (submission.message.length < 10 || submission.message === null) {
    errors.errorMessage = " *must be over 10 characters long.";
  }
  if (submission.tac === "off") {
    errors.errorTac = "*required";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  console.log(submission);
  alert(
    `Your message has been submitted. Please wait 60-120 business days for reply.  Thank you! - MovieDL Customer Support Team`
  );

  // send your post request

  // redirect the user
  return redirect("/");
};
