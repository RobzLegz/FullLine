import React, { useState } from "react";
import { useDispatch } from "react-redux";
import RefComponentModule from "../../modules/RefContainerModule";
import { sendContactEmail } from "../../requests/mailRequests";
import { validateEmail } from "../../utils/valid";
import Button from "../ui/Button";

const ContactForm = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [content, setContent] = useState("");
  const [clicked, setClicked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (clicked) {
      return;
    }

    setClicked(true);

    const sent = await sendContactEmail({
      name,
      email,
      phone,
      content,
      dispatch,
    });

    if (sent) {
      setName("");
      setEmail("");
      setPhone("");
      setContent("");
    }

    setClicked(false);
  };

  return (
    <RefComponentModule className="w-full flex items-center justify-center flex-col py-10 md:py-20 px-4">
      <h3 className="text-primary-800 text-3xl">Vai ir kāds jautājums?</h3>

      <form
        className="flex flex-col items-start justify-start mt-8 w-full max-w-[600px] gap-2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Vārds *"
          value={name}
          maxLength={30}
          required
          onChange={(e) => setName(e.target.value)}
          className="form_input"
        />

        <input
          type="email"
          name="email"
          id="email"
          placeholder="E-pasts *"
          value={email}
          required
          maxLength={60}
          onChange={(e) => setEmail(e.target.value)}
          className="form_input"
        />

        <input
          type="number"
          name="phone"
          id="phone"
          placeholder="Telefons *"
          value={phone}
          maxLength={12}
          onChange={(e) => setPhone(e.target.value)}
          className="form_input"
        />

        <textarea
          name="description"
          id="description"
          placeholder="Kā varam palīdzēt?"
          value={content}
          required
          maxLength={600}
          onChange={(e) => setContent(e.target.value)}
          className="form_input h-28 p-2"
        />

        <Button
          type="submit"
          className="py-2 px-6 md:px-10 bg-pink-500 text-white rounded-md"
          loading={clicked}
          disabled={clicked}
        >
          Nosūtīt
        </Button>
      </form>
    </RefComponentModule>
  );
};

export default ContactForm;
