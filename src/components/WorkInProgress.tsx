

export default function WorkInProgress() {
  
  return (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <div
            className="bg-white p-10 rounded-2xl shadow-xl w-[90%] max-w-4xl relative"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Image */}
              <img
                src="/development.jfif"
                alt="Under Development"
                className="w-32 md:w-64"
                width={40}
                height={40}
              />

              {/* Text */}
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">🚧 Site Under Development</h2>
                <p className="text-gray-700 text-lg md:text-xl">
                  We are working hard to bring you the best experience.<br />
                  Please check back in <strong>10 days</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
  );
}