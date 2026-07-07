import React, { useEffect } from 'react';

const ChallengesGoalsSection = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
         {/* Context Section */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 md:mb-12 mb-6 md:mb-8">
          <div className="lg:sticky lg:top-40" style={{ height: 'min-content' }}>
            <div className="max-w-md">
              <h2 className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out text-lg sm:text-xl md:text-2xl font-medium md:mb-12 mb-3 md:mb-6 text-gray-900">Context</h2>
            </div>
          </div>

          <div className="space-y-4 md:space-y-8">
            <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out">
              <p className="text-base sm:text-lg text-gray-600">
                We brought Acrobat's AI Assistant to mobile to help people summarize PDFs, ask questions, and find information faster. But after launch, adoption remained critically low.
              </p>
            </div>
          </div>
        </div>
            
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mb-6 md:mb-8">
            
          {/* Challenges Section */}
          <div className="lg:sticky lg:top-40" style={{ height: 'min-content' }}>
            <div className="max-w-md">
              <h2 className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out text-lg sm:text-xl md:text-2xl font-medium md:mb-12 mb-3 md:mb-6 text-gray-900">Insights</h2>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            {/* Awareness gap */}
            <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Awareness gap</h3>
              <p className="text-base sm:text-lg text-gray-600">
                Most users still didn't know AI Assistant was there. The existing entry point (the FAB) was easy to miss, so many users never discovered it.
              </p>
            </div>

            {/* Mental model problems */}
            <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Mental model problems</h3>
              <p className="text-base sm:text-lg text-gray-600">
                Users who found it asked: "Is this just another chatbot?" The value proposition was unclear and users didn't understand when or why to use it.
              </p>
            </div>

            {/* Notification fatigue */}
            <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Notification fatigue</h3>
              <p className="text-base sm:text-lg text-gray-600">
                Users complained about over-messaging throughout the app. Research showed coachmarks had low completion rates, and traditional discovery patterns like "what's new" modals weren't working.
              </p>
            </div>
          </div>
        </div>

        {/* Design Goals Section */}
        <div className="mt-8 md:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 md:mb-12 mb-6 md:mb-8">
          <div className="lg:sticky lg:top-40" style={{ height: 'min-content' }}>
            <div className="max-w-md">
              <h2 className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out text-lg sm:text-xl md:text-2xl font-medium md:mb-12 mb-3 md:mb-6 text-gray-900">Design goals</h2>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Contextual over promotional</h3>
              <p className="text-base sm:text-lg text-gray-600">
                Show value in the moment of need
              </p>
            </div>

            <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Progressive disclosure</h3>
              <p className="text-base sm:text-lg text-gray-600">
                Don't teach everything at once, reveal capabilities through use
              </p>
            </div>

            <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Show, not tell</h3>
              <p className="text-base sm:text-lg text-gray-600">
                Let users use the product instead of reading instructions on how to use it  
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengesGoalsSection;
