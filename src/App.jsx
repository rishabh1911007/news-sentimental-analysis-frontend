import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";


function App() {
  const [newsLink, setNewsLink] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.promise(
      fetch(`http://localhost:8000/analyse?newsLink=${encodeURIComponent(newsLink)}`)
        .then((res) => res.json())
        .then((data) => {

          setResponse(data.result.results);
          console.log('Response:', data.result.results[0]);
          setLoading(false);
          return 'Analysis complete!';
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
          throw new Error('Analysis failed. Please try again.');
        }),
      {
        loading: 'Analyzing News...',
        success: (message) => message,
        error: (error) => error.message,
      }
    );
  };

  return (

    <>

<div className="bg-white pb-6 sm:pb-8 lg:pb-12">
  <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
  <Toaster/>
    <header className="mb-4 flex items-center justify-between border-b py-4 md:mb-12 md:py-4 xl:mb-16">
      {/* logo - start */}
      <a
        href="/"
        className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl"
        aria-label="logo"
      >
        {/* <svg width="95" height="94" viewBox="0 0 95 94" class="h-auto w-6 text-indigo-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M96 0V47L48 94H0V47L48 0H96Z" />
        </svg> */}
        <img
          className="h-auto w-20 text-indigo-500"
          src="/phrase-sentiment-svgrepo-com.svg"
          alt="NewsEval"
        />
        {/* NewsEval */}
        <h1 className=" pb-4 text-4xl font-bold text-black sm:text-3xl md:text-5xl">
          NewsEval
        </h1>
      </a>
      {/* logo - end */}
      {/* nav - start */}
      {/* <nav class="hidden gap-12 lg:flex">
        <a href="#" class="text-lg font-semibold text-indigo-500">Home</a>
        <a href="#" class="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700">Features</a>
        <a href="#" class="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700">Pricing</a>
        <a href="#" class="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700">About</a>
      </nav> */}
      {/* nav - end */}
      {/* buttons - start */}
      <a
        href="#footer"
        className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
      >
        Contact
      </a>
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-2.5 py-2 text-sm font-semibold text-gray-500 ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
        Menu
      </button>
      {/* buttons - end */}
    </header>
    <section className="flex flex-col justify-between gap-6 sm:gap-10 md:gap-16 lg:flex-row">
      {/* content - start */}
      <div className="flex flex-col justify-between xl:w-5/12">
        <div className="sm:text-center lg:pt-12 lg:text-left xl:pt-24">
          <p className="mb-4 font-semibold text-indigo-500 md:mb-6 md:text-lg xl:text-xl">
            Postive :|: Neutral :|: Negative
          </p>
          <h1 className="mb-8 text-4xl font-bold text-black sm:text-5xl md:mb-12 md:text-6xl">
            Sentiment Analysis of the news...😄
          </h1>
          <div className="flex flex-row gap-2.5 sm:flex-row sm:justify-center lg:justify-start">
            <div>
             
              <input
                  type="text"
                  name="hs-search-link-1"
                  id="hs-search-link-1"
                  placeholder="Paste News Link Here"
                  value={newsLink}
                  onChange={(e) => setNewsLink(e.target.value)}
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 h-full transition duration-100 focus:ring"
              />
            </div>
            <div className=" pl-4">
              <button
         type="submit"
         onClick={handleSubmit}
                className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
              >
                Submit
              </button>
            </div>

            {/* <a href="#" class="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base">Take tour</a> */}
          </div>

          
{response && (  
<>

  <h3 className="text-xl font-bold text-gray-800 my-6">News Analysis</h3>

<div className=" mb-4">

{response ==="positive" &&
  <div className="shadow-md border-4 p-1 border-green-500 mx-2 rounded-md ">
    <p className="font-bold">Positive</p>
  </div>
}

{response ==="neutral" &&

  <div className="shadow-md border-4 p-1 border-cyan-500 mx-2  rounded-md ">
  <p className="font-bold">Neutral</p>
  </div>
}

{response ==="negative" &&

  <div className="shadow-md border-4 p-1 border-red-500 mx-2  rounded-md ">
  <p className="font-bold">Negative</p>
  </div>
}
  </div>
  </>
)}
        </div>
        <div>
          {/* show with emoji, positive 😄, negative 😒 and neutral 😐*/}
        </div>
        {/* social - start */}
        <div
          id="footer"
          className="mt-8 flex items-center justify-center gap-4 sm:mt-16 lg:justify-start"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-[#758CA3] sm:text-base">
            Social
          </span>
          <span className="h-px w-12 bg-[#758CA3]" />
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/_rishabh.19_/"
              target="_blank"
              className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600"
            >
              <img
                className="w-6"
                src="/instagram-svgrepo-com.svg"
                alt="Instagram"
              />
            </a>
            <a
              href="https://twitter.com/Rishabh1911007"
              target="_blank"
              className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600"
            >
              <img
                className="w-6"
                src="./twitter-boxed-svgrepo-com.svg"
                alt="Twitter"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/rishabh1911007/"
              target="_blank"
              className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600"
            >
              <img
                className="w-6"
                src="./linkedin-svgrepo-com.svg"
                alt="Linkedin"
              />
            </a>
            <a
              href="https://github.com/rishabh1911007"
              target="_blank"
              className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600"
            >
              <img
                className="w-6"
                src="./github-svgrepo-com.svg"
                alt="Github"
              />
            </a>
          </div>
        </div>
        {/* social - end */}
      </div>
      {/* content - end */}
      {/* image - start */}
      {/* <div class="h-112"> */}
      <div className="h-48 overflow-hidden  lg:h-auto xl:w-5/12">
       {response ==="positive" &&
        <img
          src="/positive.png"
          loading="lazy"
          alt="Sentiment Analysis of News"
          className="h-full w-full object-cover object-center"
        />
}

{response ==="neutral" &&
        <img
          src="/neutral.png"
          loading="lazy"
          alt="Sentiment Analysis of News"
          className="h-full w-full object-cover object-center"
        />
}

{response ==="negative" &&
        <img
          src="/negative.png"
          loading="lazy"
          alt="Sentiment Analysis of News"
          className="h-full w-full object-cover object-center"
        />
}

{!response &&
        <img
          src="/analysis-svgrepo-com.svg"
          loading="lazy"
          alt="Sentiment Analysis of News"
          className="h-full w-full object-cover object-center"
        />
}
      </div>
      {/* image - end */}
    </section>
  </div>
</div>

    
    


  </>
  )
}

export default App
