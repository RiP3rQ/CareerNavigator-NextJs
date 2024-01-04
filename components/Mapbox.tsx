"use client";

import React, { useState } from "react";
import Map, { Marker, MapLayerMouseEvent } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { RiMapPinFill } from "react-icons/ri";
import { CheckCheck } from "lucide-react";

type Props = {
  location?: {
    latitude: number;
    longitude: number;
  };
  setLocation?: (location: { latitude: number; longitude: number }) => void;
  disabled?: boolean;
  jobOfferLocations?: {
    latitude: number;
    longitude: number;
  }[];
  indexOfHoveredJobOffer?: number;
};

const Mapbox: React.FC<Props> = ({
  location,
  setLocation,
  disabled,
  jobOfferLocations,
  indexOfHoveredJobOffer,
}) => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    longitude: location?.longitude || 19.4808,
    latitude: location?.latitude || 52.0692,
    zoom: location ? 12 : 5,
  });
  const [clickedLocation, setClickedLocation] = useState({
    longitude: location?.longitude || 0,
    latitude: location?.latitude || 0,
  });

  // handle map click
  const handleClick = (e: MapLayerMouseEvent) => {
    if (disabled) return;
    setClickedLocation({
      longitude: e.lngLat.lng,
      latitude: e.lngLat.lat,
    });
    if (setLocation) {
      setLocation({
        longitude: e.lngLat.lng,
        latitude: e.lngLat.lat,
      });
    }
  };

  return (
    <Map
      {...viewport}
      mapStyle={"mapbox://styles/rip3rq/clqy08k5o013h01qu0whtd02h"}
      mapboxAccessToken="pk.eyJ1IjoicmlwM3JxIiwiYSI6ImNscXh6cnFpYjAwNTMybXJxYjA0dnlwcHQifQ.IXr5tTQpDh-irDQ7xIuoaQ"
      onMove={(e) =>
        setViewport({
          ...viewport,
          zoom: e.viewState.zoom,
          longitude: e.viewState.longitude,
          latitude: e.viewState.latitude,
        })
      }
      onClick={(e) => handleClick(e)}
    >
      {/* Click on map for long/lat */}
      {clickedLocation.longitude && clickedLocation.latitude ? (
        <Marker
          longitude={clickedLocation.longitude}
          latitude={clickedLocation.latitude}
          offset={[0, -20]}
        >
          <RiMapPinFill size={40} color="#A855F7" />
        </Marker>
      ) : null}
      {/* JobOffers Markers */}
      {jobOfferLocations?.map((jobOfferLocation, index) => (
        <Marker
          key={index}
          longitude={jobOfferLocation.longitude}
          latitude={jobOfferLocation.latitude}
          offset={[0, -20]}
        >
          <CheckCheck
            size={30}
            className={`bg-blue-400 text-white rounded-full ${
              indexOfHoveredJobOffer === index && "animate-bounce z-50"
            }`}
          />
        </Marker>
      ))}
      {/* Marker for selected location via create/edit jobOffer form */}
      {location?.longitude && location?.latitude ? (
        <Marker
          longitude={location.longitude}
          latitude={location.latitude}
          offset={[0, -20]}
        >
          <RiMapPinFill size={40} color="#A855F7" />
        </Marker>
      ) : null}
    </Map>
  );
};

export default Mapbox;
