export const Loader = () => {
  return (
    <div className="bg-[#263038] h-screen w-full flex justify-center items-center">
      <div className="flex flex-col text-center items-center">
        <span className="loader"></span>
        <span className="text-white text-lg mt-3">Cargando...</span>
      </div>
    </div>
  );
};
