import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLocationContext } from "../context/LocationContext";

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;

      setPosition({
        lat,
        lng,
      });
    },
  });

  if (!position) {
    return null;
  }

  return <Marker position={[position.lat, position.lng]} />;
}

export default function LocationPage() {
  const navigate = useNavigate();

  const { selectLocation } = useLocationContext();

  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (currentLocation) => {
        setPosition({
          lat: currentLocation.coords.latitude,
          lng: currentLocation.coords.longitude,
        });

        setLoading(false);
      },
      () => {
        setLoading(false);
      },
    );
  }, []);

  const handleConfirm = async () => {
    if (!position) return;

    setConfirming(true);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.lat}&lon=${position.lng}&accept-language=az`,
      );

      const data = await response.json();

      const address = data.address || {};

      const formattedAddress = [
        address.road,
        address.house_number,
        address.neighbourhood || address.suburb,
        address.city || address.town || address.village,
      ]
        .filter(Boolean)
        .join(", ");

      selectLocation({
        address:
          formattedAddress ||
          data.display_name ||
          `${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}`,
        latitude: position.lat,
        longitude: position.lng,
      });

      navigate("/checkout");
    } catch (error) {
      console.error("Ünvan alınarkən xəta:", error);

      selectLocation({
        address: `${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}`,
        latitude: position.lat,
        longitude: position.lng,
      });

      navigate("/checkout");
    } finally {
      setConfirming(false);
    }
  };

  const defaultPosition = [40.4093, 49.8671];

  return (
    <main className="relative h-screen w-full overflow-hidden bg-gray-100">
      {/* Карта */}
      <div className="h-full w-full">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">Məkanınız müəyyən edilir...</p>
          </div>
        ) : (
          <MapContainer
            center={position ? [position.lat, position.lng] : defaultPosition}
            zoom={14}
            className="h-full w-full"
            attributionControl={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <LocationMarker position={position} setPosition={setPosition} />
          </MapContainer>
        )}
      </div>

      {/* Кнопка назад */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="absolute left-16 top-4 z-[1000] rounded-xl bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-lg transition hover:text-primary"
      >
        ← Geri
      </button>

      {/* Информация сверху */}
      <div className="absolute left-1/2 top-4 z-[1000] w-[calc(100%-140px)] max-w-md -translate-x-1/2 rounded-2xl bg-white px-5 py-4 shadow-lg">
        <h1 className="text-base font-bold text-gray-900">
          Çatdırılma məkanını seçin
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Xəritədə istədiyiniz yerə klikləyərək məkanı seçin.
        </p>
      </div>

      {/* Нижняя панель */}
      <div className="absolute inset-x-0 bottom-0 z-[1000] p-3 sm:p-5">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl bg-white p-4 shadow-xl sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="text-sm text-gray-500">
            {position ? (
              <>
                Seçilmiş məkan:
                <span className="ml-1 font-medium text-gray-900">
                  {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
                </span>
              </>
            ) : (
              "Xəritədə məkan seçin"
            )}
          </div>

          <button
            type="button"
            disabled={!position || confirming}
            onClick={handleConfirm}
            className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {confirming ? "Ünvan müəyyən edilir..." : "Məkanı təsdiqlə"}
          </button>
        </div>
      </div>
    </main>
  );
}
