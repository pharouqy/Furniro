import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faCircleCheck,
  faTruckFast,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";

function Infos() {
  return (
    <div className="flex flex-row justify-center items-center w-full px-10 py-5 bg-amber-100 gap-5">
      <div className="flex flex-row gap-5 items-center jsustify-center">
        <FontAwesomeIcon icon={faTrophy} className="text-7xl text-amber-500" />
        <div>
          <h3 className="font-bold text-2xl  text-amber-500">High Quality</h3>
          <p className="text-gray-500">Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
      <div className="flex flex-row gap-5 items-center jsustify-center">
        <FontAwesomeIcon
          icon={faCircleCheck}
          className="text-7xl text-amber-500"
        />
        <div>
          <h3 className="font-bold text-2xl text-amber-500">Best Quality</h3>
          <p className="text-gray-500">Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
      <div className="flex flex-row gap-5 items-center jsustify-center">
        <FontAwesomeIcon
          icon={faTruckFast}
          className="text-7xl text-amber-500"
        />
        <div>
          <h3 className="font-bold text-2xl text-amber-500">Fast Shipping</h3>
          <p className="text-gray-500">Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
      <div className="flex flex-row gap-5 items-center jsustify-center">
        <FontAwesomeIcon icon={faHeadset} className="text-7xl text-amber-500" />
        <div>
          <h3 className="font-bold text-2xl text-amber-500">High Quality</h3>
          <p className="text-gray-500">Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
    </div>
  );
}

export default Infos;
