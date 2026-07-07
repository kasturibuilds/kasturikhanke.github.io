import React, { useEffect, useRef, useState } from 'react';

const FrameworkSection = () => {
  const [animationStage, setAnimationStage] = useState(0);
  const infographicRef = useRef(null);

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

  // Animation for the infographic
  useEffect(() => {
    const infographicObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && animationStage === 0) {
            // Start animation sequence
            setAnimationStage(1);
            setTimeout(() => setAnimationStage(2), 200);
            setTimeout(() => setAnimationStage(3), 400);
            setTimeout(() => setAnimationStage(4), 700); // Text appears
          }
        });
      },
      { threshold: 0.3 }
    );

    if (infographicRef.current) {
      infographicObserver.observe(infographicRef.current);
    }

    return () => infographicObserver.disconnect();
  }, [animationStage]);

  return (
    <section className="relative py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-8 md:mb-12">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Framework</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">The discovery system</h2>
        </div>

        {/* Discovery system table */}
        <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out mb-8 md:mb-12">
          <div>
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
              I designed a staged discovery system that meets users at different points in their journey while using Acrobat:
            </p>
            
            {/* Staged discovery system - Clean Visual */}
            <div ref={infographicRef} className="py-10 md:py-16 mb-6 md:mb-8">
              <div className="grid grid-cols-3 w-full">
                {/* Awareness stage */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center w-full mb-8">
                    <div className="flex-1 h-[1px]"></div>
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 backdrop-blur-md border border-gray-200 shadow-sm flex items-center justify-center text-sm md:text-base font-semibold text-gray-700 flex-shrink-0 mx-4 transition-all duration-500 ease-out ${animationStage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                      A
                    </div>
                    <div className={`flex-1 h-[1px] bg-gray-200 transition-all duration-300 origin-left ${animationStage >= 2 ? 'scale-x-100' : 'scale-x-0'}`}></div>
                  </div>
                  <div className={`transition-all duration-500 ease-out ${animationStage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 text-center">Awareness</h3>
                    <p className="text-sm md:text-base text-gray-500 leading-relaxed px-4 text-center">Let users know AI Assistant exists</p>
                  </div>
                </div>
                
                {/* Understanding stage */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center w-full mb-8">
                    <div className={`flex-1 h-[1px] bg-gray-200 transition-all duration-300 origin-right ${animationStage >= 2 ? 'scale-x-100' : 'scale-x-0'}`}></div>
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 backdrop-blur-md border border-gray-200 shadow-sm flex items-center justify-center text-sm md:text-base font-semibold text-gray-700 flex-shrink-0 mx-4 transition-all duration-500 ease-out ${animationStage >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                      U
                    </div>
                    <div className={`flex-1 h-[1px] bg-gray-200 transition-all duration-300 origin-left ${animationStage >= 3 ? 'scale-x-100' : 'scale-x-0'}`}></div>
                  </div>
                  <div className={`transition-all duration-500 ease-out delay-100 ${animationStage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 text-center">Understanding</h3>
                    <p className="text-sm md:text-base text-gray-500 leading-relaxed px-4 text-center">Show what AI Assistant does and why it's valuable</p>
                  </div>
                </div>
                
                {/* Activation stage */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center w-full mb-8">
                    <div className={`flex-1 h-[1px] bg-gray-200 transition-all duration-300 origin-right ${animationStage >= 3 ? 'scale-x-100' : 'scale-x-0'}`}></div>
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 backdrop-blur-md border border-gray-200 shadow-sm flex items-center justify-center text-sm md:text-base font-semibold text-gray-700 flex-shrink-0 mx-4 transition-all duration-500 ease-out ${animationStage >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                      Act
                    </div>
                    <div className="flex-1 h-[1px]"></div>
                  </div>
                  <div className={`transition-all duration-500 ease-out delay-200 ${animationStage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 text-center">Activation</h3>
                    <p className="text-sm md:text-base text-gray-500 leading-relaxed px-4 text-center">Prompt usage at the moment of need</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 md:pt-4  border-gray-200/50">
              <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-4xl">
                Traditional discovery assumes linear adoption where the feature is announced up front and the user tries it. Research shows that users need repeated exposure across different contexts before they internalize a new capability. Each stage builds on the last. <span className="text-gray-900 font-medium">Awareness</span> creates familiarity. <span className="text-gray-900 font-medium">Understanding</span> creates intent. <span className="text-gray-900 font-medium">Activation</span> creates habit.
              </p>
            </div>

            <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out mt-8 md:mt-12">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">Why this approach?</h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-4xl">
              We considered onboarding tutorials and proactive AI suggestions, but both created problems: tutorials blocked users from their work, and proactive suggestions felt presumptuous. Progressive contextual discovery won because it worked with user behavior, not against it.              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8 md:space-y-12">
          {/* Push notifications */}
          <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-start">
              <div className="pt-4 md:pt-16">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 inline-block border-b border-gray-300 pb-1">Awareness</span>
                  <h3 className="text-xl md:text-2xl font-medium mb-4 text-gray-900">Push notifications</h3>
                  <div className="space-y-4">
                    <p className="text-base md:text-lg text-gray-600">
                      Push notifications were risky. A poorly timed message and users would feel spammed. I collaborated with our Content Strategist and Product Marketing Manager to test distinct message frames:
                    </p>
                    <ul className="space-y-2 text-base md:text-lg text-gray-600 pl-4">
                      <li><span className="font-medium">Version A:</span> "Chat with your docs" (feature focused)</li>
                      <li><span className="font-medium">Version B:</span> "Say hi to AI Assistant" (feature focused)</li>
                      <li><span className="font-medium">Version C:</span> "Ask questions about a document with AI" (benefit focused)</li>
                    </ul>
                    <p className="text-base md:text-lg text-gray-600">
                      <span className="font-medium">Version C won</span> with the highest open rate. Users respond to pain points, not feature announcements.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px] md:h-[600px]">
                <video
                  className="w-full h-full object-cover rounded-lg"
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  playsInline={true}
                  src="PN.mov"
                  type="video/quicktime"
                  preload="auto"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          {/* Value proposition */}
          <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-start">
              <div className="pt-4 md:pt-16">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 inline-block border-b border-gray-300 pb-1">Understanding</span>
                  <h3 className="text-xl md:text-2xl font-medium mb-4 text-gray-900">Value proposition splash</h3>
                  <div className="space-y-4">
                    <p className="text-base md:text-lg text-gray-600">
                      Users who tapped the notification needed to understand what AI Assistant does fast, or they'd leave. Instead of describing features, I designed a splash screen that shows, not tells:
                    </p>
                    <ul className="space-y-2 text-base md:text-lg text-gray-600 pl-4">
                      <li>The highest-value use cases</li>
                      <li>A quick video of AI in action</li>
                      <li>An immediate "Try now" CTA</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px] md:h-[600px]">
                <video
                  className="w-full h-full object-cover rounded-lg"
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  playsInline={true}
                  src="UA.mov"
                  type="video/quicktime"
                  preload="auto"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Problem-Solution Grid */}
            <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out mt-8 md:mt-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                  <div className="col-span-1 md:col-span-8">
                    <h4 className="flex items-center gap-2 text-lg md:text-xl font-bold">
                      <span className="text-lg md:text-xl font-medium mb-2 text-gray-900">The pivot</span>
                    </h4>
                    <img 
                      src="BeforeUA.png" 
                      alt="Description" 
                      className="w-full rounded-lg mt-4 md:mt-8"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-4 space-y-6 md:space-y-8 mt-4 md:mt-8">
                    <div>
                      <h3 className="font-medium mb-2 text-gray-900">Insight</h3>
                      <p className="text-sm md:text-base text-gray-600">During design reviews, we identified a drop-off risk: asking users to pick a file creates friction.</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2 text-gray-900">Solution</h3>
                      <p className="text-sm md:text-base text-gray-600">"Try now" routes directly to AI Assistant with recent files already loaded in the chat. Users can start asking questions immediately.</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2 text-gray-900">Why this worked</h3>
                      <p className="text-sm md:text-base text-gray-600">Removed decision-making friction. Users experienced value before having to commit to learning a new tool.</p>
                    </div>
                  </div>
                </div>
                <img 
                  src="AfterUA.png" 
                  alt="Description" 
                  className="w-full mt-4 md:mt-8 rounded-lg"
                />
            </div>

            {/* UI Evolution */}
            <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out mt-8 md:mt-16">
              <div>
                <h4 className="flex items-center gap-2 text-lg md:text-xl font-bold mb-2">
                  <span className="text-lg md:text-xl font-medium mb-2 text-gray-900">UI evolution</span>
                </h4>
                <p className="mb-4 md:mb-8 text-sm md:text-base text-gray-600">I worked with the Gen AI design team through recurring critiques and partnered with motion designers to iterate on the splash screen. Early versions felt more like feature lists or overly narrow demos. In the final version, I collaborated with the motion team to show the broader value of AI Assistant and simplified the UI around a primary CTA. </p>
                <img 
                  src="SplashUI.png" 
                  alt="Description" 
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Contextual nudges */}
          <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-start">
              <div className="pt-4 md:pt-16">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 inline-block border-b border-gray-300 pb-1">Activation</span>
                  <h3 className="text-xl md:text-2xl font-medium mb-4 text-gray-900">Contextual nudges</h3>
                  <div className="space-y-4">
                    <p className="text-base md:text-lg text-gray-600">
                      Splash screens create awareness but not habits. Instead of generic "Try AI" messages, I designed nudges that appear based on user behavior:
                    </p>
                    <ul className="space-y-2 text-base md:text-lg text-gray-600 pl-4">
                      <li>Opens a long document → "Summarize this document?"</li>
                      <li>Scrolls to the end of the document → "Want a summary of what you just read?"</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px] md:h-[600px]">
                <video
                  className="w-full h-full object-cover rounded-lg"
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  playsInline={true}
                  src="Chatbubble.mov"
                  type="video/quicktime"
                  preload="auto"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
          <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out mt-8 md:mt-16">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                <div className="col-span-1 md:col-span-8">
                  <h4 className="flex items-center gap-2 text-lg md:text-xl font-bold">
                    <span className="text-lg md:text-xl font-medium mb-2 text-gray-900">Why nudges?</span>
                  </h4>
                  <img
                    src="Nudges.png"
                    alt="Description"
                    className="w-full rounded-lg mt-4 md:mt-8"
                  />
                </div>
                <div className="col-span-1 md:col-span-4 space-y-6 md:space-y-8 mt-4 md:mt-8">
                  <div>
                    <h3 className="font-medium mb-2 text-gray-900">Contextual</h3>
                    <span className="space-y-2 text-sm md:text-base text-gray-600">
                    
                        <span>Nudges appear at the moment of intent (e.g., when opening a long document) and eliminate the "what should I ask?" friction by suggesting relevant actions</span>
                  </span>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 text-gray-900">Insight</h3>
                    <p className="text-sm md:text-base text-gray-600">User research showed coachmarks had low completion rates. Users said that they don't have time to read tooltips.</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 text-gray-900">Solution</h3>
                    <p className="text-sm md:text-base text-gray-600">Prompting users with a subtle nudge based on intent would help the user rather than disrupting their flow.</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 text-gray-900">Impact</h3>
                    <p className="text-sm md:text-base text-gray-600">Users found the subtle nudges more helpful and in line with their task at hand. Users could tap to use the nudges.</p>
                  </div>
                </div>
              </div>
            </div>

          {/* Text contextualization */}
          <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-start">
              <div className="pt-4 md:pt-16">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 inline-block border-b border-gray-300 pb-1">Activation</span>
                  <h3 className="text-xl md:text-2xl font-medium mb-4 text-gray-900">Text selection contextualization</h3>
                  <div className="space-y-4">
                    <p className="text-base md:text-lg text-gray-600">
                      When users select text, they signal: "this part matters to me." I saw an opportunity for AI to act on that intent. Contextual AI is powerful because it knows exactly what you're asking about.
                    </p>
                    <p className="text-base md:text-lg text-gray-600">
                      iOS and Android have different text selection systems. I worked with engineers to create a unified experience that felt native to each platform.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px] md:h-[600px]">
                <video
                  className="w-full h-full object-cover rounded-lg shadow-sm"
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  playsInline={true}
                  src="AskAI.mov"
                  type="video/quicktime"
                  preload="auto"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          {/* Cold start solution */}
          <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-start">
              <div className="pt-4 md:pt-16">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 inline-block border-b border-gray-300 pb-1">Activation</span>
                  <h3 className="text-xl md:text-2xl font-medium mb-4 text-gray-900">Cold start solution</h3>
                  <div className="space-y-4">
                    <p className="text-base md:text-lg text-gray-600">
                      Users who opened AI Assistant with no specific task faced a blank chat and left. Research revealed "I don't know what to ask" was the biggest barrier. I designed AI Quick Prompts as actionable starting points, organized into clear task categories:
                    </p>
                    <div className="space-y-3 mt-5">
                      <div className="flex items-start gap-3 pl-4 border-l-2 border-gray-400">
                        <div>
                          <span className="text-sm font-semibold text-gray-900">Ask</span>
                          <span className="text-sm text-gray-400 mx-2">·</span>
                          <span className="text-sm text-gray-500 italic">"What are the key points?"</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 pl-4 border-l-2 border-gray-300">
                        <div>
                          <span className="text-sm font-semibold text-gray-900">Analyze</span>
                          <span className="text-sm text-gray-400 mx-2">·</span>
                          <span className="text-sm text-gray-500 italic">"Compare these sections"</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 pl-4 border-l-2 border-gray-200">
                        <div>
                          <span className="text-sm font-semibold text-gray-900">Create</span>
                          <span className="text-sm text-gray-400 mx-2">·</span>
                          <span className="text-sm text-gray-500 italic">"Draft a summary email"</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px] md:h-[600px]">
                <video
                  className="w-full h-full object-cover rounded-lg shadow-sm"
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  playsInline={true}
                  src="IC.mov"
                  type="video/quicktime"
                  preload="auto"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          <div className="scroll-reveal opacity-0 translate-y-10 transform transition-all duration-700 ease-out mt-8 md:mt-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
              <div className="col-span-1 md:col-span-8">
                <h4 className="text-lg md:text-xl font-medium mb-2 text-gray-900">Why categories?</h4>
                <img src="ICfinal.png" alt="Intuitive Categories solution" className="w-full rounded-lg mt-4 md:mt-8" />
              </div>
              <div className="col-span-1 md:col-span-4 space-y-6 md:space-y-8 mt-4 md:mt-8">
                <div>
                  <h3 className="font-medium mb-2 text-gray-900">Insight</h3>
                  <p className="text-sm md:text-base text-gray-600">A flat list of prompts wasn't working. Users scrolled past them because they weren't relevant to their task.</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2 text-gray-900">Solution</h3>
                  <p className="text-sm md:text-base text-gray-600">Grouping into Ask, Analyze, Create reduced cognitive load. Users identify the task type, then pick a specific prompt.</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2 text-gray-900">Impact</h3>
                  <p className="text-sm md:text-base text-gray-600">Increased early-session engagement. Users who used Quick Prompts were more likely to return and type their own.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameworkSection;
