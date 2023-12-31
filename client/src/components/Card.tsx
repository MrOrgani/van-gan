import download from "../assets/download.png";
import { downloadImage } from "../utils";

export type CardType = {
  _id: string;
  name: string;
  prompt: string;
  photo: string;
};

const Card = ({ _id, name, prompt, photo }: CardType) => {
  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <img
        src={photo}
        alt={prompt}
        className="w-full h-auto object-cover rounded-xl"
      />
      <div className="group-hover:flex flex-col max-h-[95%] hidden absolute bottom-0 left-0 right-0 bg-black m-2 p-4 rounded-md">
        <p className="text-white text-md overflow-y-auto prompt">{prompt}</p>
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-green-700 flex justify-center items-center text-white text-xs font-bold">
              {name[0]}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>
          <button
            type="button"
            className="outline-none bg-transparent border-none"
            onClick={() => downloadImage(_id, photo)}
          >
            <img
              src={download}
              alt="download"
              className="w-6 h-6 object-contain invert"
            ></img>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
