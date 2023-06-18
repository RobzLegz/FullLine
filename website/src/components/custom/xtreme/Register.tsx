import Image from "next/image";
import React, { useState } from "react";
import { registerHackathonParticipant } from "../../../requests/userRequests";
import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import Link from "next/link";

const Register = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [grade, setGrade] = useState("");
  const [school, setSchool] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegisterClick = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);

    const successful = await registerHackathonParticipant({
      name,
      email,
      school,
      grade,
      dispatch,
      question,
    });

    if (successful) {
      setName("");
      setEmail("");
      setGrade("");
      setSchool("");
      setQuestion("");
    }

    setLoading(false);
  };

  return (
    <section className="w-full h-full flex items-center justify-center">
      <div className="fixed top-0 left-0 h-[110vh] w-full bg-secondary-900">
        <Image
          src="/images/neon-bg.jpg"
          className="w-full h-full"
          alt="Colored neon stripes"
          width={2000}
          height={1000}
          draggable={false}
          blurDataURL="/images/neon-bg.jpg"
          placeholder="blur"
        />
      </div>

      <form
        className="mt-20 flex flex-col items-start justify-start z-10 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 p-2 md:p-6 w-[90vw] max-w-[800px] gap-4 border-0 mb-20"
        onSubmit={handleRegisterClick}
      >
        <strong className="text-white text-4xl mb-4">Reģistrācija</strong>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="name" className="form_label text-primary-100 text-lg">
            Vārds, uzvārds
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="form_input bg-transparent-400 text-white rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="email"
            className="form_label text-primary-100 text-lg"
          >
            Epasts
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="form_input bg-transparent-400 text-white rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="grade"
            className="form_label text-primary-100 text-lg"
          >
            Klase / Kurss
          </label>
          <input
            type="text"
            name="grade"
            id="grade"
            required
            className="form_input bg-transparent-400 text-white rounded-md"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="school"
            className="form_label text-primary-100 text-lg"
          >
            Skola
          </label>
          <input
            type="text"
            name="school"
            id="school"
            required
            className="form_input bg-transparent-400 text-white rounded-md"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="ama" className="form_label text-primary-100 text-lg">
            Vai ir kāds jautājums mums?
          </label>
          <textarea
            name="ama"
            id="ama"
            className="form_input bg-transparent-400 text-white rounded-md h-40 p-2 resize-none"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <div className="flex w-full items-center justify-start mt-2">
          <input
            type="checkbox"
            name="agreed"
            id="agreed"
            className="w-3.5 h-3.5 mr-1"
            required
          />
          <label htmlFor="agreed" className="text-white">
            Piekrītu{" "}
            <Link
              href="/privatuma-politika"
              className="text-accent hover:underline"
            >
              privātuma politikai
            </Link>
          </label>
        </div>

        <Button
          className="form_button bg-transparent-400 text-white rounded-md border border-gray-500"
          type="submit"
          disabled={loading}
          loading={loading}
        >
          Pieteikties
        </Button>
      </form>
    </section>
  );
};

export default Register;
