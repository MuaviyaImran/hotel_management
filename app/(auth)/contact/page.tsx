"use client";
import { ChangeEventHandler, FormEvent, useState } from "react";
import { useNewContactusMutation } from "@/redux/api/contactusApi";
import { useRouter } from "next/navigation";
const Contact = () => {
  const router = useRouter();
  const [newContactus] = useNewContactusMutation();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    subject: "",
    message: "",
  });

  const { name, surname, email, subject, message } = formData;
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userformAPIDataData = {
      name,
      surname,
      email,
      subject,
      message,
    };

    newContactus(userformAPIDataData).then((res) => {
      router.push("/");
    });
  };
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-9">
          <h1 className="mb-3">Contact Us</h1>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">
                  Your Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  required
                  value={name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="surname" className="form-label">
                  Your Surname
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="surname"
                  name="surname"
                  required
                  value={surname}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  Your Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="subject" className="form-label">
                  Your Subject
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  name="subject"
                  required
                  value={subject}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <label htmlFor="message" className="form-label">
                  Your Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="col-12">
                <div className="text-center col-md-6 col-12 mx-auto">
                  <button
                    id="login_button"
                    type="submit"
                    className="btn form-btn w-50 py-2"
                  >
                    Contact us
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "20px",
              alignItems: "center",
            }}
          >
            <span>or</span>
            <span>
              Simply Email us at{" "}
              <b>
                <i className="b">raokalyani532@gmail.com</i>
              </b>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
