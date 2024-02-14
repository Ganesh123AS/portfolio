import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./index";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { toast } from "react-toastify";


// template_key = template_jgtw25u
// service_key = service_di6b3ei
// public_key = EN21ctmXF8A4N_MZS


const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      "service_di6b3ei",
      "template_jgtw25u",
      {
        from_name: form.name,
        to_name: "Sameer",
        from_email: form.email,
        to_email: "bhattsameer127@gmail.com",
        message: form.message,
      },
      "EN21ctmXF8A4N_MZS",
    )
    .then(() => {
      setLoading(false);
      toast.success("Thank you for emailing. I will get back to you as soon as possible!");
      setForm({
        name: "",
        email: "",
        message: "",
      })
    }, (error) => {
      setLoading(false);
      toast.error(`Something went wrong... + ${error.message}`);
    })
  };

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch with me...</p>
        <h3 className={styles.sectionSubText}>Contact me...</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name...</span>
            <input
              type="text"
              name="name"
              value={form.name}
              required
              onChange={handleChange}
              placeholder="Enter Your Name..."
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email...</span>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="Enter Your Email..."
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message...</span>
            <textarea
              rows="7"
              type="message"
              name="message"
              required
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say..."
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <button
            type="submit"
            className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl">
                {loading ? "Sending..." : "Send"}
            </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]">
            <EarthCanvas />
        </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
