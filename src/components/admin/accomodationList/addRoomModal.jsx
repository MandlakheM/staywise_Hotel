import React from "react";
import "./addRoom.css";

function AddRoomModal({ deactivateModal }) {
  return (
    <div>
      <div className="modal">
        <div className="overlay" onClick={deactivateModal}></div>
        <div className="modalContent">
          <h3>Add a room</h3>
          <p>Add details about the room in your hotel</p>

          <div>
            <label for="roomTitle">Room Title</label>
            <br />
            <br />
            <input type="text" name="roomTitle" id="roomTitle" />
          </div>

          <div>
            <br />
            <label for="roomDescription">Room Desciption</label>
            <p>Is there anything special about this room?</p>
            <input type="text" name="roomDescription" id="roomDescription" />
          </div>

          <div>
            <label>Choose Room Amenities (Optional) </label>
            <div>
              <input type="checkbox" name="roomService" id="roomService" />
              <label htmlFor="roomService">24hrs room services</label>
            </div>
            <div>
              <input type="checkbox" name="balcony" id="balcony" />
              <label htmlFor="balcony">balcony</label>
            </div>
            <div>
              <input type="checkbox" name="cityView" id="cityView" />
              <label htmlFor="cityView">city view</label>
            </div>{" "}
            <div>
              <input type="checkbox" name="forestView" id="forestView" />
              <label htmlFor="forestView">forest view</label>
            </div>{" "}
            <div>
              <input
                type="checkbox"
                name="airConditioned"
                id="airConditioned"
              />
              <label htmlFor="airConditioned">air conditioned</label>
            </div>{" "}
            <div>
              <input type="checkbox" name="tv" id="tv" />
              <label htmlFor="tv">TV</label>
            </div>{" "}
            <div>
              <input type="checkbox" name="wifi" id="wifi" />
              <label htmlFor="wifi">free Wifi</label>
            </div>{" "}
            <div>
              <input type="checkbox" name="oceanView" id="oceanView" />
              <label htmlFor="oceanView">ocean view</label>
            </div>{" "}
            <div>
              <input type="checkbox" name="mountainView" id="mountainView" />
              <label htmlFor="mountainView">mountain view</label>
            </div>{" "}
            <div>
              <input type="checkbox" name="soundProofed" id="soundProofed" />
              <label htmlFor="soundProofed">sound proofed</label>
            </div>
          </div>

          <div>
            <label for="image">Upload an Image</label>
            <br />
            <br />
            <input type="file" name="image" id="image" />
          </div>

          <div>
            <label for="roomPrice">Room Price</label>
            <p>what's the price for staying in this room for 24hrs?</p>
            <input type="text" name="roomPrice" id="roomPrice" />
          </div>

          <div>
            <label for="breakfastPrice">Breakfast Price (Optional)</label>
            <p>If you offer breakfast, what is the price?</p>
            <input type="number" name="breakfastPrice" id="breakfastPrice" />
          </div>

          <div>
            <label for="bedCount">Bed Count</label>
            <p>How many beds are available in this room?</p>
            <input type="number" name="bedCount" id="bedCount" />
          </div>

          <div>
            <label for="kingBed">King Beds (Optional)</label>
            <p>How many king size beds are available in this room?</p>

            <input type="number" name="kingBed" id="kingBed" />
          </div>

          <div>
            <label for="guestCount">Guest count</label>
            <p>How many guests are allowed?</p>
            <input type="number" name="guestCount" id="guestCount" />
          </div>

          <div>
            <label for="queenBed">Queen Beds (Optional)</label>
            <p>How many queen sized beds are available in this room?</p>

            <input type="number" name="queenBed" id="queenBed" />
          </div>

          <div>
            <label for="bathroomCount">Bathroom Count </label>
            <p>how many bathrooms are in this room?</p>
            <input type="number" name="bathroomCount" id="bathroomCount" />
          </div>

          <button>Create Accommodation</button>

          <div className="closeModal">
            <button type="button" onClick={deactivateModal}></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRoomModal;
