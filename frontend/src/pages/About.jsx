import React from "react";
import Title from "../components/Title";
import { assests } from "../assets/assests";

const About = () => {
  return (
    <div className="animate-fade-in ">
      <div className="text-2xl text-center pt-5">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

     {/* ABOUT US */}
     <div className="my-10 flex flex-col gap-12 md:flex-row items-center">
  {/* Brand Image */}
  <img
    className="w-full md:w-[450px] h-[650px] rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
    src={assests.lemonplant}
    alt="AS Plants"
  />

  {/* Brand Description */}
  <div className="flex flex-col gap-4 justify-center md:w-2/4 text-gray-800 bg-green-50 p-6 rounded-xl shadow-md">
    <p className="text-2xl font-bold text-green-800">
      🌱 AS Plants – Grow With Nature
    </p>

    <p className="leading-relaxed tracking-wide text-justify">
      At <b>AS Plants</b>, we believe every home deserves the freshness and
      positivity of green life. We are a modern nursery-to-home ecommerce
      brand, bringing you <b>healthy, hand-nurtured plants</b> delivered with
      care. From air-purifying indoor greens to ornamental favorites and
      lucky charm plants, our collection is curated to suit every lifestyle.
    </p>
    <p className="leading-relaxed tracking-wide text-justify">
      With a focus on <b>quality, sustainability, and customer happiness</b>,
      AS Plants makes gardening simple for everyone — from beginners to plant
      enthusiasts. Each plant is grown with love, packed eco-friendly, and
      shipped safely to your doorstep.
    </p>
    <p className="text-lg font-semibold text-green-700 mt-2">
      🌿 Why Choose AS Plants?
    </p>
    <ul className="list-disc pl-5 space-y-1">
      <li>Wide range of indoor & outdoor plants</li>
      <li>Nursery-grown for health & longevity</li>
      <li>Easy-care options for beginners</li>
      <li>Eco-friendly packaging & safe delivery</li>
      <li>Trusted by plant lovers across India</li>
    </ul>
    <p className="mt-3 leading-relaxed tracking-wide">
      <b>✨ At AS Plants,</b> it’s more than just plants — it’s about creating
      a greener, happier lifestyle.
    </p>
  </div>
</div>


      {/* OUR MISSION SECETION */}
      <div className="my-8 p-6 bg-green-50 rounded-xl shadow-md animate-fade-in">
        <div className="text-xl py-2 px-2 sm:px-6 md:px-10">
          <p className="text-2xl font-bold text-green-800">
            🌍 Our Mission – AS Plants
          </p>
        </div>
        <div className="text-base text-gray-800 mt-4">
          <p className="mb-3">
            <b>At AS Plants,</b> our mission is simple yet powerful:
            <b>
              {" "}
              to make every home and workspace greener, healthier, and happier.
            </b>
          </p>
          <p className="font-semibold mt-4">We are committed to:</p>
          <ul className="list-none space-y-3 mt-3">
            <li>
              <b>🌱 Bringing Nature Closer –</b> Making it easy for everyone to
              own and care for plants, no matter their space or lifestyle.
            </li>
            <li>
              <b>🌿 Sustainable Living –</b> Promoting eco-friendly practices
              through mindful packaging and responsible sourcing.
            </li>
            <li>
              <b>💚 Customer Happiness –</b> Ensuring every plant reaches you
              fresh, healthy, and ready to thrive.
            </li>
            <li>
              <b>🌸 Spreading Positivity –</b> Sharing the joy, peace, and
              well-being that plants naturally bring into our lives.
            </li>
          </ul>

          <p className="mt-4">
            ✨ With every plant we nurture and deliver, we’re working towards a
            future where{" "}
            <b>green living is not just a choice, but a way of life.</b>
          </p>
        </div>
      </div>

      {/* OUR VISION SECETION */}
      <div className="my-8 p-6 bg-green-50 rounded-xl shadow-md">
        <p className="text-2xl font-bold text-green-800 mb-3">
          🌟 Our Vision – AS Plants
        </p>
        <p className="text-gray-700 mb-4">
          At <span className="font-semibold">AS Plants</span>, we envision a
          world where every home, office, and community thrives with the beauty
          of greenery. Plants are more than just décor — they are life-givers,
          mood-lifters, and silent healers.
        </p>

        <p className="text-gray-700 font-semibold mb-2">Our vision is to:</p>
        <ul className="list-none space-y-2 text-gray-700">
          <li>
            🌱 Be India’s most trusted plant brand, making quality greenery
            accessible to every doorstep.
          </li>
          <li>
            🌿 Build a greener tomorrow, inspiring communities to adopt
            sustainable living through plants.
          </li>
          <li>
            🏡 Transform urban spaces, turning concrete corners into vibrant,
            refreshing sanctuaries.
          </li>
          <li>🌍 Contribute to a healthier planet, one plant at a time.</li>
        </ul>

        <p className="mt-4 text-gray-700">
          ✨ We dream of a future where choosing plants is as natural as
          choosing happiness — and at
          <span className="font-semibold"> AS Plants</span>, we’re making that
          future possible.
        </p>
      </div>
    </div>
  );
};

export default About;
