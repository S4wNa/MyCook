import React from "react";

function AboutPage() {
  const items = [
    {
      title: "Our Story",
      pg: "It all began with one simple belief: cooking should be accessible to everyone.At MyCook, we recognized that many people find cooking intimidating or complicated.Whether you're a busy parent, a student living on your own for the first time, or someone who has always relied on takeout, we wanted to create a  platform that makes cooking approachable, enjoyable, and stress-free.",
    },
    {
      title: "Our platform is designed to be :",

      pg: "Inclusive: Whether you're a beginner or a seasoned chef, MyCook has something for you\nInteractive: Select ingredients visually, customize portions, and share your creations\nCommunity-driven: Every recipe can be rated, commented on, and improved by our users\nDiverse: Explore dishes from around the world or stick to familiar comfort food",
    },
    {
      title: "Join Our Community",
      pg: "MyCook is more than just a recipe platform—it's a growing community of food enthusiasts who believe in making cooking accessible for everyone. Whether you're looking for quick weeknight dinner ideas, planning a special occasion meal, or wanting to share your grandmother's secret recipe with the world, MyCook is your culinary home. Sign up today to start your cooking journey with us and let's Cook Together.",
    },
  ];
  return (
    <div className="flex flex-col justify-center items-center opacity-70 overflow-hidden">
      <h1 className="text-3xl  my-5 md:mb-10">About MyCook</h1>

      <div className="mx-4">
        {items.map((item, index) => {
          return (
            <div key={index} className="w-full max-w-110 ">
              <h2 className="text-[#ff873c] text-2xl mb-5">{item.title}</h2>
              <div className="w-full bg-white rounded-lg mb-6">
                <p className="whitespace-pre-line p-4"> {item.pg}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AboutPage;
