import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormField, Loader } from "../components";

import preview from "../assets/preview.png";
import { getRandomPrompt } from "../utils";

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<{
    name: string;
    prompt: string;
    photo: string;
  }>({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);

      try {
        const res = await fetch("https://van-gan.onrender.com/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        if (res.ok) {
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Enter a prompt");
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleRandomPrompt = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  const generateImg = async () => {
    if (form.prompt) {
      setGeneratingImg(true);
      try {
        const res = await fetch(`https://van-gan.onrender.com/api/v1/dalle`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });
        const data = (await res.json()) as { photo: string };

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        console.log(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please entre a prompt");
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-black text-3xl">Create</h1>
        <p className="mt-2 text-gray-500 text-lg max-w-[500px]">
          Let's have fun creating images with Dall-E
        </p>
      </div>
      <form action="" className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName={"Your name"}
            type={"text"}
            name="name"
            placeholder={"Your name"}
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName={"Prompt"}
            type={"text"}
            name="prompt"
            placeholder={"A city where nature took over"}
            value={form.prompt}
            handleChange={handleChange}
            isRandomPrompt
            handleRandomPrompt={handleRandomPrompt}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 foxus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-hull  h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImg}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-gray-500">
            You can now share this image with the community
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-purple-500 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            {loading ? "Sharing..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
