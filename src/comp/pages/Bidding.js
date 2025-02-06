import React, { useState } from "react";
import { FaLandmark, FaMoneyBillWave, FaPlusCircle, FaGavel } from "react-icons/fa";
import BannerBidding from "../components/bannerBidding";

const Bidding = () => {
  const defaultImage = "https://placehold.co/400x250/00ff00/000000?text=Land";
  const [lands, setLands] = useState([
      {
        image: "https://www.bahriatownconsultant.com/wp-content/uploads/Agriculture-Land-for-Sale-in-punjab-Bulandi-Hithar-Kasur-Lahore.jpg",
        location: "Lahore",
        owner: "John Doe",
        area: "5",
        unit: "Marla",
        minPrice: "1000000",
        maxPrice: "1500000",
        bids: [
          { name: "Bidder A", bid: 1200000, contact: "0300-1234567" },
          { name: "Bidder B", bid: 1300000, contact: "0301-2345678" },
        ],
      },
      {
        image: "https://i.brecorder.com/primary/2024/10/66fb3ff41e6be.jpg",
        location: "Sialkot",
        owner: "Jane Smith",
        area: "10",
        unit: "Kanal",
        minPrice: "2000000",
        maxPrice: "3000000",
        bids: [
          { name: "Bidder C", bid: 2200000, contact: "0302-3456789" }
        ],
      },
      {
        image: "https://propakistani.pk/proproperty/wp-content/uploads/2023/08/ProProperty-Design-Template-1000x560-2-4.jpg",
        location: "Pindi Bhatian",
        owner: "Alice Johnson",
        area: "2",
        unit: "Acre",
        minPrice: "5000000",
        maxPrice: "7000000",
        bids: [
            { name: "Bidder D", bid: 5500000, contact: "0303-4567890" },
            { name: "Bidder E", bid: 6200000, contact: "0304-5678901" },
        ],
      },
        // {
        //   image: "https://placehold.co/400x250/ffff00/000000?text=Jaranwala+Land",
        //   location: "Jaranwala",
        //   owner: "Bob Williams",
        //   area: "1",
        //   unit: "Acre",
        //   minPrice: "3000000",
        //   maxPrice: "4000000",
        //   bids: [],
        // },
    ]);
  const [showForm, setShowForm] = useState(false);
  const [showBids, setShowBids] = useState(false);

  const [landData, setLandData] = useState({
    image: defaultImage,
    location: "",
    area: "",
    owner: "",
    minPrice: "",
    maxPrice: "",
    unit: "",
    customUnit: "",
  });

  const [bidData, setBidData] = useState({ landIndex: null, name: "", bid: "", contact: "" , confirmBid: false });
  const [showBidForm, setShowBidForm] = useState(null);

  const handleLandSubmit = (e) => {
    e.preventDefault();

    if (!landData.minPrice || !landData.maxPrice || parseInt(landData.minPrice) >= parseInt(landData.maxPrice)) {
      alert("Maximum price must be greater than the minimum price.");
      return;
    }

    // Creating the object with all form data
    const newLand = {
        ...landData,
        image: landData.image ? landData.image : defaultImage,
        unit: landData.unit === "Custom" ? landData.customUnit : landData.unit,
        bids: [], // Ensure bids array exists for each land entry
      };
    
    console.log("New Land Entry:", newLand);

    // Add the land entry to the list
    setLands([...lands, newLand]);

    // Reset form fields
    setLandData({
        image: defaultImage,
        location: "",
        owner: "",
        area: "",
        unit: "",
        customUnit: "",
        minPrice: "",
        maxPrice: "",
      });

    setShowForm(false);
  };

  const handleBidSubmit = (e) => {
      e.preventDefault();
      if (bidData.landIndex !== null && bidData.confirmBid) {
        let updatedLands = [...lands];
        updatedLands[bidData.landIndex].bids.push({ name: bidData.name, bid: parseInt(bidData.bid), contact: bidData.contact });
        setLands(updatedLands);
        setBidData({ landIndex: null, name: "", bid: "", contact: "", confirmBid: false });
        setShowBidForm(null)
      } else {
          alert("Please confirm your bid by checking the box.");
      }
    };

  const handleBidButtonClick = (index) => {
    setShowBidForm(index);
    setBidData({ ...bidData, landIndex: index });
  }

  return (
    <div className="bg-white-900 bg-opacity-90 text-white min-h-screen py-10">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-wide flex justify-center items-center gap-2 text-[#2b6341]">
            <FaLandmark /> Agri Shop Bidding
          </h1>
          <p className="text-[#2b6341] mt-2 text-sm md:text-base">
            Buy & Sell agricultural land with fair and transparent bidding.
          </p>
        </div>

        <BannerBidding />

        {/* Buttons */}
        <div className="flex justify-center gap-6 mt-8">
          <button
            onClick={() => {
              setShowForm(true);
              setShowBids(false);
            }}
            className="bg-[#2b6341] text-white px-6 py-3 rounded-lg font-bold shadow-lg transform transition-all hover:scale-95 hover:shadow-md flex items-center gap-2"
          >
            <FaPlusCircle /> Add Land for Bidding
          </button>

          <button
            onClick={() => {
              setShowBids(true);
              setShowForm(false);
            }}
            className="bg-[#2b6341] text-white px-6 py-3 rounded-lg font-bold shadow-lg transform transition-all hover:scale-95 hover:shadow-md flex items-center gap-2"
          >
            <FaMoneyBillWave /> View All Bids
          </button>
        </div>

        {/* Land Form */}
        {showForm && (
          <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            {/* Form Heading */}
            <h2 className="text-2xl font-bold text-center text-[#2b6341] mb-6 flex items-center justify-center gap-2">
              🏡 Add Your Land for Bidding
            </h2>

            <form onSubmit={handleLandSubmit} className="space-y-5">
              {/* Image URL */}
              <div>
                <label className="block text-gray-900 font-medium mb-1">Land Image URL
                <span className="block text-gray-400 font-small mb-1">Add Your Image Url</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter image URL"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2b6341] text-gray-900"
                  value={landData.image}
                  onChange={(e) => setLandData({ ...landData, image: e.target.value })}
                   />
                  <div className="mt-2">
                  <img src={landData.image} alt="Land Preview" className="w-24 h-24 object-cover rounded" />
                  </div>

              </div>

              {/* Location */}
              <div>
                <label className="block text-gray-900 font-medium mb-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter land location"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2b6341] text-gray-900"
                  value={landData.location}
                  onChange={(e) => setLandData({ ...landData, location: e.target.value })}
                  required
                />
              </div>

              {/* Owner Name */}
              <div>
                <label className="block text-gray-900 font-medium mb-1">
                  Owner Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Owner's full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2b6341] text-gray-900"
                  value={landData.owner}
                  onChange={(e) => setLandData({ ...landData, owner: e.target.value })}
                  required
                />
              </div>

              {/* Area with Picklist */}
              <div>
                <label className="block text-gray-900 font-medium mb-1">
                  Land Area <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  {/* Area Size Input */}
                  <input
                    type="number"
                    placeholder="Enter area size"
                    className="w-2/3 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2b6341] text-gray-900"
                    value={landData.area}
                    onChange={(e) => setLandData({ ...landData, area: e.target.value })}
                    required
                  />

                  {/* Area Unit Picklist */}
                  <select
                    className="w-1/3 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2b6341] text-gray-900"
                    value={landData.unit}
                    onChange={(e) => setLandData({ ...landData, unit: e.target.value })}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Marla">Marla</option>
                    <option value="Kanal">Kanal</option>
                    <option value="Acre">Acre</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>

                {/* Show Custom Input when "Custom" is Selected */}
                {landData.unit === "Custom" && (
                  <div className="mt-3">
                    <input
                      type="text"
                      placeholder="Enter custom unit (e.g., Sq Feet, Hectare)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2b6341] text-gray-900"
                      value={landData.customUnit}
                      onChange={(e) => setLandData({ ...landData, customUnit: e.target.value })}
                      required
                    />
                  </div>
                )}
              </div>

              {/* Min Price */}
              <div>
                <label className="block text-gray-900 font-medium mb-1">
                  Minimum Price (PKR) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter minimum price"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2b6341] text-gray-900"
                  value={landData.minPrice}
                  onChange={(e) => setLandData({ ...landData, minPrice: e.target.value })}
                  required
                />
              </div>

              {/* Max Price */}
              <div>
                <label className="block text-gray-900 font-medium mb-1">
                  Maximum Price (PKR) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter maximum price"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2b6341] text-gray-900"
                  value={landData.maxPrice}
                  onChange={(e) => setLandData({ ...landData, maxPrice: e.target.value })}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#2b6341] text-white py-3 rounded-lg font-bold hover:bg-[#24542e] transition"
              >
                📍 Add Land
              </button>
            </form>
          </div>
        )}

        {/* Show Bids Section */}
        {showBids && (
          <div className="mt-10">
            <h2 className="text-3xl font-bold text-center text-[#2b6341]">🏆 Active Bids</h2>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {lands.map((land, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-gray-300 hover:shadow-xl transition transform hover:scale-105"
                >
                  {/* Land Image */}
                  <img src={land.image} alt="Land" className="w-full h-48 object-cover rounded-xl" />

                  {/* Land Details */}
                  <div className="mt-4">
                    <h3 className="text-xl font-bold text-[#2b6341]">{land.location}</h3>
                    <p className="text-black mt-1">
                      <strong>📏 Area:</strong> {land.area} {land.unit}
                    </p>
                    <p className="text-black">
                      <strong>👤 Owner:</strong> {land.owner}
                    </p>
                    <p className="text-black">
                      <strong>💰 Price Range:</strong> {land.minPrice} - {land.maxPrice} PKR
                    </p>
                  </div>

                  {/* Bids */}
                  <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-[#2b6341]">📢 Bids:</h4>
                    <ul className="text-black text-sm mt-2">
                      {land.bids.length > 0 ? (
                        land.bids.map((bid, bidIndex) => (
                          <li key={bidIndex} className="border-b border-gray-300 py-1">
                            <strong>{bid.name}:</strong> {bid.bid} PKR <strong>{bid.contact}</strong>
                          </li>
                        ))
                      ) : (
                        <p className="text-gray-500">No bids yet</p>
                      )}
                    </ul>
                  </div>

                  {/* Bid Button */}
                  <button
                    onClick={() => handleBidButtonClick(index)}
                    className="mt-4 bg-[#2b6341] text-white py-2 px-4 rounded-md hover:bg-[#24542e] transition"
                  >
                    Bid Now
                  </button>
                    {showBidForm === index && (
                        <div className="mt-4">
                            <form onSubmit={handleBidSubmit} className="space-y-3">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                                        value={bidData.name}
                                        onChange={(e) => setBidData({...bidData, name: e.target.value})}
                                        required
                                    />
                                </div>
                                <div>
                                        <input
                                                type="text"
                                                placeholder="Your Contact"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                                                value={bidData.contact}
                                                onChange={(e) => setBidData({...bidData, contact: e.target.value})}
                                                required
                                            />
                                    </div>
                                <div>
                                    <input
                                        type="number"
                                        placeholder="Your Bid"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                                        value={bidData.bid}
                                        onChange={(e) => setBidData({ ...bidData, bid: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`confirmBid-${index}`}
                                        className="mr-2"
                                        checked={bidData.confirmBid}
                                        onChange={(e) => setBidData({ ...bidData, confirmBid: e.target.checked })}
                                    />
                                    <label htmlFor={`confirmBid-${index}`} className="text-black">Confirm Bid</label>
                                </div>
                                <button type="submit" className="bg-[#2b6341] text-white py-2 px-4 rounded-md hover:bg-[#24542e] transition">
                                    Place Bid
                                </button>
                            </form>
                        </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bidding;