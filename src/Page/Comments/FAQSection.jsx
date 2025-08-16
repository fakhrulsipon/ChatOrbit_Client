import React from 'react';

const FAQSection = () => {
  return (
    <div className="py-12 mt-8 lg:mt-12 xl:mt-16 px-4 md:px-12 lg:px-8 xl:px-16">
      {/* Title & Description */}
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Getting Started with ChatOrbit</h2>
        <p className="text-gray-600">
           Frequently asked questions about using ChatOrbit. Learn how to create an account, post, and engage with the community.
        </p>
      </div>

      {/* FAQ Items */}
      <div className=" space-y-4 ">
        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="faq-accordion" defaultChecked />
          <div className="collapse-title font-semibold">
            How do I create an account on ChatOrbit?
          </div>
          <div className="collapse-content text-sm">
             Click the "Sign Up" button at the top-right corner, fill in your details, and verify your
            email to create an account.
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title font-semibold">
             How can I submit a new post?
          </div>
          <div className="collapse-content text-sm">
            After logging in, click on "Add Post" from your dashboard, fill in the title, description,
            and select relevant tags before submitting.
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title font-semibold">
            How do I edit or delete my post?
          </div>
          <div className="collapse-content text-sm">
            Go to the "My Posts" section, select the post you want to edit or delete, and use the
            available options to update or remove it.
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title font-semibold">
             How can I upvote or downvote a post?
          </div>
          <div className="collapse-content text-sm">
             Click on the thumbs up or thumbs down icon on any post to express your opinion. Make sure
            you are logged in.
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title font-semibold">
            How do I follow a tag or category?
          </div>
          <div className="collapse-content text-sm">
             Visit the "Tags" section, find your preferred topics, and click "Follow" to get updates
            whenever a new post is added under that tag.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
