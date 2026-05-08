

function GridSection({ house1, house2, house3, house4, house5, house6, house7 }) {
  return (        <div class="grid grid-cols-4 grid-rows-3 gap-1">
          <div class="col-span-2 col-start-1 overflow-hidden rounded-lg">
            <img
              src={house1}
              alt="house1"
              className="w-full h-15 object-cover hover:transform hover:scale-150 hover:rotate-5 transition-all duration-500"
            />
          </div>
          <div class="col-span-2 col-start-2 row-start-2 overflow-hidden rounded-lg">
            <img
              src={house2}
              alt="house2"
              className="w-full h-15 object-cover hover:transform hover:scale-150 hover:rotate-5 transition-all duration-500"
            />
          </div>
          <div class="col-span-2 col-start-3 row-start-3 overflow-hidden rounded-lg">
            <img
              src={house3}
              alt="house3"
              className="w-full h-15 object-cover hover:transform hover:scale-150 hover:rotate-5 transition-all duration-500"
            />
          </div>
          <div class="col-span-2 col-start-1 row-start-3 overflow-hidden rounded-lg">
            <img
              src={house4}
              alt="house4"
              className="w-full h-15 object-cover hover:transform hover:scale-150 hover:rotate-5 transition-all duration-500"
            />
          </div>
          <div class="col-start-1 row-start-2 overflow-hidden rounded-lg">
            <img
              src={house5}
              alt="house5"
              className="w-full h-15 object-cover hover:transform hover:scale-150 hover:rotate-5 transition-all duration-500"
            />
          </div>
          <div class="col-start-4 row-start-2 overflow-hidden rounded-lg">
            <img
              src={house6}
              alt="house6"
              className="w-full h-15 object-cover hover:transform hover:scale-150 hover:rotate-5 transition-all duration-500"
            />
          </div>
          <div class="col-span-2 col-start-3 overflow-hidden rounded-lg">
            <img
              src={house7}
              alt="house7"
              className="w-full h-15 object-cover hover:transform hover:scale-150 hover:rotate-5 transition-all duration-500"
            />
          </div>
        </div>
  )
}

export default GridSection;